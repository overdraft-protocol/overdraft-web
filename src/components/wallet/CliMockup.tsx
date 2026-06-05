/** Terminal mock of the CLI */
export function CliMockup() {
  const lines = [
    { prompt: true,  text: "overdraft-wallet" },
    { prompt: false, text: "● daemon running" },
    { prompt: false, text: "" },
    { prompt: true,  text: "overdraft-wallet agent-config --install --client cursor" },
    { prompt: false, text: "✓ Cursor configured" },
  ];
  return (
    <div className="select-none shrink-0" style={{ width: 220 }}>
      <div className="overflow-hidden rounded-xl shadow-xl" style={{ border: "1px solid #e5e5e5" }}>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-neutral-200" style={{ background: "#f0f0f0" }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
          <span className="mx-auto font-medium text-neutral-400 pr-9" style={{ fontSize: 10 }}>Terminal</span>
        </div>
        <div className="flex flex-col gap-0.5 px-3 py-3 font-mono" style={{ background: "#1c1c1e", fontSize: 10.5 }}>
          {lines.map((line, i) =>
            line.text === "" ? <div key={i} style={{ height: 5 }} /> : (
              <div key={i} className="flex items-start gap-1.5 leading-relaxed">
                <span style={{ color: line.prompt ? "#34d399" : "transparent", userSelect: "none" }}>❯</span>
                <span style={{ color: line.prompt ? "#e5e5e5" : line.text.startsWith("✓") ? "#34d399" : "#606060" }}>
                  {line.text}
                </span>
              </div>
            )
          )}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span style={{ color: "#34d399" }}>❯</span>
            <span className="animate-pulse inline-block" style={{ width: 5, height: 11, background: "#525252" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
