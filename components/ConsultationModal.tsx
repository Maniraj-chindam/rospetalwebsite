"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { useBoutique } from "@/context/BoutiqueContext";
import { sendEnquiry } from "@/lib/enquiry";

export default function ConsultationModal() {
  const { isConsultationOpen, setIsConsultationOpen } = useBoutique();
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", occasion: "", date: "", notes: "" });

  useEffect(() => {
    if (!isConsultationOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsConsultationOpen(false);
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, textarea"));
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onEscape);
    return () => { document.removeEventListener("keydown", onEscape); previousFocus?.focus(); };
  }, [isConsultationOpen, setIsConsultationOpen]);

  if (!isConsultationOpen) return null;

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await sendEnquiry({ type: "consultation", name: form.name, email: form.email, phone: form.phone, preferredDate: form.date || undefined, message: `Occasion: ${form.occasion || "Not specified"}\nNotes: ${form.notes || "None"}` });
      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The request could not be sent. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div ref={dialogRef} className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4" role="dialog" aria-modal="true" aria-label="Request a design consultation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsConsultationOpen(false); }}>
      <div className="relative max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-y-auto rounded-2xl border border-rosepetal-border bg-[#FFF9F7] p-6 shadow-2xl sm:p-8">
        <button type="button" onClick={() => setIsConsultationOpen(false)} className="absolute right-4 top-4 rounded-full p-2 text-rosepetal-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" aria-label="Close consultation form"><X className="h-5 w-5" /></button>
        {status === "success" ? <div role="status" className="py-10 text-center"><CheckCircle2 className="mx-auto h-10 w-10 text-rosepetal-wine" /><h2 className="mt-4 font-serif-luxury text-3xl text-rosepetal-text">Request received</h2><p className="mt-3 text-sm leading-relaxed text-rosepetal-muted">Thank you, {form.name}. The boutique will contact you to discuss your preferred date and design ideas.</p><button type="button" onClick={() => setIsConsultationOpen(false)} className="mt-6 min-h-11 rounded-lg bg-rosepetal-wine px-6 text-sm font-semibold text-white">Close</button></div> : <>
          <h2 className="pr-8 font-serif-luxury text-3xl text-rosepetal-text">Request a consultation</h2>
          <p className="mt-2 text-sm leading-relaxed text-rosepetal-muted">Tell us about your occasion and preferred date. This is a request; the boutique will confirm availability.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div><label htmlFor="consult-name" className="mb-1 block text-sm font-medium text-rosepetal-text">Full name *</label><input id="consult-name" autoComplete="name" required maxLength={100} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="min-h-11 w-full rounded-lg border border-rosepetal-border bg-white px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" /></div>
            <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="consult-email" className="mb-1 block text-sm font-medium text-rosepetal-text">Email *</label><input id="consult-email" type="email" autoComplete="email" required maxLength={150} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="min-h-11 w-full rounded-lg border border-rosepetal-border bg-white px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" /></div><div><label htmlFor="consult-phone" className="mb-1 block text-sm font-medium text-rosepetal-text">Phone *</label><input id="consult-phone" type="tel" autoComplete="tel" required maxLength={30} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="min-h-11 w-full rounded-lg border border-rosepetal-border bg-white px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" /></div></div>
            <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="consult-occasion" className="mb-1 block text-sm font-medium text-rosepetal-text">Occasion or garment</label><input id="consult-occasion" maxLength={100} value={form.occasion} onChange={(event) => setForm({ ...form, occasion: event.target.value })} className="min-h-11 w-full rounded-lg border border-rosepetal-border bg-white px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" /></div><div><label htmlFor="consult-date" className="mb-1 block text-sm font-medium text-rosepetal-text">Preferred date</label><input id="consult-date" type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="min-h-11 w-full rounded-lg border border-rosepetal-border bg-white px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" /></div></div>
            <div><label htmlFor="consult-notes" className="mb-1 block text-sm font-medium text-rosepetal-text">Style notes</label><textarea id="consult-notes" rows={3} maxLength={3000} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="w-full rounded-lg border border-rosepetal-border bg-white px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" /></div>
            {error && <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
            <button type="submit" disabled={status === "sending"} className="min-h-12 w-full rounded-lg bg-rosepetal-wine px-4 text-sm font-semibold text-white disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine">{status === "sending" ? "Sending…" : "Send consultation request"}</button>
          </form>
        </>}
      </div>
    </div>
  );
}
