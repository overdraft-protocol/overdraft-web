const env = import.meta.env;

export type Product = "wallet" | "market" | "economy" | "payments" | "workspaces" | "portps";

/** Dev host suffix — lvh.me resolves to 127.0.0.1 and supports cross-subdomain cookies. */
export const DEV_HOST_SUFFIX = "lvh.me";

const DEV_SUBDOMAIN_PRODUCT: Record<string, Product> = {
  [`wallet.${DEV_HOST_SUFFIX}`]: "wallet",
  [`market.${DEV_HOST_SUFFIX}`]: "market",
  [`economy.${DEV_HOST_SUFFIX}`]: "economy",
  [`payments.${DEV_HOST_SUFFIX}`]: "payments",
  [`workspaces.${DEV_HOST_SUFFIX}`]: "workspaces",
  [`portps.${DEV_HOST_SUFFIX}`]: "portps",
};

const LEGACY_DEV_HOST: Record<string, Product> = {
  localhost: "wallet",
  "127.0.0.1": "wallet",
  "wallet.localhost": "wallet",
  "market.localhost": "market",
  "economy.localhost": "economy",
  "payments.localhost": "payments",
  "workspaces.localhost": "workspaces",
  "portps.localhost": "portps",
};

/** Product inferred from wallet.lvh.me / market.lvh.me / economy.lvh.me / payments.lvh.me / workspaces.lvh.me / portps.lvh.me. */
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
  (env.VITE_PRODUCT === "market"     ? "market"     :
   env.VITE_PRODUCT === "economy"    ? "economy"    :
   env.VITE_PRODUCT === "payments"   ? "payments"   :
   env.VITE_PRODUCT === "workspaces" ? "workspaces" :
   env.VITE_PRODUCT === "portps"     ? "portps"     : "wallet");

/** Sibling-product URL in dev, derived from the live origin (e.g. payments.lvh.me:5174).
 *  Deriving from the host means a newly added product can never fall through to a
 *  production URL in dev — there's no per-product env var to forget. */
function devSiteUrl(p: Product): string {
  const { protocol, port } = location;
  return `${protocol}//${p}.${DEV_HOST_SUFFIX}${port ? `:${port}` : ""}`;
}

const PROD_SITE_URLS: Record<Product, string> = {
  wallet:     env.VITE_WALLET_URL     ?? "https://wallet.overdraft.xyz",
  market:     env.VITE_MARKET_URL     ?? "https://market.overdraft.xyz",
  economy:    env.VITE_ECONOMY_URL    ?? "https://economy.overdraft.xyz",
  payments:   env.VITE_PAYMENTS_URL   ?? "https://payments.overdraft.xyz",
  workspaces: env.VITE_WORKSPACES_URL ?? "https://workspaces.overdraft.xyz",
  portps:     env.VITE_PORTPS_URL     ?? "https://portps.overdraft.xyz",
};

export const SITE_URLS: Record<Product, string> = env.DEV
  ? {
      wallet:     devSiteUrl("wallet"),
      market:     devSiteUrl("market"),
      economy:    devSiteUrl("economy"),
      payments:   devSiteUrl("payments"),
      workspaces: devSiteUrl("workspaces"),
      portps:     devSiteUrl("portps"),
    }
  : PROD_SITE_URLS;

export const MARKET_MCP_URL = env.VITE_MARKET_MCP_URL ?? `${SITE_URLS.market}/mcp`;
export const WORKSPACES_MCP_URL = env.VITE_WORKSPACES_MCP_URL ?? `${SITE_URLS.workspaces}/mcp`;

/** Anthropic's documented deep link that opens claude.ai's "Add custom connector" dialog
 *  with the name/URL prefilled — the user still reviews and confirms before anything
 *  connects. See https://claude.com/docs/connectors/building/directory-vs-custom. */
export const ADD_TO_CLAUDE_URL =
  "https://claude.ai/customize/connectors?modal=add-custom-connector" +
  `&connectorName=${encodeURIComponent("Overdraft Workspaces")}` +
  `&connectorUrl=${encodeURIComponent(WORKSPACES_MCP_URL)}`;

export const WALLET_GH_URL   = "https://github.com/overdraft-protocol/overdraft-mcp-wallet";
export const MARKET_GH_URL   = "https://github.com/overdraft-protocol/overdraft-marketplace";
export const PAYMENTS_GH_URL = "https://github.com/overdraft-protocol/mcp-payments";
export const PORTPS_GH_URL   = "https://github.com/overdraft-protocol/portps";

/** npm package name for the MCP payments extension (MPX). */
export const PAYMENTS_NPM_PKG = "@overdraft-protocol/mpx";
export const PAYMENTS_NPM_URL = `https://www.npmjs.com/package/${PAYMENTS_NPM_PKG}`;

/** npm package name for the portps CLI. */
export const PORTPS_NPM_PKG = "@overdraft-protocol/portps";
export const PORTPS_NPM_URL = `https://www.npmjs.com/package/${PORTPS_NPM_PKG}`;

const VERSION = "0.1.0";
const GH_RELEASE_BASE = `https://github.com/overdraft-protocol/overdraft-mcp-wallet/releases/download`;

export const DOWNLOADS = {
  silicon:    `${GH_RELEASE_BASE}/v${VERSION}/Overdraft_${VERSION}_aarch64.dmg`,
  intel:      `${GH_RELEASE_BASE}/v${VERSION}/Overdraft_${VERSION}_x86_64.dmg`,
  pkgSilicon: `${GH_RELEASE_BASE}/v${VERSION}/Overdraft-CLI-${VERSION}-aarch64.pkg`,
  pkgIntel:   `${GH_RELEASE_BASE}/v${VERSION}/Overdraft-CLI-${VERSION}-x86_64.pkg`,
};
