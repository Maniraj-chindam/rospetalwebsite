"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
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
  Heart,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import FloatingPetals from "@/components/FloatingPetals";
import StoryVideoModal from "@/components/StoryVideoModal";
import {
  HOME_PILLARS,
  HERO_ARCHED_CATEGORIES,
  SHOP_BY_CATEGORY_ITEMS,
  NEW_ARRIVALS_PRODUCTS,
  CONTACT_INFO,
  SHOP_ALL_CATEGORY_CARDS,
} from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";

const SHOP_BY_PRICE_CARDS = [
  {
    eyebrow: "EVERYDAY STYLE",
    title: "Under ₹5,000",
    startingPrice: "Starting at ₹1,499",
    image: "/libas-dress-01.jpg",
    imagePosition: "object-center",
    href: "/collections?minPrice=0&maxPrice=5000",
  },
  {
    eyebrow: "CELEBRATION EDIT",
    title: "₹5,000 – ₹10,000",
    startingPrice: "Starting at ₹9,500",
    image: "/libas-dress-02.jpg",
    imagePosition: "object-center",
    href: "/collections?minPrice=5001&maxPrice=10000",
  },
  {
    eyebrow: "FESTIVE FAVOURITES",
    title: "₹10,000 – ₹25,000",
    startingPrice: "Starting at ₹11,800",
    image: "/thridha-handloom-01.webp",
    imagePosition: "object-center",
    href: "/collections?minPrice=10001&maxPrice=25000",
  },
  {
    eyebrow: "SIGNATURE OCCASIONS",
    title: "₹25,000 & Above",
    startingPrice: "Starting at ₹34,500",
    image: "/thridha-handloom-04.webp",
    imagePosition: "object-top",
    href: "/collections?minPrice=25001",
  },
] as const;

const CUSTOMER_REVIEWS = [
  {
    name: "Ananya R.",
    detail: "Handloom saree collection",
    quote: "The handloom saree felt beautifully light, and every detail was just as lovely in person.",
  },
  {
    name: "Meera K.",
    detail: "Custom bridal lehenga",
    quote: "From the first fitting to the final touch, my lehenga fit as though it had been made for me.",
  },
  {
    name: "Sravya P.",
    detail: "Occasion wear styling",
    quote: "The Rosepetal team guided me to a silhouette that felt elegant and effortless all evening.",
  },
  {
    name: "Nandini V.",
    detail: "Designer frock collection",
    quote: "The colour, finish, and fit made the dress feel truly special from the very first try-on.",
  },
  {
    name: "Ishita S.",
    detail: "Custom occasionwear",
    quote: "Every detail felt personal, from the fabric choice to the final styling advice.",
  },
  {
    name: "Kavya P.",
    detail: "Festive handloom edit",
    quote: "I found a handloom piece that felt rooted in tradition but perfect for today.",
  },
] as const;

