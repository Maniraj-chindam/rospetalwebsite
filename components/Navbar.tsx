"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import RosepetalLogo from "./RosepetalLogo";
import { NAV_LINKS } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { wishlist, cartCount, isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useBoutique();

  return (
    <header className="sticky top-0 z-50 bg-[#FAF4F3]/95 backdrop-blur-md border-b border-rosepetal-border/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <RosepetalLogo />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm tracking-wide font-normal transition-all duration-200 relative py-1 ${
                  isActive
                    ? "text-rosepetal-wine font-medium"
                    : "text-rosepetal-text/80 hover:text-rosepetal-wine"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-rosepetal-wine rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Utility Icons */}
        <div className="flex items-center space-x-5">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-rosepetal-text/75 hover:text-rosepetal-wine transition-colors p-1"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[1.7]" />
          </button>

          {/* Wishlist Link */}
          <Link
            href="/collections?filter=wishlist"
            className="relative text-rosepetal-text/75 hover:text-rosepetal-wine transition-colors p-1"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.7]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-rosepetal-wine text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon with badge (matching reference '0' badge) */}
          <div className="relative text-rosepetal-text/75 hover:text-rosepetal-wine transition-colors p-1 cursor-pointer">
            <ShoppingBag className="w-5 h-5 stroke-[1.7]" />
            <span className="absolute -top-1 -right-1.5 bg-rosepetal-wine text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
              {cartCount}
            </span>
          </div>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-rosepetal-text hover:text-rosepetal-wine p-1"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Quick Search Bar */}
      {isSearchOpen && (
        <div className="bg-rosepetal-surface border-b border-rosepetal-border px-4 py-3 shadow-inner">
          <div className="max-w-xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-rosepetal-muted" />
            <input
              type="text"
              placeholder="Search sarees, lehengas, bridal wear, handlooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none text-rosepetal-text placeholder-rosepetal-muted/70 font-sans"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-rosepetal-muted hover:text-rosepetal-wine"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF4F3] border-b border-rosepetal-border px-6 py-6 shadow-xl space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base tracking-wide py-1 border-b border-rosepetal-border/40 ${
                    isActive
                      ? "text-rosepetal-wine font-semibold"
                      : "text-rosepetal-text/80 hover:text-rosepetal-wine"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
