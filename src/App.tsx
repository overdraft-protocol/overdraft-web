import { useRef, useState } from "react";
import { EconomySite } from "./components/EconomySite";
import { Hero } from "./components/Hero";
import { MacMenuBar } from "./components/MacMenuBar";
import { MarketSite } from "./components/MarketSite";
import { PaymentsSite } from "./components/PaymentsSite";
import { SiteFooter } from "./components/SiteFooter";
import { WorkspacesSite } from "./components/WorkspacesSite";
import { FloatingAppMockup } from "./components/wallet/FloatingAppMockup";
import { WalletInstall } from "./components/wallet/WalletInstall";
import { DEFAULT_PRODUCT, SITE_URLS, type Product } from "./config";
import {
  closedWalletMockupState,
  defaultWalletMockupPosition,
  readWalletMockupState,
  writeWalletMockupState,
  type WalletMockupState,
} from "./walletMockupState";

export default function App() {
  const product = DEFAULT_PRODUCT;
  const [mockup, setMockup] = useState<WalletMockupState>(() => readWalletMockupState());
  const mockupRef = useRef(mockup);
  mockupRef.current = mockup;

  function persist(updater: (prev: WalletMockupState) => WalletMockupState) {
    setMockup((prev) => {
      const next = updater(prev);
      writeWalletMockupState(next);
      mockupRef.current = next;
      return next;
    });
  }

  function onToggle(p: Product) {
    if (p === product) return;
    writeWalletMockupState(mockupRef.current);
    location.href = SITE_URLS[p];
  }

  function onWalletClick() {
    persist((m) =>
      m.open
        ? closedWalletMockupState()
        : { open: true, ...defaultWalletMockupPosition() },
    );
  }

  function onMockupClose() {
    persist(() => closedWalletMockupState());
  }

  function onMockupPosChange(pos: { x: number; y: number }) {
    persist((m) => ({ ...m, ...pos }));
  }

  return (
    <>
      <MacMenuBar mockupOpen={mockup.open} onWalletClick={onWalletClick} />

      {mockup.open && (
        <FloatingAppMockup
          pos={{ x: mockup.x, y: mockup.y }}
          onPosChange={onMockupPosChange}
          onClose={onMockupClose}
        />
      )}

      <div className="site-background flex flex-col font-sans antialiased text-neutral-900">
        <div className="relative z-10 flex flex-col flex-1 mx-auto px-6 pt-20 pb-5 w-full max-w-sm sm:max-w-xl">
          <Hero product={product} onToggle={onToggle} />

          <main className="flex-1">
            {product === "wallet"     ? <WalletInstall onIconClick={onWalletClick} /> :
             product === "market"     ? <MarketSite /> :
             product === "payments"   ? <PaymentsSite /> :
             product === "workspaces" ? <WorkspacesSite /> :
                                        <EconomySite />}
          </main>

          <SiteFooter product={product} />
        </div>
      </div>
    </>
  );
}
