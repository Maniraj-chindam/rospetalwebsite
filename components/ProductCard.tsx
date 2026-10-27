"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from 'next/navigation';
import { Eye, Heart, X } from "lucide-react";
import type { ProductItem } from "@/data/boutique-data";
import { CONTACT_INFO } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";
import { useModalKeyboard } from "@/hooks/useModalKeyboard";
import ProductPrice from '@/components/ProductPrice';
import PreBookPanel from '@/components/PreBookPanel';
import VariantSelector from "@/components/VariantSelector";
import { productReadinessIssues } from "@/lib/product-readiness";

function enquiryUrl(product: ProductItem) {
  const message = `Hello Rosepetal Boutique, I would like to enquire about ${product.name} (SKU ${product.sku ?? product.id})${product.size ? `, size ${product.size}` : ""}${product.color ? `, colour ${product.color}` : ""}. Is it available?`;
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}

export default function ProductCard({ product, variants = [product] }: { product: ProductItem; variants?: ProductItem[] }) {
  const { wishlist, toggleWishlist, bag, addToBag, buyNow } = useBoutique();
  const router=useRouter();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(product.id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [prebookOpen, setPrebookOpen] = useState(false);
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
  const bagQty = bag.find((line) => line.productId === selected.id)?.qty ?? 0;
  const readinessIssues = productReadinessIssues(selected, variants);
  const needsConfirmation = selected.prebookOnly !== true && readinessIssues.length > 0;
  const canAdd = selected.prebookOnly !== true && !needsConfirmation && bagQty < Math.min(10, selected.availableStock ?? 0) && (bagQty > 0 || bag.length < 20);
  const productHref = `/product?id=${encodeURIComponent(product.id)}`;
  const cardImageAlt = productReadinessIssues(product, variants).some((issue) => issue.includes("individual photo"))
    ? `${product.name} colour options shown together`
    : `${product.name}${product.color ? ` in ${product.color}` : ""}`;

  return (
    <>
      <article className="group flex flex-col text-left">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-[#F2E8E7]">
          <Link href={productHref} aria-label={`View ${product.name}`} className="relative block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">
            <Image src={product.image} alt={cardImageAlt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
          </Link>
          <button type="button" onClick={() => toggleWishlist(product.id)} className={`absolute right-3 top-3 z-10 rounded-full p-2 ${isFavorited ? "bg-rosepetal-wine text-white" : "bg-white/90 text-rosepetal-text"}`} aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} aria-pressed={isFavorited}>
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-white" : ""}`} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => { setSelectedId(product.id); setSelectedImage(null); setIsQuickViewOpen(true); }} className="absolute bottom-3 left-3 z-10 rounded bg-white/95 px-3 py-2 text-xs font-medium text-rosepetal-wine shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <Eye className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" /> Quick view
          </button>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="font-serif-luxury text-base text-rosepetal-text"><Link href={productHref} className="hover:text-rosepetal-wine hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">{product.name}</Link></h3>
          <p className="text-xs font-medium text-rosepetal-muted">{variants.some(item=>item.priceNum!==minPrice)?priceLabel:<ProductPrice product={product}/>}</p>
          {variants.length > 1 && <p className="text-xs text-rosepetal-muted">{variants.length} size/colour options</p>}
          {product.prebookOnly ? <p className="text-xs text-rosepetal-wine">Prebook only · no payment now</p> : productReadinessIssues(product, variants).length > 0 ? <p className="text-xs text-rosepetal-wine">Details being confirmed · enquiry only</p> : !anyAvailable && <p className="text-xs text-rosepetal-wine">Currently unavailable</p>}
          <Link href={productHref} className="inline-flex min-h-10 items-center text-left text-xs font-semibold text-rosepetal-wine underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">View piece & options</Link>
          {product.prebookOnly ? <Link href={`${productHref}&prebook=1`} className="block w-full rounded bg-rosepetal-wine px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-white">Prebook</Link> : productReadinessIssues(product,variants).length===0&&<button type="button" disabled={!anyAvailable} onClick={()=>{buyNow(product.id);router.push('/checkout');}} className="block w-full rounded bg-rosepetal-wine px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-50">Buy now</button>}
        </div>
      </article>

      {isQuickViewOpen && createPortal(<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-3 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsQuickViewOpen(false); }}>
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" tabIndex={-1} className="relative grid max-h-[calc(100dvh-1.5rem)] overscroll-contain sm:max-h-[calc(100dvh-3rem)] w-full max-w-4xl gap-5 overflow-y-auto rounded-xl border border-rosepetal-border bg-[#FFF5F6] p-5 shadow-2xl sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <button type="button" onClick={() => setIsQuickViewOpen(false)} className="absolute right-4 top-4 z-10 rounded-full bg-white/95 p-2 text-rosepetal-wine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine" aria-label="Close details"><X className="h-5 w-5" /></button>
          <div>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-rosepetal-card"><Image src={displayImage} alt={readinessIssues.some((issue) => issue.includes("individual photo")) ? `${selected.name} colour options shown together` : selected.name} fill sizes="(max-width: 768px) 100vw, 440px" className="object-cover" /></div>
            {photos.length > 1 && <div aria-label="Product photos" className="mt-3 flex gap-2 overflow-x-auto pb-1">{photos.map((photo, index) => <button key={photo} type="button" onClick={() => setSelectedImage(photo)} aria-label={`Show photo ${index + 1}`} aria-pressed={displayImage === photo} className={`relative h-16 w-14 shrink-0 overflow-hidden rounded border-2 ${displayImage === photo ? "border-rosepetal-wine" : "border-transparent"}`}><Image src={photo} alt="" fill sizes="56px" className="object-cover" /></button>)}</div>}
          </div>
          <div className="flex flex-col gap-3 pr-2 text-rosepetal-text">
            <p className="text-xs font-semibold uppercase tracking-widest text-rosepetal-wine">{selected.category}</p>
            <h2 id="product-dialog-title" className="font-serif-luxury text-3xl text-rosepetal-text">{selected.name}</h2>
            <p className="text-xl text-rosepetal-wine">{<ProductPrice product={selected}/>}</p>
            {selected.description && <p className="text-sm leading-relaxed">{selected.description}</p>}
            {needsConfirmation && <div role="status" className="rounded-lg border border-rosepetal-border bg-white p-3 text-sm leading-6"><strong>Details being confirmed</strong><ul className="list-inside list-disc text-rosepetal-muted">{readinessIssues.map((issue) => <li key={issue}>{issue}</li>)}</ul></div>}
            {variants.length > 1 && <div className="border-t border-rosepetal-border pt-3"><VariantSelector variants={variants} selected={selected} onSelect={(item) => { setSelectedId(item.id); setSelectedImage(null); setAdded(false); setPrebookOpen(false); }} /></div>}
            <dl className="grid gap-2 border-t border-rosepetal-border pt-3 text-sm">
              {selected.size && <div><dt className="inline font-semibold">Size: </dt><dd className="inline">{selected.size}</dd></div>}
              {selected.sizeMeasurements && <div><dt className="inline font-semibold">Measurements: </dt><dd className="inline">{selected.sizeMeasurements}</dd></div>}
              {selected.color && <div><dt className="inline font-semibold">Colour: </dt><dd className="inline">{selected.color}</dd></div>}
              {selected.fabric && <div><dt className="inline font-semibold">Fabric: </dt><dd className="inline">{selected.fabric}</dd></div>}
              {selected.care && <div><dt className="inline font-semibold">Care: </dt><dd className="inline">{selected.care}</dd></div>}
              {selected.delivery && <div><dt className="inline font-semibold">Delivery: </dt><dd className="inline">{selected.delivery}</dd></div>}
              <div><dt className="inline font-semibold">Availability: </dt><dd className="inline">{selected.prebookOnly ? "Prebook request" : needsConfirmation ? "To be confirmed" : (selected.availableStock ?? 0) > 0 ? `${selected.availableStock} available` : "Currently unavailable"}</dd></div>
              {selected.sku && <div><dt className="inline font-semibold">SKU: </dt><dd className="inline">{selected.sku}</dd></div>}
            </dl>
            {!selected.prebookOnly && !needsConfirmation && <button type="button" disabled={!canAdd} onClick={() => { addToBag(selected.id); setAdded(true); }} className="mt-2 rounded bg-rosepetal-wine px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-white hover:bg-rosepetal-wineHover disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">{(selected.availableStock ?? 0) < 1 ? "Currently unavailable" : bagQty === 0 && bag.length >= 20 ? "Bag is full" : !canAdd ? "Maximum quantity in bag" : "Add to cart"}</button>}
            {added && <p role="status" className="text-sm text-rosepetal-wine">Added to your bag. <Link href="/bag" className="font-semibold underline underline-offset-4">Review bag</Link></p>}
            {!selected.prebookOnly&&!needsConfirmation&&<button type="button" disabled={(selected.availableStock??0)<1} onClick={()=>{buyNow(selected.id);setIsQuickViewOpen(false);router.push('/checkout');}} className="rounded bg-rosepetal-wine px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-50">Buy now</button>}
            {selected.prebookOnly ? <><button type="button" aria-expanded={prebookOpen} onClick={()=>setPrebookOpen(open=>!open)} className="rounded bg-rosepetal-wine px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white">Prebook</button>{prebookOpen&&<PreBookPanel key={selected.id} product={selected}/>}</> : <a href={enquiryUrl(selected)} target="_blank" rel="noopener noreferrer" className={`rounded px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine ${needsConfirmation ? "bg-rosepetal-wine text-white" : "border border-rosepetal-wine/40 text-rosepetal-wine hover:bg-white"}`}>{needsConfirmation ? "Enquire about this piece" : "Ask about this piece"}</a>}
          </div>
        </div>
      </div>, document.body)}
    </>
  );
}
