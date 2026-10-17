import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS_CATALOG } from "@/data/boutique-data";

const featuredIds = ["red-celebration-lehenga", "plum-evening-gown", "green-purple-border-saree", "pink-floral-ruffle-dress", "plum-gold-border-saree", "coral-floral-maxi-dress"];
const looks = featuredIds.map((id) => PRODUCTS_CATALOG.find((product) => product.id === id)).filter((product) => product !== undefined);

export default function LookbookPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FDE8C5]">Rosepetal inspiration</p>
        <h1 className="mt-3 font-serif-luxury text-4xl text-white sm:text-6xl">The Lookbook</h1>
        <p className="mt-4 text-sm leading-relaxed text-rose-100 sm:text-base">A visual edit of occasionwear and everyday styles. These are style references; the boutique confirms each piece’s availability and details on enquiry.</p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {looks.map((look, index) => (
          <article key={look.id} className={`overflow-hidden rounded-2xl border border-white/20 bg-[#FFF9F7] shadow-lg ${index === 0 ? "sm:row-span-2" : ""}`}>
            <div className={`relative ${index === 0 ? "aspect-[3/5] sm:h-full sm:min-h-[42rem]" : "aspect-[4/5]"} overflow-hidden bg-rosepetal-card`}>
              <Image src={look.image} alt={look.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16 text-white"><p className="text-xs uppercase tracking-[0.16em]">{look.category}</p><h2 className="mt-1 font-serif-luxury text-2xl">{look.name}</h2><Link href={`/contact?piece=${encodeURIComponent(look.name)}`} className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Enquire about this style <ArrowUpRight className="h-4 w-4" /></Link></div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 text-center"><Link href="/collections" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-rosepetal-wine">Explore all styles <ArrowUpRight className="h-4 w-4" /></Link></div>
    </div>
  );
}
