import {
  ArrowsLeftRightIcon,
  PackageIcon,
  PlugsConnectedIcon,
  ReceiptIcon,
  ShieldCheckIcon,
  StackIcon,
} from "@phosphor-icons/react";
import { PAYMENTS_NPM_PKG, PAYMENTS_NPM_URL } from "../config";
import { CodeBlock } from "./ui/CodeBlock";
import { Feature } from "./ui/Feature";
import { SectionLabel } from "./ui/SectionLabel";

export function PaymentsSite() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <PackageIcon size={15} weight="duotone" className="text-neutral-700" />
          <SectionLabel>Install the extension</SectionLabel>
        </div>
        <CodeBlock>{`npm install ${PAYMENTS_NPM_PKG}`}</CodeBlock>
        <p className="text-[11px] leading-relaxed text-neutral-400">
          MPX is a transport-safe, in-band payment handshake for MCP servers. All
          signaling lives in JSON-RPC <span className="font-mono">_meta</span> fields under{" "}
          <span className="font-mono">mpx/v1.*</span> — no HTTP headers, no status
          codes — so it works identically over stdio and Streamable HTTP and is
          visible to any MCP-capable agent.
        </p>
        <a
          href={PAYMENTS_NPM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.99]"
        >
          <PackageIcon size={11} weight="bold" /> View on npm
        </a>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <Feature Icon={PlugsConnectedIcon} title="In-band over JSON-RPC" desc="Challenges, authorizations & receipts ride in _meta — never swallowed by the transport." />
        <Feature Icon={ArrowsLeftRightIcon} title="Challenge → authorize → settle" desc="Server challenges, agent re-issues the same call signed, server verifies then settles." />
        <Feature Icon={StackIcon} title="Rail-agnostic core" desc="Pluggable settlement rails: x402-evm, Stripe, or your own. Core stays rail-free." />
        <Feature Icon={ShieldCheckIcon} title="Verify before settle" desc="Authorizations verify before the handler runs. Money never moves on an invalid request." />
        <Feature Icon={ReceiptIcon} title="Single-use receipts" desc="Each paymentRequestId is consumed only on success; replays after settlement are rejected." />
        <Feature Icon={PackageIcon} title="Drop-in wrapper" desc="withPayment() wraps any MCP tool handler — no marketplace wiring changes." />
      </div>
    </div>
  );
}
