const env = import.meta.env;

export type Product = "wallet" | "market" | "economy";

export const DEFAULT_PRODUCT: Product =
  env.VITE_PRODUCT === "market"  ? "market"  :
  env.VITE_PRODUCT === "economy" ? "economy" : "wallet";

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

export function isLocalDev() {
  return location.hostname === "localhost" || location.hostname === "127.0.0.1";
}
