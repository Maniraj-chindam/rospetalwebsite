"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { CONTACT_INFO } from "@/data/boutique-data";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Rosepetal, I have an enquiry.\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;
    window.location.assign(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`);
  };

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

          </div>

          {/* Floral Bouquet Artwork (matching the pink floral cluster in the mockup) */}
          <div className="relative pt-6 max-w-[280px]">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-rosepetal-border/60">
              <Image
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600"
                alt="Soft pink blooming roses bouquet"
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

          <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-rosepetal-text">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
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
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-md bg-[#FFF5F6] border border-rosepetal-border text-xs sm:text-sm text-rosepetal-text placeholder-rosepetal-muted/70 focus:outline-none focus:border-rosepetal-wine transition-colors resize-none"
                />
              </div>

              <p className="text-xs text-rosepetal-muted leading-relaxed">
                Continue to WhatsApp, then tap Send there to deliver your message. Your details are not sent by this website.
              </p>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover disabled:opacity-60 text-white text-xs uppercase font-medium tracking-[0.2em] rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>CONTINUE ON WHATSAPP</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}
