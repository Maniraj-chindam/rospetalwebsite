import React, { Suspense } from "react";
import CollectionsClient from "@/components/CollectionsClient";

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
