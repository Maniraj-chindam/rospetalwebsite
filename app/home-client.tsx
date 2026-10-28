"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import FloatingPetals from "@/components/FloatingPetals";
import ProductCard from "@/components/ProductCard";
import AtelierStory from "@/components/home/AtelierStory";
import BuyingGuidance from "@/components/home/BuyingGuidance";
import { useEnquirySubmission } from "@/hooks/useEnquirySubmission";
import { fetchPosCatalog, groupCatalogByStyle } from "@/lib/pos-catalog";
import type { ProductItem } from "@/data/boutique-data";
import { customerVisibleCatalog, isProductReadyForCheckout } from "@/lib/product-readiness";
import {
  HERO_ARCHED_CATEGORIES,
  CONTACT_INFO,
} from "@/data/boutique-data";

const SHOP_BY_PRICE_CARDS = [
  {
    eyebrow: "EVERYDAY STYLE",
    title: "Under ₹5,000",
    min: 0,
    max: 5000,
    href: "/collections?minPrice=0&maxPrice=5000",
  },
  {
    eyebrow: "CELEBRATION EDIT",
    title: "₹5,000 – ₹10,000",
    min: 5001,
    max: 10000,
    href: "/collections?minPrice=5001&maxPrice=10000",
  },
  {
    eyebrow: "FESTIVE FAVOURITES",
    title: "₹10,000 – ₹25,000",
    min: 10001,
    max: 25000,
    href: "/collections?minPrice=10001&maxPrice=25000",
  },
  {
    eyebrow: "SIGNATURE OCCASIONS",
    title: "₹25,000 & Above",
    min: 25001,
    max: Infinity,
    href: "/collections?minPrice=25001",
  },
] as const;

