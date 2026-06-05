export type WalletMockupState = {
  open: boolean;
  x: number;
  y: number;
};

const KEY = "od_wallet_mockup";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function defaultWalletMockupPosition(): Pick<WalletMockupState, "x" | "y"> {
  return {
    x: Math.max(20, window.innerWidth - 270),
    y: 36,
  };
}

/** Registrable domain for shared cookies — lvh.me in dev, overdraft.xyz in prod. */
export function cookieDomain(): string | undefined {
  const host = location.hostname;
  if (host === "lvh.me" || host.endsWith(".lvh.me")) return "lvh.me";
  const parts = host.split(".");
  if (parts.length >= 2) return parts.slice(-2).join(".");
  return undefined;
}

function parseState(raw: string): WalletMockupState | null {
  try {
    const parsed = JSON.parse(raw) as WalletMockupState;
    if (
      typeof parsed.open === "boolean" &&
      typeof parsed.x === "number" &&
      typeof parsed.y === "number"
    ) {
      return parsed;
    }
  } catch {
    /* ignore malformed storage */
  }
  return null;
}

function cookieIsSet(): boolean {
  return new RegExp(`(?:^|; )${KEY}=`).test(document.cookie);
}

function readCookie(): WalletMockupState | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${KEY}=([^;]*)`));
  if (!match) return null;
  return parseState(decodeURIComponent(match[1]));
}

export function readWalletMockupState(): WalletMockupState {
  const stored = readCookie();
  const defaults = defaultWalletMockupPosition();
  if (!stored?.open) {
    return { open: false, ...defaults };
  }
  return stored;
}

export function closedWalletMockupState(): WalletMockupState {
  return { open: false, ...defaultWalletMockupPosition() };
}

export function clearWalletMockupState(): void {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  const expired = `${KEY}=; path=/; max-age=0; SameSite=Lax`;
  const domain = cookieDomain();
  if (domain) {
    document.cookie = `${expired}; domain=${domain}${secure}`;
  }
  document.cookie = `${expired}${secure}`;
}

export function writeWalletMockupState(state: WalletMockupState): void {
  if (!state.open) {
    clearWalletMockupState();
    return;
  }

  const encoded = encodeURIComponent(JSON.stringify(state));
  const secure = location.protocol === "https:" ? "; Secure" : "";
  const base = `${KEY}=${encoded}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;

  const domain = cookieDomain();
  if (domain) {
    document.cookie = `${base}; domain=${domain}${secure}`;
    if (cookieIsSet()) return;
  }

  // Host-only fallback when the browser rejects domain cookies (e.g. *.localhost).
  document.cookie = `${base}${secure}`;
}
