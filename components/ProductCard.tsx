"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, X, ArrowRight } from "lucide-react";
import { ProductItem } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";

export default function ProductCard({ product }: { product: ProductItem }) {
  const { wishlist, toggleWishlist } = useBoutique();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isFavorited = wishlist.includes(product.id);
  const enquiryHref = `/contact?piece=${encodeURIComponent(product.name)}`;

  useEffect(() => {
    if (!isQuickViewOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsQuickViewOpen(false);
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onEscape);
    return () => { document.removeEventListener("keydown", onEscape); previousFocus?.focus(); };
  }, [isQuickViewOpen]);

  return (
    <>
      <div className="group flex flex-col text-left">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-[#F2E8E7]">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
          <button type="button" onClick={() => toggleWishlist(product.id)} className={`absolute right-3 top-3 z-10 rounded-full p-2.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine ${isFavorited ? "bg-rosepetal-wine text-white" : "bg-white/90 text-rosepetal-text hover:text-rosepetal-wine"}`} aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} aria-pressed={isFavorited}>
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} aria-hidden="true" />
          </button>
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-3 sm:flex-row">
            <button type="button" onClick={() => setIsQuickViewOpen(true)} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded bg-white px-2 text-xs font-medium text-rosepetal-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine"><Eye className="h-4 w-4" aria-hidden="true" /> Details</button>
            <Link href={enquiryHref} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded bg-rosepetal-wine px-2 text-center text-xs font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><ArrowRight className="h-4 w-4" aria-hidden="true" /> Enquire</Link>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="font-serif-luxury text-base font-normal text-rosepetal-text">{product.name}</h3>
          <p className="text-sm text-rosepetal-muted">{product.price}</p>
        </div>
      </div>
      {isQuickViewOpen && createPortal(
        <div ref={dialogRef} className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4" role="dialog" aria-modal="true" aria-label={`${product.name} details`} onMouseDown={(event) => { if (event.target === event.currentTarget) setIsQuickViewOpen(false); }}>
          <div className="relative flex w-full max-w-3xl flex-col gap-6 rounded-xl border border-rosepetal-border bg-[#FFF9F7] p-5 shadow-2xl md:flex-row md:p-8">
            <button type="button" onClick={() => setIsQuickViewOpen(false)} className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 text-rosepetal-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" aria-label="Close details"><X className="h-5 w-5" /></button>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-rosepetal-card md:w-1/2"><Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" /></div>
            <div className="flex-1 pt-4 md:pt-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rosepetal-wine">{product.category}</p>
              <h3 className="mt-2 font-serif-luxury text-3xl text-rosepetal-text">{product.name}</h3>
              <p className="mt-2 text-sm text-rosepetal-wine">{product.price}</p>
              <p className="mt-4 text-sm leading-relaxed text-rosepetal-text">{product.description}</p>
              <dl className="mt-5 space-y-2 border-t border-rosepetal-border pt-4 text-sm text-rosepetal-text">
                <div><dt className="inline font-semibold">Fabric: </dt><dd className="inline">{product.fabric}</dd></div>
                <div><dt className="inline font-semibold">Sizing: </dt><dd className="inline">{product.sizing}</dd></div>
                <div><dt className="inline font-semibold">Care: </dt><dd className="inline">{product.care}</dd></div>
                <div><dt className="inline font-semibold">Delivery: </dt><dd className="inline">{product.delivery}</dd></div>
              </dl>
              <Link href={enquiryHref} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded bg-rosepetal-wine px-4 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2">Enquire about this piece <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>, document.body)}
    </>
  );
}
