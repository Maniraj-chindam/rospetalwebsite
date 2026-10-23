"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, Heart, X } from "lucide-react";
import type { ProductItem } from "@/data/boutique-data";
import { CONTACT_INFO } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";
import { useModalKeyboard } from "@/hooks/useModalKeyboard";

function enquiryUrl(product: ProductItem) {
  const message = `Hello Rosepetal Boutique, I would like to enquire about ${product.name} (SKU ${product.sku ?? product.id})${product.size ? `, size ${product.size}` : ""}${product.color ? `, colour ${product.color}` : ""}. Is it available?`;
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}

export default function ProductCard({ product, variants = [product] }: { product: ProductItem; variants?: ProductItem[] }) {
  const { wishlist, toggleWishlist } = useBoutique();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(product.id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const dialogRef = useModalKeyboard(isQuickViewOpen, () => setIsQuickViewOpen(false));
  const selected = variants.find((item) => item.id === selectedId) ?? product;
  const photos = selected.images?.length ? selected.images : [selected.image];
  const displayImage = selectedImage && photos.includes(selectedImage) ? selectedImage : photos[0];
  const anyAvailable = variants.some((item) => (item.availableStock ?? 0) > 0);
  const minPrice = Math.min(...variants.map((item) => item.priceNum));
  const priceLabel = variants.some((item) => item.priceNum !== minPrice)
    ? `From ${variants.find((item) => item.priceNum === minPrice)?.price}`
    : product.price;
  const isFavorited = wishlist.includes(product.id);

  return (
    <>
      <article className="group flex flex-col text-left">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-[#F2E8E7]">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
          <button type="button" onClick={() => toggleWishlist(product.id)} className={`absolute right-3 top-3 z-10 rounded-full p-2 ${isFavorited ? "bg-rosepetal-wine text-white" : "bg-white/90 text-rosepetal-text"}`} aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} aria-pressed={isFavorited}>
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-white" : ""}`} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => { setSelectedId(product.id); setSelectedImage(null); setIsQuickViewOpen(true); }} className="absolute bottom-3 left-3 rounded bg-white/95 px-3 py-2 text-xs font-medium text-rosepetal-wine shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <Eye className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" /> Details
          </button>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="font-serif-luxury text-base text-rosepetal-text">{product.name}</h3>
          <p className="text-xs font-medium text-rosepetal-muted">{priceLabel}</p>
          {variants.length > 1 && <p className="text-xs text-rosepetal-muted">{variants.length} size/colour options</p>}
          {!anyAvailable && <p className="text-xs text-rosepetal-wine">Currently unavailable</p>}
          <button type="button" onClick={() => { setSelectedId(product.id); setSelectedImage(null); setIsQuickViewOpen(true); }} className="inline-flex min-h-10 items-center text-left text-xs font-semibold text-rosepetal-wine underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">Choose a variant and enquire</button>
        </div>
      </article>

      {isQuickViewOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-3 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsQuickViewOpen(false); }}>
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" tabIndex={-1} className="relative grid max-h-[92dvh] w-full max-w-4xl gap-5 overflow-y-auto rounded-xl border border-rosepetal-border bg-[#FFF5F6] p-5 shadow-2xl sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <button type="button" onClick={() => setIsQuickViewOpen(false)} className="absolute right-4 top-4 z-10 rounded-full bg-white/95 p-2 text-rosepetal-wine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine" aria-label="Close details"><X className="h-5 w-5" /></button>
          <div>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-rosepetal-card"><Image src={displayImage} alt={selected.name} fill sizes="(max-width: 768px) 100vw, 440px" className="object-cover" /></div>
            {photos.length > 1 && <div aria-label="Product photos" className="mt-3 flex gap-2 overflow-x-auto pb-1">{photos.map((photo, index) => <button key={photo} type="button" onClick={() => setSelectedImage(photo)} aria-label={`Show photo ${index + 1}`} aria-pressed={displayImage === photo} className={`relative h-16 w-14 shrink-0 overflow-hidden rounded border-2 ${displayImage === photo ? "border-rosepetal-wine" : "border-transparent"}`}><Image src={photo} alt="" fill sizes="56px" className="object-cover" /></button>)}</div>}
          </div>
          <div className="flex flex-col gap-3 pr-2 text-rosepetal-text">
            <p className="text-xs font-semibold uppercase tracking-widest text-rosepetal-wine">{selected.category}</p>
            <h2 id="product-dialog-title" className="font-serif-luxury text-3xl text-rosepetal-text">{selected.name}</h2>
            <p className="text-xl text-rosepetal-wine">{selected.price}</p>
            {selected.description && <p className="text-sm leading-relaxed">{selected.description}</p>}
            {variants.length > 1 && <fieldset className="border-t border-rosepetal-border pt-3"><legend className="text-xs font-semibold uppercase tracking-wider text-rosepetal-wine">Size and colour</legend><div className="mt-2 flex flex-wrap gap-2">{variants.map((item) => <button key={item.id} type="button" onClick={() => { setSelectedId(item.id); setSelectedImage(null); }} aria-pressed={selected.id === item.id} className={`rounded-md border px-3 py-2 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-rosepetal-wine ${selected.id === item.id ? "border-rosepetal-wine bg-rosepetal-wine text-white" : "border-rosepetal-border bg-white"}`}>{[item.size, item.color].filter(Boolean).join(" · ")}</button>)}</div></fieldset>}
            <dl className="grid gap-2 border-t border-rosepetal-border pt-3 text-sm">
              {selected.size && <div><dt className="inline font-semibold">Size: </dt><dd className="inline">{selected.size}</dd></div>}
              {selected.color && <div><dt className="inline font-semibold">Colour: </dt><dd className="inline">{selected.color}</dd></div>}
              {selected.fabric && <div><dt className="inline font-semibold">Fabric: </dt><dd className="inline">{selected.fabric}</dd></div>}
              {selected.care && <div><dt className="inline font-semibold">Care: </dt><dd className="inline">{selected.care}</dd></div>}
              {selected.delivery && <div><dt className="inline font-semibold">Delivery: </dt><dd className="inline">{selected.delivery}</dd></div>}
              <div><dt className="inline font-semibold">Availability: </dt><dd className="inline">{(selected.availableStock ?? 0) > 0 ? `${selected.availableStock} available` : "Currently unavailable"}</dd></div>
              {selected.sku && <div><dt className="inline font-semibold">SKU: </dt><dd className="inline">{selected.sku}</dd></div>}
            </dl>
            <a href={enquiryUrl(selected)} target="_blank" rel="noopener noreferrer" className="mt-2 rounded bg-rosepetal-wine px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-white hover:bg-rosepetal-wineHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">Enquire about this variant</a>
          </div>
        </div>
      </div>}
    </>
  );
}
