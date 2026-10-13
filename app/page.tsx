"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Flower2,
  Scissors,
  Globe,
  Users,
  HeartHandshake,
  PencilRuler,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Play,
  Heart,
} from "lucide-react";
import FloatingPetals from "@/components/FloatingPetals";
import StoryVideoModal from "@/components/StoryVideoModal";
import {
  HOME_PILLARS,
  HERO_ARCHED_CATEGORIES,
  SHOP_BY_CATEGORY_ITEMS,
  NEW_ARRIVALS_PRODUCTS,
  CONTACT_INFO,
} from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";

export default function MasterBoutiquePage() {
  const { setIsConsultationOpen, wishlist, toggleWishlist } = useBoutique();

  // Story video modal state
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      if (!res.ok) throw new Error("Could not send message. Please try again.");
      setContactSubmitted(true);
    } catch (err: any) {
      setContactError(err.message || "Failed to send message.");
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Story Video Modal */}
      <StoryVideoModal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

      {/* ============================================================== */}
      {/* 01. HERO SECTION WITH EXACT USER IMAGE & 8 ARCHED CATEGORIES    */}
      {/* ============================================================== */}
      <section id="step-01" className="relative bg-transparent">

        {/* ---------------- EXACT HERO BANNER ---------------- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-rosepetal-border/70 group">
            {/* Direct High-Resolution Hero Image Added Without Any Changes */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/10] min-h-[380px] bg-[#FCEEED]">
              <Image
                src="/hero-rosepetal-banner.jpg"
                alt="Rosepetal Boutique - Threads That Feel Like You"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-top"
              />

              {/* Floating Petals Layer */}
              <FloatingPetals />

              {/* Interactive Action Hotspots over the Banner */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 pointer-events-none">
                <div />

                {/* Live Action Buttons pinned to match visual CTAs */}
                <div className="pointer-events-auto flex flex-wrap items-center gap-4 pt-16 sm:pt-24 max-w-lg">
                  <Link
                    href="/collections"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-sm shadow-lg hover:shadow-xl transition-all group"
                  >
                    <span>EXPLORE COLLECTIONS</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <button
                    onClick={() => setIsStoryOpen(true)}
                    className="inline-flex items-center gap-3 px-4 py-2.5 bg-white/90 hover:bg-white text-rosepetal-wine rounded-full shadow-md hover:shadow-lg transition-all group text-xs font-semibold uppercase tracking-wider backdrop-blur-sm"
                  >
                    <div className="w-7 h-7 rounded-full bg-rosepetal-wine text-white flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                    <span>WATCH OUR STORY</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- 6 ARCHED CATEGORIES (MATCHING 1ST IMAGE) ---------------- */}
        <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-rosepetal-wine">
              EXPLORE
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-rosepetal-text mt-1 font-normal">
              Our Collections
            </h2>
          </div>

          {/* 6 Arched Category Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {HERO_ARCHED_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="group flex flex-col items-center text-center space-y-2 cursor-pointer"
              >
                {/* Signature Arched Card Shape */}
                <div className="relative w-full aspect-[4/5] rounded-t-full rounded-b-xl overflow-hidden bg-transparent border border-rosepetal-border/40 group-hover:shadow-md transition-all duration-300">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                </div>

                <div className="space-y-0.5 pt-1">
                  <h4 className="font-serif-luxury text-xs sm:text-sm font-semibold tracking-wider text-rosepetal-text group-hover:text-rosepetal-wine transition-colors uppercase">
                    {cat.name}
                  </h4>
                  <p className="text-[10px] text-rosepetal-muted font-light leading-tight">
                    {cat.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>





      {/* ============================================================== */}
      {/* 05. NEW ARRIVALS SECTION                                        */}
      {/* ============================================================== */}
      <section id="new-arrivals" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header: Title & Subtitle on Left, VIEW ALL on Right */}
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-rosepetal-border/40">
          <div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-rosepetal-text font-normal">
              New Arrivals
            </h2>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-rosepetal-muted mt-1 block">
              FRESH STYLES, NEW STORIES
            </span>
          </div>
          <Link
            href="/collections"
            className="text-xs uppercase font-medium tracking-[0.2em] text-rosepetal-wine hover:text-rosepetal-wineHover flex items-center gap-1.5 transition-colors group"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Row 1: 4 Product Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {NEW_ARRIVALS_PRODUCTS.map((product) => {
            const isFavorited = wishlist.includes(product.id);
            return (
              <div key={product.id} className="group flex flex-col text-left">
                {/* Product Image */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-rosepetal-card border border-rosepetal-border/60 shadow-sm group-hover:shadow-md transition-all">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Wishlist Heart Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-rosepetal-muted hover:text-rosepetal-wine shadow-sm transition-all"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavorited ? "fill-rosepetal-wine text-rosepetal-wine" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Title & Price */}
                <div className="mt-3">
                  <h3 className="font-serif-luxury text-sm font-semibold text-rosepetal-text group-hover:text-rosepetal-wine transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs font-semibold text-rosepetal-text/80 mt-0.5">
                    {product.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: 2 Promotional Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: Elegant Dresses (Matches Banner 2 clean design with real interactive button) */}
          <div className="relative rounded-2xl overflow-hidden bg-[#F8E7E9] border border-rosepetal-border/60 shadow-sm group min-h-[220px]">
            <div className="relative aspect-[1024/412] sm:aspect-auto sm:h-full min-h-[220px] w-full">
              <Image
                src="/elegant-dresses-clean-banner.png"
                alt="Elegant Dresses for Every Occasion - Premium Collection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
              />
              {/* Live Interactive Button outside/over the image */}
              <div className="absolute left-[7%] bottom-[22%] z-10">
                <Link
                  href="/collections?category=Dresses"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-[11px] font-semibold tracking-wider uppercase rounded-sm shadow-sm transition-all group/btn"
                >
                  <span>SHOP DRESSES</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Banner 2: Bed & Bath (Matches new luxury floral design with real interactive button) */}
          <div className="relative rounded-2xl overflow-hidden bg-[#F8E7E9] border border-rosepetal-border/60 shadow-sm group min-h-[220px]">
            <div className="relative aspect-[1024/429] sm:aspect-auto sm:h-full min-h-[220px] w-full">
              <Image
                src="/bed-bath-clean-banner.png"
                alt="Comfort Looks Beautiful Too - Bed & Bath Collection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
              />
              {/* Live Interactive Button outside/over the image */}
              <div className="absolute left-[7.4%] bottom-[14%] z-10">
                <Link
                  href="/collections?category=Bed+Linens"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-[11px] font-semibold tracking-wider uppercase rounded-sm shadow-sm transition-all group/btn"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 05B. CRAFTED WITH HEART SECTION (MATCHING USER REFERENCE)      */}
      {/* ============================================================== */}
      <section id="crafted-with-heart" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-rosepetal-border/60 min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center">
          {/* Edge-to-Edge Full-Width Video */}
          <video
            src="/chandrika-hero-maker.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Elegant Soft Contrast Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-white/85 backdrop-blur-[0.5px]" />

          {/* Floating Content: Section Title */}
          <div className="relative z-10 w-full p-8 sm:p-14 lg:p-20">
            <div className="space-y-2 max-w-xl text-left">
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-rosepetal-wine block">
                MORE THAN FASHION
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-rosepetal-text leading-tight font-normal">
                Crafted with Heart,<br />
                Worn with Pride
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 06. CONTACT PAGE SECTION                                        */}
      {/* ============================================================== */}
      <section id="step-06" className="relative bg-[#FCECEE]">
        <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <h2 className="font-serif-luxury text-4xl sm:text-5xl text-rosepetal-text font-normal">
              Get in Touch
            </h2>
            <p className="text-[11px] uppercase tracking-[0.25em] text-rosepetal-wine font-semibold">
              WE&apos;D LOVE TO HEAR FROM YOU
            </p>
            <p className="text-xs sm:text-sm text-rosepetal-muted max-w-lg mx-auto leading-relaxed font-sans font-light">
              Whether you have a question, a custom order request, or just want to say hello — we&apos;re here for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            <div className="lg:col-span-5 space-y-8 relative">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-rosepetal-blushLight/70 flex items-center justify-center text-rosepetal-wine flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-rosepetal-text">
                      Our Studio
                    </h4>
                    <p className="text-xs text-rosepetal-muted leading-relaxed font-sans">
                      {CONTACT_INFO.studio}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-rosepetal-blushLight/70 flex items-center justify-center text-rosepetal-wine flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-rosepetal-text">
                      Call Us
                    </h4>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="text-xs text-rosepetal-muted hover:text-rosepetal-wine transition-colors font-sans"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-rosepetal-blushLight/70 flex items-center justify-center text-rosepetal-wine flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-rosepetal-text">
                      Email Us
                    </h4>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-xs text-rosepetal-muted hover:text-rosepetal-wine transition-colors font-sans"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-rosepetal-blushLight/70 flex items-center justify-center text-rosepetal-wine flex-shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-rosepetal-text">
                      Visit by Appointment
                    </h4>
                    <p className="text-xs text-rosepetal-muted leading-relaxed font-sans">
                      {CONTACT_INFO.hours}
                    </p>
                  </div>
                </div>
              </div>

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

            <div className="lg:col-span-7 bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-rosepetal-border/80 shadow-md">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-rosepetal-text mb-6">
                Send Us a Message
              </h3>

              {contactSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 bg-rosepetal-wine/10 text-rosepetal-wine rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl text-rosepetal-wine">
                    Message Received
                  </h4>
                  <p className="text-xs text-rosepetal-muted max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out, <strong className="text-rosepetal-text">{contactForm.name}</strong>. Our customer relations team will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({ name: "", email: "", message: "" });
                    }}
                    className="text-xs uppercase tracking-wider text-rosepetal-wine underline pt-2 font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-md bg-[#FFF5F6] border border-rosepetal-border text-xs sm:text-sm text-rosepetal-text placeholder-rosepetal-muted/70 focus:outline-none focus:border-rosepetal-wine transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-md bg-[#FFF5F6] border border-rosepetal-border text-xs sm:text-sm text-rosepetal-text placeholder-rosepetal-muted/70 focus:outline-none focus:border-rosepetal-wine transition-colors"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={5}
                      required
                      placeholder="Your Message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-md bg-[#FFF5F6] border border-rosepetal-border text-xs sm:text-sm text-rosepetal-text placeholder-rosepetal-muted/70 focus:outline-none focus:border-rosepetal-wine transition-colors resize-none"
                    />
                  </div>

                  {contactError && (
                    <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-200">
                      {contactError}
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={contactLoading}
                      className="w-full sm:w-auto px-8 py-3.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover disabled:opacity-60 text-white text-xs uppercase font-medium tracking-[0.2em] rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>{contactLoading ? "SENDING..." : "SEND MESSAGE"}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
