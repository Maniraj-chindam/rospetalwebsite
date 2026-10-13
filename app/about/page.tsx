import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flower2, Scissors, Users, HeartHandshake } from "lucide-react";
import FloatingPetals from "@/components/FloatingPetals";
import { ABOUT_PILLARS } from "@/data/boutique-data";

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* ----------------- 01. OUR STORY HERO ----------------- */}
      <section className="relative min-h-[78vh] flex items-center bg-gradient-to-b from-[#F9ECEB] via-[#FCECEE] to-[#FCECEE] pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <FloatingPetals />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Story Content */}
          <div className="lg:col-span-6 space-y-6 z-20 text-left">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-rosepetal-wine">
              OUR STORY
            </span>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-rosepetal-wine leading-[1.14] font-light">
              A Boutique Born from a Love for Timeless Beauty
            </h1>

            <p className="text-sm sm:text-base text-rosepetal-muted max-w-lg font-sans font-light leading-relaxed">
              Rosepetal Designer Boutique is a celebration of heritage, craftsmanship and the modern woman. What started as a small dream has now blossomed into a label known for its elegant sarees, bespoke designs and unforgettable stories.
            </p>

            <div className="pt-2">
              <Link
                href="/custom-design"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-sm shadow-md hover:shadow-lg transition-all group"
              >
                <span>OUR JOURNEY</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Arched Back-Pose Model Portrait & Script Quote */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center">
            {/* Arched Portrait Frame */}
            <div className="relative w-[320px] sm:w-[390px] h-[460px] sm:h-[520px] rounded-t-[180px] rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-[#F5E6E5]">
              <Image
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=85&w=1000"
                alt="Rosepetal Craftsmanship Back Detail"
                fill
                priority
                sizes="(max-width: 640px) 320px, 390px"
                className="object-cover object-top hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Script Quote: "Just like a rose, every woman blooms in her own time." */}
            <div className="hidden sm:block absolute -right-4 lg:-right-10 top-1/4 select-none pointer-events-none text-right max-w-xs">
              <p className="font-script-accent text-3xl sm:text-4xl lg:text-[42px] text-rosepetal-wine/85 leading-tight">
                “Just like a rose, every woman blooms in her own time.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 02. OUR 4 PILLARS ----------------- */}
      <section className="border-y border-rosepetal-border/60 bg-white/60 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {ABOUT_PILLARS.map((pillar, idx) => {
            return (
              <div key={idx} className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-rosepetal-blushLight/60 flex items-center justify-center text-rosepetal-wine mb-1">
                  {idx === 0 && <Flower2 className="w-5 h-5 stroke-[1.5]" />}
                  {idx === 1 && <Scissors className="w-5 h-5 stroke-[1.5]" />}
                  {idx === 2 && <Users className="w-5 h-5 stroke-[1.5]" />}
                  {idx === 3 && <HeartHandshake className="w-5 h-5 stroke-[1.5]" />}
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-rosepetal-text">
                  {pillar.title}
                </h3>
                <p className="text-xs text-rosepetal-muted font-sans font-light">
                  {pillar.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------- 03. MORE THAN FASHION / CRAFT SECTION ----------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Artisan Hand-Embroidery Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-xl border-4 border-white/80 bg-rosepetal-card">
              <Image
                src="https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=85&w=900"
                alt="Artisan hand embroidering intricate zardozi detail"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Craft Description & Floral Motif */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-rosepetal-wine">
              MORE THAN FASHION
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-rosepetal-wine font-light leading-tight">
              Crafted with Heart, <br />
              Worn with Pride
            </h2>

            <p className="text-sm sm:text-base text-rosepetal-muted leading-relaxed font-sans font-light max-w-lg">
              Every piece at Rosepetal is thoughtfully designed and ethically crafted, bringing together traditional techniques and contemporary aesthetics. We work closely with skilled artisans to ensure every drape tells a story of culture, care and creativity.
            </p>

            <div className="pt-2">
              <Link
                href="/custom-design"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-sm shadow-md hover:shadow-lg transition-all group"
              >
                <span>OUR PROCESS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Botanical Rose Accent with Script Text */}
            <div className="pt-8 flex items-center gap-5">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full text-rosepetal-blush fill-current opacity-80">
                  <circle cx="50" cy="50" r="42" className="fill-[#F8DADB]" />
                  <path d="M50 20 C40 30 38 45 50 60 C62 45 60 30 50 20 Z" className="fill-[#E59CA5]" />
                  <path d="M25 45 C35 38 48 40 55 52 C45 62 30 55 25 45 Z" className="fill-[#DEA0A8]" />
                  <path d="M75 45 C65 38 52 40 45 52 C55 62 70 55 75 45 Z" className="fill-[#DEA0A8]" />
                  <circle cx="50" cy="50" r="8" className="fill-rosepetal-wine" />
                </svg>
              </div>
              <div className="font-script-accent text-3xl text-rosepetal-wine/90">
                Handcrafted for your beautiful moments
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
