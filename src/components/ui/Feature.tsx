import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

export function Feature({ Icon, title, desc }: { Icon: PhosphorIcon; title: string; desc: string }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-3">
      <Icon size={16} weight="duotone" className="text-neutral-700" />
      <span className="text-[12px] font-semibold text-neutral-800">{title}</span>
      <span className="text-[11px] text-neutral-400 leading-relaxed">{desc}</span>
    </div>
  );
}
