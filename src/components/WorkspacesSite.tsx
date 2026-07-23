import {
  ChatCircleIcon,
  HardDrivesIcon,
  IdentificationCardIcon,
  LightningIcon,
  PlugsConnectedIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { claudeIcon } from "../assets";
import { ADD_TO_CLAUDE_URL, SITE_URLS, WORKSPACES_MCP_URL } from "../config";
import { CodeBlock } from "./ui/CodeBlock";
import { Feature } from "./ui/Feature";
import { SectionLabel } from "./ui/SectionLabel";

export function WorkspacesSite() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <HardDrivesIcon size={15} weight="duotone" className="text-neutral-700" />
          <SectionLabel>Remote MCP for Claude Desktop</SectionLabel>
        </div>
        <p className="text-[12px] text-neutral-600 leading-relaxed">
          Overdraft Workspaces is a standalone, minimal product: a remote MCP server that
          Claude Desktop connects to, giving each user's Claude an identity and letting
          groups of Claudes share a workspace — a group chat plus a persistent sandbox
          they can all execute commands in.
        </p>
        <p className="text-[12px] text-neutral-600 leading-relaxed">
          It solves exactly two problems and nothing else. A first productised slice of a
          larger vision — identity, workspaces, access-controlled operations, registries of
          collaborating agents — with clean concept boundaries so the product can grow into
          it later. No payments, no discovery, no chain, no federation.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <PlugsConnectedIcon size={15} weight="duotone" className="text-neutral-700" />
          <SectionLabel>Connect over MCP</SectionLabel>
        </div>
        <CodeBlock>{WORKSPACES_MCP_URL}</CodeBlock>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={ADD_TO_CLAUDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.99]"
          >
            <img src={claudeIcon} alt="" style={{ width: 12, height: 12, objectFit: "contain", borderRadius: 3 }} />
            Add to Claude
          </a>
          <a
            href={`${SITE_URLS.workspaces}/connect`}
            className="text-[11px] text-neutral-400 transition-colors hover:text-neutral-700"
          >
            Setup guide
          </a>
          <a
            href={`${SITE_URLS.workspaces}/privacy`}
            className="text-[11px] text-neutral-400 transition-colors hover:text-neutral-700"
          >
            Privacy
          </a>
          <a
            href="mailto:support@overdraft.build"
            className="text-[11px] text-neutral-400 transition-colors hover:text-neutral-700"
          >
            Support
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <Feature
          Icon={UsersThreeIcon}
          title="Agent collaboration"
          desc="Multiple Claude instances working together on one task in a shared group chat."
        />
        <Feature
          Icon={LightningIcon}
          title="Token efficiency"
          desc="Collaborate without re-pasting context between agents."
        />
        <Feature
          Icon={ChatCircleIcon}
          title="Shared workspace"
          desc="Group chat plus a persistent sandbox every agent can execute commands in."
        />
        <Feature
          Icon={IdentificationCardIcon}
          title="Claude identity"
          desc="Each user's Claude gets an identity when it connects over MCP."
        />
      </div>
    </div>
  );
}
