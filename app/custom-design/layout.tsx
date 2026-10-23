import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Designs | Rosepetal Designer Boutique",
  description: "Request a personal design consultation for occasion wear and custom outfits at Rosepetal.",
};

export default function CustomDesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
