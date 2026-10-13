"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { LOOKBOOK_GALLERY, LookbookItem } from "@/data/boutique-data";

const CATEGORIES = ["All", "Festive", "Bridal", "Handloom", "Contemporary"];

export default function LookbookPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeImage, setActiveImage] = useState<LookbookItem | null>(null);

  const filteredItems = LOOKBOOK_GALLERY.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
        <h1 className="font-serif-luxury text-4xl sm:text-5xl text-rosepetal-text font-normal">
          Lookbook
        </h1>
        <p className="text-[11px] uppercase tracking-[0.25em] text-rosepetal-wine font-semibold">
          REAL WOMEN. REAL MOMENTS. TIMELESS STYLE
        </p>
      </div>

      {/* Pill Filter Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

      {/* Editorial Masonry / Collage Layout (matching layout in mockup) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {/* Column 1 */}
        <div className="space-y-6">
          {filteredItems.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-rosepetal-card"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <p className="text-xs uppercase tracking-widest text-rosepetal-blush">
                      {item.category}
                    </p>
                    <p className="font-serif-luxury text-lg">{item.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2 (with Quote Card) */}
        <div className="space-y-6">
          {/* Item 4 */}
          {filteredItems[3] && (
            <div
              onClick={() => setActiveImage(filteredItems[3])}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-rosepetal-card"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={filteredItems[3].image}
                  alt={filteredItems[3].title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          )}

          {/* Featured Quote Card (Exact matching mockup center quote block) */}
          <div className="relative p-10 sm:p-12 rounded-xl bg-gradient-to-br from-[#FCEAEB] to-[#F7DDE0] border border-rosepetal-border/80 shadow-inner flex flex-col items-center justify-center text-center space-y-3 my-4">
            <span className="font-script-accent text-3xl sm:text-4xl text-rosepetal-wine">
              “Elegance is a state of mind.”
            </span>
            <div className="w-12 h-[1px] bg-rosepetal-wine/40" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-rosepetal-muted">
              Rosepetal Muse
            </span>
          </div>

          {/* Item 5 */}
          {filteredItems[4] && (
            <div
              onClick={() => setActiveImage(filteredItems[4])}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-rosepetal-card"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={filteredItems[4].image}
                  alt={filteredItems[4].title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          )}
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          {filteredItems.slice(5).map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-rosepetal-card"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <p className="text-xs uppercase tracking-widest text-rosepetal-blush">
                      {item.category}
                    </p>
                    <p className="font-serif-luxury text-lg">{item.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl max-h-[90vh] w-full bg-black rounded-lg overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-20 text-white/80 hover:text-white p-2 rounded-full bg-black/40"
              aria-label="Close image"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative aspect-[3/4] w-full max-h-[85vh]">
              <Image
                src={activeImage.image}
                alt={activeImage.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
