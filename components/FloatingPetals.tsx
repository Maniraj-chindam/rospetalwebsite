"use client";

import React from "react";

export default function FloatingPetals() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {/* Petal 1 - Top Left */}
      <div className="absolute top-12 left-[8%] w-8 h-8 opacity-40 animate-float-slow">
        <svg viewBox="0 0 50 50" className="w-full h-full fill-[#E8A5AC]">
          <path d="M25 5 C15 15 5 28 15 42 C25 50 38 42 45 28 C48 18 35 5 25 5 Z" />
        </svg>
      </div>

      {/* Petal 2 - Top Center-Right */}
      <div className="absolute top-20 right-[18%] w-6 h-6 opacity-35 animate-float-reverse">
        <svg viewBox="0 0 50 50" className="w-full h-full fill-[#E099A0] rotate-45">
          <path d="M25 5 C15 15 5 28 15 42 C25 50 38 42 45 28 C48 18 35 5 25 5 Z" />
        </svg>
      </div>

      {/* Petal 3 - Mid Left */}
      <div className="absolute top-[48%] left-[4%] w-10 h-10 opacity-30 animate-float-reverse">
        <svg viewBox="0 0 50 50" className="w-full h-full fill-[#EBB2B8] -rotate-12">
          <path d="M25 5 C15 15 5 28 15 42 C25 50 38 42 45 28 C48 18 35 5 25 5 Z" />
        </svg>
      </div>

      {/* Petal 4 - Mid Right */}
      <div className="absolute top-[55%] right-[6%] w-7 h-7 opacity-40 animate-float-slow">
        <svg viewBox="0 0 50 50" className="w-full h-full fill-[#E29DA4] rotate-30">
          <path d="M25 5 C15 15 5 28 15 42 C25 50 38 42 45 28 C48 18 35 5 25 5 Z" />
        </svg>
      </div>

      {/* Petal 5 - Bottom Right */}
      <div className="absolute bottom-16 right-[12%] w-9 h-9 opacity-30 animate-float-reverse">
        <svg viewBox="0 0 50 50" className="w-full h-full fill-[#E5A3AA] rotate-90">
          <path d="M25 5 C15 15 5 28 15 42 C25 50 38 42 45 28 C48 18 35 5 25 5 Z" />
        </svg>
      </div>
    </div>
  );
}
