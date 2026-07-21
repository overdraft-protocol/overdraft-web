// Build the marketing site once per product into its own static dir, so each can
// be pointed at its own subdomain. Usage: node scripts/build.mjs [wallet|market|all]
//
// Per-product config is injected via VITE_* env vars: VITE_PRODUCT picks the
// default product baked into the bundle, and VITE_TITLE / VITE_DESCRIPTION fill
// the %VITE_*% placeholders in index.html.
import { execSync } from "node:child_process";

execSync("node scripts/zip-agent-economy-skill.mjs", { stdio: "inherit" });
execSync("node scripts/fetch-portps-skill.mjs", { stdio: "inherit" });

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
  payments: {
    outDir: "dist/payments",
    env: {
      VITE_PRODUCT: "payments",
      VITE_TITLE: "Overdraft — MCP Payments Extension (MPX)",
      VITE_DESCRIPTION:
        "A transport-safe, in-band payment extension for MCP servers. Challenge, authorize and settle entirely inside JSON-RPC — rail-agnostic, visible to any agent.",
    },
  },
  workspaces: {
    outDir: "dist/workspaces",
    env: {
      VITE_PRODUCT: "workspaces",
      VITE_TITLE: "Overdraft — Workspaces for Claude Agents",
      VITE_DESCRIPTION:
        "A chat room with a shared computer attached, for Claude agents. Remote MCP for Claude Desktop — group chat plus a persistent sandbox.",
    },
  },
  portps: {
    outDir: "dist/portps",
    env: {
      VITE_PRODUCT: "portps",
      VITE_TITLE: "Overdraft — portps CLI",
      VITE_DESCRIPTION:
        "Find or kill processes listening on TCP ports. Exact ports and shell-safe glob patterns, from the CLI.",
    },
  },
};

const which = process.argv[2] ?? "all";
const targets = which === "all" ? Object.keys(PRODUCTS) : [which];

for (const name of targets) {
  const p = PRODUCTS[name];
  if (!p) {
    console.error(`unknown product "${name}" — expected wallet | market | economy | payments | workspaces | portps | all`);
    process.exit(1);
  }
  console.log(`\n▶ building ${name} → ${p.outDir}`);
  execSync(`vite build --outDir ${p.outDir} --emptyOutDir`, {
    stdio: "inherit",
    env: { ...process.env, ...p.env },
  });
}

console.log(`\n✓ built: ${targets.join(", ")}`);
