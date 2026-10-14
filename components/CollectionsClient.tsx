"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS_CATALOG, ProductItem } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";

const CATEGORIES = ["All", "Sarees", "Lehengas", "Designer Suits", "Bridal Wear", "Handlooms"];

const productDetails = (product: ProductItem) => {
  const text = `${product.name} ${product.category}`.toLowerCase();
  return {
    colour: text.includes("rose") || text.includes("blush") || text.includes("peach") || text.includes("sunset") ? "Rose" : text.includes("emerald") ? "Green" : text.includes("ivory") ? "Ivory" : "Wine",
    fabric: product.category === "Handlooms" || product.category === "Sarees" ? "Silk" : product.category === "Lehengas" || product.category === "Bridal Wear" ? "Brocade" : "Cotton Blend",
    weave: product.category === "Handlooms" || product.category === "Sarees" ? "Handwoven" : product.category === "Lehengas" || product.category === "Bridal Wear" ? "Zari Detail" : "Printed",
  };
};

const rangeFloor = Math.min(...PRODUCTS_CATALOG.map((product) => product.priceNum));
const rangeCeiling = Math.max(...PRODUCTS_CATALOG.map((product) => product.priceNum));

export default function CollectionsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const collectionType = searchParams.get("type");
  const filterParam = searchParams.get("filter");
  const urlMinPrice = Number(searchParams.get("minPrice"));
  const urlMaxPrice = Number(searchParams.get("maxPrice"));
  const { wishlist, searchQuery } = useBoutique();

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState(Number.isFinite(urlMinPrice) && urlMinPrice > 0 ? urlMinPrice : rangeFloor);
  const [maxPrice, setMaxPrice] = useState(Number.isFinite(urlMaxPrice) && urlMaxPrice > 0 ? urlMaxPrice : rangeCeiling);
  const [colour, setColour] = useState("All");
  const [fabric, setFabric] = useState("All");
  const [weave, setWeave] = useState("All");
  const [sort, setSort] = useState("featured");

  useEffect(() => setActiveCategory(initialCategory), [initialCategory]);
  useEffect(() => {
    setMinPrice(Number.isFinite(urlMinPrice) && urlMinPrice > 0 ? urlMinPrice : rangeFloor);
    setMaxPrice(Number.isFinite(urlMaxPrice) && urlMaxPrice > 0 ? urlMaxPrice : rangeCeiling);
  }, [urlMinPrice, urlMaxPrice]);

  const filteredProducts = useMemo(() => {
    const matching = PRODUCTS_CATALOG.filter((item) => {
      if (filterParam === "wishlist" && !wishlist.includes(item.id)) return false;
      if (activeCategory !== "All" && item.category !== activeCategory) return false;
      if (item.priceNum < minPrice || item.priceNum > maxPrice) return false;
      const details = productDetails(item);
      if (colour !== "All" && details.colour !== colour) return false;
      if (fabric !== "All" && details.fabric !== fabric) return false;
      if (weave !== "All" && details.weave !== weave) return false;
      return !searchQuery.trim() || `${item.name} ${item.category} ${item.description ?? ""}`.toLowerCase().includes(searchQuery.toLowerCase());
    });
    return [...matching].sort((first, second) => sort === "price-low" ? first.priceNum - second.priceNum : sort === "price-high" ? second.priceNum - first.priceNum : sort === "name" ? first.name.localeCompare(second.name) : 0);
  }, [activeCategory, colour, fabric, filterParam, maxPrice, minPrice, searchQuery, sort, weave, wishlist]);

  const resetFilters = () => {
    setActiveCategory(initialCategory);
    setMinPrice(rangeFloor);
    setMaxPrice(rangeCeiling);
    setColour("All");
    setFabric("All");
    setWeave("All");
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
        <p className="text-xs leading-relaxed text-rosepetal-muted">Refine your edit by price, colour, fabric, or weave.</p>
      </div>
      <fieldset className="border-t border-rosepetal-border/75 pt-5">
        <legend className="font-serif-luxury text-lg text-rosepetal-text">Price</legend>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-rosepetal-text"><span className="rounded-lg border border-rosepetal-border bg-white/70 px-3 py-2">₹{minPrice.toLocaleString("en-IN")}</span><span className="rounded-lg border border-rosepetal-border bg-white/70 px-3 py-2 text-right">₹{maxPrice.toLocaleString("en-IN")}</span></div>
        <div className="mt-4 space-y-3"><input aria-label="Minimum price" className="w-full accent-rosepetal-wine" type="range" min={rangeFloor} max={rangeCeiling} step={500} value={minPrice} onChange={(event) => setMinPrice(Math.min(Number(event.target.value), maxPrice))} /><input aria-label="Maximum price" className="w-full accent-rosepetal-wine" type="range" min={rangeFloor} max={rangeCeiling} step={500} value={maxPrice} onChange={(event) => setMaxPrice(Math.max(Number(event.target.value), minPrice))} /></div>
      </fieldset>
      {([ ["Colour", colour, setColour, ["All", "Rose", "Green", "Ivory", "Wine"]], ["Fabric", fabric, setFabric, ["All", "Silk", "Brocade", "Cotton Blend"]], ["Weave", weave, setWeave, ["All", "Handwoven", "Zari Detail", "Printed"]] ] as const).map(([label, value, setValue, options]) => (
        <fieldset key={label} className="border-t border-rosepetal-border/75 pt-5"><legend className="flex w-full items-center justify-between font-serif-luxury text-lg text-rosepetal-text">{label}<ChevronDown className="h-4 w-4 text-rosepetal-muted" /></legend><div className="mt-3 flex flex-wrap gap-2">{options.map((option) => <button key={option} onClick={() => setValue(option)} className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors ${value === option ? "border-rosepetal-wine bg-rosepetal-wine text-white" : "border-rosepetal-border bg-white/65 text-rosepetal-muted hover:border-rosepetal-wine"}`}>{option}</button>)}</div></fieldset>
      ))}
    </div>
  );

  return (
    <main data-collection-shop-view className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="overflow-hidden rounded-[1.75rem] border border-rosepetal-border/80 bg-[linear-gradient(100deg,#fff8f5_0%,#fce9e7_53%,#f3d6d5_100%)] px-6 py-8 shadow-[0_18px_50px_rgba(103,34,49,0.10)] sm:px-10 sm:py-10">
        <button
          type="button"
          data-back-to-collections
          onClick={goBack}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-rosepetal-wine/20 bg-white/75 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-rosepetal-wine transition-colors hover:border-rosepetal-wine/45 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Shop
        </button>
        <p className="text-[10px] font-semibold uppercase tracking-[0.27em] text-rosepetal-wine">Rosepetal collection</p>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"><div><h1 className="font-serif-luxury text-4xl text-rosepetal-text sm:text-5xl">{collectionType || (activeCategory === "All" ? "Our Collections" : activeCategory)}</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-rosepetal-muted">{collectionType ? `A curated Rosepetal edit for ${collectionType.toLowerCase()}.` : "Discover pieces chosen for celebrations, everyday elegance, and meaningful moments."}</p></div><div className="rounded-full border border-white/80 bg-white/75 px-4 py-2 text-xs text-rosepetal-muted"><span className="font-semibold text-rosepetal-wine">{filteredProducts.length}</span> pieces to discover</div></div>
      </section>
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar">{CATEGORIES.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs transition-colors ${activeCategory === category && filterParam !== "wishlist" ? "border-rosepetal-wine bg-rosepetal-wine text-white" : "border-rosepetal-border bg-white/70 text-rosepetal-muted hover:border-rosepetal-wine"}`}>{category}</button>)}</div>
      <div className="mt-7 grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="hidden rounded-2xl border border-rosepetal-border/70 bg-white/55 p-5 lg:block">{filterContent}</aside>
        <div>
          <div className="mb-6 flex flex-col gap-3 border-b border-rosepetal-border/70 pb-4 sm:flex-row sm:items-center sm:justify-between"><p className="font-serif-luxury text-xl text-rosepetal-text">There {filteredProducts.length === 1 ? "is" : "are"} {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"} in this edit</p><div className="flex items-center gap-3"><details className="relative lg:hidden"><summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-rosepetal-border bg-white px-4 py-2 text-xs text-rosepetal-text"><SlidersHorizontal className="h-3.5 w-3.5" /> Filters</summary><div className="absolute right-0 z-20 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-rosepetal-border bg-[#fff9f7] p-5 shadow-xl">{filterContent}</div></details><label className="flex items-center gap-2 text-sm text-rosepetal-muted">Sort by <select aria-label="Sort by" value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-rosepetal-border bg-white px-3 py-2 text-sm text-rosepetal-text focus:outline-none focus:ring-2 focus:ring-rosepetal-wine/30"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A–Z</option></select></label></div></div>
          {filteredProducts.length > 0 ? <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">{filteredProducts.map((product) => <div key={product.id} data-collection-product-card><ProductCard product={product} /></div>)}</div> : <div className="rounded-2xl border border-dashed border-rosepetal-border bg-white/60 p-12 text-center"><h2 className="font-serif-luxury text-2xl text-rosepetal-text">No pieces match these filters.</h2><button onClick={resetFilters} className="mt-4 rounded-full bg-rosepetal-wine px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white">Clear filters</button></div>}
        </div>
      </div>
    </main>
  );
}
