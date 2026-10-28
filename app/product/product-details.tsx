"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import type { ProductItem } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";
import PreBookPanel from "@/components/PreBookPanel";
import { fetchPosCatalog, groupCatalogByStyle } from "@/lib/pos-catalog";
import ProductPrice from "@/components/ProductPrice";
import VariantSelector from "@/components/VariantSelector";
import { customerVisibleCatalog, productReadinessIssues } from "@/lib/product-readiness";

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") ?? "";
  const router = useRouter();
  const { wishlist, toggleWishlist, bag, addToBag, buyNow } = useBoutique();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [retryKey, setRetryKey] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [preBookOpen, setPreBookOpen] = useState(searchParams.get("prebook") === "1");

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
  const displayImage = product ? (selectedImage && photos.includes(selectedImage) ? selectedImage : photos[0] ?? product.image) : "";
  const bagQty = bag.find((line) => line.productId === productId)?.qty ?? 0;
  const stock = product?.availableStock ?? 0;
  const readinessIssues = product ? productReadinessIssues(product, products) : [];
  const needsConfirmation = readinessIssues.length > 0;
  const canAdd = Boolean(product) && product?.prebookOnly !== true && stock > 0 && bagQty < Math.min(10, stock) && (bagQty > 0 || bag.length < 20);
  const canBuy = Boolean(product) && product?.prebookOnly !== true && stock > 0 && product?.checkoutAllowed === true;
  const canPayPrebook = Boolean(product?.prebookOnly) && stock > 0 && product?.checkoutAllowed === true;
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
      ? `Explore ${product.name} at Rosepetal. Review the available options and confirm any outstanding details with the boutique.`
      : (product.description ?? "").slice(0, 155);
    return () => { canonical.remove(); };
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

  const photoAlt = readinessIssues.some((issue) => issue.includes("individual photo"))
    ? `${product.name} colour options shown together`
    : `${product.name}${product.color ? ` in ${product.color}` : ""}`;
  const details = [
    ["Size", product.size],
    ["Measurements", product.sizeMeasurements],
    ["Colour", product.color],
    ["Fabric", product.fabric],
    ["Care", product.care],
    ["Delivery", product.delivery],
    ["SKU", product.sku],
  ].filter((entry): entry is string[] => Boolean(entry[1]));

  return (
    <div className="min-h-screen bg-[#fbf7f3] pt-16 text-[#35292c] sm:pt-20">
      <div className="mx-auto max-w-[1500px] px-4 pb-20 sm:px-6 lg:px-10">
        <nav aria-label="Breadcrumb" className="flex min-h-20 flex-wrap items-center gap-2 py-5 text-xs text-[#786b6e] sm:gap-3">
          <Link href="/collections" className="inline-flex items-center gap-1 text-[#681b32] hover:underline"><ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Shop</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/collections?category=${encodeURIComponent(product.category)}`} className="hover:underline">{product.category}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="max-w-[13rem] truncate text-[#35292c] sm:max-w-[25rem]">{product.name}</span>
        </nav>

        <article>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] lg:gap-10 xl:gap-16">
            <section aria-label="Product photographs" className="min-w-0">
              <div className={`grid gap-3 lg:gap-4 ${photos.length > 1 ? "lg:grid-cols-[70px_minmax(0,1fr)]" : "grid-cols-1"}`}>
                {photos.length > 1 && (
                  <div aria-label="Choose product photo" className="order-2 flex gap-2 overflow-x-auto pb-2 lg:order-1 lg:flex-col lg:overflow-visible">
                    {photos.map((photo, index) => (
                      <button
                        key={photo}
                        type="button"
                        onClick={() => setSelectedImage(photo)}
                        aria-label={`Show photo ${index + 1} of ${product.name}`}
                        aria-pressed={displayImage === photo}
                        className={`relative h-24 w-[74px] shrink-0 overflow-hidden rounded-sm border-2 bg-[#e9dfdc] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine ${displayImage === photo ? "border-[#681b32]" : "border-transparent hover:border-[#b98c97]"}`}
                      >
                        <Image src={photo} alt="" fill sizes="74px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
                <div className="relative order-1 aspect-[4/5] min-w-0 overflow-hidden bg-[#e9dfdc] lg:order-2">
                  <Image src={displayImage} alt={photoAlt} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain" />
                  <span className="absolute bottom-4 left-4 bg-[#fbf7f3]/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#681b32] sm:bottom-6 sm:left-6">
                    {String(Math.max(0, photos.indexOf(displayImage)) + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </section>

            <section aria-label="Choose this piece" className="min-w-0 lg:pt-3">
              <div className="flex items-start justify-between gap-4">
                <p className="pt-2 text-[11px] font-semibold uppercase tracking-[0.27em] text-[#8e4056]">{product.websiteType || product.category}</p>
                <button type="button" onClick={() => toggleWishlist(product.id)} aria-pressed={isFavorited} aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} className={`flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine ${isFavorited ? "border-[#681b32] bg-[#681b32] text-white" : "border-[#d6bfc2] bg-white text-[#681b32] hover:border-[#681b32]"}`}>
                  <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} aria-hidden="true" />
                </button>
              </div>
              <h1 className="mt-4 max-w-[680px] font-serif-luxury text-[clamp(2.7rem,4.5vw,5rem)] font-light leading-[.98] tracking-[-0.025em] text-[#4d1c2d]">{product.name}</h1>
              <div className="mt-6 flex flex-wrap items-end gap-4">
                <p className="font-serif-luxury text-[clamp(2rem,3vw,3rem)] leading-none text-[#681b32]"><ProductPrice product={product} /></p>
              </div>

              <div className="mt-8 border-y border-[#dfcdca] py-4">
                <p role="status" className="flex items-center gap-3 text-sm font-medium text-[#4f3c40]">
                  <span className={`size-2 shrink-0 rounded-full ${stock > 0 ? "bg-[#598568]" : "bg-[#aa707c]"}`} aria-hidden="true" />
                  {product.prebookOnly
                    ? canPayPrebook ? "Prebook · check delivery at checkout" : "Available by prebook request · the boutique will confirm availability"
                    : stock > 0 ? `${stock} ${stock === 1 ? "piece" : "pieces"} available${!canBuy ? " · checkout is being prepared" : ""}` : "Currently out of stock"}
                </p>
              </div>

              {variants.length > 1 && (
                <div className="mt-7">
                  <VariantSelector variants={variants} selected={product} onSelect={(item) => { setSelectedImage(null); setAddedId(null); setPreBookOpen(false); router.replace(`/product?id=${encodeURIComponent(item.id)}`, { scroll: false }); }} />
                </div>
              )}

              <div className="mt-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  {!product.prebookOnly && <button type="button" disabled={!canAdd} onClick={() => { addToBag(product.id); setAddedId(product.id); }} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-sm bg-[#681b32] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#832a48] disabled:cursor-not-allowed disabled:opacity-50"><ShoppingBag className="h-4 w-4" aria-hidden="true" />Add to cart</button>}
                  {!product.prebookOnly && <button type="button" disabled={!canBuy} onClick={() => { buyNow(product.id); router.push("/checkout"); }} className="inline-flex min-h-14 items-center justify-center rounded-sm border border-[#681b32] bg-transparent px-6 py-4 text-sm font-semibold text-[#681b32] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50">Buy now</button>}
                  {product.prebookOnly && <button type="button" {...(!canPayPrebook ? { "aria-expanded": preBookOpen, "aria-controls": "product-pre-book" } : {})} onClick={() => { if (canPayPrebook) { buyNow(product.id); router.push("/checkout"); } else setPreBookOpen((open) => !open); }} className="inline-flex min-h-14 items-center justify-center rounded-sm bg-[#681b32] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#832a48] sm:col-span-2">Prebook</button>}
                </div>
                {product.prebookOnly
                  ? <p className="mt-3 text-xs leading-6 text-[#786b6e]">{canPayPrebook ? "Continue to checkout to review your order details." : "Send a request for this size and colour. The boutique will follow up; no payment or stock hold is made."}</p>
                  : !canBuy && <p className="mt-3 text-xs leading-6 text-[#786b6e]">{stock < 1 ? "Buy now is unavailable for this size. Contact the boutique about availability." : "Buy now will open when secure checkout is ready for this piece. You can save it in your cart or contact the boutique."}</p>}
                {addedId === product.id && <p role="status" className="mt-3 text-sm text-[#681b32]">Added to your bag. <Link href="/bag" className="font-semibold underline underline-offset-4">Review bag</Link></p>}
                {product.prebookOnly && !canPayPrebook && <div hidden={!preBookOpen}><PreBookPanel key={product.id} product={product} /></div>}
              </div>

              <div className="mt-8 border-t border-[#dfcdca] pt-6">
                <a href="#product-information" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#681b32] underline decoration-[#a85a70] underline-offset-8">Explore details & care <ArrowUpRight className="size-4" aria-hidden="true" /></a>
                {needsConfirmation && <p className="mt-4 text-xs leading-6 text-[#786b6e]">Some product details still need boutique confirmation. <a href="#product-note" className="font-semibold text-[#681b32] underline underline-offset-2">Review the notice</a> before ordering.</p>}
              </div>
            </section>
          </div>

          <section id="product-information" aria-labelledby="product-information-heading" className="mt-16 grid scroll-mt-28 gap-10 border-t border-[#dfcdca] pt-14 lg:mt-24 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.27em] text-[#8e4056]">The finer details</p>
              <h2 id="product-information-heading" className="mt-4 font-serif-luxury text-5xl font-light leading-none text-[#4d1c2d] sm:text-6xl">About this piece</h2>
              {product.description && <p className="mt-7 max-w-xl whitespace-pre-line text-sm leading-8 text-[#67575a] sm:text-base">{product.description}</p>}
            </div>
            <div>
              <dl className="border-t border-[#dfcdca]">
                {details.map(([label, value]) => (
                  <div key={label} className="grid gap-2 border-b border-[#dfcdca] py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8e4056]">{label}</dt>
                    <dd className="whitespace-pre-line text-sm leading-7 text-[#4f4245]">{value}</dd>
                  </div>
                ))}
              </dl>
              {needsConfirmation && (
                <div id="product-note" role="status" className="mt-8 scroll-mt-28 border-l-2 border-[#a85a70] bg-[#f5eae7] p-5 text-sm leading-7 text-[#4f4245]">
                  <h3 className="font-semibold text-[#681b32]">Details being confirmed</h3>
                  <p className="mt-1">Review these details with the boutique if they matter for your order.</p>
                  <ul className="mt-2 list-inside list-disc">{readinessIssues.map((issue) => <li key={issue}>{issue}</li>)}</ul>
                </div>
              )}
            </div>
          </section>
        </article>
        <div className="mt-16 border-t border-[#dfcdca] pt-8">
          <Link href="/collections" className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.17em] text-[#681b32] underline underline-offset-8"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Continue exploring</Link>
        </div>
      </div>
    </div>
  );
}
