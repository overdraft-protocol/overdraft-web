import { useState } from "react";
import { CaretDownIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { DOWNLOADS } from "../../config";
import { CodeBlock } from "../ui/CodeBlock";
import { AppIconBlock } from "./AppIconBlock";
import { CliMockup } from "./CliMockup";

export function WalletInstall({ onIconClick }: { onIconClick?: () => void }) {
  const [cliExpanded, setCliExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-10">

      {/* ── Row 1: app icon + macOS download (vertically centered) ── */}
      <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6 sm:gap-8">
        <AppIconBlock onClick={onIconClick} />
        <div className="flex flex-col gap-2 flex-1 min-w-0 w-full sm:w-auto">
          <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-neutral-800">Install macOS app</span>
                <span className="text-[11px] text-neutral-400">Touch ID &amp; Keychain</span>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <a href={DOWNLOADS.silicon} download
                  className="flex shrink-0 items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-neutral-700 active:scale-[0.99]">
                  <DownloadSimpleIcon size={11} weight="bold" /> Silicon
                </a>
                <a href={DOWNLOADS.intel} download
                  className="flex shrink-0 items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.99]">
                  <DownloadSimpleIcon size={11} weight="bold" /> Intel
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-neutral-100" />
        <span className="text-[11px] text-neutral-300">or</span>
        <div className="h-px flex-1 bg-neutral-100" />
      </div>

      {/* ── Row 2: terminal + CLI downloads ── */}
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 sm:gap-8">
        <CliMockup />
        <div className="flex flex-col gap-3 flex-1 min-w-0 w-full sm:w-auto">
          <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-neutral-800">CLI macOS package</span>
                <span className="text-[11px] text-neutral-400">Touch ID &amp; Keychain.</span>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <a href={DOWNLOADS.pkgSilicon} download
                  className="flex shrink-0 items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-neutral-700 active:scale-[0.99]">
                  <DownloadSimpleIcon size={11} weight="bold" /> Silicon
                </a>
                <a href={DOWNLOADS.pkgIntel} download
                  className="flex shrink-0 items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.99]">
                  <DownloadSimpleIcon size={11} weight="bold" /> Intel
                </a>
              </div>
            </div>
            <button type="button" onClick={() => setCliExpanded((v) => !v)}
              className="flex w-fit items-center gap-1 text-[11px] text-neutral-300 hover:text-neutral-500 transition-colors cursor-pointer">
              <CaretDownIcon size={9} weight="bold" className={`transition-transform duration-200 ${cliExpanded ? "rotate-180" : ""}`} />
              Manual install steps
            </button>
            {cliExpanded && (
              <div className="flex flex-col gap-1.5 pt-2 border-t border-neutral-100">
                <p className="text-[11px] text-neutral-400 pb-0.5">Add to PATH after installing:</p>
                <CodeBlock>export PATH="$HOME/.overdraft-wallet/bin:$PATH"</CodeBlock>
                <CodeBlock>overdraft-wallet agent-config --install --client cursor</CodeBlock>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-neutral-200 px-4 py-3">
            <span className="font-mono text-[11px] text-neutral-300 truncate">
              brew install overdraft-protocol/tap/overdraft-wallet-cli
            </span>
            <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
              Soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
