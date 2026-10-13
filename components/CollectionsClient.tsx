"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS_CATALOG } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";

const CATEGORIES = [
  "All",
  "Sarees",
  "Lehengas",
  "Designer Suits",
  "Bridal Wear",
  "Handlooms",
  "Accessories",
];

export default function CollectionsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const filterParam = searchParams.get("filter");

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const { wishlist, searchQuery } = useBoutique();

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((item) => {
      // If filtering by wishlist
      if (filterParam === "wishlist") {
        if (!wishlist.includes(item.id)) return false;
      }

      // Category filter
      if (activeCategory !== "All" && item.category !== activeCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        return matchesName || matchesCategory;
      }

      return true;
    });
  }, [activeCategory, filterParam, wishlist, searchQuery]);

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <h1 className="font-serif-luxury text-4xl sm:text-5xl text-rosepetal-text font-normal">
          Our Collections
        </h1>

        <p className="text-[11px] uppercase tracking-[0.25em] text-rosepetal-wine font-semibold">
          A CURATED RANGE FOR EVERY YOU
        </p>

        <p className="text-xs sm:text-sm text-rosepetal-muted leading-relaxed font-sans font-light">
          From timeless handlooms to contemporary couture, explore our exquisite collections designed to make every moment special.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center overflow-x-auto pb-4 mb-10 no-scrollbar">
        <div className="inline-flex items-center space-x-2 sm:space-x-6 border-b border-rosepetal-border/50 pb-2 px-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat && filterParam !== "wishlist";
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
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

      {/* Products Grid (2 rows x 4 columns = 8 products) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-rosepetal-surface rounded-xl border border-rosepetal-border p-8">
          <p className="font-serif-luxury text-2xl text-rosepetal-muted">
            {filterParam === "wishlist"
              ? "Your wishlist is currently empty."
              : "No pieces match your selected filter."}
          </p>
          <button
            onClick={() => setActiveCategory("All")}
            className="mt-4 px-5 py-2.5 bg-rosepetal-wine text-white text-xs uppercase tracking-wider rounded font-medium hover:bg-rosepetal-wineHover transition-colors"
          >
            Show All Creations
          </button>
        </div>
      )}
    </div>
  );
}
