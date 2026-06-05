const env = import.meta.env;

export type Product = "wallet" | "market" | "economy";

/** Dev host suffix — lvh.me resolves to 127.0.0.1 and supports cross-subdomain cookies. */
export const DEV_HOST_SUFFIX = "lvh.me";

const DEV_SUBDOMAIN_PRODUCT: Record<string, Product> = {
  [`wallet.${DEV_HOST_SUFFIX}`]: "wallet",
  [`market.${DEV_HOST_SUFFIX}`]: "market",
  [`economy.${DEV_HOST_SUFFIX}`]: "economy",
};

const LEGACY_DEV_HOST: Record<string, Product> = {
  localhost: "wallet",
  "127.0.0.1": "wallet",
  "wallet.localhost": "wallet",
  "market.localhost": "market",
  "economy.localhost": "economy",
};

/** Product inferred from wallet.lvh.me / market.lvh.me / economy.lvh.me. */
export function devProductFromHostname(): Product | null {
  return DEV_SUBDOMAIN_PRODUCT[location.hostname] ?? null;
}

export function isDevSubdomain() {
  return devProductFromHostname() !== null;
}

/** Redirect localhost / *.localhost to the matching *.lvh.me host. */
export function redirectToDevHost() {
  const { hostname, port, pathname, search } = location;
  if (DEV_SUBDOMAIN_PRODUCT[hostname]) return;
  const product = LEGACY_DEV_HOST[hostname];
  if (!product) return;
  const p = port ? `:${port}` : "";
  location.replace(`http://${product}.${DEV_HOST_SUFFIX}${p}${pathname}${search}`);
}

// Which product this page shows — subdomain hostname in dev, VITE_PRODUCT in prod builds.
export const DEFAULT_PRODUCT: Product =
  devProductFromHostname() ??
  (env.VITE_PRODUCT === "market"  ? "market"  :
   env.VITE_PRODUCT === "economy" ? "economy" : "wallet");

export const WALLET_SITE_URL  = env.VITE_WALLET_URL  ?? "https://wallet.overdraft.xyz";
export const MARKET_SITE_URL  = env.VITE_MARKET_URL  ?? "https://market.overdraft.xyz";
export const ECONOMY_SITE_URL = env.VITE_ECONOMY_URL ?? "https://economy.overdraft.xyz";

export const MARKET_MCP_URL = env.VITE_MARKET_MCP_URL ?? `${MARKET_SITE_URL}/mcp`;

export const WALLET_GH_URL  = "https://github.com/overdraft-protocol/overdraft-mcp-wallet";
export const MARKET_GH_URL  = "https://github.com/overdraft-protocol/overdraft-marketplace";

const VERSION = "0.1.0";
const GH_RELEASE_BASE = `https://github.com/overdraft-protocol/overdraft-mcp-wallet/releases/download`;

export const DOWNLOADS = {
  silicon:    `${GH_RELEASE_BASE}/v${VERSION}/Overdraft_${VERSION}_aarch64.dmg`,
  intel:      `${GH_RELEASE_BASE}/v${VERSION}/Overdraft_${VERSION}_x86_64.dmg`,
  pkgSilicon: `${GH_RELEASE_BASE}/v${VERSION}/Overdraft-CLI-${VERSION}-aarch64.pkg`,
  pkgIntel:   `${GH_RELEASE_BASE}/v${VERSION}/Overdraft-CLI-${VERSION}-x86_64.pkg`,
};

export const SITE_URLS: Record<Product, string> = {
  wallet:  WALLET_SITE_URL,
  market:  MARKET_SITE_URL,
  economy: ECONOMY_SITE_URL,
};
