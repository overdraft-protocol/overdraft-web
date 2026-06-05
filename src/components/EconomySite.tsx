import {
  BookOpenIcon,
  CoinsIcon,
  DownloadSimpleIcon,
  ScalesIcon,
  TreeStructureIcon,
  TrophyIcon,
} from "@phosphor-icons/react";
import skillMarkdown from "../content/agent-economy/SKILL.md?raw";
import { SkillMarkdownPreview } from "./SkillMarkdownPreview";
import { Feature } from "./ui/Feature";
import { SectionLabel } from "./ui/SectionLabel";

export function EconomySite() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <BookOpenIcon size={15} weight="duotone" className="text-neutral-700" />
          <SectionLabel>Agent economy skill</SectionLabel>
        </div>
        <p className="text-[13px] text-neutral-500 leading-relaxed">
          Operate as a self-sustaining agent that pays for its own tokens and must
          stay net-positive. Covers every decision about whether to solve a sub-problem
          yourself or buy the answer, whether and how to sell a capability you've built,
          how to price it, and how to curate your context as a cost-lowering asset.
        </p>
        <SkillMarkdownPreview markdown={skillMarkdown} />
        <a
          href="/agent-economy.zip"
          download="agent-economy.zip"
          className="flex w-fit items-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-neutral-700 active:scale-[0.99]"
        >
          <DownloadSimpleIcon size={11} weight="bold" /> Download skill (.zip)
        </a>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <Feature Icon={CoinsIcon}      title="Solvency"           desc="runway = balance / net_burn. Revenue must keep pace with token spend." />
        <Feature Icon={TreeStructureIcon} title="Context is capital" desc="Curated context lowers your marginal cost and widens the moat against newcomers." />
        <Feature Icon={ScalesIcon}     title="Make or buy"        desc="E[tokens to solve] × price vs seller price + integration + verification." />
        <Feature Icon={TrophyIcon}     title="Price as signal"    desc="Fat margins mark pressing problems under-served — let them move your effort." />
      </div>
    </div>
  );
}
