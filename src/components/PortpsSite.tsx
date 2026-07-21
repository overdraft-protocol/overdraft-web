import {
  AsteriskIcon,
  GithubLogoIcon,
  MagnifyingGlassIcon,
  PackageIcon,
  PuzzlePieceIcon,
  SkullIcon,
  StackIcon,
  TerminalIcon,
} from "@phosphor-icons/react";
import skillMarkdown from "../content/portps/SKILL.md?raw";
import { PORTPS_GH_URL, PORTPS_NPM_PKG, PORTPS_NPM_URL } from "../config";
import { SkillMarkdownPreview } from "./SkillMarkdownPreview";
import { CodeBlock } from "./ui/CodeBlock";
import { Feature } from "./ui/Feature";
import { SectionLabel } from "./ui/SectionLabel";

export function PortpsSite() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <TerminalIcon size={15} weight="duotone" className="text-neutral-700" />
          <SectionLabel>Install the CLI</SectionLabel>
        </div>
        <CodeBlock>{`npm install -g ${PORTPS_NPM_PKG}`}</CodeBlock>
        <p className="text-[11px] leading-relaxed text-neutral-400">
          portps finds or kills processes listening on TCP ports. Match an exact
          port or a shell-safe glob (<span className="font-mono">91%</span> for
          "starts with 91", <span className="font-mono">9___</span> for "9 plus
          three more chars") — no quoting gymnastics, works the same in bash and
          zsh.
        </p>
        <a
          href={PORTPS_NPM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.99]"
        >
          <PackageIcon size={11} weight="bold" /> View on npm
        </a>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <Feature Icon={MagnifyingGlassIcon} title="Find by port" desc="Look up whatever process is bound to a port before you go hunting with lsof." />
        <Feature Icon={SkullIcon} title="Kill with -k" desc="Kill the listener on a port, or every listener matching a pattern, in one call." />
        <Feature Icon={AsteriskIcon} title="Shell-safe globs" desc="% and _ patterns need no quoting in bash or zsh — classic */?/[…] work too." />
        <Feature Icon={StackIcon} title="Bash or zsh" desc="Works with bash 3.2+ (macOS system bash) and zsh, no shell upgrade required." />
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <PuzzlePieceIcon size={15} weight="duotone" className="text-neutral-700" />
          <SectionLabel>Agent skill</SectionLabel>
        </div>
        <p className="text-[11px] leading-relaxed text-neutral-400">
          portps ships a Claude Code / Cursor skill so coding agents know when
          and how to run it — matching by port, killing listeners, and
          preferring shell-safe glob patterns.
        </p>

        <SkillMarkdownPreview markdown={skillMarkdown} />

        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-medium text-neutral-500">Claude Code</span>
          <CodeBlock>{`/plugin marketplace add overdraft-protocol/portps`}</CodeBlock>
          <CodeBlock>{`/plugin install portps@overdraft-portps`}</CodeBlock>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-medium text-neutral-500">Cursor</span>
          <p className="text-[11px] leading-relaxed text-neutral-400">
            Copy <span className="font-mono">.cursor/skills/portps/SKILL.md</span> from
            the repo into <span className="font-mono">~/.cursor/skills/portps/</span> for
            global use.
          </p>
        </div>
      </div>
    </div>
  );
}
