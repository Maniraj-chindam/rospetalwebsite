"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { EditorialHero } from "@/components/ShopConcepts";
import { PRODUCTS_CATALOG } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";
import styles from "./ShopConcepts.module.css";
import { isPurchasable } from "@/lib/commerce";

const CATEGORIES = ["All", "Sarees", "Lehengas", "Dresses", "Designer Suits"];

function SearchParamSync({ onChange }: { onChange: (value: string) => void }) {
  const params = useSearchParams();
  useEffect(() => onChange(params.toString()), [params, onChange]);
  return null;
}

export default function CollectionsClient() {
  const [currentParams, setCurrentParams] = useState("");
  const searchParams = useMemo(() => new URLSearchParams(currentParams), [currentParams]);
  const requestedCategory = searchParams.get("category") || "All";
  const requestedQuery = searchParams.get("q") || "";
  const wishlistOnly = searchParams.get("filter") === "wishlist";
  const { wishlist } = useBoutique();
  const hasPurchasableProducts = PRODUCTS_CATALOG.some(isPurchasable);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.includes(requestedCategory) ? requestedCategory : "All");
  const [query, setQuery] = useState(requestedQuery);
  const [sort, setSort] = useState("featured");

  useEffect(() => setQuery(requestedQuery), [requestedQuery]);
  useEffect(() => setActiveCategory(CATEGORIES.includes(requestedCategory) ? requestedCategory : "All"), [requestedQuery, wishlistOnly, requestedCategory]);

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    const matches = PRODUCTS_CATALOG.filter((item) => {
      if (wishlistOnly && !wishlist.includes(item.id)) return false;
      if (activeCategory !== "All" && item.category !== activeCategory) return false;
      return !term || `${item.name} ${item.category} ${item.colour} ${item.description ?? ""}`.toLocaleLowerCase().includes(term);
    });
    return sort === "name" ? [...matches].sort((a, b) => a.name.localeCompare(b.name)) : matches;
  }, [activeCategory, query, sort, wishlist, wishlistOnly]);

  const resetFilters = () => {
    setActiveCategory("All");
    setQuery("");
    setSort("featured");
  };

  return (
    <div data-collection-shop-view className={`${styles.page} ${styles.editorial} ${styles.liveShop}`}>
      <Suspense fallback={null}><SearchParamSync onChange={setCurrentParams} /></Suspense>
      <EditorialHero />
      <section className={styles.catalog} id="editorial-products" aria-labelledby="shop-catalog-title">
        <div className={styles.catalogHeading}>
          <div>
            <p className={styles.eyebrow}>{wishlistOnly ? "Your saved edit" : "The curated wardrobe"}</p>
            <h2 id="shop-catalog-title">Pieces to <em>explore.</em></h2>
          </div>
          <p>{hasPurchasableProducts ? "Shop available pieces, or enquire about styles still being prepared." : "Browse the styles, then enquire about the details that matter to you."}</p>
        </div>
        <p className="mb-6 max-w-3xl rounded-lg border border-rosepetal-border bg-white/75 px-4 py-3 text-sm leading-relaxed text-rosepetal-text">
          {hasPurchasableProducts ? "Styles without a listed price are references for enquiry. For priced pieces, size and stock are checked again before payment." : "These images are style references. Price, fabric, sizing, availability and delivery are confirmed by the boutique for each enquiry."}
        </p>
        <div className="mb-6 max-w-md">
          <label htmlFor="collection-search" className="mb-2 block text-sm font-medium text-rosepetal-text">Search the collection</label>
          <div className="flex items-center gap-2 rounded-lg border border-rosepetal-border bg-white px-3 focus-within:ring-2 focus-within:ring-rosepetal-wine">
            <Search size={18} aria-hidden="true" className="text-rosepetal-wine" />
            <input id="collection-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try saree, dress, plum…" className="min-h-11 w-full bg-transparent text-base text-rosepetal-text outline-none" />
          </div>
        </div>
        <div className={styles.toolbar}>
          <div className={styles.categoryList} aria-label="Filter by category">
            {CATEGORIES.map((category) => (
              <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>
                {category === "All" ? "All pieces" : category}
              </button>
            ))}
          </div>
          <div className={styles.sortLine}>
            <span aria-live="polite">{filteredProducts.length} {filteredProducts.length === 1 ? "style" : "styles"}</span>
            <label>
              <span className={styles.srOnly}>Sort products</span>
              <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="name">Name: A–Z</option>
              </select>
            </label>
          </div>
        </div>
        {filteredProducts.length ? (
          <div className={styles.productGrid}>
            {filteredProducts.map((product) => (
              <article className={styles.productShell} data-collection-product-card key={product.id}>
                <ProductCard product={product} />
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.eyebrow}>No matching styles</p>
            <h3>{wishlistOnly && wishlist.length === 0 ? "No saved pieces yet." : "Try another search or category."}</h3>
            <p>Browse all styles to discover more of the Rosepetal edit.</p>
            <div><button type="button" onClick={resetFilters}>Clear filters</button><Link href="/collections">All styles <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
          </div>
        )}
      </section>
      <section className={styles.closingNote}>
        <p>For the story only you can tell.</p>
        <Link href="/contact">Make an enquiry <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
