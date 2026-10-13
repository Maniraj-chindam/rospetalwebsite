import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { BoutiqueProvider } from "@/context/BoutiqueContext";

export const metadata: Metadata = {
  title: "Rosepetal Designer Boutique | Where Tradition Blooms in Style",
  description:
    "Designer sarees, handlooms, bridal wear and bespoke creations for every special you. Located in Banjara Hills, Hyderabad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FCECEE] text-rosepetal-text antialiased selection:bg-rosepetal-blush selection:text-rosepetal-wine">
        <BoutiqueProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ConsultationModal />
        </BoutiqueProvider>
      </body>
    </html>
  );
}
