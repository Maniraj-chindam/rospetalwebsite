import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Rosepetal Designer Boutique",
  description: "Contact Rosepetal Designer Boutique by phone or WhatsApp about an order, a piece or a consultation.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
