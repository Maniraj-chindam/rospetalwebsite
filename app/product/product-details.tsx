"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import type { ProductItem } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";
import PreBookPanel from "@/components/PreBookPanel";
import { fetchPosCatalog, groupCatalogByStyle } from "@/lib/pos-catalog";
import ProductPrice from '@/components/ProductPrice';
import VariantSelector from "@/components/VariantSelector";
import { customerVisibleCatalog, productReadinessIssues } from "@/lib/product-readiness";

export default function ProductDetails() {
  const productId = useSearchParams().get("id") ?? "";
  const router = useRouter();
  const { wishlist, toggleWishlist, bag, addToBag, buyNow } = useBoutique();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [retryKey, setRetryKey] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [preBookOpen, setPreBookOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetchPosCatalog(controller.signal)
      .then((items) => { setProducts(customerVisibleCatalog(items)); setStatus("ready"); })
      .catch(() => { if (!controller.signal.aborted) setStatus("error"); });
    return () => controller.abort();
  }, [retryKey]);

  const product = products.find((item) => item.id === productId);
  const variants = useMemo(() => product
    ? groupCatalogByStyle(products).find((group) => group.some((item) => item.id === product.id)) ?? [product]
    : [], [product, products]);
  const photos = product?.images?.length ? product.images : product ? [product.image] : [];
  const displayImage = selectedImage && photos.includes(selectedImage) ? selectedImage : photos[0];
  const bagQty = bag.find((line) => line.productId === productId)?.qty ?? 0;
  const stock = product?.availableStock ?? 0;
  const readinessIssues = product ? productReadinessIssues(product, products) : [];
  const needsConfirmation = readinessIssues.length > 0;
  const canAdd = Boolean(product) && stock > 0 && bagQty < Math.min(10, stock) && (bagQty > 0 || bag.length < 20);
  const canBuy = Boolean(product) && stock > 0 && !needsConfirmation && product?.checkoutAllowed !== false;
  const isFavorited = wishlist.includes(productId);

  useEffect(() => {
    if (status !== "ready" || !product) return;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `https://rosepetalboutique.com/product?id=${encodeURIComponent(product.id)}`;
    document.head.appendChild(canonical);
    document.title = `${product.name}${product.color ? ` in ${product.color}` : ""} | Rosepetal Designer Boutique`;
    if (description) description.content = needsConfirmation
      ? `Explore ${product.name} at Rosepetal and enquire about its confirmed details.`
      : (product.description ?? "").slice(0, 155);
    return () => {
      canonical.remove();
    };
  }, [needsConfirmation, product, status]);

  if (status === "loading") return <div role="status" className="mx-auto min-h-[65vh] max-w-7xl px-4 pt-32 text-center text-white">Loading this piece from the live collection…</div>;
  if (status === "error") return (
    <div className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-4 py-32 text-center text-white">
      <h1 className="font-serif-luxury text-3xl">We couldn’t load this piece</h1>
      <p className="mt-3 text-sm text-white/90">The live collection is temporarily unavailable. Please try again.</p>
      <div className="mt-6 flex gap-3"><button type="button" onClick={() => setRetryKey((key) => key + 1)} className="rounded bg-white px-5 py-3 text-sm font-semibold text-rosepetal-wine">Try again</button><Link href="/collections" className="rounded border border-white px-5 py-3 text-sm font-semibold text-white">Browse shop</Link></div>
    </div>
  );
  if (!product) return (
    <div className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-4 py-32 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FDE8C5]">Rosepetal collection</p>
      <h1 className="mt-3 font-serif-luxury text-3xl">This piece isn’t available online</h1>
      <p className="mt-3 text-sm text-white/90">It may have been unpublished or the link may be incorrect. Explore the current collection instead.</p>
      <Link href="/collections" className="mt-6 rounded bg-white px-5 py-3 text-sm font-semibold text-rosepetal-wine">Browse shop</Link>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-white/90">
        <Link href="/collections" className="inline-flex items-center gap-1 rounded hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Shop</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/collections?category=${encodeURIComponent(product.category)}`} className="rounded hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{product.category}</Link>
        <span aria-hidden="true">/</span><span aria-current="page" className="max-w-[18rem] truncate">{product.name}</span>
      </nav>

      <article className="grid overflow-hidden rounded-2xl border border-white/30 bg-[#FFF7F7] shadow-2xl lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <div className="bg-[#F0E6E4] p-3 sm:p-5 lg:p-7">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#E9DAD9]">
            <Image src={displayImage} alt={readinessIssues.some((issue) => issue.includes("individual photo")) ? `${product.name} colour options shown together` : `${product.name}${product.color ? ` in ${product.color}` : ""}`} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
          {photos.length > 1 && <div aria-label="Product photos" className="mt-3 flex gap-2 overflow-x-auto pb-1">{photos.map((photo, index) => <button key={photo} type="button" onClick={() => setSelectedImage(photo)} aria-label={`Show photo ${index + 1} of ${product.name}`} aria-pressed={displayImage === photo} className={`relative h-20 w-16 shrink-0 overflow-hidden rounded border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine ${displayImage === photo ? "border-rosepetal-wine" : "border-transparent"}`}><Image src={photo} alt="" fill sizes="64px" className="object-cover" /></button>)}</div>}
        </div>

        <div className="flex flex-col p-6 text-rosepetal-text sm:p-9 lg:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-rosepetal-wine">{product.websiteType || product.category}</p>
          <h1 className="mt-3 font-serif-luxury text-3xl leading-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-2xl text-rosepetal-wine">{<ProductPrice product={product}/>}</p>
          {product.description && <p className="mt-5 text-sm leading-7 text-rosepetal-muted">{product.description}</p>}
          {needsConfirmation && <div role="status" className="mt-5 rounded-lg border border-rosepetal-border bg-white p-4 text-sm leading-6 text-rosepetal-text"><strong>Details being confirmed</strong><p className="mt-1">This piece is available for enquiry while the boutique confirms its details and photos.</p><ul className="mt-2 list-inside list-disc text-rosepetal-muted">{readinessIssues.map((issue) => <li key={issue}>{issue}</li>)}</ul></div>}

          {variants.length > 1 && <div className="mt-7 border-t border-rosepetal-border pt-5"><VariantSelector variants={variants} selected={product} onSelect={(item) => { setSelectedImage(null); setAddedId(null); setPreBookOpen(false); router.replace(`/product?id=${encodeURIComponent(item.id)}`, { scroll: false }); }} /></div>}

          <p className="mt-6 text-sm font-medium text-rosepetal-text" role="status">{stock > 0 ? `${stock} ${stock === 1 ? "piece" : "pieces"} listed${needsConfirmation ? " · boutique confirmation needed before payment" : ""}` : "Currently out of stock"}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" disabled={!canAdd} onClick={() => { addToBag(product.id); setAddedId(product.id); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-rosepetal-wine px-5 py-3 text-sm font-semibold text-white hover:bg-rosepetal-wineHover disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine"><ShoppingBag className="h-4 w-4" aria-hidden="true" />Add to cart</button>
            <button type="button" disabled={!canBuy} onClick={() => { buyNow(product.id); router.push('/checkout'); }} className="inline-flex min-h-12 items-center justify-center rounded-md border border-rosepetal-wine bg-white px-5 py-3 text-sm font-semibold text-rosepetal-wine hover:bg-rosepetal-card disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">Buy now</button>
            <button type="button" aria-expanded={preBookOpen} aria-controls="product-pre-book" onClick={() => setPreBookOpen((open) => !open)} className="inline-flex min-h-12 items-center justify-center rounded-md border border-rosepetal-wine/50 bg-rosepetal-card px-5 py-3 text-sm font-semibold text-rosepetal-wine hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">Pre-book</button>
            <button type="button" onClick={() => toggleWishlist(product.id)} aria-pressed={isFavorited} aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} className={`inline-flex min-h-12 items-center justify-center rounded-md border px-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine ${isFavorited ? "border-rosepetal-wine bg-rosepetal-wine text-white" : "border-rosepetal-border bg-white text-rosepetal-wine hover:border-rosepetal-wine"}`}><Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} aria-hidden="true" /></button>
          </div>
          {!canBuy && <p className="mt-2 text-xs leading-5 text-rosepetal-muted">{stock < 1 ? "Buy now is unavailable for this size. You can request a pre-book." : "Buy now will open when secure checkout and the piece’s details are ready. You can save it in your cart or request a pre-book now."}</p>}
          {addedId === product.id && <p role="status" className="mt-3 text-sm text-rosepetal-wine">Added to your bag. <Link href="/bag" className="font-semibold underline underline-offset-4">Review bag</Link></p>}
          <div hidden={!preBookOpen}><PreBookPanel key={product.id} product={product} /></div>

          <dl className="mt-8 divide-y divide-rosepetal-border border-y border-rosepetal-border text-sm">
            {[["Size", product.size], ["Measurements", product.sizeMeasurements], ["Colour", product.color], ["Fabric", product.fabric], ["Care", product.care], ["Delivery", product.delivery], ["SKU", product.sku]].filter((entry): entry is string[] => Boolean(entry[1])).map(([label, value]) => <div key={label} className="grid grid-cols-[6rem_1fr] gap-3 py-3"><dt className="font-semibold text-rosepetal-wine">{label}</dt><dd className="leading-relaxed text-rosepetal-text">{value}</dd></div>)}
          </dl>
        </div>
      </article>
      <div className="mt-8 text-center"><Link href="/collections" className="inline-flex min-h-11 items-center gap-2 rounded px-3 py-2 text-sm font-semibold text-white underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Continue exploring</Link></div>
    </div>
  );
}
