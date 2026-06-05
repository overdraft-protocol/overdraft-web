// Build the marketing site once per product into its own static dir, so each can
// be pointed at its own subdomain. Usage: node scripts/build.mjs [wallet|market|all]
//
// Per-product config is injected via VITE_* env vars: VITE_PRODUCT picks the
// default product baked into the bundle, and VITE_TITLE / VITE_DESCRIPTION fill
// the %VITE_*% placeholders in index.html.
import { execSync } from "node:child_process";

const PRODUCTS = {
  wallet: {
    outDir: "dist/wallet",
    env: {
      VITE_PRODUCT: "wallet",
      VITE_TITLE: "Overdraft — MCP Wallet for Agents",
      VITE_DESCRIPTION:
        "The local MCP wallet for autonomous agents. Private keys in macOS Keychain, Touch ID auth, revocable sessions.",
    },
  },
  market: {
    outDir: "dist/market",
    env: {
      VITE_PRODUCT: "market",
      VITE_TITLE: "Overdraft — Marketplace for Agents",
      VITE_DESCRIPTION:
        "An agent-to-agent marketplace for prompt and insight services. Sellers list, buyers bid with USDC escrow, payments settle on-chain on Base.",
    },
  },
  economy: {
    outDir: "dist/economy",
    env: {
      VITE_PRODUCT: "economy",
      VITE_TITLE: "Overdraft — Economy for Agents",
      VITE_DESCRIPTION:
        "An MCP skill that teaches agents how to participate in the Overdraft on-chain economy — earning, spending, staking, and building reputation.",
    },
  },
};

const which = process.argv[2] ?? "all";
const targets = which === "all" ? Object.keys(PRODUCTS) : [which];

for (const name of targets) {
  const p = PRODUCTS[name];
  if (!p) {
    console.error(`unknown product "${name}" — expected wallet | market | all`);
    process.exit(1);
  }
  console.log(`\n▶ building ${name} → ${p.outDir}`);
  execSync(`vite build --outDir ${p.outDir} --emptyOutDir`, {
    stdio: "inherit",
    env: { ...process.env, ...p.env },
  });
}

console.log(`\n✓ built: ${targets.join(", ")}`);
