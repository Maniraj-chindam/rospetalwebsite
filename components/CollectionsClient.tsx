"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { CONTACT_INFO, type ProductItem } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";
import { fetchPosCatalog } from "@/lib/pos-catalog";

export default function CollectionsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const collectionType = searchParams.get("type");
  const filterParam = searchParams.get("filter");
  const urlMinPrice = Number(searchParams.get("minPrice"));
  const urlMaxPrice = Number(searchParams.get("maxPrice"));
  const { wishlist } = useBoutique();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [catalogStatus, setCatalogStatus] = useState<"loading" | "ready" | "error">("loading");
  const [retryKey, setRetryKey] = useState(0);
  const rangeFloor = products.length ? Math.min(...products.map((product) => product.priceNum)) : 0;
  const rangeCeiling = products.length ? Math.max(...products.map((product) => product.priceNum)) : 0;
  const categories = useMemo(() => ["All", ...new Set(products.map((product) => product.category))], [products]);
  const colours = useMemo(() => [...new Set(products.map((product) => product.color).filter(Boolean))] as string[], [products]);

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [colour, setColour] = useState("All");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    const controller = new AbortController();
    setCatalogStatus("loading");
    fetchPosCatalog(controller.signal).then((items) => {
      setProducts(items);
      setCatalogStatus("ready");
    }).catch(() => {
      if (!controller.signal.aborted) setCatalogStatus("error");
    });
    return () => controller.abort();
  }, [retryKey]);

  useEffect(() => setActiveCategory(initialCategory), [initialCategory]);
  useEffect(() => {
    setMinPrice(Number.isFinite(urlMinPrice) && urlMinPrice > 0 ? urlMinPrice : rangeFloor);
    setMaxPrice(Number.isFinite(urlMaxPrice) && urlMaxPrice > 0 ? urlMaxPrice : rangeCeiling);
  }, [urlMinPrice, urlMaxPrice, rangeFloor, rangeCeiling]);

  const filteredProducts = useMemo(() => {
    const matching = products.filter((item) => {
      if (filterParam === "wishlist" && !wishlist.includes(item.id)) return false;
      if (activeCategory !== "All" && item.category !== activeCategory) return false;
      if (item.priceNum < minPrice || item.priceNum > maxPrice) return false;
      if (colour !== "All" && item.color !== colour) return false;
      return true;
    });
    return [...matching].sort((first, second) => sort === "price-low" ? first.priceNum - second.priceNum : sort === "price-high" ? second.priceNum - first.priceNum : sort === "name" ? first.name.localeCompare(second.name) : 0);
  }, [activeCategory, colour, filterParam, maxPrice, minPrice, products, sort, wishlist]);

  const resetFilters = () => {
    setActiveCategory(initialCategory);
    setMinPrice(rangeFloor);
    setMaxPrice(rangeCeiling);
    setColour("All");
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign("/collections");
  };

  const filterContent = (
    <div className="space-y-7">
      <div>
        <div className="mb-4 flex items-center justify-between"><h2 className="font-serif-luxury text-2xl text-rosepetal-text">Filter pieces</h2><button onClick={resetFilters} className="text-[10px] font-semibold uppercase tracking-[0.15em] text-rosepetal-wine hover:underline">Reset</button></div>
        <p className="text-xs leading-relaxed text-rosepetal-muted">Refine the live collection by price and colour.</p>
      </div>
      {products.length > 0 && <fieldset className="border-t border-rosepetal-border/75 pt-5">
        <legend className="font-serif-luxury text-lg text-rosepetal-text">Price</legend>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-rosepetal-text"><span className="rounded-lg border border-rosepetal-border bg-white/70 px-3 py-2">₹{minPrice.toLocaleString("en-IN")}</span><span className="rounded-lg border border-rosepetal-border bg-white/70 px-3 py-2 text-right">₹{maxPrice.toLocaleString("en-IN")}</span></div>
        <div className="mt-4 space-y-3"><input aria-label="Minimum price" className="w-full accent-rosepetal-wine" type="range" min={rangeFloor} max={rangeCeiling} step={1} value={minPrice} onChange={(event) => setMinPrice(Math.min(Number(event.target.value), maxPrice))} /><input aria-label="Maximum price" className="w-full accent-rosepetal-wine" type="range" min={rangeFloor} max={rangeCeiling} step={1} value={maxPrice} onChange={(event) => setMaxPrice(Math.max(Number(event.target.value), minPrice))} /></div>
      </fieldset>}
      {colours.length > 0 && <fieldset className="border-t border-rosepetal-border/75 pt-5">
        <legend className="font-serif-luxury text-lg text-rosepetal-text">Colour</legend>
        <div className="mt-3 flex flex-wrap gap-2">{["All", ...colours].map((option) => <button key={option} onClick={() => setColour(option)} className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors ${colour === option ? "border-rosepetal-wine bg-rosepetal-wine text-white" : "border-rosepetal-border bg-white/65 text-rosepetal-muted hover:border-rosepetal-wine"}`}>{option}</button>)}</div>
      </fieldset>}
    </div>
  );

  return (
    <div data-collection-shop-view className="w-full">
      {/* 1. Full-Bleed Banner Section (Flush to Header, 0 side borders, increased height to reveal vase and saree pleats) */}
      <section className="relative w-full overflow-hidden bg-[#724552] min-h-[260px] h-[285px] sm:h-[315px] lg:h-[345px]">
        {/* Ultra-HD Background Image anchored to right so all 4 sarees are completely visible */}
        <Image
          src="/collections-banner-couture.png"
          alt="Rosepetal Boutique Couture Collections"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right sm:object-[100%_center]"
        />

        {/* Delicate Gradient Scrim for Flawless Text Contrast */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#200A13]/90 via-[#200A13]/55 to-transparent sm:from-[#200A13]/85 sm:via-[#200A13]/30 sm:to-transparent"
          aria-hidden="true"
        />

        {/* Inner Centered Container for Luxury Typography & Controls */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          {/* Top Interactive Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                data-back-to-collections
                onClick={goBack}
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/20 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all hover:bg-white hover:text-rosepetal-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Back to Shop
              </button>
              <span className="hidden sm:inline-flex rounded-full border border-white/35 bg-white/10 px-3.5 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                Our Collection
              </span>
            </div>

            {products.length > 0 && <div className="rounded-full border border-white/60 bg-white/90 px-3.5 py-1 text-xs text-rosepetal-muted backdrop-blur-md shadow-xs">
              <span className="font-semibold text-rosepetal-wine">{filteredProducts.length}</span> pieces to discover
            </div>}
          </div>

          {/* Live Luxury Typography & Dynamic Category Header */}
          <div className="max-w-xl">
            <p className="text-[9.5px] sm:text-[10.5px] font-semibold uppercase tracking-[0.28em] text-rosepetal-blush/90">
              TIMELESS INDIAN ELEGANCE
            </p>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] text-white font-normal leading-tight mt-1 drop-shadow-xs">
              {collectionType || (activeCategory === "All" ? "Our Collections" : activeCategory)}
            </h1>
            <p className="mt-1 text-xs leading-relaxed text-white/90 font-light max-w-lg drop-shadow-xs line-clamp-1 sm:line-clamp-none">
              {collectionType
                ? `A curated Rosepetal edit for ${collectionType.toLowerCase()}.`
                : "From classic sarees to intricate maggam work, find outfits that tell your story."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Product Catalog & Filter Section */}
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-12 lg:px-8">
        {products.length > 0 && <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                activeCategory === category && filterParam !== "wishlist"
                  ? "border-white bg-white text-rosepetal-wine shadow-md"
                  : "border-white/30 bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm"
              }`}
            >
              {category}
            </button>
          ))}
        </div>}
        <div className={`mt-7 grid items-start gap-8 ${products.length > 0 ? "lg:grid-cols-[260px_minmax(0,1fr)]" : ""}`}>
          {products.length > 0 && <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain rounded-2xl border border-white/40 bg-white/90 backdrop-blur-md p-5 shadow-lg [scrollbar-width:thin] [scrollbar-color:rgba(82,31,42,0.15)_transparent]">
            {filterContent}
          </aside>}
          <div>
            {products.length > 0 && <div className="mb-6 flex flex-col gap-3 border-b border-white/20 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-serif-luxury text-xl text-white">
                There {filteredProducts.length === 1 ? "is" : "are"}{" "}
                <span className="font-semibold text-[#FDE8C5]">{filteredProducts.length}</span>{" "}
                {filteredProducts.length === 1 ? "piece" : "pieces"} in this edit
              </p>
              <div className="flex items-center gap-3">
                <details className="relative lg:hidden">
                  <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/40 bg-white/90 px-4 py-2 text-xs text-rosepetal-text shadow-sm">
                    <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                  </summary>
                  <div className="absolute right-0 z-20 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-rosepetal-border bg-[#fff9f7] p-5 shadow-xl">
                    {filterContent}
                  </div>
                </details>
                <label className="flex items-center gap-2 text-sm text-rose-100">
                  Sort by{" "}
                  <select
                    aria-label="Sort by"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="rounded-lg border border-white/40 bg-white/90 px-3 py-1.5 text-sm text-rosepetal-text focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="name">Name: A–Z</option>
                  </select>
                </label>
              </div>
            </div>}
            {catalogStatus === "loading" ? (
              <div role="status" className="rounded-2xl bg-white/90 p-12 text-center text-rosepetal-text">Loading the live collection…</div>
            ) : catalogStatus === "error" ? (
              <div role="alert" className="rounded-2xl bg-white/90 p-12 text-center text-rosepetal-text">
                <h2 className="font-serif-luxury text-2xl">The collection could not be loaded.</h2>
                <button onClick={() => setRetryKey((key) => key + 1)} className="mt-4 rounded-full bg-rosepetal-wine px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white">Try again</button>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    data-collection-product-card
                    className="rounded-2xl bg-white/95 p-3 sm:p-3.5 shadow-md border border-white/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/30 bg-white/90 backdrop-blur-md p-12 text-center shadow-lg">
                <h2 className="font-serif-luxury text-2xl text-rosepetal-text">
                  {products.length === 0 ? "Our next edit is being prepared." : "No pieces match these filters."}
                </h2>
                {products.length === 0 && <><p className="mt-3 text-sm text-rosepetal-muted">Ask the boutique about current and upcoming pieces.</p><a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent("Hello Rosepetal Boutique, I would like to know about your upcoming collection.")}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-rosepetal-wine px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white">Enquire on WhatsApp</a></>}
                {products.length > 0 && <button
                  onClick={resetFilters}
                  className="mt-4 rounded-full bg-rosepetal-wine px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white"
                >
                  Clear filters
                </button>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
