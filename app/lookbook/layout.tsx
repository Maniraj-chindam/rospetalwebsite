import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lookbook | Rosepetal Designer Boutique",
  description: "Explore Rosepetal occasion wear, sarees, lehengas and designer dresses.",
};

export default function LookbookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
