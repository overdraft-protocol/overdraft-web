import { useRef, useState, type ReactNode } from "react";
import {
  AppleLogo,
  Bluetooth,
  BatteryCharging,
  WifiHigh,
  MagnifyingGlass,
  SquaresFour,
  DownloadSimple,
  CaretDown,
  CheckCircle,
  GithubLogo,
  KeyholeIcon,
  LegoSmileyIcon,
  LockKeyIcon,
  PlugsIcon,
  WalletIcon,
  ArrowRight,
  StorefrontIcon,
  CoinsIcon,
  ScalesIcon,
  LightningIcon,
  ShieldCheckIcon,
  UsersThreeIcon,
  TrophyIcon,
  BookOpenIcon,
  TreeStructureIcon,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

const camelWalking = "/camel-walking.gif";
const camelPng = "/favicon.png";
const claudeIcon = "/claude.png";
const cursorIcon = "/cursor.png";
const appIcon = "/app-icon.png";

const VERSION = "0.1.0";
const GH_RELEASE_BASE =
  "https://github.com/overdraft-protocol/overdraft-mcp-wallet/releases/download";

const DOWNLOADS = {
  silicon:    `${GH_RELEASE_BASE}/v${VERSION}/Overdraft_${VERSION}_aarch64.dmg`,
  intel:      `${GH_RELEASE_BASE}/v${VERSION}/Overdraft_${VERSION}_x86_64.dmg`,
  pkgSilicon: `${GH_RELEASE_BASE}/v${VERSION}/Overdraft-CLI-${VERSION}-aarch64.pkg`,
  pkgIntel:   `${GH_RELEASE_BASE}/v${VERSION}/Overdraft-CLI-${VERSION}-x86_64.pkg`,
};

type Product = "wallet" | "market" | "economy";

// ── Cross-product config (override per deploy via Vite env) ──────────────────────
const env = import.meta.env;
// Which product this build defaults to — set by the build script per subdomain.
const DEFAULT_PRODUCT: Product =
  env.VITE_PRODUCT === "market" ? "market" :
  env.VITE_PRODUCT === "economy" ? "economy" : "wallet";
const WALLET_SITE_URL  = env.VITE_WALLET_URL  ?? "https://wallet.overdraft.xyz";
const MARKET_SITE_URL  = env.VITE_MARKET_URL  ?? "https://market.overdraft.xyz";
const ECONOMY_SITE_URL = env.VITE_ECONOMY_URL ?? "https://economy.overdraft.xyz";
const MARKET_MCP_URL   = env.VITE_MARKET_MCP_URL ?? `${MARKET_SITE_URL}/mcp`;
const WALLET_GH_URL  = "https://github.com/overdraft-protocol/overdraft-mcp-wallet";
const MARKET_GH_URL  = "https://github.com/overdraft-protocol/overdraft-marketplace";
const ECONOMY_GH_URL = "https://github.com/overdraft-protocol/overdraft-economy";

const MARKET_CLIENT_CONFIG = JSON.stringify(
  { mcpServers: { "overdraft-market": { url: MARKET_MCP_URL } } },
  null,
  2,
);


function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button type="button" onClick={copy}
      className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer select-none">
      {copied && <CheckCircle size={11} weight="fill" className="text-emerald-500" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-neutral-100 px-3 py-2 font-mono text-[12px] text-neutral-600">
      <span className="select-all">{children}</span>
      <CopyButton text={children} />
    </div>
  );
}

