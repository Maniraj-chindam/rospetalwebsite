import React, { Suspense } from "react";
import CollectionsClient from "@/components/CollectionsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Rosepetal Designer Boutique",
  description: "Browse the Rosepetal pieces currently published by the boutique, with live sizes and colours.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-rosepetal-wine font-serif-luxury text-xl">
          Loading Collections...
        </div>
      }
    >
      <CollectionsClient />
    </Suspense>
  );
}
