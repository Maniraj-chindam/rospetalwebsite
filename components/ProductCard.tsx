"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, Heart, X } from "lucide-react";
import type { ProductItem } from "@/data/boutique-data";
import { CONTACT_INFO } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";

function enquiryUrl(product: ProductItem) {
  const message = `Hello Rosepetal Boutique, I would like to enquire about ${product.name}${product.sku ? ` (SKU ${product.sku})` : ""}${product.size ? `, size ${product.size}` : ""}. Is it available?`;
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}

export default function ProductCard({ product }: { product: ProductItem }) {
  const { wishlist, toggleWishlist } = useBoutique();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const isFavorited = wishlist.includes(product.id);

  return (
    <>
      <div className="group flex flex-col text-left">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-[#F2E8E7]">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
          <button type="button" onClick={() => toggleWishlist(product.id)} className={`absolute right-3 top-3 z-10 rounded-full p-2 ${isFavorited ? "bg-rosepetal-wine text-white" : "bg-white/90 text-rosepetal-text"}`} aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} aria-pressed={isFavorited}>
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-white" : ""}`} />
          </button>
          <button type="button" onClick={() => setIsQuickViewOpen(true)} className="absolute bottom-3 left-3 rounded bg-white/95 px-3 py-2 text-xs font-medium text-rosepetal-wine shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <Eye className="mr-1 inline h-3.5 w-3.5" /> Details
          </button>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="font-serif-luxury text-base text-rosepetal-text">{product.name}</h3>
          <p className="text-xs font-medium text-rosepetal-muted">{product.price}</p>
          {(product.size || product.color) && <p className="text-xs text-rosepetal-muted">{[product.size, product.color].filter(Boolean).join(" · ")}</p>}
          {product.availableStock === 0 && <p className="text-xs text-rosepetal-wine">Currently unavailable</p>}
          <a href={enquiryUrl(product)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center text-xs font-semibold text-rosepetal-wine underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">Enquire about this piece</a>
        </div>
      </div>

      {isQuickViewOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsQuickViewOpen(false); }}>
        <div role="dialog" aria-modal="true" aria-label={`${product.name} details`} className="relative flex w-full max-w-2xl flex-col gap-6 rounded-xl border border-rosepetal-border bg-[#FFF5F6] p-6 shadow-2xl md:flex-row">
          <button type="button" onClick={() => setIsQuickViewOpen(false)} className="absolute right-4 top-4 z-10 rounded p-1 text-rosepetal-wine focus-visible:outline focus-visible:outline-2" aria-label="Close details"><X className="h-5 w-5" /></button>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-rosepetal-card md:w-1/2"><Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover" /></div>
          <div className="flex flex-1 flex-col justify-center gap-3 pr-4">
            <p className="text-xs uppercase tracking-widest text-rosepetal-wine">{product.category}</p>
            <h2 className="font-serif-luxury text-2xl text-rosepetal-text">{product.name}</h2>
            <p className="text-xl text-rosepetal-wine">{product.price}</p>
            {product.sku && <p className="text-sm text-rosepetal-muted">SKU: {product.sku}</p>}
            {product.size && <p className="text-sm text-rosepetal-muted">Size: {product.size}</p>}
            {product.color && <p className="text-sm text-rosepetal-muted">Colour: {product.color}</p>}
            {typeof product.availableStock === "number" && <p className="text-sm text-rosepetal-muted">{product.availableStock > 0 ? `${product.availableStock} available` : "Currently unavailable"}</p>}
            <a href={enquiryUrl(product)} target="_blank" rel="noopener noreferrer" className="mt-4 rounded bg-rosepetal-wine px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">Enquire about this piece</a>
          </div>
        </div>
      </div>}
    </>
  );
}
