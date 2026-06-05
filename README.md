# overdraft-web

Marketing sites for **Overdraft Wallet** and **Overdraft Market** — one React/Vite
codebase, built into a separate static site per product so each can be pointed at
its own subdomain.

| Product | Default subdomain | Source of truth |
|---|---|---|
| Wallet  | `wallet.overdraft.xyz` (currently `agents.overdraft.xyz`) | this repo |
| Market  | `market.overdraft.xyz` | this repo |

Both products live in `src/App.tsx` behind a `Product` toggle and share one design
system (Inter + JetBrains Mono, neutral palette, Phosphor icons, Tailwind v4).

## Build

```bash
npm install
npm run build          # → dist/wallet and dist/market (two static sites)
npm run build:wallet   # → dist/wallet only
npm run build:market   # → dist/market only
```

Each `dist/<product>` is a self-contained static site you can deploy to any static
host / CDN and point at the matching subdomain.

### How per-product builds work

`scripts/build.mjs` runs `vite build` once per product with `VITE_*` env vars:

- `VITE_PRODUCT` — the default product baked into the bundle (`wallet` | `market`).
  The in-page toggle still lets visitors switch; on a deployed site it navigates to
  the other product's subdomain (`VITE_WALLET_URL` / `VITE_MARKET_URL`).
- `VITE_TITLE` / `VITE_DESCRIPTION` — fill the `%VITE_*%` placeholders in `index.html`.

Override cross-links at build time, e.g.:

```bash
VITE_WALLET_URL=https://wallet.overdraft.xyz \
VITE_MARKET_URL=https://market.overdraft.xyz \
npm run build
```

## Market site + the MCP service share one origin

`market.overdraft.xyz/mcp` is the marketplace **MCP web service** (the
[overdraft-marketplace](https://github.com/overdraft-protocol/overdraft-marketplace)
Node server). That origin must keep serving `/mcp`, so the market homepage is served
by the **same** server from its `public/` directory rather than a separate static host.

This repo is consumed as a **git submodule** of `overdraft-marketplace`. Building
and publishing the market homepage is done from the marketplace repo:

```bash
# in overdraft-marketplace/
git submodule update --init   # first time only
npm run build:site            # builds dist/market → copies to public/
```

The marketplace server then serves the site at `/` and the MCP service at `/mcp` on
the same origin — no reverse proxy needed. On Render this is handled automatically
by the marketplace's build command.

The wallet site has no such constraint; deploy `dist/wallet` to any static host.

## Dev

```bash
npm run dev
```

**Cross-subdomain testing** (mockup cookies, product navigation — mirrors production):

- http://wallet.lvh.me:5174
- http://market.lvh.me:5174
- http://economy.lvh.me:5174

`lvh.me` resolves to 127.0.0.1 and supports shared cookies across subdomains (browsers reject `domain=localhost` on `*.localhost`).

Open the wallet mockup on one subdomain, switch products via the toggle, and it should stay open in the same position on the next subdomain.

`localhost` and `*.localhost` redirect to the matching `*.lvh.me` host.
