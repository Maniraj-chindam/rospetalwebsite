import React from "react";
import Link from "next/link";

export default function RosepetalLogo({
  className = "",
  isLight = true,
}: {
  className?: string;
  isLight?: boolean;
}) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 sm:gap-3.5 group text-left ${className}`}>
      {/* Rose Geometric Floral Emblem */}
      <div
        className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center p-1 sm:p-1.5 transition-all duration-300 shrink-0 ${
          isLight
            ? "border-white/50 group-hover:border-white group-hover:bg-white/15"
            : "border-rosepetal-wine/40 group-hover:border-rosepetal-wine group-hover:bg-rosepetal-blushLight/50"
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full stroke-current fill-none stroke-[2.5] ${
            isLight ? "text-white" : "text-rosepetal-wine"
          }`}
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
          <circle
            cx="50"
            cy="50"
            r="8"
            className={isLight ? "fill-white/20 stroke-white stroke-[2]" : "fill-rosepetal-wine/20 stroke-rosepetal-wine stroke-[2]"}
          />
          <circle cx="50" cy="50" r="3" className={isLight ? "fill-white" : "fill-rosepetal-wine"} />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-serif-luxury text-2xl sm:text-3xl font-medium tracking-wide transition-colors leading-tight ${
            isLight
              ? "text-white group-hover:text-[#FDE8C5]"
              : "text-rosepetal-wine group-hover:text-rosepetal-wineHover"
          }`}
        >
          Rosepetal
        </span>
        <span
          className={`text-[9px] sm:text-[10.5px] uppercase tracking-[0.24em] sm:tracking-[0.28em] font-semibold -mt-0.5 ${
            isLight ? "text-rose-100" : "text-rosepetal-muted"
          }`}
        >
          Designer Boutique
        </span>
      </div>
    </Link>
  );
}
