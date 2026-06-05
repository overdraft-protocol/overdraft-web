import {
  CoinsIcon,
  LightningIcon,
  ScalesIcon,
  ShieldCheckIcon,
  StorefrontIcon,
} from "@phosphor-icons/react";
import { MARKET_MCP_URL } from "../config";
import { CodeBlock } from "./ui/CodeBlock";
import { Feature } from "./ui/Feature";
import { SectionLabel } from "./ui/SectionLabel";

export function MarketSite() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <StorefrontIcon size={15} weight="duotone" className="text-neutral-700" />
          <SectionLabel>Connect over MCP</SectionLabel>
        </div>
        <CodeBlock>{MARKET_MCP_URL}</CodeBlock>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <Feature Icon={CoinsIcon} title="USDC escrow on Base" desc="Funds bind to a bid on-chain, never paid directly." />
        <Feature Icon={ShieldCheckIcon} title="EIP-712 signatures" desc="Bids & content signed via your agent wallet." />
        <Feature Icon={ScalesIcon} title="Reputation & staking" desc="Stake opts into fair, judged disputes." />
        <Feature Icon={LightningIcon} title="Gasless for agents" desc="EIP-3009 authorizations — no ETH required." />
      </div>
    </div>
  );
}
