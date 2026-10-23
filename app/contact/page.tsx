"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { CONTACT_INFO } from "@/data/boutique-data";
import { useEnquirySubmission } from "@/hooks/useEnquirySubmission";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { submitting, error, reference, submit, reset } = useEnquirySubmission();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submit({ kind: "contact", name: form.name, email: form.email, message: form.message });
  };
  const whatsappMessage = `Hello Rosepetal, I have an enquiry.\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;

  return (
    <div className="pb-10 pt-24 sm:pb-12 sm:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
        <h1 className="font-serif-luxury text-4xl sm:text-5xl text-white font-normal drop-shadow-sm">
          Get in Touch
        </h1>

        <p className="text-[11px] uppercase tracking-[0.25em] text-[#FDE8C5] font-semibold">
          WE&apos;D LOVE TO HEAR FROM YOU
        </p>

        <p className="text-xs sm:text-sm text-rose-100 max-w-lg mx-auto leading-relaxed font-sans font-light">
          Whether you have a question, a custom order request, or just want to say hello — we&apos;re here for you.
        </p>
      </div>

      {/* Main Grid: Details on Left, Form on Right (matching mockup) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
        {/* Left Column: Contact Details & Floral Accent */}
        <div className="lg:col-span-5 space-y-8 relative bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/60 shadow-md">
          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-rosepetal-blushLight/70 flex items-center justify-center text-rosepetal-wine flex-shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-rosepetal-text">
                  Call Us
                </h4>
                <a
                  href={`tel:${CONTACT_INFO.phoneDial}`}
                  className="text-xs text-rosepetal-muted hover:text-rosepetal-wine transition-colors font-sans"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
            <div className="pl-14 text-xs"><span className="block font-semibold uppercase tracking-[0.16em] text-rosepetal-text">Email</span><a href={`mailto:${CONTACT_INFO.email}`} className="mt-1 inline-block text-rosepetal-muted underline-offset-2 hover:text-rosepetal-wine hover:underline">{CONTACT_INFO.email}</a></div>

          </div>

          {/* Floral Bouquet Artwork (matching the pink floral cluster in the mockup) */}
          <div className="relative pt-6 max-w-[280px]">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-rosepetal-border/60">
              <Image
                src="/contact-studio-floral.png"
                alt="Soft pink floral artwork"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Send Us a Message Form */}
        <div className="lg:col-span-7 bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-rosepetal-border/80 shadow-md">
          <h3 className="font-serif-luxury text-2xl sm:text-3xl text-rosepetal-text mb-6">
            Send Us a Message
          </h3>

          {reference ? <div role="status" className="space-y-4 rounded-lg border border-rosepetal-wine/30 bg-white/80 p-5 text-sm text-rosepetal-text"><h4 className="font-serif-luxury text-2xl text-rosepetal-wine">Your message is saved</h4><p>We received your enquiry. Keep this reference if you need to follow up: <strong>{reference}</strong>.</p><button type="button" onClick={() => { setForm({ name: "", email: "", message: "" }); reset(); }} className="font-semibold text-rosepetal-wine underline underline-offset-4">Send another message</button></div> : <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-rosepetal-text">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  disabled={submitting}
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-md bg-[#FFF5F6] border border-rosepetal-border text-xs sm:text-sm text-rosepetal-text placeholder-rosepetal-muted/70 focus:outline-none focus:border-rosepetal-wine transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-rosepetal-text">Your email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  disabled={submitting}
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-md bg-[#FFF5F6] border border-rosepetal-border text-xs sm:text-sm text-rosepetal-text placeholder-rosepetal-muted/70 focus:outline-none focus:border-rosepetal-wine transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-rosepetal-text">Your message</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  minLength={10}
                  maxLength={2000}
                  disabled={submitting}
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-md bg-[#FFF5F6] border border-rosepetal-border text-xs sm:text-sm text-rosepetal-text placeholder-rosepetal-muted/70 focus:outline-none focus:border-rosepetal-wine transition-colors resize-none"
                />
              </div>

              <p className="text-xs text-rosepetal-muted leading-relaxed">We use these details to respond to your enquiry. Your message is saved only when a reference appears.</p>
              {error && <p role="alert" className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">{error} <a className="font-semibold underline" href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer">Continue on WhatsApp</a> and tap Send there if you prefer.</p>}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover disabled:opacity-60 text-white text-xs uppercase font-medium tracking-[0.2em] rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{submitting ? "SAVING YOUR MESSAGE…" : "SEND MESSAGE"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>}
        </div>
      </div>
    </div>
  );
}
