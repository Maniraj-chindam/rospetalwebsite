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
import ProductCard from "@/components/ProductCard";
import StoryVideoModal from "@/components/StoryVideoModal";
import {
  HOME_PILLARS,
  HERO_ARCHED_CATEGORIES,
  SHOP_BY_CATEGORY_ITEMS,
  PRODUCTS_CATALOG,
  LOOKBOOK_GALLERY,
  CONTACT_INFO,
} from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";

const COLLECTION_TABS = [
  "All",
  "Sarees",
  "Lehengas",
  "Designer Suits",
  "Bridal Wear",
  "Handlooms",
  "Accessories",
];

const LOOKBOOK_TABS = ["All", "Festive", "Bridal", "Handloom", "Contemporary"];

export default function MasterBoutiquePage() {
  const { setIsConsultationOpen, wishlist, toggleWishlist } = useBoutique();

  // Story video modal state
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // Collections filtering state
  const [activeCollectionTab, setActiveCollectionTab] = useState("All");

  // Lookbook filtering state
  const [activeLookbookTab, setActiveLookbookTab] = useState("All");

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

  const filteredProducts = PRODUCTS_CATALOG.filter((item) => {
    if (activeCollectionTab === "All") return true;
    return item.category === activeCollectionTab;
  });

  const filteredLookbook = LOOKBOOK_GALLERY.filter((item) => {
    if (activeLookbookTab === "All") return true;
    return item.category === activeLookbookTab;
  });

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
                  <button
                    onClick={() => {
                      const el = document.getElementById("step-03");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-sm shadow-lg hover:shadow-xl transition-all group"
                  >
                    <span>EXPLORE COLLECTIONS</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

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
              <div
                key={cat.id}
                onClick={() => {
                  const tabTarget =
                    cat.name === "SAREES"
                      ? "Sarees"
                      : cat.name === "LEHENGAS"
                      ? "Lehengas"
                      : cat.name === "KURTIS & SUITS"
                      ? "Designer Suits"
                      : "All";
                  setActiveCollectionTab(tabTarget);
                  const el = document.getElementById("step-03");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
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
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ============================================================== */}
      {/* 03. COLLECTIONS PAGE SECTION                                    */}
      {/* ============================================================== */}
      <section id="step-03" className="relative bg-[#FCECEE]">
        <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <h2 className="font-serif-luxury text-4xl sm:text-5xl text-rosepetal-text font-normal">
              Our Collections
            </h2>
            <p className="text-[11px] uppercase tracking-[0.25em] text-rosepetal-wine font-semibold">
              A CURATED RANGE FOR EVERY YOU
            </p>
            <p className="text-xs sm:text-sm text-rosepetal-muted leading-relaxed font-sans font-light">
              From timeless handlooms to contemporary couture, explore our exquisite collections designed to make every moment special.
            </p>
          </div>

          <div className="flex items-center justify-center overflow-x-auto pb-4 mb-10 no-scrollbar">
            <div className="inline-flex items-center space-x-2 sm:space-x-6 border-b border-rosepetal-border/50 pb-2 px-2">
              {COLLECTION_TABS.map((cat) => {
                const isActive = activeCollectionTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCollectionTab(cat)}
                    className={`text-xs sm:text-sm tracking-wide whitespace-nowrap py-1 transition-all relative ${
                      isActive
                        ? "text-rosepetal-wine font-semibold"
                        : "text-rosepetal-muted hover:text-rosepetal-text"
                    }`}
                  >
                    {cat}
                    {isActive && (
                      <span className="absolute -bottom-2.5 left-0 w-full h-[2px] bg-rosepetal-wine rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 04. LOOKBOOK PAGE SECTION                                       */}
      {/* ============================================================== */}
      <section id="step-04" className="relative bg-[#FCECEE]">
        <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <h2 className="font-serif-luxury text-4xl sm:text-5xl text-rosepetal-text font-normal">
              Lookbook
            </h2>
            <p className="text-[11px] uppercase tracking-[0.25em] text-rosepetal-wine font-semibold">
              REAL WOMEN. REAL MOMENTS. TIMELESS STYLE
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
            {LOOKBOOK_TABS.map((cat) => {
              const isActive = activeLookbookTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveLookbookTab(cat)}
                  className={`px-5 py-2 rounded-full text-xs tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-rosepetal-wine text-white shadow-sm font-medium"
                      : "bg-white/80 hover:bg-white text-rosepetal-muted border border-rosepetal-border"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            <div className="space-y-6">
              {filteredLookbook.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm bg-rosepetal-card"
                >
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {filteredLookbook[3] && (
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm bg-rosepetal-card">
                  <Image src={filteredLookbook[3].image} alt="Lookbook" fill className="object-cover" />
                </div>
              )}

              <div className="relative p-10 rounded-xl bg-gradient-to-br from-[#FCEAEB] to-[#F7DDE0] border border-rosepetal-border/80 shadow-inner flex flex-col items-center justify-center text-center space-y-3 my-4">
                <span className="font-script-accent text-3xl sm:text-4xl text-rosepetal-wine">
                  “Elegance is a state of mind.”
                </span>
                <div className="w-12 h-[1px] bg-rosepetal-wine/40" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-rosepetal-muted">
                  Rosepetal Muse
                </span>
              </div>

              {filteredLookbook[4] && (
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm bg-rosepetal-card">
                  <Image src={filteredLookbook[4].image} alt="Lookbook" fill className="object-cover" />
                </div>
              )}
            </div>

            <div className="space-y-6">
              {filteredLookbook.slice(5).map((item) => (
                <div
                  key={item.id}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm bg-rosepetal-card"
                >
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 05. CUSTOM DESIGN PAGE SECTION                                  */}
      {/* ============================================================== */}
      <section id="step-05" className="relative bg-[#FCECEE]">
        <div className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 my-4">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=85&w=1600"
              alt="Handcrafted embroidery texture"
              fill
              className="object-cover brightness-[0.88]"
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-2xl border border-white/60 text-center space-y-4">
            <h2 className="font-serif-luxury text-4xl sm:text-5xl text-rosepetal-wine font-light">
              Custom Designs
            </h2>
            <p className="text-[11px] uppercase tracking-[0.25em] text-rosepetal-text/80 font-semibold">
              YOUR VISION. OUR CRAFT.
            </p>
            <p className="text-xs sm:text-sm text-rosepetal-muted max-w-md mx-auto leading-relaxed font-sans font-light">
              From concept to creation, we bring your dream outfit to life with personalized designs, fabrics and detailing.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-sm shadow-md hover:shadow-lg transition-all group"
              >
                <span>START A CONSULTATION</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-rosepetal-text font-normal">
              How It Works
            </h3>
            <div className="w-16 h-[1.5px] bg-rosepetal-wine/40 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white/60 rounded-xl border border-rosepetal-border/60 hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-full bg-rosepetal-blushLight/70 flex items-center justify-center text-rosepetal-wine mb-1">
                <Sparkles className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-rosepetal-text">
                1. SHARE YOUR IDEAS
              </h4>
              <p className="text-xs text-rosepetal-muted leading-relaxed font-sans font-light">
                Tell us your style, occasion and preferences.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white/60 rounded-xl border border-rosepetal-border/60 hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-full bg-rosepetal-blushLight/70 flex items-center justify-center text-rosepetal-wine mb-1">
                <PencilRuler className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-rosepetal-text">
                2. DESIGN A PLAN
              </h4>
              <p className="text-xs text-rosepetal-muted leading-relaxed font-sans font-light">
                Our team creates a personalised design for you.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white/60 rounded-xl border border-rosepetal-border/60 hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-full bg-rosepetal-blushLight/70 flex items-center justify-center text-rosepetal-wine mb-1">
                <Scissors className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-rosepetal-text">
                3. CRAFTED WITH CARE
              </h4>
              <p className="text-xs text-rosepetal-muted leading-relaxed font-sans font-light">
                Skilled artisans bring your design to life.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white/60 rounded-xl border border-rosepetal-border/60 hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-full bg-rosepetal-blushLight/70 flex items-center justify-center text-rosepetal-wine mb-1">
                <HeartHandshake className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-rosepetal-text">
                4. YOUR PERFECT OUTFIT
              </h4>
              <p className="text-xs text-rosepetal-muted leading-relaxed font-sans font-light">
                Cherish a one-of-a-kind creation, made just for you.
              </p>
            </div>
          </div>
        </div>

        <div className="pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="bg-[#FDE8EB] rounded-2xl border border-rosepetal-border overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:h-full min-h-[260px]">
              <Image
                src="https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=85&w=800"
                alt="Intricate zardozi embroidery"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:col-span-7 p-8 sm:p-12 text-center md:text-left space-y-4">
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-rosepetal-wine font-light leading-tight">
                Let&apos;s Create <br />
                Something Beautiful
              </h3>
              <p className="text-xs sm:text-sm text-rosepetal-muted max-w-md font-sans font-light">
                Book a personal design session with our master couturiers at our Banjara Hills studio or schedule a virtual appointment.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-sm shadow-md hover:shadow-lg transition-all group"
                >
                  <span>BOOK AN APPOINTMENT</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
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