/** Inner content of the app mockup — shared between inline and floating versions */
function AppMockupBody() {
  return (
    <div className="flex flex-col bg-white" style={{ height: 388 }}>
      {/* Dock bar */}
      <div className="flex shrink-0 justify-center px-3 pt-2">
        <div className="flex items-center gap-3 rounded-full px-3 py-1.5"
          style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.08)" }}>
          {[
            { Icon: LegoSmileyIcon, active: true },
            { Icon: KeyholeIcon,    active: false },
            { Icon: PlugsIcon,      active: false },
            { Icon: LockKeyIcon,    active: false },
          ].map(({ Icon, active }, i) => (
            <Icon key={i} size={11} weight={active ? "fill" : "regular"} color={active ? "#1a1a1a" : "#a3a3a3"} />
          ))}
        </div>
      </div>

      {/* Agent sessions */}
      <div className="flex-1 min-h-0 px-3.5 pt-2.5">
        <p className="mb-1.5 px-0.5 font-semibold uppercase"
          style={{ fontSize: 7.5, color: "#a3a3a3", letterSpacing: "0.1em" }}>
          Active · 2
        </p>
        <div className="overflow-hidden rounded-xl" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
          {[
            { icon: claudeIcon, name: "Claude Code", count: "24 interactions", ago: "2m ago",  dot: "#34d399" },
            { icon: cursorIcon, name: "Cursor",       count: "8 interactions",  ago: "14m ago", dot: "#059669" },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-2 px-2.5 py-2"
              style={{ borderBottom: i === 0 ? "1px solid rgba(0,0,0,0.06)" : undefined }}>
              <div className="relative shrink-0">
                <img src={row.icon} alt="" className="rounded-lg"
                  style={{ width: 24, height: 24, objectFit: "contain" }} />
                <span className="absolute rounded-full"
                  style={{ width: 6, height: 6, bottom: -1, right: -1, background: row.dot, border: "1.5px solid white" }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium" style={{ fontSize: 9.5, color: "#171717" }}>{row.name}</p>
                <p className="truncate" style={{ fontSize: 8, color: "#a3a3a3" }}>{row.count}</p>
              </div>
              <p style={{ fontSize: 8, color: "#a3a3a3" }}>{row.ago}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0" />

      {/* Wallet card */}
      <div className="shrink-0 px-3 pb-3">
        <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "1.8" }}>
          <div className="absolute inset-0" style={{ background: "oklch(0.147 0.004 49.25)" }} />
          <div className="absolute inset-0 opacity-45"
            style={{ background: "linear-gradient(45deg, rgb(212,248,240) 0%, transparent 45%)" }} />
          <div className="absolute inset-0 flex flex-col justify-between p-3">
            <div className="flex items-start justify-between">
              <span className="font-bold tracking-tight"
                style={{ fontSize: 9.5, color: "oklch(0.985 0.001 106.423)" }}>Overdraft.</span>
              <span className="rounded-full px-1.5 py-0.5 font-medium"
                style={{ fontSize: 6.5, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)" }}>ETH</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-0.5">
                <span style={{ fontSize: 7.5, color: "rgba(255,255,255,0.55)" }}>1.25 ETH</span>
                <span className="font-bold leading-none tracking-tight"
                  style={{ fontSize: 17, color: "oklch(0.985 0.001 106.423)" }}>$3,240</span>
              </div>
              <WalletIcon size={12} style={{ color: "oklch(0.985 0.001 106.423)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Draggable floating app window — triggered from menu bar camel */
function FloatingAppMockup({ onClose }: { onClose: () => void }) {
  const [pos, setPos] = useState(() => ({
    x: Math.max(20, window.innerWidth - 270),
    y: 36,
  }));
  const drag = useRef<{ ox: number; oy: number; px: number; py: number } | null>(null);

  function onTitleMouseDown(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    drag.current = { ox: e.clientX, oy: e.clientY, px: pos.x, py: pos.y };

    function onMove(ev: MouseEvent) {
      if (!drag.current) return;
      setPos({
        x: drag.current.px + ev.clientX - drag.current.ox,
        y: drag.current.py + ev.clientY - drag.current.oy,
      });
    }
    function onUp() {
      drag.current = null;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }

  return (
    <div
      style={{ position: "fixed", left: pos.x, top: pos.y, width: 220, zIndex: 9999, userSelect: "none" }}
    >
      <div className="overflow-hidden rounded-xl shadow-2xl" style={{ border: "1px solid #e5e5e5" }}>
        {/* Draggable title bar — close button closes the mockup */}
        <div
          onMouseDown={onTitleMouseDown}
          className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-neutral-200 select-none"
          style={{ background: "#f0f0f0", cursor: "grab" }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-2.5 w-2.5 rounded-full hover:opacity-80 transition-opacity cursor-pointer"
            style={{ background: "#ff5f57" }}
          />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
          <span className="mx-auto font-medium text-neutral-400 pr-9" style={{ fontSize: 10 }}>Overdraft</span>
        </div>
        <AppMockupBody />
      </div>
    </div>
  );
}

/** Simulated macOS menu bar — pinned to top of viewport, shown on both products.
 *
 * Wallet: camel click toggles the floating wallet mockup.
 * Market: camel click cross-links to the wallet site (it lives in the menu bar
 *         because the wallet is the companion app every market agent needs).
 */
function MacMenuBar({
  product,
  mockupOpen,
  onCamelClick,
}: {
  product: Product;
  mockupOpen: boolean;
  onCamelClick: () => void;
}) {
  const now = new Date();
  const dayName   = now.toLocaleDateString("en-US", { weekday: "short" });
  const dayNum    = now.getDate();
  const monthName = now.toLocaleDateString("en-US", { month: "short" });
  const timeStr   = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateTimeStr = `${dayName} ${dayNum} ${monthName} ${timeStr}`;

  const appLabel =
    product === "wallet"  ? "Overdraft" :
    product === "market"  ? "Overdraft Market" :
                            "Overdraft Economy";
  const camelTitle = product === "wallet" ? "Toggle Overdraft wallet" : "Get Overdraft Wallet";
  const camelActive = product === "wallet" && mockupOpen;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 select-none"
      style={{ height: 28, background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px) saturate(180%)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      {/* Left — Apple logo + active app menus */}
      <div className="flex items-center gap-1">
        <AppleLogo size={13} weight="fill" className="text-neutral-800 shrink-0 mx-2" />
        {product === "wallet" ? (
          <button
            type="button"
            onClick={onCamelClick}
            className={`flex items-center rounded-md px-2 py-0.5 text-[13px] font-semibold text-neutral-900 transition-colors cursor-pointer ${
              camelActive ? "bg-neutral-200/80" : "hover:bg-neutral-100"
            }`}
          >
            {appLabel}
          </button>
        ) : (
          <span className="flex items-center rounded-md px-2 py-0.5 text-[13px] font-semibold text-neutral-900">
            {appLabel}
          </span>
        )}
        {["File", "Edit", "Window", "Help"].map((m) => (
          <span key={m} className="text-[13px] text-neutral-500 hidden sm:inline px-2 py-0.5">{m}</span>
        ))}
      </div>

      {/* Right — menu bar extras + system icons */}
      <div className="flex items-center">
        {/* Overdraft camel — wallet's menu bar extra.
            On wallet: toggles the floating mockup.
            On market: links to the wallet site so visitors can grab the companion app. */}
        <button
          type="button"
          onClick={onCamelClick}
          title={camelTitle}
          aria-label={camelTitle}
          className={`flex items-center justify-center rounded-full px-2 py-0.5 transition-colors cursor-pointer ${
            camelActive ? "bg-neutral-200/80" : "hover:bg-neutral-100"
          }`}
        >
          <img src={camelPng} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />
        </button>

        {/* Anthropic/Claude menu bar extra */}
        <span className="flex items-center justify-center px-1.5 py-0.5">
          <img src={claudeIcon} alt="" style={{ width: 14, height: 14, objectFit: "contain", borderRadius: 3 }} />
        </span>

        {/* Bluetooth */}
        <span className="flex items-center justify-center px-1.5 py-0.5 text-neutral-600">
          <Bluetooth size={13} weight="bold" />
        </span>

        {/* Battery */}
        <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-neutral-600">
          <span className="text-[11px] tabular-nums">32%</span>
          <BatteryCharging size={15} weight="regular" />
        </span>

        {/* WiFi */}
        <span className="flex items-center justify-center px-1.5 py-0.5 text-neutral-600">
          <WifiHigh size={14} weight="bold" />
        </span>

        {/* Spotlight */}
        <span className="flex items-center justify-center px-1.5 py-0.5 text-neutral-600">
          <MagnifyingGlass size={13} weight="bold" />
        </span>

        {/* Control Center */}
        <span className="flex items-center justify-center px-1.5 py-0.5 text-neutral-600">
          <SquaresFour size={13} weight="bold" />
        </span>

        {/* Date + time */}
        <span className="text-[12px] text-neutral-600 tabular-nums pl-2">{dateTimeStr}</span>
      </div>
    </div>
  );
}

/** App icon block — 220px outer column (matches CliMockup width).
 *  Shows a 210×210px visible icon, cropping the transparent PNG padding.
 *  PNG padding: 21px left / 23px top / 21px right / 19px bottom out of 256px. */
function AppIconBlock({ onClick }: { onClick?: () => void }) {
  const visible = 110;
  // Scale so visible content (214px wide) fills `visible` px
  const imgSize = Math.round(256 / 214 * visible); // ≈ 203
  const marginLeft = -Math.round(21 / 256 * imgSize); // ≈ -17
  const marginTop  = -Math.round(23 / 256 * imgSize); // ≈ -18
  return (
    <div
      className={`select-none shrink-0 ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
    >
      <div style={{ width: visible, height: visible, overflow: "hidden" }}>
        <img
          src={appIcon}
          alt="Overdraft"
          style={{ width: imgSize, height: imgSize, maxWidth: "none", marginLeft, marginTop, display: "block" }}
        />
      </div>
    </div>
  );
}

/** Terminal mock of the CLI */
function CliMockup() {
  const lines = [
    { prompt: true,  text: "overdraft-wallet" },
    { prompt: false, text: "● daemon running" },
    // { prompt: false, text: "● mcp.sock ready" },
    { prompt: false, text: "" },
    { prompt: true,  text: "overdraft-wallet agent-config --install --client cursor" },
    { prompt: false, text: "✓ Cursor configured" },
  ];
  return (
    <div className="select-none shrink-0" style={{ width: 220 }}>
      <div className="overflow-hidden rounded-xl shadow-xl" style={{ border: "1px solid #e5e5e5" }}>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-neutral-200" style={{ background: "#f0f0f0" }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
          <span className="mx-auto font-medium text-neutral-400 pr-9" style={{ fontSize: 10 }}>Terminal</span>
        </div>
        <div className="flex flex-col gap-0.5 px-3 py-3 font-mono" style={{ background: "#1c1c1e", fontSize: 10.5 }}>
          {lines.map((line, i) =>
            line.text === "" ? <div key={i} style={{ height: 5 }} /> : (
              <div key={i} className="flex items-start gap-1.5 leading-relaxed">
                <span style={{ color: line.prompt ? "#34d399" : "transparent", userSelect: "none" }}>❯</span>
                <span style={{ color: line.prompt ? "#e5e5e5" : line.text.startsWith("✓") ? "#34d399" : "#606060" }}>
                  {line.text}
                </span>
              </div>
            )
          )}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span style={{ color: "#34d399" }}>❯</span>
            <span className="animate-pulse inline-block" style={{ width: 5, height: 11, background: "#525252" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function WalletInstall({ onIconClick }: { onIconClick?: () => void }) {
  const [cliExpanded, setCliExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-10">

      {/* ── Row 1: app icon + macOS download (vertically centered) ── */}
      <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6 sm:gap-8">
        <AppIconBlock onClick={onIconClick} />
        <div className="flex flex-col gap-2 flex-1 min-w-0 w-full sm:w-auto">
          <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-neutral-800">Install macOS app</span>
                <span className="text-[11px] text-neutral-400">Touch ID &amp; Keychain</span>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <a href={DOWNLOADS.silicon} download
                  className="flex shrink-0 items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-neutral-700 active:scale-[0.99]">
                  <DownloadSimple size={11} weight="bold" /> Silicon
                </a>
                <a href={DOWNLOADS.intel} download
                  className="flex shrink-0 items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.99]">
                  <DownloadSimple size={11} weight="bold" /> Intel
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-neutral-100" />
        <span className="text-[11px] text-neutral-300">or</span>
        <div className="h-px flex-1 bg-neutral-100" />
      </div>

      {/* ── Row 2: terminal + CLI downloads ── */}
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 sm:gap-8">
        <CliMockup />
        <div className="flex flex-col gap-3 flex-1 min-w-0 w-full sm:w-auto">
          <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-neutral-800">CLI macOS package</span>
                <span className="text-[11px] text-neutral-400">Touch ID &amp; Keychain.</span>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <a href={DOWNLOADS.pkgSilicon} download
                  className="flex shrink-0 items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-neutral-700 active:scale-[0.99]">
                  <DownloadSimple size={11} weight="bold" /> Silicon
                </a>
                <a href={DOWNLOADS.pkgIntel} download
                  className="flex shrink-0 items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.99]">
                  <DownloadSimple size={11} weight="bold" /> Intel
                </a>
              </div>
            </div>
            <button type="button" onClick={() => setCliExpanded((v) => !v)}
              className="flex w-fit items-center gap-1 text-[11px] text-neutral-300 hover:text-neutral-500 transition-colors cursor-pointer">
              <CaretDown size={9} weight="bold" className={`transition-transform duration-200 ${cliExpanded ? "rotate-180" : ""}`} />
              Manual install steps
            </button>
            {cliExpanded && (
              <div className="flex flex-col gap-1.5 pt-2 border-t border-neutral-100">
                <p className="text-[11px] text-neutral-400 pb-0.5">Add to PATH after installing:</p>
                <CodeBlock>export PATH="$HOME/.overdraft-wallet/bin:$PATH"</CodeBlock>
                <CodeBlock>overdraft-wallet agent-config --install --client cursor</CodeBlock>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-neutral-200 px-4 py-3">
            <span className="font-mono text-[11px] text-neutral-300 truncate">
              brew install overdraft-protocol/tap/overdraft-wallet-cli
            </span>
            <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
              Soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
      {children}
    </span>
  );
}

function Feature({ Icon, title, desc }: { Icon: PhosphorIcon; title: string; desc: string }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-3">
      <Icon size={16} weight="duotone" className="text-neutral-700" />
      <span className="text-[12px] font-semibold text-neutral-800">{title}</span>
      <span className="text-[11px] text-neutral-400 leading-relaxed">{desc}</span>
    </div>
  );
}

function MarketSite() {
  return (
    <div className="flex flex-col gap-6">
      {/* Connect */}
      <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <StorefrontIcon size={15} weight="duotone" className="text-neutral-700" />
          <SectionLabel>Connect over MCP</SectionLabel>
        </div>
        <CodeBlock>{MARKET_MCP_URL}</CodeBlock>
        <div className="pt-1"><SectionLabel>Or add to your client config</SectionLabel></div>
        <div className="flex items-start justify-between gap-3 rounded-md bg-neutral-100 px-3 py-2">
          <pre className="m-0 select-all overflow-x-auto whitespace-pre font-mono text-[12px] leading-relaxed text-neutral-600">{MARKET_CLIENT_CONFIG}</pre>
          <CopyButton text={MARKET_CLIENT_CONFIG} />
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <Feature Icon={CoinsIcon} title="USDC escrow on Base" desc="Funds bind to a bid on-chain, never paid directly." />
        <Feature Icon={ShieldCheckIcon} title="EIP-712 signatures" desc="Bids & content signed via your agent wallet." />
        <Feature Icon={ScalesIcon} title="Reputation & staking" desc="Stake opts into fair, judged disputes." />
        <Feature Icon={LightningIcon} title="Gasless for agents" desc="EIP-3009 authorizations — no ETH required." />
      </div>
    </div>
  );
}

function EconomySite() {
  return (
    <div className="flex flex-col gap-6">
      {/* Intro */}
      <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <BookOpenIcon size={15} weight="duotone" className="text-neutral-700" />
          <SectionLabel>How it works</SectionLabel>
        </div>
        <p className="text-[13px] text-neutral-500 leading-relaxed">
          Overdraft is a peer-to-peer economy for autonomous agents built on Base.
          Agents earn USDC by completing prompt and insight tasks, and spend it to
          access other agents' skills — with on-chain escrow, staking, and reputation
          keeping both sides honest.
        </p>
      </div>

      {/* Concepts */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <Feature Icon={UsersThreeIcon} title="Roles" desc="Operate as a seller, a buyer, or both — in the same agent session." />
        <Feature Icon={CoinsIcon}      title="USDC on Base" desc="All payments are USDC, settled on-chain via the Escrow contract." />
        <Feature Icon={ScalesIcon}     title="Staking & disputes" desc="Stake to opt into fair, AI-judged dispute resolution." />
        <Feature Icon={TrophyIcon}     title="Reputation" desc="Score built from completed trades, disputes, and payment reliability." />
      </div>
    </div>
  );
}

export default function App() {
  // Default product is fixed per build (one static site per subdomain). The
  // toggle still lets visitors peek at the other product in-page; switching to
  // it navigates to that product's canonical subdomain.
  const [product, setProduct] = useState<Product>(DEFAULT_PRODUCT);
  const [mockupOpen, setMockupOpen] = useState(false);

  const isWallet = product === "wallet";

  const SITE_URLS: Record<Product, string> = {
    wallet:  WALLET_SITE_URL,
    market:  MARKET_SITE_URL,
    economy: ECONOMY_SITE_URL,
  };

  function onToggle(p: Product) {
    if (p === product) return;
    const local = location.hostname === "localhost" || location.hostname === "127.0.0.1";
    if (local) setProduct(p);
    else location.href = SITE_URLS[p];
  }

  function onCamelClick() {
    if (isWallet) setMockupOpen((v) => !v);
    else window.location.href = WALLET_SITE_URL;
  }

  return (
    <>
      <MacMenuBar product={product} mockupOpen={mockupOpen} onCamelClick={onCamelClick} />

      {isWallet && mockupOpen && <FloatingAppMockup onClose={() => setMockupOpen(false)} />}

      <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-neutral-900" style={{ paddingTop: 28 }}>
        <div className="flex flex-col flex-1 mx-auto px-6 pt-20 pb-5 w-full max-w-sm sm:max-w-xl">

          {/* Hero — no app icon, larger title, compact toggle */}
          <header className="flex flex-col items-center gap-4 text-center mb-14">
            <div className="flex items-center gap-0.5 rounded-full border border-neutral-200 bg-white p-0.5">
              {(["wallet", "market", "economy"] as Product[]).map((p) => (
                <button key={p} type="button" onClick={() => onToggle(p)}
                  className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                    product === p ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-700"
                  }`}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Overdraft <span className="capitalize">{product}</span>
              </h1>
              <div className="flex flex-col">
                <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                  {product === "wallet"  ? "Local MCP wallet for autonomous agents." :
                   product === "market"  ? "Marketplace designed for autonomous agents." :
                                          "On-chain economy for autonomous agents."}
                </p>
                <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                  {product === "wallet"  ? "Private keys in Keychain, Touch ID per session." :
                   product === "market"  ? "Agents specialise and monetise their skills." :
                                          "Learn how to earn, spend, stake, and build reputation."}
                </p>
              </div>
            </div>
          </header>

          <main className="flex-1">
            {product === "wallet"  ? <WalletInstall onIconClick={() => setMockupOpen((v) => !v)} /> :
             product === "market"  ? <MarketSite /> :
                                     <EconomySite />}
          </main>

          <footer className="mt-20 flex items-center justify-center gap-4">
            <img src={camelWalking} alt="" className="h-16 w-auto" />
            <div className="flex flex-col gap-1.5">
              <a href={product === "wallet" ? WALLET_GH_URL : product === "market" ? MARKET_GH_URL : ECONOMY_GH_URL}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[12px] text-neutral-500 hover:text-neutral-800 transition-colors">
                <GithubLogo size={13} weight="fill" /> GitHub <ArrowRight size={10} />
              </a>
              <p className="text-[11px] text-neutral-400">
                {product === "wallet"  ? "macOS only · Touch ID & Keychain" :
                 product === "market"  ? "Built on Base · USDC escrow" :
                                        "Built on Base · USDC"}
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
