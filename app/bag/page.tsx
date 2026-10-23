import type { Metadata } from "next";
import BagClient from "./bag-client";

export const metadata: Metadata = {
  title: "Your Bag | Rosepetal Designer Boutique",
  description: "Review your Rosepetal pieces and current boutique availability.",
};

export default function BagPage() { return <BagClient />; }
