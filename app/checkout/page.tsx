"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useBoutique } from "@/context/BoutiqueContext";
import { bagSubtotalPaise, formatINR, getBagLines } from "@/lib/commerce";
import { CheckoutCustomer, CheckoutQuote, createQuote, startPayment } from "@/lib/checkout";

const initialCustomer: CheckoutCustomer = { name: "", email: "", phone: "", addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "IN" };

const fields: { key: keyof Omit<CheckoutCustomer, "country">; label: string; autocomplete: string; type?: string; required?: boolean; pattern?: string }[] = [
  { key: "name", label: "Full name", autocomplete: "name", required: true },
  { key: "email", label: "Email", autocomplete: "email", type: "email", required: true },
  { key: "phone", label: "Phone", autocomplete: "tel", type: "tel", required: true, pattern: "[0-9+()\\s-]{10,20}" },
  { key: "addressLine1", label: "Address line 1", autocomplete: "address-line1", required: true },
  { key: "addressLine2", label: "Address line 2 (optional)", autocomplete: "address-line2" },
  { key: "city", label: "City", autocomplete: "address-level2", required: true },
  { key: "state", label: "State", autocomplete: "address-level1", required: true },
  { key: "postalCode", label: "PIN code", autocomplete: "postal-code", required: true, pattern: "[1-9][0-9]{5}" },
];

export default function CheckoutPage() {
  const { bag, storageReady } = useBoutique();
  const lines = getBagLines(bag);
  const [customer, setCustomer] = useState<CheckoutCustomer>(initialCustomer);
  const [quote, setQuote] = useState<CheckoutQuote | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const updateField = (key: keyof Omit<CheckoutCustomer, "country">, value: string) => {
    setCustomer((current) => ({ ...current, [key]: value }));
    setQuote(null);
    setError("");
  };

  const reviewOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const confirmed = await createQuote(bag, customer);
      setQuote(confirmed);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to review this order right now.");
    } finally { setBusy(false); }
  };

  const pay = async () => {
    if (!quote) return;
    setBusy(true);
    setError("");
    try {
      const paymentUrl = await startPayment(quote.quoteId);
      window.location.assign(paymentUrl);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Payment could not start. Please try again.");
      setBusy(false);
    }
  };

  return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
    <div className="mb-9 text-center"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FDE8C5]">Secure checkout</p><h1 className="mt-3 font-serif-luxury text-4xl text-white sm:text-6xl">Your details</h1><p className="mt-3 text-sm text-rose-100">Review the final itemised total before moving to the payment provider.</p></div>
    {!storageReady ? <p role="status" className="rounded-2xl bg-white p-8 text-center text-rosepetal-text">Loading checkout…</p> : lines.length === 0 ? <div className="mx-auto max-w-xl rounded-2xl bg-[#FFF9F7] p-8 text-center"><h2 className="font-serif-luxury text-3xl text-rosepetal-text">Your bag is empty</h2><Link href="/collections" className="mt-5 inline-block text-sm font-semibold text-rosepetal-wine underline underline-offset-4">Browse the collection</Link></div> : (
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start">
        <form id="checkout-details" onSubmit={reviewOrder} className="rounded-2xl border border-rosepetal-border bg-[#FFF9F7] p-5 shadow-lg sm:p-8">
          <h2 className="font-serif-luxury text-2xl text-rosepetal-text">Contact and delivery</h2>
          <p className="mt-2 text-sm text-rosepetal-muted">Delivery within India. Your details are used to fulfil the order and contact you about it.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">{fields.map((field) => <div key={field.key} className={field.key === "addressLine1" || field.key === "addressLine2" ? "sm:col-span-2" : ""}>
            <label htmlFor={`checkout-${field.key}`} className="mb-2 block text-sm font-semibold text-rosepetal-text">{field.label}{field.required ? " *" : ""}</label>
            <input id={`checkout-${field.key}`} name={field.key} type={field.type ?? "text"} autoComplete={field.autocomplete} required={field.required} pattern={field.pattern} maxLength={field.key === "addressLine1" || field.key === "addressLine2" ? 180 : 100} value={customer[field.key]} onChange={(event) => updateField(field.key, event.target.value)} className="min-h-12 w-full rounded-lg border border-rosepetal-border bg-white px-4 text-base text-rosepetal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" />
          </div>)}</div>
          <p className="mt-5 text-xs text-rosepetal-muted">Country: India. Final delivery charges are calculated by the checkout service from your PIN code.</p>
          {error && <p role="alert" className="mt-5 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
          <button type="submit" disabled={busy} className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-rosepetal-wine px-5 text-sm font-semibold text-white disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2">{busy && !quote ? "Checking availability…" : quote ? "Refresh order total" : "Review order total"} <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
        </form>
        <aside aria-label="Checkout summary" className="rounded-2xl border border-rosepetal-border bg-[#FFF9F7] p-6 shadow-lg lg:sticky lg:top-24">
          <h2 className="font-serif-luxury text-2xl text-rosepetal-text">Your order</h2>
          <ul className="mt-5 divide-y divide-rosepetal-border">{(quote?.lines ?? lines.map((line) => ({ productId: line.productId, name: line.product.name, size: line.size, quantity: line.quantity, unitPricePaise: line.unitPricePaise, totalPaise: line.totalPaise }))).map((line) => <li key={`${line.productId}:${line.size}`} className="flex justify-between gap-4 py-3 text-sm text-rosepetal-text"><span>{line.name} <span className="text-rosepetal-muted">· {line.size} × {line.quantity}</span></span><strong className="shrink-0">{formatINR(line.totalPaise)}</strong></li>)}</ul>
          <div className="mt-3 flex justify-between text-sm text-rosepetal-text"><span>Subtotal</span><strong>{formatINR(quote?.subtotalPaise ?? bagSubtotalPaise(bag))}</strong></div>
          <div className="mt-3 flex justify-between text-sm text-rosepetal-text"><span>Delivery</span><strong>{quote ? formatINR(quote.shippingPaise) : "Calculated after details"}</strong></div>
          {quote && <><div className="mt-5 flex justify-between border-t border-rosepetal-border pt-4 text-base text-rosepetal-text"><strong>Total</strong><strong>{formatINR(quote.totalPaise)}</strong></div><button type="button" onClick={pay} disabled={busy} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-rosepetal-wine px-4 text-sm font-semibold text-white disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2"><LockKeyhole className="h-4 w-4" aria-hidden="true" /> {busy ? "Opening payment…" : `Pay ${formatINR(quote.totalPaise)}`}</button><p className="mt-3 text-xs leading-relaxed text-rosepetal-muted">Payment opens with the provider. An order is confirmed only after the checkout service verifies payment.</p></>}
          <Link href="/bag" className="mt-5 block text-center text-sm font-semibold text-rosepetal-wine underline underline-offset-4">Edit bag</Link>
        </aside>
      </div>
    )}
  </div>;
}
