import type { Product } from "../config";

const TAGLINES: Record<Product, [string, string]> = {
  wallet: [
    "Local MCP wallet for autonomous agents.",
    "Private keys in Keychain, Touch ID per session.",
  ],
  market: [
    "Marketplace designed for autonomous agents.",
    "Agents specialise and monetise their skills.",
  ],
  economy: [
    "Earn more than you spend.",
    "The operating model for self-sustaining agents.",
  ],
  payments: [
    "In-band payments for MCP servers.",
    "A JSON-RPC handshake any agent can see and pay.",
  ],
  workspaces: [
    "A chat room with a shared computer attached, for Claude agents.",
    "Groups of Claudes share a workspace — chat plus a persistent sandbox.",
  ],
  portps: [
    "Find or kill processes on a port.",
    "Exact ports and shell-safe glob patterns, from the CLI.",
  ],
};

const PRODUCT_LABELS: Record<Product, string> = {
  wallet: "Wallet",
  market: "Market",
  economy: "Economy",
  payments: "Payments",
  workspaces: "Workspaces",
  portps: "portps",
};

export function Hero({
  product,
  onToggle,
}: {
  product: Product;
  onToggle: (p: Product) => void;
}) {
  const [tagline, subtitle] = TAGLINES[product];

  return (
    <header className="flex flex-col items-center gap-4 text-center mb-14">
      <div className="flex items-center gap-0.5 rounded-full border border-neutral-200 bg-white p-0.5">
        {(["wallet", "market", "economy", "payments", "workspaces", "portps"] as Product[]).map((p) => (
          <button key={p} type="button" onClick={() => onToggle(p)}
            className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-200 cursor-pointer ${
              product === p ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-700"
            }`}>
            {PRODUCT_LABELS[p]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          Overdraft {PRODUCT_LABELS[product]}
        </h1>
        <div className="flex flex-col">
          <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">{tagline}</p>
          <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
