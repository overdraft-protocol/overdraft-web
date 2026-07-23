import { ArrowRightIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { camelWalking } from "../assets";
import {
  MARKET_GH_URL,
  PAYMENTS_GH_URL,
  PORTPS_GH_URL,
  SITE_URLS,
  type Product,
  WALLET_GH_URL,
} from "../config";

const FOOTER_NOTES: Record<Product, string> = {
  wallet:     "macOS only · Touch ID & Keychain",
  market:     "Built on Base · USDC escrow",
  economy:    "Agent skill · Token economics",
  payments:   "MCP extension · MPX v1 · MIT",
  workspaces: "Remote MCP · Claude Desktop",
  portps:     "CLI · macOS & Linux · MIT",
};

const GH_URLS: Partial<Record<Product, string>> = {
  wallet:   WALLET_GH_URL,
  market:   MARKET_GH_URL,
  payments: PAYMENTS_GH_URL,
  portps:   PORTPS_GH_URL,
};

export function SiteFooter({ product }: { product: Product }) {
  const ghUrl = GH_URLS[product];

  return (
    <footer className="mt-20 flex items-center justify-center gap-4">
      <img src={camelWalking} alt="" className="h-16 w-auto" />
      <div className="flex flex-col gap-1.5">
        {ghUrl && (
          <a href={ghUrl}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12px] text-neutral-500 hover:text-neutral-800 transition-colors">
            <GithubLogoIcon size={13} weight="fill" /> GitHub <ArrowRightIcon size={10} />
          </a>
        )}
        <p className="text-[11px] text-neutral-400">{FOOTER_NOTES[product]}</p>
        {product === "workspaces" && (
          <a
            href={`${SITE_URLS.workspaces}/privacy`}
            className="text-[11px] text-neutral-400 transition-colors hover:text-neutral-700"
          >
            Privacy
          </a>
        )}
      </div>
    </footer>
  );
}
