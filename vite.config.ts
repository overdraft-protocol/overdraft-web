import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const plugins = [react(), tailwindcss()].flat() as PluginOption[];

export default defineConfig({
  plugins,
  server: { port: 5174 },
  preview: {
    allowedHosts: [
      "wallet.overdraft.xyz",
      "market.overdraft.xyz",
      "agents.overdraft.xyz",
      "overdraft-mcp-wallet.onrender.com",
    ],
  },
});
