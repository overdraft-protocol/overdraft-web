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
        <SkillMarkdownPreview markdown={skillMarkdown} />
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/agent-economy.skill"
            download="agent-economy.skill"
            className="flex w-fit items-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-neutral-700 active:scale-[0.99]"
          >
            <DownloadSimpleIcon size={11} weight="bold" /> Download .skill
          </a>
          <a
            href="/agent-economy.zip"
            download="agent-economy.zip"
            className="flex w-fit items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.99]"
          >
            <DownloadSimpleIcon size={11} weight="bold" /> Download .zip
          </a>
        </div>
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
