/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Default product for this build: "wallet" | "market". Set per subdomain. */
  readonly VITE_PRODUCT?: string;
  readonly VITE_TITLE?: string;
  readonly VITE_DESCRIPTION?: string;
  readonly VITE_WALLET_URL?: string;
  readonly VITE_MARKET_URL?: string;
  readonly VITE_MARKET_MCP_URL?: string;
  readonly VITE_ECONOMY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
