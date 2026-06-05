import { useRef, useState } from "react";
import { AppMockupBody } from "./AppMockupBody";

/** Draggable floating app window — triggered from menu bar camel */
export function FloatingAppMockup({
  pos,
  onPosChange,
  onClose,
}: {
  pos: { x: number; y: number };
  onPosChange: (pos: { x: number; y: number }) => void;
  onClose: () => void;
}) {
  const [dragging, setDragging] = useState<{ x: number; y: number } | null>(null);
  const drag = useRef<{ ox: number; oy: number; px: number; py: number } | null>(null);
  const view = dragging ?? pos;

  function onTitleMouseDown(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    drag.current = { ox: e.clientX, oy: e.clientY, px: view.x, py: view.y };

    let latest = { x: view.x, y: view.y };

    function onMove(ev: MouseEvent) {
      if (!drag.current) return;
      latest = {
        x: drag.current.px + ev.clientX - drag.current.ox,
        y: drag.current.py + ev.clientY - drag.current.oy,
      };
      setDragging(latest);
    }
    function onUp() {
      onPosChange(latest);
      drag.current = null;
      setDragging(null);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }

  return (
    <div
      style={{ position: "fixed", left: view.x, top: view.y, width: 220, zIndex: 9999, userSelect: "none" }}
    >
      <div className="overflow-hidden rounded-xl shadow-2xl" style={{ border: "1px solid #e5e5e5" }}>
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
