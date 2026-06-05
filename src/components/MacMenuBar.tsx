import {
  AppleLogoIcon,
  BatteryChargingIcon,
  BluetoothIcon,
  MagnifyingGlassIcon,
  SquaresFourIcon,
  WifiHighIcon,
} from "@phosphor-icons/react";
import { camelPng, claudeIcon } from "../assets";
import type { Product } from "../config";

/** Simulated macOS menu bar — pinned to top of viewport, shown on both products.
 *
 * Wallet: camel click toggles the floating wallet mockup.
 * Market: camel click cross-links to the wallet site (it lives in the menu bar
 *         because the wallet is the companion app every market agent needs).
 */
export function MacMenuBar({
  product,
  mockupOpen,
  onCamelClick,
}: {
  product: Product;
  mockupOpen: boolean;
  onCamelClick: () => void;
}) {
  const now = new Date();
  const dayName   = now.toLocaleDateString("en-US", { weekday: "short" });
  const dayNum    = now.getDate();
  const monthName = now.toLocaleDateString("en-US", { month: "short" });
  const timeStr   = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateTimeStr = `${dayName} ${dayNum} ${monthName} ${timeStr}`;

  const appLabel =
    product === "wallet"  ? "Overdraft Wallet" :
    product === "market"  ? "Overdraft Market" :
                            "Overdraft Economy";
  const camelTitle = product === "wallet" ? "Toggle Overdraft wallet" : "Get Overdraft Wallet";
  const camelActive = product === "wallet" && mockupOpen;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 select-none"
      style={{ height: 28, background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px) saturate(180%)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      {/* Left — Apple logo + active app menus */}
      <div className="flex items-center gap-1">
        <AppleLogoIcon size={13} weight="fill" className="text-neutral-800 shrink-0 mx-2" />
        {product === "wallet" ? (
          <button
            type="button"
            onClick={onCamelClick}
            className={`flex items-center rounded-md px-2 py-0.5 text-[13px] font-semibold text-neutral-900 transition-colors cursor-pointer ${
              camelActive ? "bg-neutral-200/80" : "hover:bg-neutral-100"
            }`}
          >
            {appLabel}
          </button>
        ) : (
          <span className="flex items-center rounded-md px-2 py-0.5 text-[13px] font-semibold text-neutral-900">
            {appLabel}
          </span>
        )}
        {["File", "Edit", "Window", "Help"].map((m) => (
          <span key={m} className="text-[13px] text-neutral-500 hidden sm:inline px-2 py-0.5">{m}</span>
        ))}
      </div>

      {/* Right — menu bar extras + system icons */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onCamelClick}
          title={camelTitle}
          aria-label={camelTitle}
          className={`flex items-center justify-center rounded-full px-2 py-0.5 transition-colors cursor-pointer ${
            camelActive ? "bg-neutral-200/80" : "hover:bg-neutral-100"
          }`}
        >
          <img src={camelPng} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />
        </button>

        <span className="flex items-center justify-center px-1.5 py-0.5">
          <img src={claudeIcon} alt="" style={{ width: 14, height: 14, objectFit: "contain", borderRadius: 3 }} />
        </span>

        <span className="flex items-center justify-center px-1.5 py-0.5 text-neutral-600">
          <BluetoothIcon size={13} weight="bold" />
        </span>

        <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-neutral-600">
          <span className="text-[11px] tabular-nums">32%</span>
          <BatteryChargingIcon size={15} weight="regular" />
        </span>

        <span className="flex items-center justify-center px-1.5 py-0.5 text-neutral-600">
          <WifiHighIcon size={14} weight="bold" />
        </span>

        <span className="flex items-center justify-center px-1.5 py-0.5 text-neutral-600">
          <MagnifyingGlassIcon size={13} weight="bold" />
        </span>

        <span className="flex items-center justify-center px-1.5 py-0.5 text-neutral-600">
          <SquaresFourIcon size={13} weight="bold" />
        </span>

        <span className="text-[12px] text-neutral-600 tabular-nums pl-2">{dateTimeStr}</span>
      </div>
    </div>
  );
}
