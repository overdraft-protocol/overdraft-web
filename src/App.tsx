import { useState } from "react";
import { EconomySite } from "./components/EconomySite";
import { Hero } from "./components/Hero";
import { MacMenuBar } from "./components/MacMenuBar";
import { MarketSite } from "./components/MarketSite";
import { SiteFooter } from "./components/SiteFooter";
import { FloatingAppMockup } from "./components/wallet/FloatingAppMockup";
import { WalletInstall } from "./components/wallet/WalletInstall";
import {
  DEFAULT_PRODUCT,
  isLocalDev,
  SITE_URLS,
  type Product,
} from "./config";

export default function App() {
  // Default product is fixed per build (one static site per subdomain). The
  // toggle still lets visitors peek at the other product in-page; switching to
  // it navigates to that product's canonical subdomain.
  const [product, setProduct] = useState<Product>(DEFAULT_PRODUCT);
  const [mockupOpen, setMockupOpen] = useState(false);

  function onToggle(p: Product) {
    if (p === product) return;
    if (isLocalDev()) setProduct(p);
    else location.href = SITE_URLS[p];
  }

  function onWalletClick() {
    setMockupOpen((v) => !v);
  }

  return (
    <>
      <MacMenuBar mockupOpen={mockupOpen} onWalletClick={onWalletClick} />

      {mockupOpen && <FloatingAppMockup onClose={() => setMockupOpen(false)} />}

      <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-neutral-900" style={{ paddingTop: 28 }}>
        <div className="flex flex-col flex-1 mx-auto px-6 pt-20 pb-5 w-full max-w-sm sm:max-w-xl">
          <Hero product={product} onToggle={onToggle} />

          <main className="flex-1">
            {product === "wallet"  ? <WalletInstall onIconClick={onWalletClick} /> :
             product === "market"  ? <MarketSite /> :
                                     <EconomySite />}
          </main>

          <SiteFooter product={product} />
        </div>
      </div>
    </>
  );
}
