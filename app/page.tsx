"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import FloatingPetals from "@/components/FloatingPetals";
import {
  HERO_ARCHED_CATEGORIES,
  NEW_ARRIVALS_PRODUCTS,
} from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";

export default function MasterBoutiquePage() {
  const { wishlist, toggleWishlist } = useBoutique();

  const collectionCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCollections = (direction: "left" | "right") => {
    const carousel = collectionCarouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: (direction === "left" ? -1 : 1) * Math.min(carousel.clientWidth * 0.72, 760),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Story Video Modal */}

      {/* ============================================================== */}
      {/* 01. HERO SECTION WITH EXACT USER IMAGE & 4 ARCHED CATEGORIES    */}
      {/* ============================================================== */}
      <section id="step-01" className="relative bg-transparent">

        {/* ---------------- NEW ULTRA-HD HERO BANNER ---------------- */}
        <div className="w-full">
          <div className="relative overflow-hidden group">
            <div className="relative min-h-[56svh] sm:min-h-[calc(100svh-5rem)] w-full overflow-hidden bg-[#680227]">
              {/* Ultra-HD Hero Image: object-[80%_15%] on mobile frames saree pleats and embroidered blouse in top zone */}
              <Image
                src="/hero-rosepetal-bridal-silk.webp"
                alt="Rosepetal occasionwear inspiration"
                fill
                priority
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover object-[80%_15%] sm:object-right md:object-center"
              />

              {/* Delicate silk gradient scrim for tablet and desktop matching deep pink theme */}
              <div
                className="pointer-events-none absolute inset-0 hidden sm:block bg-gradient-to-r from-[#680227]/95 via-[#8A0238]/70 to-transparent sm:max-w-3xl lg:max-w-4xl"
                aria-hidden="true"
              />

              {/* Mobile vertical gradient scrim matching deep pink palette */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#680227] via-[#8A0238]/90 via-55% to-transparent sm:hidden"
                aria-hidden="true"
              />

              {/* Floating Petals Layer */}
              <FloatingPetals />

              {/* Live Typography & Call to Action: Bottom-anchored on mobile, centered on desktop */}
              <div className="relative z-20 flex min-h-[56svh] sm:min-h-[calc(100svh-5rem)] items-end sm:items-center">
                <div className="w-full max-w-2xl px-5 pb-10 pt-4 sm:px-12 sm:py-28 lg:px-20">
                  {/* Main Heading: Responsive text-[22px] on mobile with natural break and zero clipping */}
                  <h1 className="font-serif-luxury text-[22px] sm:text-5xl lg:text-6xl font-normal leading-[1.2] sm:leading-[1.08] text-white drop-shadow-sm max-w-sm sm:max-w-none">
                    Where Colour Meets Modern <span className="italic text-[#FDE8C5]">Couture</span>
                  </h1>

                  {/* Description: Balanced max-width on mobile */}
                  <p className="mt-2.5 max-w-[18.5rem] sm:max-w-lg text-[11px] sm:text-base leading-relaxed text-rose-100 font-sans font-light">
                    Explore sarees, dresses and occasionwear, and tell us what you would love to create.
                  </p>

                  {/* Actions Bar */}
                  <div className="mt-4 sm:mt-5 flex items-center">
                    {/* SHOP NOW Button */}
                    <Link
                      href="/collections"
                      className="inline-flex min-h-[44px] sm:min-h-[50px] items-center gap-2 rounded-full bg-rosepetal-wine hover:bg-rosepetal-wineHover border border-white/20 px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                    >
                      <span>EXPLORE STYLES</span>
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ---------------- 4 ARCHED CATEGORIES ---------------- */}
        <div className="relative overflow-hidden pt-5 pb-4 sm:pt-7 sm:pb-6 lg:pt-8 lg:pb-7">
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
                {HERO_ARCHED_CATEGORIES.map((cat) => (
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
                      <p className="text-[11px] font-medium leading-tight text-white">
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
        </div>
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
              Featured Styles
            </h2>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#FDE8C5] mt-1 block">
              A VISUAL EDIT FOR YOU
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

        {/* Row 1: 4 Product Cards */}
        <div className="relative z-10 mb-5 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
          {NEW_ARRIVALS_PRODUCTS.map((product) => {
            const isFavorited = wishlist.includes(product.id);
            return (
              <div key={product.id} className="group flex flex-col text-left">
                {/* Product Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-white/10 group-hover:ring-white/30 transition-all group-hover:-translate-y-1">
                  <Link href={product.href} aria-label={`View ${product.name}`} className="absolute inset-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className={`${product.imagePosition} object-cover transition-transform duration-500 group-hover:scale-105`}
                    />
                    <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/15 to-transparent" />
                  </Link>
                  {/* Wishlist Heart Button with 40px+ mobile touch target */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-full bg-white/85 hover:bg-white text-rosepetal-muted hover:text-rosepetal-wine shadow-sm transition-all z-10 active:scale-90"
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
                <Link href={product.href} className="mt-2.5 sm:mt-3 block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2">
                  <h3 className="font-serif-luxury text-[13px] sm:text-sm font-semibold text-white group-hover:text-[#FDE8C5] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-semibold text-rose-200 mt-0.5">
                    {product.price}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>

      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FDE8C5]">A conversation begins here</p>
        <h2 className="mt-3 font-serif-luxury text-3xl text-white sm:text-5xl">Have a piece in mind?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-rose-100">Tell us what you are looking for and we will help you explore the possibilities.</p>
        <Link href="/contact" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-xs font-semibold uppercase tracking-[0.15em] text-rosepetal-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-rosepetal-wine">
          Make an enquiry <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
