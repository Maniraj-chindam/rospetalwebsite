"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Heart, ShoppingBag, Eye, X, Check } from "lucide-react";
import { ProductItem } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";

export default function ProductCard({ product }: { product: ProductItem }) {
  const { wishlist, toggleWishlist, addToCart } = useBoutique();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const isFavorited = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <div className="group flex flex-col text-left">
        {/* Product Image Frame */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-[#F2E8E7] transition-all duration-300">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Top Wishlist Heart Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
              isFavorited
                ? "bg-rosepetal-wine text-white shadow-md"
                : "bg-white/80 text-rosepetal-text/70 hover:bg-white hover:text-rosepetal-wine"
            }`}
            aria-label="Save to wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : ""}`} />
          </button>

          {/* Quick Actions Hover Overlay */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center gap-1.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2 opacity-100 transition-opacity duration-300 sm:flex-row sm:gap-2 sm:p-3 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="flex w-full items-center justify-center gap-1 rounded bg-white/90 px-2 py-1.5 text-[10px] font-medium text-rosepetal-wine shadow-sm transition-all hover:bg-white sm:w-auto sm:px-3 sm:text-xs"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
            <button
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-1 rounded bg-rosepetal-wine px-2 py-1.5 text-[10px] font-medium text-white shadow-sm transition-all hover:bg-rosepetal-wineHover sm:w-auto sm:px-3 sm:text-xs"
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-3 space-y-1">
          <h3 className="font-serif-luxury text-base text-rosepetal-text font-normal group-hover:text-rosepetal-wine transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-rosepetal-muted font-sans font-medium">
            {product.price}
          </p>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 bg-black/50 backdrop-blur-sm animate-in fade-in" role="dialog" aria-modal="true" aria-label={`${product.name} quick view`}>
          <div className="relative w-full max-w-2xl bg-[#FFF5F6] rounded-xl overflow-hidden shadow-2xl border border-rosepetal-border p-6 flex flex-col md:flex-row gap-6">
            <button
              onClick={() => setIsQuickViewOpen(false)}
              className="absolute top-4 right-4 text-rosepetal-muted hover:text-rosepetal-wine z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full md:w-1/2 aspect-[3/4] rounded-lg overflow-hidden bg-rosepetal-card">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-rosepetal-wine font-semibold">
                  {product.category}
                </span>
                <h3 className="font-serif-luxury text-2xl text-rosepetal-text">
                  {product.name}
                </h3>
                <p className="font-serif-luxury text-xl text-rosepetal-wine font-semibold">
                  {product.price}
                </p>
                <p className="text-xs text-rosepetal-muted leading-relaxed">
                  {product.description ||
                    "Handcrafted by master artisans with delicate detailing, luxurious fabrics, and heritage-inspired embroidery."}
                </p>
              </div>

              <div className="pt-6 space-y-2.5">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-2.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-xs uppercase font-medium tracking-[0.2em] rounded transition-colors flex items-center justify-center gap-2"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Shopping Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    toggleWishlist(product.id);
                  }}
                  className="w-full py-2.5 border border-rosepetal-border hover:border-rosepetal-wine text-rosepetal-wine text-xs uppercase font-medium tracking-[0.2em] rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-rosepetal-wine" : ""}`} />
                  {isFavorited ? "Remove from Wishlist" : "Save to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
