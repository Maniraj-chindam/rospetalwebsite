"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import RosepetalLogo from "./RosepetalLogo";
import { CONTACT_INFO, NAV_LINKS } from "@/data/boutique-data";

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((current) => (current === section ? null : section));
  };

  return (
    <footer className="relative isolate overflow-hidden text-rosepetal-text">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Rosepetal boutique collection reel"
      >
        <source src="/rosepetal-footer-reel.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-[#fff8f5]/80" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1 pb-2 sm:pb-0">
            <RosepetalLogo />
            <p className="text-xs text-rosepetal-muted leading-relaxed max-w-xs font-sans">
              A celebration of heritage, craftsmanship, and the modern woman. Discover timeless bridal wear, handlooms, and bespoke creations.
            </p>
            <div className="pt-2">
              <span className="font-script-accent text-2xl text-rosepetal-wine">
                Where Tradition Blooms in Style
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="border-t border-rosepetal-wine/10 pt-3 sm:border-0 sm:pt-0 space-y-3">
            <button
              type="button"
              onClick={() => toggleSection("navigation")}
              className="flex w-full items-center justify-between py-1 text-left sm:cursor-default sm:pointer-events-none"
              aria-expanded={openSection === "navigation"}
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rosepetal-wine">
                Navigation
              </h4>
              <ChevronDown
                className={`h-4 w-4 text-rosepetal-wine transition-transform duration-200 sm:hidden ${
                  openSection === "navigation" ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <ul
              className={`space-y-1.5 text-xs sm:block ${
                openSection === "navigation" ? "block" : "hidden sm:block"
              }`}
            >
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-rosepetal-muted hover:text-rosepetal-wine transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="border-t border-rosepetal-wine/10 pt-3 sm:border-0 sm:pt-0 space-y-3">
            <button
              type="button"
              onClick={() => toggleSection("collections")}
              className="flex w-full items-center justify-between py-1 text-left sm:cursor-default sm:pointer-events-none"
              aria-expanded={openSection === "collections"}
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rosepetal-wine">
                Collections
              </h4>
              <ChevronDown
                className={`h-4 w-4 text-rosepetal-wine transition-transform duration-200 sm:hidden ${
                  openSection === "collections" ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <ul
              className={`space-y-1.5 text-xs text-rosepetal-muted sm:block ${
                openSection === "collections" ? "block" : "hidden sm:block"
              }`}
            >
              <li>
                <Link href="/collections?category=Sarees" className="inline-block py-1 hover:text-rosepetal-wine transition-colors">
                  Heritage Sarees
                </Link>
              </li>
              <li>
                <Link href="/collections?category=Lehengas" className="inline-block py-1 hover:text-rosepetal-wine transition-colors">
                  Bridal Lehengas
                </Link>
              </li>
              <li>
                <Link href="/collections?category=Designer+Suits" className="inline-block py-1 hover:text-rosepetal-wine transition-colors">
                  Designer Suits
                </Link>
              </li>
              <li>
                <Link href="/collections?category=Handlooms" className="inline-block py-1 hover:text-rosepetal-wine transition-colors">
                  Pure Handlooms
                </Link>
              </li>
              <li>
                <Link href="/custom-design" className="inline-block py-1 hover:text-rosepetal-wine transition-colors">
                  Bespoke Couture
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio & Contact */}
          <div className="border-t border-rosepetal-wine/10 pt-3 sm:border-0 sm:pt-0 space-y-3">
            <button
              type="button"
              onClick={() => toggleSection("studio")}
              className="flex w-full items-center justify-between py-1 text-left sm:cursor-default sm:pointer-events-none"
              aria-expanded={openSection === "studio"}
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rosepetal-wine">
                Boutique Studio
              </h4>
              <ChevronDown
                className={`h-4 w-4 text-rosepetal-wine transition-transform duration-200 sm:hidden ${
                  openSection === "studio" ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`space-y-2 text-xs sm:block ${
                openSection === "studio" ? "block" : "hidden sm:block"
              }`}
            >
              <p className="text-rosepetal-muted">
                <strong className="text-rosepetal-text">Phone:</strong>{" "}
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-rosepetal-wine transition-colors py-0.5 inline-block">
                  {CONTACT_INFO.phone}
                </a>
              </p>
              <p className="text-rosepetal-muted">Appointments are arranged by phone or WhatsApp.</p>
            </div>
          </div>
        </div>

        {/* Bottom divider & credits */}
        <div className="mt-8 pt-6 sm:mt-12 sm:pt-8 border-t border-rosepetal-border/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-rosepetal-muted text-center sm:text-left gap-2 sm:gap-0">
          <p>© {new Date().getFullYear()} Rosepetal Designer Boutique. All rights reserved.</p>
          <p className="font-script-accent text-lg text-rosepetal-wine/80">
            Handcrafted with love for your beautiful moments
          </p>
        </div>
      </div>
    </footer>
  );
}
