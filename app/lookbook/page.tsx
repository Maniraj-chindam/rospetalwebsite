"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { LOOKBOOK_GALLERY, type LookbookItem } from "@/data/boutique-data";
import { useModalKeyboard } from "@/hooks/useModalKeyboard";

const CATEGORIES = ["All", "Festive", "Bridal", "Handloom", "Contemporary"];

export default function LookbookPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeImage, setActiveImage] = useState<LookbookItem | null>(null);
  const dialogRef = useModalKeyboard(Boolean(activeImage), () => setActiveImage(null));
  const filteredItems = LOOKBOOK_GALLERY.filter((item) => activeCategory === "All" || item.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8">
      <header className="mx-auto mb-7 max-w-2xl space-y-3 text-center">
        <h1 className="font-serif-luxury text-4xl font-normal text-white drop-shadow-sm sm:text-5xl">Lookbook</h1>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FDE8C5]">A glimpse of the Rosepetal aesthetic</p>
      </header>

      <div role="group" aria-label="Filter lookbook" className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {CATEGORIES.map((cat) => (
          <button key={cat} type="button" onClick={() => setActiveCategory(cat)} aria-pressed={activeCategory === cat} className={`rounded-full px-5 py-2 text-xs tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${activeCategory === cat ? "bg-white font-semibold text-rosepetal-wine shadow-md" : "border border-white/30 bg-white/20 text-white hover:bg-white/35"}`}>{cat}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, index) => (
          <button key={item.id} type="button" onClick={() => setActiveImage(item)} aria-label={`View ${item.title} image`} className={`group overflow-hidden rounded-xl bg-rosepetal-card text-left shadow-sm transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white ${index % 5 === 3 ? "lg:row-span-2" : ""}`}>
            <div className={`relative w-full overflow-hidden ${index % 5 === 3 ? "aspect-[3/4] lg:h-full lg:aspect-auto" : "aspect-[3/4]"}`}>
              <Image src={item.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-5 pb-5 pt-16 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-100">{item.category}</p>
                <p className="font-serif-luxury text-xl">{item.title}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveImage(null); }}>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="lookbook-dialog-title" tabIndex={-1} className="relative flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-[#180e12] text-white shadow-2xl">
            <button type="button" onClick={() => setActiveImage(null)} aria-label="Close image" className="absolute right-3 top-3 z-20 rounded-full bg-black/70 p-2 text-white hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><X className="size-6" aria-hidden="true" /></button>
            <div className="relative min-h-0 w-full flex-1 aspect-[4/5] sm:aspect-[5/4]"><Image src={activeImage.image} alt={activeImage.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-contain" /></div>
            <p id="lookbook-dialog-title" className="px-5 py-3 font-serif-luxury text-lg">{activeImage.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
