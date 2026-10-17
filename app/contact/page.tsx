"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { sendEnquiry } from "@/lib/enquiry";

export default function ContactPage() {
  const [piece, setPiece] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const selectedPiece = new URLSearchParams(window.location.search).get("piece");
    if (selectedPiece) setPiece(selectedPiece.slice(0, 120));
  }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await sendEnquiry({ type: piece ? "piece" : "contact", ...form, piece: piece || undefined });
      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Your enquiry could not be sent. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FDE8C5]">Rosepetal Designer Boutique</p>
        <h1 className="mt-3 font-serif-luxury text-4xl text-white sm:text-6xl">Start a conversation</h1>
        <p className="mt-4 text-sm leading-relaxed text-rose-100 sm:text-base">Ask about a style, a custom piece or a consultation. Share the details below and we will respond after reviewing your enquiry.</p>
      </div>
      <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-rosepetal-border bg-[#FFF9F7] p-6 shadow-xl sm:p-10">
        {status === "success" ? (
          <div role="status" className="py-12 text-center">
            <CheckCircle2 className="mx-auto h-11 w-11 text-rosepetal-wine" aria-hidden="true" />
            <h2 className="mt-4 font-serif-luxury text-3xl text-rosepetal-text">Enquiry received</h2>
            <p className="mt-3 text-sm leading-relaxed text-rosepetal-muted">Thank you, {form.name}. Your message has been submitted. The boutique will follow up using the details you supplied.</p>
            <button type="button" onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", message: "" }); setPiece(""); }} className="mt-6 min-h-11 rounded-lg px-4 text-sm font-semibold text-rosepetal-wine underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine">Send another enquiry</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <h2 className="font-serif-luxury text-2xl text-rosepetal-text">Your enquiry</h2>
            {piece && <div className="rounded-lg border border-rosepetal-border bg-rosepetal-blushLight/30 p-3 text-sm text-rosepetal-text">About: <strong>{piece}</strong></div>}
            <div><label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-rosepetal-text">Full name *</label><input id="contact-name" name="name" autoComplete="name" required maxLength={100} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="min-h-12 w-full rounded-lg border border-rosepetal-border bg-white px-4 text-base text-rosepetal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" /></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div><label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-rosepetal-text">Email *</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={150} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="min-h-12 w-full rounded-lg border border-rosepetal-border bg-white px-4 text-base text-rosepetal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" /></div>
              <div><label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-rosepetal-text">Phone (optional)</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="min-h-12 w-full rounded-lg border border-rosepetal-border bg-white px-4 text-base text-rosepetal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" /></div>
            </div>
            <div><label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-rosepetal-text">How can we help? *</label><textarea id="contact-message" name="message" rows={5} required maxLength={3000} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="w-full rounded-lg border border-rosepetal-border bg-white px-4 py-3 text-base text-rosepetal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" /></div>
            {error && <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
            <button type="submit" disabled={status === "sending"} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-rosepetal-wine px-6 text-sm font-semibold text-white disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2">{status === "sending" ? "Sending…" : "Send enquiry"}<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
            <p className="text-xs leading-relaxed text-rosepetal-muted">We use your details only to respond to this enquiry. Please do not include payment information.</p>
          </form>
        )}
      </div>
      <div className="mt-8 text-center"><Link href="/collections" className="text-sm font-medium text-white underline underline-offset-4">Browse styles</Link></div>
    </div>
  );
}
