import { appIcon } from "../../assets";

/** App icon block — 220px outer column (matches CliMockup width).
 *  Shows a 210×210px visible icon, cropping the transparent PNG padding.
 *  PNG padding: 21px left / 23px top / 21px right / 19px bottom out of 256px. */
export function AppIconBlock({ onClick }: { onClick?: () => void }) {
  const visible = 110;
  // Scale so visible content (214px wide) fills `visible` px
  const imgSize = Math.round(256 / 214 * visible); // ≈ 203
  const marginLeft = -Math.round(21 / 256 * imgSize); // ≈ -17
  const marginTop  = -Math.round(23 / 256 * imgSize); // ≈ -18
  return (
    <div
      className={`select-none shrink-0 ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
    >
      <div style={{ width: visible, height: visible, overflow: "hidden" }}>
        <img
          src={appIcon}
          alt="Overdraft"
          style={{ width: imgSize, height: imgSize, maxWidth: "none", marginLeft, marginTop, display: "block" }}
        />
      </div>
    </div>
  );
}
