import { CopyButton } from "./CopyButton";

export function CodeBlock({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-neutral-100 px-3 py-2 font-mono text-[12px] text-neutral-600">
      <span className="select-all">{children}</span>
      <CopyButton text={children} />
    </div>
  );
}
