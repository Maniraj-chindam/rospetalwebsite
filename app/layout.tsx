import type { Metadata } from "next";
import { Alex_Brush, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import FallingRosePetals from "@/components/FallingRosePetals";
import MobileBottomDock from "@/components/MobileBottomDock";
import { BoutiqueProvider } from "@/context/BoutiqueContext";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-jakarta" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-cormorant" });
const alexBrush = Alex_Brush({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-alex-brush" });

export const metadata: Metadata = {
  title: "Rosepetal Designer Boutique | Where Tradition Blooms in Style",
  description:
    "Explore sarees, dresses and occasionwear, and enquire about custom designs at Rosepetal Designer Boutique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${cormorant.variable} ${alexBrush.variable} min-h-screen flex flex-col bg-rosepetal-deep-pink text-rosepetal-text antialiased selection:bg-rosepetal-blush selection:text-rosepetal-wine`}>
        <BoutiqueProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-rosepetal-wine focus:shadow-lg">Skip to main content</a>
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
