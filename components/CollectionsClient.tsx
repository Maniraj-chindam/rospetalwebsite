"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { EditorialHero } from "@/components/ShopConcepts";
import { PRODUCTS_CATALOG, ProductItem } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";
import styles from "./ShopConcepts.module.css";

const CATEGORIES = ["All", "Sarees", "Lehengas", "Dresses", "Designer Suits", "Bridal Wear", "Handlooms", "Accessories"];

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

  const filterContent = (
    <div className="space-y-7">
      <div>
        <div className="mb-4 flex items-center justify-between"><h3 className="font-serif-luxury text-2xl text-rosepetal-text">Filter pieces</h3><button type="button" onClick={resetFilters} className="text-[10px] font-semibold uppercase tracking-[0.15em] text-rosepetal-wine hover:underline">Reset</button></div>
        <p className="text-xs leading-relaxed text-rosepetal-muted">Refine your edit by price, colour, fabric, or weave.</p>
      </div>
      <fieldset className="border-t border-rosepetal-border/75 pt-5">
        <legend className="font-serif-luxury text-lg text-rosepetal-text">Price</legend>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-rosepetal-text"><span className="rounded-lg border border-rosepetal-border bg-white/70 px-3 py-2">₹{minPrice.toLocaleString("en-IN")}</span><span className="rounded-lg border border-rosepetal-border bg-white/70 px-3 py-2 text-right">₹{maxPrice.toLocaleString("en-IN")}</span></div>
        <div className="mt-4 space-y-3"><input aria-label="Minimum price" className="w-full accent-rosepetal-wine" type="range" min={rangeFloor} max={rangeCeiling} step={500} value={minPrice} onChange={(event) => setMinPrice(Math.min(Number(event.target.value), maxPrice))} /><input aria-label="Maximum price" className="w-full accent-rosepetal-wine" type="range" min={rangeFloor} max={rangeCeiling} step={500} value={maxPrice} onChange={(event) => setMaxPrice(Math.max(Number(event.target.value), minPrice))} /></div>
      </fieldset>
      {([ ["Colour", colour, setColour, ["All", "Rose", "Green", "Ivory", "Wine"]], ["Fabric", fabric, setFabric, ["All", "Silk", "Brocade", "Cotton Blend"]], ["Weave", weave, setWeave, ["All", "Handwoven", "Zari Detail", "Printed"]] ] as const).map(([label, value, setValue, options]) => (
        <fieldset key={label} className="border-t border-rosepetal-border/75 pt-5"><legend className="flex w-full items-center justify-between font-serif-luxury text-lg text-rosepetal-text">{label}<ChevronDown className="h-4 w-4 text-rosepetal-muted" /></legend><div className="mt-3 flex flex-wrap gap-2">{options.map((option) => <button key={option} type="button" aria-pressed={value === option} onClick={() => setValue(option)} className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors ${value === option ? "border-rosepetal-wine bg-rosepetal-wine text-white" : "border-rosepetal-border bg-white/65 text-rosepetal-muted hover:border-rosepetal-wine"}`}>{option}</button>)}</div></fieldset>
      ))}
    </div>
  );

  const catalogTitle = collectionType || (activeCategory === "All" ? null : activeCategory);

  return (
    <div data-collection-shop-view className={`${styles.page} ${styles.editorial} ${styles.liveShop}`}>
      <EditorialHero />

      <section className={styles.catalog} id="editorial-products" aria-labelledby="shop-catalog-title">
        <div className={styles.catalogHeading}>
          <div>
            <p className={styles.eyebrow}>{filterParam === "wishlist" ? "Your saved edit" : "The curated wardrobe"}</p>
            <h2 id="shop-catalog-title">
              {catalogTitle ? <>Explore <em>{catalogTitle}.</em></> : <>Pieces to <em>fall for.</em></>}
            </h2>
          </div>
          <p>Thoughtfully chosen. Effortlessly yours.</p>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.categoryList} aria-label="Filter by category">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category === "All" ? "All pieces" : category}
              </button>
            ))}
          </div>
          <div className={styles.sortLine}>
            <span aria-live="polite">{filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}</span>
            <label>
              <SlidersHorizontal size={14} aria-hidden="true" />
              <span className={styles.srOnly}>Sort products</span>
              <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </label>
          </div>
        </div>

        <details className={styles.refineDetails}>
          <summary><SlidersHorizontal size={15} aria-hidden="true" /> Refine by price, colour, fabric & weave <ChevronDown size={15} aria-hidden="true" /></summary>
          <div className={styles.filterPanelBody}>{filterContent}</div>
        </details>

        {filteredProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {filteredProducts.map((product) => (
              <article className={styles.productShell} data-collection-product-card key={product.id}>
                <ProductCard product={product} />
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.eyebrow}>The edit awaits</p>
            <h3>{filterParam === "wishlist" ? "No saved pieces yet." : "No pieces match these filters."}</h3>
            <p>Try another category or explore the full Rosepetal collection.</p>
            <div>
              <button type="button" onClick={resetFilters}>Reset filters</button>
              <Link href="/collections">Shop all pieces <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        )}
      </section>

      <section className={styles.closingNote}>
        <p>For the story only you can tell.</p>
        <Link href="/contact">Visit our boutique <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
