"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, PencilRuler, Scissors, HeartHandshake } from "lucide-react";
import { useBoutique } from "@/context/BoutiqueContext";

const HOW_IT_WORKS = [
  {
    step: "1. SHARE YOUR IDEAS",
    desc: "Tell us your style, occasion and preferences.",
    Icon: Sparkles,
  },
  {
    step: "2. DESIGN A PLAN",
    desc: "We discuss fabric, fit and timing with you.",
    Icon: PencilRuler,
  },
  {
    step: "3. CONFIRM THE DETAILS",
    desc: "Agree on the design and next steps before work begins.",
    Icon: Scissors,
  },
  {
    step: "4. STAY IN TOUCH",
    desc: "We confirm progress and collection or delivery details with you.",
    Icon: HeartHandshake,
  },
];

export default function CustomDesignPage() {
  const { setIsConsultationOpen } = useBoutique();

  return (
    <div className="relative overflow-hidden">
      {/* ----------------- 01. HERO WITH CENTER CARD ----------------- */}
      <section className="relative min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Atelier Embroidery Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/video-maggam-work.png"
            alt="Red embellished occasion wear"
            fill
            priority
            className="object-cover brightness-[0.88]"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
        </div>

        {/* Center Framed White Card (matching mockup) */}
        <div className="relative z-10 w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-2xl border border-white/60 text-center space-y-4">
          <h1 className="font-serif-luxury text-4xl sm:text-5xl text-rosepetal-wine font-light">
            Custom Designs
          </h1>

          <p className="text-[11px] uppercase tracking-[0.25em] text-rosepetal-text/80 font-semibold">
            YOUR VISION. OUR CRAFT.
          </p>

          <p className="text-xs sm:text-sm text-rosepetal-muted max-w-md mx-auto leading-relaxed font-sans font-light">
            Tell us what you have in mind. We will discuss design, fabric, fit and timing before confirming any custom order.
          </p>

          <div className="pt-4">
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-sm shadow-md hover:shadow-lg transition-all group"
            >
              <span>START A CONSULTATION</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ----------------- 02. HOW IT WORKS ----------------- */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal drop-shadow-sm">
            How It Works
          </h2>
          <div className="w-16 h-[1.5px] bg-[#FDE8C5] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {HOW_IT_WORKS.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-white/60 hover:shadow-xl transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-rosepetal-blushLight/70 flex items-center justify-center text-rosepetal-wine mb-1">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-rosepetal-text">
                  {item.step}
                </h3>
                <p className="text-xs text-rosepetal-muted leading-relaxed font-sans font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------- 03. CONSULTATION / ATELIER BANNER ----------------- */}
      <section className="pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-[#FAF0EE] rounded-2xl border border-rosepetal-border overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Left Artisan Photo */}
          <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:h-full min-h-[260px]">
            <Image
              src="/thridha-handloom-01.webp"
              alt="Silk saree showing detailed woven pattern"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Banner CTA */}
          <div className="md:col-span-7 p-8 sm:p-12 text-center md:text-left space-y-4">
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-rosepetal-wine font-light leading-tight">
              Let&apos;s Create <br />
              Something Beautiful
            </h3>
            <p className="text-xs sm:text-sm text-rosepetal-muted max-w-md font-sans font-light">
              Tell us what you have in mind and request a personal design consultation. We will confirm the details with you.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-sm shadow-md hover:shadow-lg transition-all group"
              >
                <span>BOOK AN APPOINTMENT</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
