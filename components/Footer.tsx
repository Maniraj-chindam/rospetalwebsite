import React from "react";
import Link from "next/link";
import RosepetalLogo from "./RosepetalLogo";
import { CONTACT_INFO, NAV_LINKS } from "@/data/boutique-data";

export default function Footer() {
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
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
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
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rosepetal-wine">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-rosepetal-muted hover:text-rosepetal-wine transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rosepetal-wine">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-rosepetal-muted">
              <li>
                <Link href="/collections?category=Sarees" className="hover:text-rosepetal-wine">
                  Heritage Sarees
                </Link>
              </li>
              <li>
                <Link href="/collections?category=Lehengas" className="hover:text-rosepetal-wine">
                  Bridal Lehengas
                </Link>
              </li>
              <li>
                <Link href="/collections?category=Designer+Suits" className="hover:text-rosepetal-wine">
                  Designer Suits
                </Link>
              </li>
              <li>
                <Link href="/collections?category=Handlooms" className="hover:text-rosepetal-wine">
                  Pure Handlooms
                </Link>
              </li>
              <li>
                <Link href="/custom-design" className="hover:text-rosepetal-wine">
                  Bespoke Couture
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rosepetal-wine">
              Boutique Studio
            </h4>
            <p className="text-xs text-rosepetal-muted leading-relaxed">
              {CONTACT_INFO.studio}
            </p>
            <p className="text-xs text-rosepetal-muted">
              <strong className="text-rosepetal-text">Phone:</strong> {CONTACT_INFO.phone}
            </p>
            <p className="text-xs text-rosepetal-muted">
              <strong className="text-rosepetal-text">Email:</strong> {CONTACT_INFO.email}
            </p>
            <p className="text-xs text-rosepetal-muted">
              <strong className="text-rosepetal-text">Hours:</strong> {CONTACT_INFO.hours}
            </p>
          </div>
        </div>

        {/* Bottom divider & credits */}
        <div className="mt-12 pt-8 border-t border-rosepetal-border/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-rosepetal-muted">
          <p>© {new Date().getFullYear()} Rosepetal Designer Boutique. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-script-accent text-lg text-rosepetal-wine/80">
            Handcrafted with love for your beautiful moments
          </p>
        </div>
      </div>
    </footer>
  );
}