export default function MasterBoutiquePage() {
  const { wishlist, toggleWishlist } = useBoutique();

  // Story video modal state
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [shopAllExpanded, setShopAllExpanded] = useState(false);
  const [selectedShopAllId, setSelectedShopAllId] = useState<string | null>(null);
  const shopAllGalleryRef = useRef<HTMLDivElement>(null);
  const collectionCarouselRef = useRef<HTMLDivElement>(null);
  const reviewsCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCollections = (direction: "left" | "right") => {
    const carousel = collectionCarouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: (direction === "left" ? -1 : 1) * Math.min(carousel.clientWidth * 0.72, 760),
      behavior: "smooth",
    });
  };

  const scrollReviews = (direction: "left" | "right") => {
    const carousel = reviewsCarouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: (direction === "left" ? -1 : 1) * Math.min(carousel.clientWidth * 0.82, 880),
      behavior: "smooth",
    });
  };

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

  useEffect(() => {
    const selectShopAllCategory = (id: string | null) => {
      if (id && SHOP_ALL_CATEGORY_CARDS.some((card) => card.id === id)) {
        setSelectedShopAllId(id);
        setShopAllExpanded(true);
      }
    };

    const selectFromLocation = () => {
      selectShopAllCategory(new URLSearchParams(window.location.search).get("shopAll"));
    };

    const handleHeaderSelection = (event: Event) => {
      selectShopAllCategory((event as CustomEvent<string>).detail);
    };

    selectFromLocation();
    window.addEventListener("popstate", selectFromLocation);
    window.addEventListener("shop-all:select", handleHeaderSelection);

    return () => {
      window.removeEventListener("popstate", selectFromLocation);
      window.removeEventListener("shop-all:select", handleHeaderSelection);
    };
  }, []);

  useEffect(() => {
    if (!selectedShopAllId || !shopAllExpanded) return;

    const target = document.getElementById(`shop-all-card-${selectedShopAllId}`);
    requestAnimationFrame(() => target?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }, [selectedShopAllId, shopAllExpanded]);

  return (
    <div className="relative">
      {/* Story Video Modal */}
      <StoryVideoModal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

      {/* ============================================================== */}
      {/* 01. HERO SECTION WITH EXACT USER IMAGE & 8 ARCHED CATEGORIES    */}
      {/* ============================================================== */}
      <section id="step-01" className="relative bg-transparent">

        {/* ---------------- NEW ULTRA-HD HERO BANNER ---------------- */}
        <div className="w-full">
          <div className="relative overflow-hidden group">
            <div className="relative min-h-[82svh] sm:min-h-[calc(100svh-5rem)] w-full overflow-hidden bg-[#D81558]">
              {/* Ultra-HD Hero Image: object-[80%_15%] on mobile frames saree pleats and embroidered blouse in top zone */}
              <Image
                src="/hero-rosepetal-bridal-silk.jpg"
                alt="Rosepetal Boutique - Handcrafted Bridal Silks & Couture Wear"
                fill
                priority
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover object-[80%_15%] sm:object-right md:object-center"
              />

              {/* Radiant deep pink silk scrim for tablet and desktop matching reference image */}
              <div
                className="pointer-events-none absolute inset-0 hidden sm:block bg-gradient-to-r from-[#D81558]/95 via-[#F73C7F]/80 via-45% to-transparent sm:max-w-3xl lg:max-w-4xl"
                aria-hidden="true"
              />

              {/* Mobile vertical gradient scrim matching radiant deep pink palette */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-[#D81558] via-[#F73C7F]/90 via-50% to-transparent sm:hidden"
                aria-hidden="true"
              />

              {/* Floating Petals Layer */}
              <FloatingPetals />

              {/* Live Typography & Call to Action: Bottom-anchored on mobile, centered on desktop */}
              <div className="relative z-20 flex min-h-[82svh] sm:min-h-[calc(100svh-5rem)] items-end sm:items-center">
                <div className="w-full max-w-2xl px-5 pb-10 pt-4 sm:px-12 sm:py-28 lg:px-20">
                  {/* Main Heading: Responsive text-[22px] on mobile with natural break and zero clipping */}
                  <h1 className="font-serif-luxury text-[22px] sm:text-5xl lg:text-6xl font-normal leading-[1.2] sm:leading-[1.08] text-white drop-shadow-sm max-w-sm sm:max-w-none">
                    Where Heritage Craft Meets Modern <span className="italic text-[#FDE8C5]">Couture</span>
                  </h1>

                  {/* Description: Balanced max-width on mobile */}
                  <p className="mt-2.5 max-w-[18.5rem] sm:max-w-lg text-[11px] sm:text-base leading-relaxed text-rose-100 font-sans font-light">
                    Discover masterfully handwoven silks, intricate bridal zardozi embroidery, and bespoke silhouettes crafted for life’s most cherished celebrations.
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
                    <span>Handcrafted in Hyderabad</span>
                    <span>•</span>
                    <span>Custom Orders Welcome</span>
                    <span>•</span>
                    <span>Worldwide Shipping</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ---------------- 8 ARCHED CATEGORIES ---------------- */}
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
                      <h4 className="font-serif-luxury text-[13px] sm:text-sm font-semibold tracking-wider text-white transition-colors group-hover:text-[#FDE8C5] uppercase">
                        {cat.name}
                      </h4>
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
        </div>
      </section>





      {/* ============================================================== */}
      {/* 04B. SHOP ALL LUXURY STOREFRONT                                */}
      {/* ============================================================== */}
      <section id="shop-all" className="py-4 sm:py-6 lg:py-7 px-4 sm:px-6 lg:px-8">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-rosepetal-border/50 bg-[#FFF5F6]/80 px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10 shadow-[0_16px_40px_rgba(103,34,49,0.06)]">
          {/* Luxury Saree Backdrop */}
          <Image
            src="/shop-all-couture-backdrop.png"
            alt="Rosepetal Boutique Saree Couture Backdrop"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="-z-10 object-cover object-right pointer-events-none"
            priority={false}
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#FFF5F6]/95 via-[#FFF5F6]/75 to-[#FFF5F6]/25 sm:from-[#FFF5F6]/95 sm:via-[#FFF5F6]/65 sm:to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 grid items-center gap-8 lg:min-h-[21rem] lg:grid-cols-[46%_54%] lg:gap-0">
            <div className="max-w-xl py-1 sm:py-3 lg:pr-5">
              <span className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.27em] text-rosepetal-wine before:h-px before:w-8 before:bg-[#B87280] before:content-['']">
                The Rosepetal world
              </span>
              <h2 className="mt-4 font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.02] sm:leading-[0.94] tracking-[-0.03em] text-rosepetal-text">
                Everything beautiful,
                <span className="mt-1 block italic text-rosepetal-wine">all in one place.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed sm:leading-7 text-rosepetal-muted">
                From timeless sarees and celebration-ready silhouettes to soft comforts for home—discover every collection, thoughtfully brought together.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShopAllExpanded((expanded) => !expanded);
                    setSelectedShopAllId(null);
                  }}
                  aria-expanded={shopAllExpanded}
                  aria-controls="shop-all-category-gallery"
                  className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-rosepetal-wine px-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(125,24,49,0.22)] transition-all hover:-translate-y-0.5 hover:bg-rosepetal-wineHover hover:shadow-[0_14px_28px_rgba(125,24,49,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2"
                >
                  <span>{shopAllExpanded ? "Hide categories" : "Shop all collections"}</span>
                  <ArrowRight className={`h-4 w-4 transition-transform ${shopAllExpanded ? "rotate-90" : "group-hover:translate-x-1"}`} />
                </button>
                <span className="font-serif-luxury text-sm italic text-[#8B6D73]">Fashion · Home · Gifts</span>
              </div>
            </div>

            <div className="relative h-[15rem] sm:h-[18rem] lg:h-[21.25rem] mt-2 sm:mt-0" aria-label="Featured collections">
              <Link href="/collections?category=Sarees" aria-label="Shop Sarees" className="group absolute bottom-1 left-0 h-[12.5rem] sm:h-[18rem] w-[38%] -rotate-[3deg] sm:-rotate-[4deg] overflow-hidden rounded-t-[5rem] sm:rounded-t-[7rem] rounded-b-2xl transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:rotate-0 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine lg:left-[3%]">
                <Image src="/shop-all-featured-saree.png" alt="Embroidered mauve saree collection" fill sizes="(max-width: 1024px) 38vw, 20vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#300C16]/60 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-3 sm:bottom-4 z-10 text-center font-serif-luxury text-sm sm:text-lg text-white">Sarees</span>
              </Link>

              <Link href="/collections?category=Lehengas" aria-label="Shop Lehengas" className="group absolute bottom-2 left-[31%] z-[3] h-[13.75rem] sm:h-[20.25rem] w-[39%] -translate-y-2 overflow-hidden rounded-t-[5.5rem] sm:rounded-t-[8rem] rounded-b-2xl transition-transform duration-300 hover:-translate-y-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine">
                <Image src="/shop-all-featured-lehenga.png" alt="Ivory bridal lehenga collection" fill sizes="(max-width: 1024px) 39vw, 21vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#300C16]/60 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-3 sm:bottom-4 z-10 text-center font-serif-luxury text-sm sm:text-lg text-white">Lehengas</span>
              </Link>

              <Link href="/collections?category=Dresses" aria-label="Shop Dresses" className="group absolute bottom-1 right-0 h-[12.5rem] sm:h-[18rem] w-[38%] rotate-[3deg] sm:rotate-[4deg] overflow-hidden rounded-t-[5rem] sm:rounded-t-[7rem] rounded-b-2xl transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:rotate-0 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine lg:right-[2%]">
                <Image src="/shop-all-featured-dress.png" alt="Rose designer dress collection" fill sizes="(max-width: 1024px) 38vw, 20vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#300C16]/60 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-3 sm:bottom-4 z-10 text-center font-serif-luxury text-sm sm:text-lg text-white">Dresses</span>
              </Link>

              <span className="absolute right-0 top-0 z-[6] grid h-[3.75rem] w-[3.75rem] sm:h-[5.5rem] sm:w-[5.5rem] rotate-[7deg] place-items-center text-center font-serif-luxury text-[9.5px] sm:text-[13px] leading-tight text-rosepetal-wine sm:right-[1%]">
                Curated<br />with love
              </span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col items-start justify-between gap-4 border-t border-rosepetal-wine/15 pt-5 lg:flex-row lg:items-center">
            <nav aria-label="Shop all categories" className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full pb-1">
              {[
                ["Designer Dresses", "/collections?category=Dresses"],
                ["Handloom Collection", "/collections?category=Handlooms"],
                ["Designer Frocks", "/collections?category=Dresses"],
                ["Lehenga Collection", "/collections?category=Lehengas"],
              ].map(([label, href]) => (
                <Link key={label} href={href} className="inline-flex min-h-[2.125rem] shrink-0 items-center rounded-full border border-rosepetal-wine/15 bg-white/70 px-3 text-[9px] font-medium uppercase tracking-[0.1em] text-[#723047] transition-colors hover:border-rosepetal-wine/35 hover:bg-white hover:text-rosepetal-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2">
                  {label}
                </Link>
              ))}
            </nav>
            <Link href="/collections" className="group inline-flex items-center gap-2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.15em] text-rosepetal-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2">
              <span>View everything</span>
              <ArrowRight className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div
            ref={shopAllGalleryRef}
            id="shop-all-category-gallery"
            aria-hidden={!shopAllExpanded}
            className={`relative z-10 grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-500 ease-out ${
              shopAllExpanded ? "mt-8 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0 pointer-events-none"
            }`}
          >
            <div className={shopAllExpanded ? "min-h-0 bg-white px-5 py-7 sm:px-8 sm:py-9" : "min-h-0 p-0"}>
              <div className="border-t border-rosepetal-wine/15 pt-7">
                <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-rosepetal-wine">All collections</p>
                    <h3 className="mt-1 font-serif-luxury text-3xl text-rosepetal-text sm:text-4xl">Find the piece that feels like you.</h3>
                  </div>
                  <p className="max-w-sm text-sm leading-6 text-rosepetal-muted">Choose a category to view its related collection.</p>
                </div>

                {(["Designer Dresses", "Handloom Collection", "Designer Frocks", "Lehenga Collection"] as const).map((group) => (
                  <div key={group} className="mb-10 last:mb-0">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-px w-8 bg-rosepetal-wine/35" />
                      <h4 className="font-serif-luxury text-xl text-rosepetal-wine">{group}</h4>
                    </div>
                    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5 ${
                      group === "Lehenga Collection" ? "lg:grid-cols-5" : "lg:grid-cols-4"
                    }`}>
                      {SHOP_ALL_CATEGORY_CARDS.filter((card) => card.group === group).map((card) => {
                        const isSelected = selectedShopAllId === card.id;

                        return (
                          <Link
                            key={card.id}
                            id={`shop-all-card-${card.id}`}
                            data-shop-all-category-card
                            href={card.href}
                            className={`group relative isolate aspect-[4/5] overflow-hidden rounded-[1.35rem] border bg-[#ECD7D3] shadow-[0_10px_24px_rgba(91,28,47,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(91,28,47,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2 ${
                              isSelected ? "border-rosepetal-wine ring-2 ring-rosepetal-wine ring-offset-2" : "border-white/80"
                            }`}
                          >
                            <Image
                              src={card.image}
                              alt={card.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute inset-0 bg-gradient-to-t from-[#270914]/80 via-[#270914]/10 to-transparent" />
                            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
                              <span className="font-serif-luxury text-[15px] leading-[1.05] text-white sm:text-lg">{card.name}</span>
                              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/60 bg-white/15 text-white backdrop-blur-sm">
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
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
              New Arrivals
            </h2>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#FDE8C5] mt-1 block">
              FRESH STYLES, NEW STORIES
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

        {/* Row 2: 2 Promotional Banners */}
        <div className="relative z-10 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {/* Banner 1: Elegant Dresses */}
          <div className="relative overflow-hidden group min-h-[170px] sm:min-h-[220px] rounded-xl sm:rounded-2xl">
            <div className="relative aspect-[1024/412] sm:aspect-auto sm:h-full min-h-[170px] sm:min-h-[220px] w-full">
              <Image
                src="/elegant-dresses-clean-banner.png"
                alt="Elegant Dresses for Every Occasion - Premium Collection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
              />
              {/* Live Interactive Button outside/over the image */}
              <div className="absolute left-3 bottom-3 sm:left-[7%] sm:bottom-[22%] z-10">
                <Link
                  href="/collections?category=Dresses"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-5 sm:py-2.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase rounded-sm shadow-sm transition-all group/btn"
                >
                  <span>SHOP DRESSES</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Banner 2: Bed & Bath */}
          <div className="relative overflow-hidden group min-h-[170px] sm:min-h-[220px] rounded-xl sm:rounded-2xl">
            <div className="relative aspect-[1024/429] sm:aspect-auto sm:h-full min-h-[170px] sm:min-h-[220px] w-full">
              <Image
                src="/bed-bath-clean-banner.png"
                alt="Comfort Looks Beautiful Too - Bed & Bath Collection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
              />
              {/* Live Interactive Button outside/over the image */}
              <div className="absolute left-3 bottom-3 sm:left-[7.4%] sm:bottom-[14%] z-10">
                <Link
                  href="/collections?category=Bed+Linens"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-5 sm:py-2.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase rounded-sm shadow-sm transition-all group/btn"
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
      {/* 05B. SHOP BY PRICE                                              */}
      {/* ============================================================== */}
      <section id="shop-by-price" className="scroll-mt-20 sm:scroll-mt-24 py-4 sm:py-6 lg:py-7">
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
              {SHOP_BY_PRICE_CARDS.map((card) => (
                <article
                  key={card.title}
                  data-price-card
                  className="group relative min-h-[260px] sm:min-h-[350px] lg:min-h-[430px] overflow-hidden rounded-[1.15rem] sm:rounded-[1.25rem] ring-1 ring-white/10 group-hover:ring-white/30"
                >
                  <Image
                    src={card.image}
                    alt={`${card.title} fashion collection`}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 25vw"
                    className={`object-cover ${card.imagePosition} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#281419]/95 via-[#281419]/18 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-6 text-white">
                    <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.18em] text-white/75 sm:text-[10px]">
                      {card.eyebrow}
                    </p>
                    <h3 className="font-serif-luxury text-lg leading-tight sm:text-[1.7rem]">
                      {card.title}
                    </h3>
                    <p className="mt-0.5 text-[10px] text-white/80 sm:text-xs">{card.startingPrice}</p>
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
      </section>

      {/* ============================================================== */}
      {/* 05C. CUSTOMER REVIEWS                                           */}
      {/* ============================================================== */}
      <section id="customer-reviews" className="relative scroll-mt-20 overflow-hidden border-y border-rosepetal-wine/10 bg-[#FDF6F4] px-4 sm:scroll-mt-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-12 top-0 h-52 w-52 rounded-full border border-rosepetal-wine/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full border border-[#B07839]/15" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl py-5 sm:py-7 lg:py-8">
          <div className="mx-auto mb-7 max-w-3xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-rosepetal-wine">
              CUSTOMER STORIES
            </p>
            <h2 className="mt-2 font-serif-luxury text-3xl font-normal text-rosepetal-text sm:text-5xl">
              Loved by Our Customers
            </h2>
            <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 text-[#B07839]" aria-label="Five-star reviews">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" aria-hidden="true" />
              ))}
            </div>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-rosepetal-muted">
              Rosepetal customer stories of thoughtful designs, timeless craft, and love from our community.
            </p>
          </div>

          <div className="relative px-7 sm:px-12">
            <button
              type="button"
              onClick={() => scrollReviews("left")}
              aria-label="Show previous reviews"
              className="absolute left-0 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#B07839]/40 bg-[#FFF9F7]/95 text-rosepetal-wine shadow-md transition hover:bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            </button>

            <div ref={reviewsCarouselRef} aria-label="Customer story review cards" className="flex snap-x snap-mandatory gap-3.5 sm:gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CUSTOMER_REVIEWS.map((review) => (
                <article
                  key={review.name}
                  data-review-card
                  className="group flex min-h-[250px] sm:min-h-[270px] w-[82vw] max-w-[19rem] shrink-0 snap-center sm:snap-start flex-col rounded-[1.25rem] sm:rounded-[1.5rem] border border-[#B07839]/50 bg-white/85 p-5 sm:p-6 shadow-[0_14px_36px_rgba(82,31,42,0.07)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(82,31,42,0.12)] sm:w-[20rem]"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="flex gap-1 text-[#B07839]" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <Quote className="mt-3 sm:mt-4 h-7 w-7 sm:h-8 sm:w-8 text-rosepetal-wine/25" strokeWidth={1.2} aria-hidden="true" />
                  </div>

                  <blockquote className="my-3 sm:my-4 flex-1 text-center font-serif-luxury text-lg sm:text-2xl italic leading-snug text-rosepetal-text">
                    “{review.quote}”
                  </blockquote>

                  <div className="flex items-center gap-3 border-t border-[#B07839]/30 pt-3.5 sm:pt-4">
                    <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#B07839]/60 bg-rosepetal-wine font-serif-luxury text-base sm:text-lg text-white shadow-sm">
                      {review.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-rosepetal-text">{review.name}</p>
                      <p className="mt-0.5 text-[9.5px] sm:text-[10px] text-rosepetal-muted">{review.detail}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollReviews("right")}
              aria-label="Show more reviews"
              className="absolute right-0 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#B07839]/40 bg-[#FFF9F7]/95 text-rosepetal-wine shadow-md transition hover:bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-rosepetal-wine">
            Sample customer stories · Rosepetal Designer Boutique
          </p>
        </div>
      </section>

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

                <div className="flex items-start gap-3.5 sm:gap-4">
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

                <div className="flex items-start gap-3.5 sm:gap-4">
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

                <div className="flex items-start gap-3.5 sm:gap-4">
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

            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-[1.25rem] sm:rounded-[1.5rem] p-5 sm:p-8 border border-white/90 shadow-[0_20px_45px_rgba(126,49,65,0.16)]">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-rosepetal-text mb-5 sm:mb-6">
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
                <form onSubmit={handleContactSubmit} className="space-y-3.5 sm:space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full min-h-[48px] px-4 py-3 rounded-lg bg-[#fff8f8]/85 border border-rosepetal-border text-base sm:text-sm text-rosepetal-text placeholder-rosepetal-muted/70 focus:outline-none focus:border-rosepetal-wine transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full min-h-[48px] px-4 py-3 rounded-lg bg-[#fff8f8]/85 border border-rosepetal-border text-base sm:text-sm text-rosepetal-text placeholder-rosepetal-muted/70 focus:outline-none focus:border-rosepetal-wine transition-colors"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      required
                      placeholder="Your Message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full min-h-[96px] px-4 py-3 rounded-lg bg-[#fff8f8]/85 border border-rosepetal-border text-base sm:text-sm text-rosepetal-text placeholder-rosepetal-muted/70 focus:outline-none focus:border-rosepetal-wine transition-colors resize-none"
                    />
                  </div>

                  {contactError && (
                    <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-200">
                      {contactError}
                    </p>
                  )}

                  <div className="pt-1.5 sm:pt-2">
                    <button
                      type="submit"
                      disabled={contactLoading}
                      className="w-full min-h-[48px] px-8 py-3.5 sm:py-4 bg-rosepetal-wine hover:bg-rosepetal-wineHover disabled:opacity-60 text-white text-xs uppercase font-medium tracking-[0.2em] rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.99]"
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
