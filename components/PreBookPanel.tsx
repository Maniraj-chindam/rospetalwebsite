"use client";

import { useState, type FormEvent } from "react";
import type { ProductItem } from "@/data/boutique-data";
import { useEnquirySubmission } from "@/hooks/useEnquirySubmission";

const fieldClass = "mt-1 block w-full rounded-md border border-rosepetal-border bg-white px-3 py-2 text-base font-normal text-rosepetal-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine";

export default function PreBookPanel({ product }: { product: ProductItem }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });
  const { submitting, error, reference, submit } = useEnquirySubmission();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const note = form.note.trim();
    void submit({
      kind: product.prebookOnly ? "prebook" : "contact",
      ...(product.prebookOnly ? { productId: product.id } : {}),
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: product.prebookOnly ? note : `Pre-book request for ${product.name} (SKU ${product.sku ?? product.id}), size ${product.size || "not specified"}, colour ${product.color || "not specified"}.${note ? ` Customer note: ${note}` : ""} No payment or stock reservation has been made.`,
    });
  };

  return (
    <section id="product-pre-book" aria-label="Pre-book request" className="mt-5 rounded-xl border border-rosepetal-border bg-white p-5 shadow-sm">
      {reference ? (
        <div role="status" className="space-y-2 text-sm">
          <h2 className="font-serif-luxury text-xl text-rosepetal-wine">Request received</h2>
          <p>The boutique received your pre-book request. Keep reference <strong>{reference}</strong> for follow-up.</p>
          <p>No payment was taken and no stock was reserved. The boutique will confirm availability with you.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h2 className="font-serif-luxury text-xl text-rosepetal-wine">Request this piece</h2>
            <p className="mt-1 text-xs leading-5 text-rosepetal-muted">The boutique will confirm the selected size, availability and next steps. This request takes no payment and does not reserve stock.</p>
            {product.prebookOnly && <p className="mt-3 rounded-md bg-rosepetal-card p-3 text-sm text-rosepetal-text">{product.name} · {product.size || "No size"} · {product.color || "No colour"} · SKU {product.sku}</p>}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold text-rosepetal-text">Your name
              <input required minLength={2} maxLength={100} autoComplete="name" disabled={submitting} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className={fieldClass} />
            </label>
            <label className="text-xs font-semibold text-rosepetal-text">Email
              <input required type="email" maxLength={254} autoComplete="email" disabled={submitting} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className={fieldClass} />
            </label>
            <label className="text-xs font-semibold text-rosepetal-text sm:col-span-2">Phone
              <input required type="tel" pattern="[+0-9 ()-]{8,20}" maxLength={30} autoComplete="tel" disabled={submitting} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className={fieldClass} />
            </label>
            <label className="text-xs font-semibold text-rosepetal-text sm:col-span-2">Note (optional)
              <textarea maxLength={500} rows={3} disabled={submitting} value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} className={fieldClass} />
            </label>
          </div>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={submitting} className="min-h-11 w-full rounded-md bg-rosepetal-wine px-5 py-3 text-sm font-semibold text-white disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">
            {submitting ? "Sending request…" : "Send pre-book request"}
          </button>
        </form>
      )}
    </section>
  );
}
