import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Flower2, Scissors, Globe } from "lucide-react";
import FloatingPetals from "@/components/FloatingPetals";
import { HOME_PILLARS, HOME_CATEGORIES } from "@/data/boutique-data";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative min-h-[82vh] flex items-center bg-gradient-to-b from-[#F9ECEB] via-[#FAF4F3] to-[#FAF4F3] pt-6 pb-16 px-4 sm:px-6 lg:px-8">
        <FloatingPetals />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-6 space-y-6 z-20 text-left">
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-rosepetal-wine leading-[1.12] tracking-normal font-light">
              Where Tradition <br />
              Blooms in Style
            </h1>

            <p className="text-sm sm:text-base text-rosepetal-muted max-w-md font-sans font-light leading-relaxed">
              Designer sarees, handlooms, bridal wear and bespoke creations for every special you.
            </p>

            <div className="pt-2">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-sm shadow-md hover:shadow-lg transition-all group"
              >
                <span>EXPLORE COLLECTIONS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Hero Visual with Arched Model Frame & Script */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center">
            {/* Arched Portrait Frame */}
            <div className="relative w-[320px] sm:w-[400px] h-[460px] sm:h-[530px] rounded-t-[180px] rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-[#F5E6E5]">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1000"
                alt="Rosepetal Designer Saree Collection"
                fill
                priority
                sizes="(max-width: 640px) 320px, 400px"
                className="object-cover object-top hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Script Accent: "Sarees Stories You" (Matching Mockup) */}
            <div className="hidden sm:block absolute -right-6 lg:-right-4 top-1/4 select-none pointer-events-none text-right">
              <div className="font-script-accent text-5xl lg:text-6xl text-rosepetal-wine/80 leading-none space-y-1">
                <div>Sarees</div>
                <div className="pl-6">Stories</div>
                <div className="pl-12">You</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 4 VALUE PROPOSITIONS BAR ----------------- */}
      <section className="border-y border-rosepetal-border/60 bg-white/60 backdrop-blur-sm py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {HOME_PILLARS.map((pillar, idx) => {
            return (
              <div key={idx} className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-rosepetal-blushLight/60 flex items-center justify-center text-rosepetal-wine mb-1">
                  {idx === 0 && <Sparkles className="w-5 h-5 stroke-[1.5]" />}
                  {idx === 1 && <Flower2 className="w-5 h-5 stroke-[1.5]" />}
                  {idx === 2 && <Scissors className="w-5 h-5 stroke-[1.5]" />}
                  {idx === 3 && <Globe className="w-5 h-5 stroke-[1.5]" />}
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

      {/* ----------------- OUR COLLECTIONS SECTION ----------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-rosepetal-border/40">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-rosepetal-text font-normal">
            Our Collections
          </h2>
          <Link
            href="/collections"
            className="text-xs uppercase font-medium tracking-[0.2em] text-rosepetal-wine hover:text-rosepetal-wineHover flex items-center gap-1.5 transition-colors group"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {HOME_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex flex-col items-center text-center space-y-3"
            >
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-rosepetal-card border border-rosepetal-border/60 shadow-sm group-hover:shadow-md transition-all duration-300">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>
              <span className="font-serif-luxury text-base text-rosepetal-text group-hover:text-rosepetal-wine transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
