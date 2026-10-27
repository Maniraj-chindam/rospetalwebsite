"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useBoutique } from "@/context/BoutiqueContext";
import { fetchPosCatalog } from "@/lib/pos-catalog";
import { quoteBag, type BagQuote } from "@/lib/checkout-quote";
import type { ProductItem } from "@/data/boutique-data";
import { assessBagProducts, customerVisibleCatalog, productReadinessIssues } from "@/lib/product-readiness";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export default function BagClient() {
  const { bag, setBagQuantity, removeFromBag } = useBoutique();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [catalogState, setCatalogState] = useState<"loading" | "ready" | "error">("loading");
  const [catalogRetry, setCatalogRetry] = useState(0);
  const [quote, setQuote] = useState<BagQuote | null>(null);
  const [quoteState, setQuoteState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [quoteError, setQuoteError] = useState("");
  const [quoteRetry, setQuoteRetry] = useState(0);
  const [deliveryPincode, setDeliveryPincode] = useState("");
  const [checkedPincode, setCheckedPincode] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setCatalogState("loading");
    fetchPosCatalog(controller.signal).then((items) => { setProducts(customerVisibleCatalog(items)); setCatalogState("ready"); }).catch(() => { if (!controller.signal.aborted) setCatalogState("error"); });
    return () => controller.abort();
  }, [catalogRetry]);
  useEffect(() => {
    if (bag.length === 0) { setQuote(null); setQuoteState("idle"); return; }
    const controller = new AbortController();
    setQuote(null); setQuoteError(""); setQuoteState("loading");
    quoteBag(bag, checkedPincode, controller.signal).then((value) => { setQuote(value); setQuoteState("ready"); }).catch((error) => { if (!controller.signal.aborted) { setQuoteError(error instanceof Error ? error.message : "The bag could not be checked."); setQuoteState("error"); } });
    return () => controller.abort();
  }, [bag, checkedPincode, quoteRetry]);
  useEffect(() => {
    if (!quote) return;
    const refresh = () => { if (document.visibilityState === "visible" && Date.now() >= Date.parse(quote.expiresAt)) setQuoteRetry((value) => value + 1); };
    const timer = window.setTimeout(refresh, Math.max(1000, Date.parse(quote.expiresAt) - Date.now()));
    document.addEventListener("visibilitychange", refresh);
    return () => { window.clearTimeout(timer); document.removeEventListener("visibilitychange", refresh); };
  }, [quote]);

  const byId = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);
  const quotedById = useMemo(() => new Map(quote?.items.map((item) => [item.productId, item]) ?? []), [quote]);
  const bagReadiness = useMemo(() => assessBagProducts(bag, products), [bag, products]);
  const paymentTestOnly = quote?.checkoutMode === 'payment_test';
  const hasMissing = catalogState === "ready" && bagReadiness.missingIds.length > 0;
  const hasUnconfirmed = catalogState === "ready" && bagReadiness.unconfirmedIds.length > 0;

  return <div className="min-h-[70dvh] bg-rosepetal-deep-pink px-4 pb-20 pt-28 text-rosepetal-text sm:px-6 sm:pt-32">
    <div className="mx-auto max-w-6xl">
      <Link href="/collections" className="inline-flex items-center gap-2 text-sm font-medium text-white/90 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><ArrowLeft className="size-4" /> Continue exploring</Link>
      <div className="mb-8 mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/25 pb-6 text-white">
        <div><p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-rose-100">THE ROSEPETAL EDIT</p><h1 className="mt-2 font-serif-luxury text-4xl sm:text-5xl">Your bag</h1></div>
        <p className="text-sm text-rose-100">{bag.reduce((total, item) => total + item.qty, 0)} {bag.reduce((total, item) => total + item.qty, 0) === 1 ? "piece" : "pieces"}</p>
      </div>
      {bag.length === 0 ? <div className="rounded-2xl bg-[#FFF9F7] px-6 py-16 text-center shadow-xl"><ShoppingBag className="mx-auto size-9 text-rosepetal-wine" /><h2 className="mt-5 font-serif-luxury text-3xl">Your next favourite piece is waiting.</h2><p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-rosepetal-muted">Browse the current edit and save the pieces you love here.</p><Link href="/collections" className="mt-7 inline-flex rounded-full bg-rosepetal-wine px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-rosepetal-wineHover">Explore the collection</Link></div> :
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section aria-label="Pieces in your bag" className="self-start overflow-hidden rounded-2xl bg-[#FFF9F7] shadow-xl">
            {catalogState === "error" && <div role="alert" className="border-b border-rosepetal-border p-5 text-sm">Current product details could not load. <button className="font-semibold text-rosepetal-wine underline" onClick={() => setCatalogRetry((value) => value + 1)}>Retry</button></div>}
            {bag.map((line) => { const product = byId.get(line.productId), priced = quotedById.get(line.productId), available = product?.availableStock ?? 0; return <article key={line.productId} className="grid grid-cols-[84px_minmax(0,1fr)] gap-4 border-b border-rosepetal-border/70 p-4 last:border-0 sm:grid-cols-[112px_minmax(0,1fr)] sm:p-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-rosepetal-card">{product && <Image src={product.image} alt={product.name} fill sizes="112px" className="object-cover" />}</div>
              <div className="flex min-w-0 flex-col justify-between gap-3"><div className="flex items-start justify-between gap-3"><div><h2 className="font-serif-luxury text-lg sm:text-xl">{product ? <Link href={`/product?id=${encodeURIComponent(product.id)}`} className="hover:text-rosepetal-wine hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-rosepetal-wine">{product.name}</Link> : catalogState === "loading" ? "Checking piece…" : "This piece is no longer listed"}</h2>{product && <p className="mt-1 text-xs text-rosepetal-muted">{[product.size, product.color, product.sku].filter(Boolean).join(" · ")}</p>}{catalogState === "ready" && !product && <p className="mt-1 text-xs text-rosepetal-wine">Remove this piece to update your bag.</p>}</div><button type="button" onClick={() => removeFromBag(line.productId)} aria-label={`Remove ${product?.name ?? "piece"}`} className="rounded-full p-2 text-rosepetal-muted hover:bg-rosepetal-card hover:text-rosepetal-wine focus-visible:outline focus-visible:outline-2 focus-visible:outline-rosepetal-wine"><Trash2 className="size-4" /></button></div>
                <div className="flex flex-wrap items-end justify-between gap-3"><div><span className="block text-[10px] font-semibold uppercase tracking-widest text-rosepetal-muted">Quantity</span><div className="mt-1 inline-flex items-center rounded-full border border-rosepetal-border"><button type="button" onClick={() => line.qty === 1 ? removeFromBag(line.productId) : setBagQuantity(line.productId, line.qty - 1)} aria-label={`Decrease ${product?.name ?? "piece"} quantity`} className="min-h-10 min-w-10 rounded-l-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-rosepetal-wine"><Minus className="mx-auto size-3.5" /></button><span className="min-w-7 text-center text-sm">{line.qty}</span><button type="button" onClick={() => setBagQuantity(line.productId, line.qty + 1)} disabled={line.qty >= 10 || (catalogState === "ready" && line.qty >= available)} aria-label={`Increase ${product?.name ?? "piece"} quantity`} className="min-h-10 min-w-10 rounded-r-full disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rosepetal-wine"><Plus className="mx-auto size-3.5" /></button></div></div><div className="text-right"><strong className="text-sm text-rosepetal-wine">{priced ? currency.format(priced.lineTotalPaise / 100) : "Checking price"}</strong>{catalogState === "ready" && product && available < line.qty && <p className="mt-1 text-xs text-red-700">Only {available} available</p>}</div></div>
              </div>
            </article>; })}
          </section>
          <aside className="h-fit rounded-2xl border border-white/60 bg-[#FFF9F7] p-6 shadow-xl lg:sticky lg:top-28">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rosepetal-wine">ORDER SUMMARY</p><h2 className="mt-2 font-serif-luxury text-2xl">The pieces you chose</h2>
            {!paymentTestOnly&&<form className="mt-5" onSubmit={event => { event.preventDefault(); if (/^[1-9][0-9]{5}$/.test(deliveryPincode)) { if (checkedPincode === deliveryPincode) setQuoteRetry(value => value + 1); else setCheckedPincode(deliveryPincode); } }}>
              <label htmlFor="delivery-pin" className="block text-xs font-semibold text-rosepetal-wine">Delivery PIN code</label>
              <div className="mt-2 flex gap-2"><input id="delivery-pin" inputMode="numeric" autoComplete="postal-code" pattern="[1-9][0-9]{5}" maxLength={6} value={deliveryPincode} onChange={event => { setDeliveryPincode(event.target.value.replace(/\D/g, "").slice(0, 6)); setCheckedPincode(""); }} placeholder="6-digit India PIN" className="min-w-0 flex-1 rounded-lg border border-rosepetal-border bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-rosepetal-wine"/><button type="submit" className="rounded-lg bg-rosepetal-wine px-4 py-2 text-xs font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">Check</button></div>
            </form>}{paymentTestOnly&&<p role="status" className="mt-5 text-sm leading-6">₹1 Razorpay payment test only. No delivery charge or physical shipment. Other products cannot be checked out.</p>}
            {quoteState === "loading" && <p role="status" className="mt-6 text-sm text-rosepetal-muted">Checking live prices and availability…</p>}
            {quoteState === "error" && <div role="alert" className="mt-6 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">{quoteError}<button onClick={() => setQuoteRetry((value) => value + 1)} className="ml-2 font-semibold underline">Check again</button></div>}
            {quote && <><dl className="mt-6 space-y-3 border-y border-rosepetal-border py-4 text-sm"><div className="flex justify-between gap-3"><dt>Pieces</dt><dd>{currency.format(quote.subtotalPaise / 100)}</dd></div><div className="flex justify-between gap-3 text-rosepetal-muted"><dt>Delivery estimate</dt><dd>{paymentTestOnly ? 'Not required — payment test' : quote.deliveryQuote ? currency.format(quote.deliveryQuote.estimatedChargePaise / 100) : quote.deliveryStatus === "pin_required" ? "Enter PIN above" : "Unavailable"}</dd></div></dl><p className="mt-4 flex justify-between font-serif-luxury text-xl"><span>Pieces subtotal</span><strong>{currency.format(quote.subtotalPaise / 100)}</strong></p>{quote.deliveryQuote ? <p role="status" className="mt-3 text-xs leading-relaxed text-rosepetal-muted">Estimated courier charge via {quote.deliveryQuote.courierName}{quote.deliveryQuote.estimatedDeliveryDays ? ` · about ${quote.deliveryQuote.estimatedDeliveryDays} days after dispatch` : ""}. Final delivery charge and total will be confirmed at checkout.</p> : checkedPincode && <p role="status" className="mt-3 text-xs leading-relaxed text-rosepetal-muted">{quote.deliveryStatus === "approval_required" ? quote.reason : quote.deliveryStatus === "packaging_required" ? "Delivery estimate is pending packed measurements for this piece." : quote.deliveryStatus === "unserviceable" ? "No courier currently serves this PIN from our pickup location." : "A live delivery estimate is unavailable right now. Please try again later."}</p>}</>}
            {hasUnconfirmed ? <div role="status" className="mt-6 rounded-lg border border-rosepetal-wine/20 bg-rosepetal-card p-4 text-sm leading-relaxed"><strong>These pieces are unavailable for checkout or out of stock.</strong><ul className="mt-3 space-y-3 text-rosepetal-muted">{bagReadiness.unconfirmedIds.map((id) => { const product = byId.get(id); if (!product) return null; return <li key={id}><Link href={`/product?id=${encodeURIComponent(id)}`} className="font-semibold text-rosepetal-wine underline underline-offset-2">{product.name}{product.size ? ` · ${product.size}` : ""}{product.color ? ` · ${product.color}` : ""}</Link><ul className="mt-1 list-inside list-disc">{productReadinessIssues(product, products).map((issue) => <li key={issue}>{issue}</li>)}</ul></li>; })}</ul>{quote?.deliveryStatus === "packaging_required" && <p className="mt-3 text-rosepetal-muted">The boutique must also confirm packed dimensions before delivery can be priced.</p>}</div> : !quote?.checkoutAvailable && <div className="mt-6 rounded-lg border border-rosepetal-wine/20 bg-rosepetal-card p-4 text-sm leading-relaxed"><strong>Secure checkout is currently unavailable.</strong><p className="mt-2 text-rosepetal-muted">Your bag is saved on this device. A live delivery estimate and payment availability are required before checkout.</p></div>}
            {quote?.checkoutAvailable && quote.totalPaise !== null && (checkedPincode || paymentTestOnly) && !hasMissing && !hasUnconfirmed ? <Link href="/checkout" className="mt-5 block w-full rounded-lg bg-rosepetal-wine px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white hover:bg-rosepetal-wineHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">Continue to secure checkout · {currency.format(quote.totalPaise / 100)}</Link> : <button type="button" disabled aria-disabled="true" className="mt-5 w-full rounded-lg bg-rosepetal-wine px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white opacity-55">Continue to secure checkout</button>}
            <Link href="/contact" className="mt-4 block text-center text-xs font-semibold text-rosepetal-wine underline underline-offset-4">Need help with a piece? Contact the boutique</Link>
            {hasMissing && <p role="alert" className="mt-4 text-xs text-red-700">One or more pieces are no longer in the live collection. Remove them before checkout.</p>}
          </aside>
        </div>}
    </div>
  </div>;
}
