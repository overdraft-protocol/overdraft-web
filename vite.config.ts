import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const DEV_PORT = 5174;
const DEV_HOST_SUFFIX = "lvh.me";
const DEV_PRODUCTS = ["wallet", "market", "economy", "payments"] as const;

/** Print *.lvh.me URLs when the dev server starts. */
function devSubdomainUrls(): PluginOption {
  return {
    name: "dev-subdomain-urls",
    configureServer(server) {
      server.httpServer?.once("listening", () => {
        const addr = server.httpServer?.address();
        const port = typeof addr === "object" && addr ? addr.port : DEV_PORT;
        for (const product of DEV_PRODUCTS) {
          console.log(`  ➜  ${product.padEnd(7)} http://${product}.${DEV_HOST_SUFFIX}:${port}/`);
        }
      });
    },
  };
}

const plugins = [react(), tailwindcss(), devSubdomainUrls()].flat() as PluginOption[];

export default defineConfig({
  plugins,
  server: {
    port: DEV_PORT,
    host: true,
    allowedHosts: [".lvh.me", "lvh.me", ".localhost", "localhost", "127.0.0.1"],
  },
  preview: {
    allowedHosts: [
      "wallet.overdraft.xyz",
      "market.overdraft.xyz",
      "economy.overdraft.xyz",
      "payments.overdraft.xyz",
      "agents.overdraft.xyz",
      "overdraft-mcp-wallet.onrender.com",
      ".lvh.me",
      "lvh.me",
      ".localhost",
      "localhost",
    ],
  },
});
