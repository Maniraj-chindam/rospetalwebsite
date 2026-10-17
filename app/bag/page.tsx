"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { useBoutique } from "@/context/BoutiqueContext";
import { bagSubtotalPaise, formatINR, getBagLines } from "@/lib/commerce";

export default function BagPage() {
  const { bag, storageReady, updateBagQuantity, removeFromBag } = useBoutique();
  const lines = getBagLines(bag);
  const subtotal = bagSubtotalPaise(bag);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="mb-8 text-center sm:mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FDE8C5]">Your selection</p>
        <h1 className="mt-3 font-serif-luxury text-4xl text-white sm:text-6xl">Your bag</h1>
        <p className="mt-3 text-sm text-rose-100">Review sizes and quantities before checkout.</p>
      </div>
      {!storageReady ? <p role="status" className="rounded-2xl bg-white p-8 text-center text-rosepetal-text">Loading your bag…</p> : lines.length === 0 ? (
        <div className="mx-auto max-w-xl rounded-2xl border border-rosepetal-border bg-[#FFF9F7] px-6 py-12 text-center shadow-lg">
          <h2 className="font-serif-luxury text-3xl text-rosepetal-text">Your bag is empty</h2>
          <p className="mt-3 text-sm leading-relaxed text-rosepetal-muted">Browse the collection for a piece you love. Styles awaiting confirmed price and availability can still be enquired about.</p>
          <Link href="/collections" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-rosepetal-wine px-6 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Explore the collection <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      ) : (
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <section aria-label="Bag items" className="overflow-hidden rounded-2xl border border-rosepetal-border bg-[#FFF9F7] shadow-lg">
            {lines.map((line) => <article key={`${line.productId}:${line.size}`} className="flex gap-4 border-b border-rosepetal-border p-4 last:border-0 sm:gap-6 sm:p-6">
              <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-rosepetal-card sm:h-40 sm:w-32"><Image src={line.product.image} alt={line.product.name} fill sizes="128px" className="object-cover" /></div>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-xs font-semibold uppercase tracking-widest text-rosepetal-wine">{line.product.category}</p>
                <h2 className="mt-1 font-serif-luxury text-xl text-rosepetal-text sm:text-2xl">{line.product.name}</h2>
                <p className="mt-1 text-sm text-rosepetal-muted">Size {line.size} · {formatINR(line.unitPricePaise)} each</p>
                <p className="mt-1 text-xs text-rosepetal-muted">Availability is checked again before payment.</p>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                  <div className="inline-flex items-center rounded-lg border border-rosepetal-border bg-white" aria-label={`Quantity for ${line.product.name}, size ${line.size}`}>
                    <button type="button" onClick={() => updateBagQuantity(line.productId, line.size, line.quantity - 1)} className="grid h-10 w-10 place-items-center rounded-l-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" aria-label={`Decrease quantity of ${line.product.name}`}><Minus className="h-4 w-4" aria-hidden="true" /></button>
                    <span aria-live="polite" className="min-w-7 text-center text-sm font-medium text-rosepetal-text">{line.quantity}</span>
                    <button type="button" disabled={line.quantity >= line.stock} onClick={() => updateBagQuantity(line.productId, line.size, line.quantity + 1)} className="grid h-10 w-10 place-items-center rounded-r-lg disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" aria-label={`Increase quantity of ${line.product.name}`}><Plus className="h-4 w-4" aria-hidden="true" /></button>
                  </div>
                  <div className="text-right"><p className="font-semibold text-rosepetal-text">{formatINR(line.totalPaise)}</p><button type="button" onClick={() => removeFromBag(line.productId, line.size)} className="mt-1 inline-flex min-h-9 items-center gap-1 text-xs text-rosepetal-wine underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine"><Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Remove</button></div>
                </div>
              </div>
            </article>)}
          </section>
          <aside aria-label="Order summary" className="rounded-2xl border border-rosepetal-border bg-[#FFF9F7] p-6 shadow-lg">
            <h2 className="font-serif-luxury text-2xl text-rosepetal-text">Order summary</h2>
            <div className="mt-5 flex justify-between border-b border-rosepetal-border pb-4 text-sm text-rosepetal-text"><span>Subtotal</span><strong>{formatINR(subtotal)}</strong></div>
            <p className="mt-4 text-xs leading-relaxed text-rosepetal-muted">Delivery charges and the final total will be shown before payment. Stock and prices are confirmed by the checkout service.</p>
            <Link href="/checkout" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-rosepetal-wine px-4 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2">Continue to checkout <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/collections" className="mt-4 block text-center text-sm font-semibold text-rosepetal-wine underline underline-offset-4">Continue shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
