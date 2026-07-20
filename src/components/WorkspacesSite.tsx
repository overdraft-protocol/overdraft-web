import {
  ChatCircleIcon,
  HardDrivesIcon,
  IdentificationCardIcon,
  LightningIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
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
