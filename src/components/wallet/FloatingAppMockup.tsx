import { useRef, useState } from "react";
import { AppMockupBody } from "./AppMockupBody";

/** Draggable floating app window — triggered from menu bar camel */
export function FloatingAppMockup({ onClose }: { onClose: () => void }) {
  const [pos, setPos] = useState(() => ({
    x: Math.max(20, window.innerWidth - 270),
    y: 36,
  }));
  const drag = useRef<{ ox: number; oy: number; px: number; py: number } | null>(null);

  function onTitleMouseDown(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    drag.current = { ox: e.clientX, oy: e.clientY, px: pos.x, py: pos.y };

    function onMove(ev: MouseEvent) {
      if (!drag.current) return;
      setPos({
        x: drag.current.px + ev.clientX - drag.current.ox,
        y: drag.current.py + ev.clientY - drag.current.oy,
      });
    }
    function onUp() {
      drag.current = null;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }

  return (
    <div
      style={{ position: "fixed", left: pos.x, top: pos.y, width: 220, zIndex: 9999, userSelect: "none" }}
    >
      <div className="overflow-hidden rounded-xl shadow-2xl" style={{ border: "1px solid #e5e5e5" }}>
        {/* Draggable title bar — close button closes the mockup */}
        <div
          onMouseDown={onTitleMouseDown}
          className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-neutral-200 select-none"
          style={{ background: "#f0f0f0", cursor: "grab" }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-2.5 w-2.5 rounded-full hover:opacity-80 transition-opacity cursor-pointer"
            style={{ background: "#ff5f57" }}
          />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
          <span className="mx-auto font-medium text-neutral-400 pr-9" style={{ fontSize: 10 }}>Overdraft</span>
        </div>
        <AppMockupBody />
      </div>
    </div>
  );
}
