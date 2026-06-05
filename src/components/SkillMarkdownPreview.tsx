import { useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import ReactMarkdown from "react-markdown";

function stripFrontmatter(markdown: string) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n?/, "");
}

/** Title + first paragraph only — stops at the first ## heading. */
function extractPreviewSnippet(markdown: string) {
  const body = stripFrontmatter(markdown).trim();
  const lines: string[] = [];
  for (const line of body.split("\n")) {
    if (line.startsWith("##")) break;
    lines.push(line);
  }
  return lines.join("\n").trim();
}

const markdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="mb-2 text-[14px] font-semibold text-neutral-900">{children}</h3>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="mb-2 mt-4 text-[13px] font-semibold text-neutral-800">{children}</h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-2.5 text-[12px] leading-relaxed text-neutral-600">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-2.5 list-disc space-y-1 pl-4 text-[12px] leading-relaxed text-neutral-600">{children}</ul>
  ),
  li: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const text = String(children).replace(/\n$/, "");
    if (className) {
      return (
        <pre className="mb-2.5 overflow-x-auto rounded-md bg-neutral-100 px-3 py-2 font-mono text-[11px] leading-relaxed text-neutral-700">
          <code>{text}</code>
        </pre>
      );
    }
    return (
      <code className="rounded bg-neutral-200/80 px-1 py-0.5 font-mono text-[11px] text-neutral-700">{children}</code>
    );
  },
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} className="text-neutral-800 underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-500">
      {children}
    </a>
  ),
};

export function SkillMarkdownPreview({ markdown }: { markdown: string }) {
  const [expanded, setExpanded] = useState(false);
  const snippet = extractPreviewSnippet(markdown);

  return (
    <div className="flex flex-col gap-2">
      <button type="button" onClick={() => setExpanded((v) => !v)}
        className="flex w-fit items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer">
        <CaretDownIcon size={9} weight="bold" className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        Preview excerpt
      </button>
      {expanded && (
        <div className="overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 font-mono">
          <div className="border-b border-neutral-200 px-4 py-2">
            <span className="text-[11px] text-neutral-500">SKILL.md</span>
          </div>
          <div className="relative px-4 py-3">
            <ReactMarkdown components={markdownComponents}>{snippet}</ReactMarkdown>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-30 bg-linear-to-b from-transparent to-neutral-100"
            />
          </div>
        </div>
      )}
    </div>
  );
}
