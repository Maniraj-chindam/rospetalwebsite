import React from "react";
import Link from "next/link";

export default function RosepetalLogo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3.5 group text-left ${className}`}>
      {/* Rose Geometric Floral Emblem */}
      <div className="relative w-10 h-10 rounded-full border border-rosepetal-wine/40 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:border-rosepetal-wine group-hover:bg-rosepetal-blushLight/50">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-rosepetal-wine stroke-current fill-none stroke-[2.5]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular frame */}
          <circle cx="50" cy="50" r="45" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          {/* Inner Rose Petals */}
          <path d="M50 18 C35 32 35 48 50 62 C65 48 65 32 50 18 Z" />
          <path d="M18 50 C32 35 48 35 62 50 C48 65 35 65 18 50 Z" />
          <path d="M28 28 C42 32 54 44 58 58 C44 54 32 42 28 28 Z" opacity="0.75" />
          <path d="M72 28 C58 32 46 44 42 58 C56 54 68 42 72 28 Z" opacity="0.75" />
          <path d="M28 72 C42 68 54 56 58 42 C44 46 32 58 28 72 Z" opacity="0.75" />
          <path d="M72 72 C58 68 46 56 42 42 C56 46 68 58 72 72 Z" opacity="0.75" />
          {/* Rose Core */}
          <circle cx="50" cy="50" r="8" className="fill-rosepetal-wine/20 stroke-rosepetal-wine stroke-[2]" />
          <circle cx="50" cy="50" r="3" className="fill-rosepetal-wine" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="font-serif-luxury text-2xl font-normal tracking-wide text-rosepetal-wine group-hover:text-rosepetal-wineHover transition-colors leading-tight">
          Rosepetal
        </span>
        <span className="text-[9px] uppercase tracking-[0.26em] text-rosepetal-muted font-medium -mt-0.5">
          Designer Boutique
        </span>
      </div>
    </Link>
  );
}
