import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import FallingRosePetals from "@/components/FallingRosePetals";
import MobileBottomDock from "@/components/MobileBottomDock";
import { BoutiqueProvider } from "@/context/BoutiqueContext";
import { staleChunkRecoveryScript } from "@/lib/stale-chunk-recovery.mjs";

export const metadata: Metadata = {
  metadataBase: new URL("https://rosepetalboutique.com"),
  title: "Rosepetal Designer Boutique | Where Tradition Blooms in Style",
  description:
    "Explore designer sarees, handlooms, bridal wear and bespoke creations from Rosepetal Designer Boutique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><script dangerouslySetInnerHTML={{ __html: staleChunkRecoveryScript }} /></head>
      <body className="min-h-screen flex flex-col bg-rosepetal-deep-pink text-rosepetal-text antialiased selection:bg-rosepetal-blush selection:text-rosepetal-wine">
        <BoutiqueProvider>
          <a href="#main-content" className="fixed left-4 top-3 z-[110] -translate-y-20 rounded-md bg-white px-4 py-2 text-sm font-semibold text-rosepetal-wine shadow-lg transition-transform focus:translate-y-0">Skip to content</a>
          <Navbar />
          <FallingRosePetals />
          <main id="main-content" tabIndex={-1} className="flex-grow relative z-10">{children}</main>
          <div className="relative z-10 pb-16 sm:pb-0">
            <Footer />
          </div>
          <ConsultationModal />
          <MobileBottomDock />
        </BoutiqueProvider>
      </body>
    </html>
  );
}
