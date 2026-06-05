import { useState } from "react";
import { CheckCircleIcon } from "@phosphor-icons/react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button type="button" onClick={copy}
      className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer select-none">
      {copied && <CheckCircleIcon size={11} weight="fill" className="text-emerald-500" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
