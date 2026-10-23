import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Rosepetal Designer Boutique",
  description: "Send Rosepetal Designer Boutique a message about an order, a piece or a consultation, or call the studio.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
