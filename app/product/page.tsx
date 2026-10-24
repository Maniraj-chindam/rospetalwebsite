import type { Metadata } from "next";
import { Suspense } from "react";
import ProductDetails from "./product-details";

export const metadata: Metadata = {
  title: "Product Details | Rosepetal Designer Boutique",
  description: "View photos, available sizes, fabric, care and delivery details for a Rosepetal piece.",
};

export default function ProductPage() {
  return (
    <Suspense fallback={<div role="status" className="min-h-[60vh] px-4 pt-32 text-center text-white">Loading piece…</div>}>
      <ProductDetails />
    </Suspense>
  );
}
