import {
  KeyholeIcon,
  LegoSmileyIcon,
  LockKeyIcon,
  PlugsIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import { claudeIcon, cursorIcon } from "../../assets";

/** Inner content of the app mockup — shared between inline and floating versions */
export function AppMockupBody() {
  return (
    <div className="flex flex-col bg-white" style={{ height: 388 }}>
      {/* Dock bar */}
      <div className="flex shrink-0 justify-center px-3 pt-2">
        <div className="flex items-center gap-3 rounded-full px-3 py-1.5"
          style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.08)" }}>
          {[
            { Icon: LegoSmileyIcon, active: true },
            { Icon: KeyholeIcon,    active: false },
            { Icon: PlugsIcon,      active: false },
            { Icon: LockKeyIcon,    active: false },
          ].map(({ Icon, active }, i) => (
            <Icon key={i} size={11} weight={active ? "fill" : "regular"} color={active ? "#1a1a1a" : "#a3a3a3"} />
          ))}
        </div>
      </div>

      {/* Agent sessions */}
      <div className="flex-1 min-h-0 px-3.5 pt-2.5">
        <p className="mb-1.5 px-0.5 font-semibold uppercase"
          style={{ fontSize: 7.5, color: "#a3a3a3", letterSpacing: "0.1em" }}>
          Active · 2
        </p>
        <div className="overflow-hidden rounded-xl" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
          {[
            { icon: claudeIcon, name: "Claude Code", count: "24 interactions", ago: "2m ago",  dot: "#34d399" },
            { icon: cursorIcon, name: "Cursor",       count: "8 interactions",  ago: "14m ago", dot: "#059669" },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-2 px-2.5 py-2"
              style={{ borderBottom: i === 0 ? "1px solid rgba(0,0,0,0.06)" : undefined }}>
              <div className="relative shrink-0">
                <img src={row.icon} alt="" className="rounded-lg"
                  style={{ width: 24, height: 24, objectFit: "contain" }} />
                <span className="absolute rounded-full"
                  style={{ width: 6, height: 6, bottom: -1, right: -1, background: row.dot, border: "1.5px solid white" }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium" style={{ fontSize: 9.5, color: "#171717" }}>{row.name}</p>
                <p className="truncate" style={{ fontSize: 8, color: "#a3a3a3" }}>{row.count}</p>
              </div>
              <p style={{ fontSize: 8, color: "#a3a3a3" }}>{row.ago}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0" />

      {/* Wallet card */}
      <div className="shrink-0 px-3 pb-3">
        <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "1.8" }}>
          <div className="absolute inset-0" style={{ background: "oklch(0.147 0.004 49.25)" }} />
          <div className="absolute inset-0 opacity-45"
            style={{ background: "linear-gradient(45deg, rgb(212,248,240) 0%, transparent 45%)" }} />
          <div className="absolute inset-0 flex flex-col justify-between p-3">
            <div className="flex items-start justify-between">
              <span className="font-bold tracking-tight"
                style={{ fontSize: 9.5, color: "oklch(0.985 0.001 106.423)" }}>Overdraft.</span>
              <span className="rounded-full px-1.5 py-0.5 font-medium"
                style={{ fontSize: 6.5, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)" }}>ETH</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-0.5">
                <span style={{ fontSize: 7.5, color: "rgba(255,255,255,0.55)" }}>1.25 ETH</span>
                <span className="font-bold leading-none tracking-tight"
                  style={{ fontSize: 17, color: "oklch(0.985 0.001 106.423)" }}>$3,240</span>
              </div>
              <WalletIcon size={12} style={{ color: "oklch(0.985 0.001 106.423)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