export default function MasterBoutiquePage() {
  const [newArrivals, setNewArrivals] = useState<ProductItem[]>([]);
  const [arrivalStatus, setArrivalStatus] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    const controller = new AbortController();
    fetchPosCatalog(controller.signal).then((items) => {
      setNewArrivals(customerVisibleCatalog(items));
      setArrivalStatus("ready");
    }).catch(() => {
      if (!controller.signal.aborted) setArrivalStatus("error");
    });
    return () => controller.abort();
  }, []);
  const arrivalGroups = groupCatalogByStyle(newArrivals).slice(0, 4);
  const hasLivePiecesFor = (href: string) => {
    const params = new URLSearchParams(href.split("?")[1] || "");
    return newArrivals.some((item) =>
      (!params.get("category") || item.category === params.get("category")) &&
      (!params.get("type") || item.websiteType === params.get("type"))
    );
  };
  const liveHeroCategories = HERO_ARCHED_CATEGORIES.filter((category) => hasLivePiecesFor(category.href));
  const availablePriceCards = SHOP_BY_PRICE_CARDS.flatMap((card) => {
    const piece = newArrivals.find((item) => item.priceNum >= card.min && item.priceNum <= card.max && (item.availableStock ?? 0) > 0 && isProductReadyForCheckout(item, newArrivals));
    return piece ? [{ ...card, image: piece.image, imageAlt: `${piece.name}, currently available` }] : [];
  });

  // Story video modal state
  const collectionCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCollections = (direction: "left" | "right") => {
    const carousel = collectionCarouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: (direction === "left" ? -1 : 1) * Math.min(carousel.clientWidth * 0.72, 760),
      behavior: "smooth",
    });
  };

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const homeEnquiry = useEnquirySubmission();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void homeEnquiry.submit({ kind: "contact", ...contactForm });
  };


  return (
    <div className="relative">
      {/* Story Video Modal */}

      {/* ============================================================== */}
      {/* 01. HERO SECTION & LIVE POS CATEGORIES                          */}
      {/* ============================================================== */}
      <section id="step-01" className="relative bg-transparent">

        {/* The photo is a separate asset; all hero copy and actions are live UI. */}
        <div className="w-full">
          <div className="relative overflow-hidden group">
            <div className="relative min-h-[100svh] w-full overflow-hidden bg-[#4D1023]">
              {/* On phones, keep the embellished dress form in the cropped frame. */}
              <Image
                src="/hero-designer-lehengas.webp"
                alt="Illustrative embroidered lehenga and occasion dress displayed on mannequins"
                fill
                priority
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover object-[77%_center] sm:object-[58%_center] lg:object-center"
              />

              {/* A dark wine scrim keeps text readable over the photograph. */}
              <div
                className="pointer-events-none absolute inset-0 hidden sm:block bg-gradient-to-r from-[#681A2A]/95 via-[#7A173C]/90 via-45% to-transparent sm:max-w-3xl lg:max-w-4xl"
                aria-hidden="true"
              />

              {/* The mobile text sits on the dark end of the gradient. */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-[#681A2A] via-[#7A173C]/95 via-50% to-transparent sm:hidden"
                aria-hidden="true"
              />

              {/* Floating Petals Layer */}
              <FloatingPetals />

              {/* Live Typography & Call to Action: Bottom-anchored on mobile, centered on desktop */}
              <div className="relative z-20 flex min-h-[100svh] items-end sm:items-center">
                <div className="w-full max-w-2xl px-5 pb-28 pt-24 sm:px-12 sm:pt-36 sm:pb-24 lg:px-20">
                  {/* Brand Eyebrow Header in Hero Section */}
                  <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#FDE8C5] backdrop-blur-md shadow-xs">
                    <Sparkles className="h-3.5 w-3.5 text-[#FDE8C5]" />
                    <span>ROSEPETAL DESIGNER BOUTIQUE</span>
                  </div>

                  {/* Main Heading: Responsive text-[22px] on mobile with natural break and zero clipping */}
                  <h1 className="font-serif-luxury text-[22px] sm:text-5xl lg:text-6xl font-normal leading-[1.2] sm:leading-[1.08] text-white drop-shadow-sm max-w-sm sm:max-w-none">
                    Where Tradition Meets <span className="italic text-[#FDE8C5]">Personal Style</span>
                  </h1>

                  {/* Description: Balanced max-width on mobile */}
                  <p className="mt-2.5 max-w-[18.5rem] sm:max-w-lg text-sm sm:text-base leading-relaxed text-rose-100 font-sans font-light">
                    Explore designer dresses, lehengas and custom occasion wear for life’s most cherished celebrations.
                  </p>

                  {/* Actions Bar */}
                  <div className="mt-4 sm:mt-5 flex items-center">
                    {/* SHOP NOW Button */}
                    <Link
                      href="/collections"
                      className="inline-flex min-h-[44px] sm:min-h-[50px] items-center gap-2 rounded-full bg-rosepetal-wine hover:bg-rosepetal-wineHover border border-white/20 px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                    >
                      <span>SHOP NOW</span>
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Link>
                  </div>

                  {/* Trust Badges: Safe wrap with max-w */}
                  <div className="mt-5 text-[9px] sm:text-[10.5px] uppercase tracking-[0.14em] font-medium text-rose-200/90 flex flex-wrap items-center gap-x-2 gap-y-1 max-w-[19rem] sm:max-w-none">
                    <span>Designer Boutique</span>
                    <span>•</span>
                    <span>Custom Orders Welcome</span>
                    <span>•</span>
                    <span>Personal Consultations</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Available categories from the live POS catalog */}
        {liveHeroCategories.length > 0 && <div className="relative overflow-hidden pt-5 pb-4 sm:pt-7 sm:pb-6 lg:pt-8 lg:pb-7">
          <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
            {/* Centered Heading */}
            <div className="mb-3.5 sm:mb-5 text-center">
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#FDE8C5]">
                EXPLORE
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white mt-1 font-normal drop-shadow-sm">
                Our Collections
              </h2>
            </div>

            {/* One-line collection carousel */}
            <div className="relative px-2 sm:px-12">
              <button
                type="button"
                onClick={() => scrollCollections("left")}
                aria-label="Scroll collections left"
                className="hidden sm:inline-flex absolute left-0 top-[42%] z-10 h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/95 text-rosepetal-wine shadow-lg transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine sm:h-11 sm:w-11"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </button>

              <div
                ref={collectionCarouselRef}
                className="flex snap-x snap-mandatory gap-2 sm:gap-3 overflow-x-auto scroll-smooth pb-3 px-2 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {liveHeroCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    className="group flex w-[9.25rem] sm:w-[13.5rem] lg:w-[15rem] shrink-0 snap-start cursor-pointer flex-col items-center space-y-1.5 text-center"
                  >
                    {/* Signature Arched Card Shape */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-full rounded-b-xl transition-all duration-300 ring-1 ring-white/10 group-hover:ring-white/30">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 640px) 42vw, (max-width: 1024px) 34vw, 15rem"
                        className="object-cover transition-transform duration-500 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-black/0" />
                    </div>

                    <div className="space-y-0.5 pt-0.5">
                      <h3 className="font-serif-luxury text-[13px] sm:text-sm font-semibold tracking-wider text-white transition-colors group-hover:text-[#FDE8C5] uppercase">
                        {cat.name}
                      </h3>
                      <p className="text-[10px] font-light leading-tight text-rose-200/90">
                        {cat.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollCollections("right")}
                aria-label="Scroll collections right"
                className="hidden sm:inline-flex absolute right-0 top-[42%] z-10 h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/95 text-rosepetal-wine shadow-lg transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine sm:h-11 sm:w-11"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>}
      </section>

      {/* ============================================================== */}
      {/* 05. NEW ARRIVALS SECTION                                        */}
      {/* ============================================================== */}
      <section
        id="new-arrivals"
        className="relative isolate mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7"
      >
        {/* Header: Title & Subtitle on Left, VIEW ALL on Right */}
        <div className="relative z-10 mb-6 flex items-end justify-between border-b border-white/20 pb-2.5">
          <div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal drop-shadow-sm">
              Current Pieces
            </h2>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#FDE8C5] mt-1 block">
              THE LIVE BOUTIQUE EDIT
            </span>
          </div>
          <Link
            href="/collections"
            className="text-xs uppercase font-medium tracking-[0.2em] text-[#FDE8C5] hover:text-white flex items-center gap-1.5 transition-colors group"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative z-10 mb-5">
          {arrivalStatus === "loading" && <p role="status" className="py-8 text-center text-white">Loading new pieces…</p>}
          {arrivalStatus === "error" && <p role="alert" className="py-8 text-center text-white">New pieces are temporarily unavailable. Please visit the collection later.</p>}
          {arrivalStatus === "ready" && newArrivals.length === 0 && <p className="py-8 text-center text-white">New pieces are coming soon.</p>}
          {arrivalGroups.length > 0 && (
            <div className={`grid gap-4 sm:gap-6 ${arrivalGroups.length === 1 ? "mx-auto max-w-sm grid-cols-1" : arrivalGroups.length === 2 ? "mx-auto max-w-3xl grid-cols-1 sm:grid-cols-2" : arrivalGroups.length === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"}`}>
              {arrivalGroups.map((variants) => (
                <div key={variants[0].styleCode || variants[0].id} className="rounded-[1.25rem] border border-white/60 bg-[#FFF8F6] p-3 shadow-[0_14px_34px_rgba(65,19,39,0.12)] transition-shadow duration-300 hover:shadow-[0_20px_42px_rgba(65,19,39,0.2)] sm:p-3.5">
                  <ProductCard product={variants[0]} variants={variants} imageFit="contain" />
                </div>
              ))}
            </div>
          )}
        </div>

      </section>

      {/* ============================================================== */}
      {/* 05B. SHOP BY PRICE                                              */}
      {/* ============================================================== */}
      {availablePriceCards.length > 0 && <section id="shop-by-price" className="scroll-mt-20 sm:scroll-mt-24 py-4 sm:py-6 lg:py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden px-4 sm:px-7 lg:px-9">
            <div className="mb-7 flex items-end justify-between gap-5 border-b border-white/20 pb-5 sm:mb-8">
              <div>
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FDE8C5]">
                  FIND YOUR PERFECT PICK
                </span>
                <h2 className="font-serif-luxury text-3xl font-normal text-white sm:text-4xl lg:text-5xl drop-shadow-sm">
                  Shop by Price
                </h2>
              </div>
              <Link
                href="/collections"
                className="group hidden items-center gap-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FDE8C5] hover:text-white sm:inline-flex"
              >
                View All
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {availablePriceCards.map((card) => (
                <article
                  key={card.title}
                  data-price-card
                  className="group relative min-h-[260px] sm:min-h-[350px] lg:min-h-[430px] overflow-hidden rounded-[1.15rem] sm:rounded-[1.25rem] ring-1 ring-white/10 group-hover:ring-white/30"
                >
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#281419]/95 via-[#281419]/18 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-6 text-white">
                    <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.18em] text-white/75 sm:text-[10px]">
                      {card.eyebrow}
                    </p>
                    <h3 className="font-serif-luxury text-lg leading-tight sm:text-[1.7rem]">
                      {card.title}
                    </h3>
                    <Link
                      href={card.href}
                      className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 sm:px-4 sm:py-2 text-[8.5px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] text-rosepetal-wine transition-colors hover:bg-white"
                    >
                      Shop Now
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <Link
              href="/collections"
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FDE8C5] hover:text-white sm:hidden active:opacity-75"
            >
              View All
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>}

      <AtelierStory />
      <BuyingGuidance />

      {/* ============================================================== */}
      {/* 06. CONTACT PAGE SECTION                                        */}
      {/* ============================================================== */}
      <section id="step-06" data-contact-studio-section className="relative isolate overflow-hidden bg-[#fbeded] py-6 sm:py-8">
        <Image
          src="/contact-floral-backdrop.png"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[#fff7f4]/30" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[112rem] px-4 sm:px-8 lg:px-12">
          <div className="mx-auto mb-8 max-w-2xl space-y-2 text-center sm:mb-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-rosepetal-wine font-semibold">GET IN TOUCH</p>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-rosepetal-text font-normal leading-[1.05]">
              We&apos;d Love to<br />Hear From You
            </h2>
            <p className="text-xs sm:text-sm text-rosepetal-muted max-w-lg mx-auto leading-relaxed font-sans font-light">
              Whether you have a question, a custom order request, or just want to say hello — we&apos;re here for you.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 max-w-5xl mx-auto">
            <div className="space-y-5 relative lg:pl-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3.5 sm:gap-4">
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

            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-[1.25rem] sm:rounded-[1.5rem] p-5 sm:p-8 border border-white/90 shadow-[0_20px_45px_rgba(126,49,65,0.16)]">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-rosepetal-text mb-5 sm:mb-6">
                Send Us a Message
              </h3>

              {homeEnquiry.reference ? <div role="status" className="rounded-lg border border-rosepetal-wine/30 bg-white p-5 text-sm text-rosepetal-text"><h4 className="font-serif-luxury text-2xl text-rosepetal-wine">Your message is saved</h4><p className="mt-2">We received your enquiry. Reference: <strong>{homeEnquiry.reference}</strong>.</p><button type="button" onClick={() => { homeEnquiry.reset(); setContactForm({ name: "", email: "", message: "" }); }} className="mt-3 font-semibold text-rosepetal-wine underline">Send another message</button></div> : <form onSubmit={handleContactSubmit} className="space-y-3.5 sm:space-y-3">
                  <div>
                    <label htmlFor="home-contact-name" className="mb-1 block text-xs font-semibold text-rosepetal-text">Your name</label>
                    <input
                      id="home-contact-name"
                      type="text"
                      required
                      maxLength={100}
                      disabled={homeEnquiry.submitting}
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full min-h-[48px] px-4 py-3 rounded-lg bg-[#fff8f8]/85 border border-rosepetal-border text-base sm:text-sm text-rosepetal-text placeholder-rosepetal-muted/70 focus:outline-none focus:border-rosepetal-wine transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="home-contact-email" className="mb-1 block text-xs font-semibold text-rosepetal-text">Your email</label>
                    <input
                      id="home-contact-email"
                      type="email"
                      required
                      maxLength={254}
                      disabled={homeEnquiry.submitting}
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full min-h-[48px] px-4 py-3 rounded-lg bg-[#fff8f8]/85 border border-rosepetal-border text-base sm:text-sm text-rosepetal-text placeholder-rosepetal-muted/70 focus:outline-none focus:border-rosepetal-wine transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="home-contact-message" className="mb-1 block text-xs font-semibold text-rosepetal-text">Your message</label>
                    <textarea
                      id="home-contact-message"
                      rows={3}
                      required
                      minLength={10}
                      maxLength={3000}
                      disabled={homeEnquiry.submitting}
                      placeholder="Your Message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full min-h-[96px] px-4 py-3 rounded-lg bg-[#fff8f8]/85 border border-rosepetal-border text-base sm:text-sm text-rosepetal-text placeholder-rosepetal-muted/70 focus:outline-none focus:border-rosepetal-wine transition-colors resize-none"
                    />
                  </div>

                  {homeEnquiry.error && <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-xs text-red-800">{homeEnquiry.error}</p>}

                  <div className="pt-1.5 sm:pt-2">
                    <button
                      type="submit"
                      disabled={homeEnquiry.submitting}
                      className="w-full min-h-[48px] px-8 py-3.5 sm:py-4 bg-rosepetal-wine hover:bg-rosepetal-wineHover disabled:opacity-60 text-white text-xs uppercase font-medium tracking-[0.2em] rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.99]"
                    >
                      <span>{homeEnquiry.submitting ? "SAVING YOUR MESSAGE…" : "SEND MESSAGE"}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
