"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import RosepetalLogo from "./RosepetalLogo";
import { HEADER_NAV_LINKS } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { wishlist, cartCount, isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useBoutique();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setIsCartOpen(false);
  }, [pathname]);

  const toggleDropdown = (menuId: string) => {
    setOpenDropdown((current) => (current === menuId ? null : menuId));
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-pink-200/50 bg-white/90 backdrop-blur-md shadow-xs transition-colors"
    >
      <div className="max-w-[90rem] mx-auto flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <RosepetalLogo />

        {/* Desktop Navigation Links */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 2xl:flex 2xl:gap-5">
          {HEADER_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            if (link.children && link.menuId) {
              const isOpen = openDropdown === link.menuId;

              return (
                <div key={link.name} className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown(link.menuId!)}
                    aria-expanded={isOpen}
                    aria-controls={link.menuId}
                  className={`relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap py-1 text-[15px] xl:text-[16px] tracking-wide transition-colors duration-200 ${
                      isOpen
                        ? "text-rosepetal-wine font-semibold"
                        : "text-rosepetal-text/85 hover:text-rosepetal-wine font-medium"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>

                  <div
                    id={link.menuId}
                    className={`absolute left-1/2 top-[calc(100%+1.2rem)] w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-rosepetal-border/80 bg-white p-2 shadow-[0_18px_45px_rgba(83,24,42,0.18)] transition-all duration-200 ${
                      isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 pointer-events-none opacity-0"
                    }`}
                    role="menu"
                    aria-label={`${link.name} categories`}
                  >
                    <div className="mb-1 border-b border-rosepetal-border/60 px-3 pb-2 pt-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rosepetal-wine">Explore {link.name}</p>
                    </div>
                    {link.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        role="menuitem"
                        onClick={() => {
                          setOpenDropdown(null);
                          if (child.shopAllId) {
                            window.dispatchEvent(new CustomEvent("shop-all:select", { detail: child.shopAllId }));
                          }
                        }}
                        className="group flex items-center justify-between rounded-xl px-3 py-2.5 font-serif-luxury text-[16px] text-rosepetal-text transition-colors hover:bg-rosepetal-blushLight hover:text-rosepetal-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine"
                      >
                        <span>{child.name}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative shrink-0 whitespace-nowrap py-1 text-[15px] xl:text-[16px] tracking-wide transition-all duration-200 ${
                  isActive
                    ? "text-rosepetal-wine font-semibold"
                    : "text-rosepetal-text/85 hover:text-rosepetal-wine font-medium"
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

        {/* Right Utility Icons & Shop Now Button */}
        <div className="flex shrink-0 items-center space-x-1 sm:space-x-4">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-rosepetal-text/75 hover:text-rosepetal-wine transition-colors p-2 sm:p-1 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-full active:bg-rosepetal-blushLight/50"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[1.7]" />
          </button>

          {/* Wishlist Link with Badge */}
          <Link
            href="/collections?filter=wishlist"
            className="relative text-rosepetal-text/75 hover:text-rosepetal-wine transition-colors p-2 sm:p-1 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-full active:bg-rosepetal-blushLight/50"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.7]" />
            <span className="absolute top-1 right-0 sm:-top-1 sm:-right-1.5 bg-rosepetal-wine text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
              {wishlist.length}
            </span>
          </Link>

          {/* Shopping Bag with quick summary */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCartOpen((open) => !open)}
              aria-label="Shopping bag"
              aria-expanded={isCartOpen}
              aria-controls="shopping-bag-summary"
              className="relative p-2 sm:p-1 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-full active:bg-rosepetal-blushLight/50 text-rosepetal-text/75 transition-colors hover:text-rosepetal-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.7]" />
              <span className="absolute top-1 right-0 sm:-top-1 sm:-right-1.5 bg-rosepetal-wine text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {cartCount}
              </span>
            </button>
            {isCartOpen && (
              <div
                id="shopping-bag-summary"
                role="dialog"
                aria-label="Shopping bag summary"
                className="absolute right-0 top-[calc(100%+0.9rem)] z-50 w-56 rounded-2xl border border-rosepetal-border/80 bg-[#FFF9F7]/98 p-4 shadow-[0_18px_45px_rgba(83,24,42,0.18)] backdrop-blur-xl"
              >
                <p className="font-serif-luxury text-lg text-rosepetal-text">Your bag</p>
                <p className="mt-1 text-xs leading-relaxed text-rosepetal-muted">
                  {cartCount === 0 ? "Your bag is waiting for its first piece." : `${cartCount} ${cartCount === 1 ? "piece" : "pieces"} ready to review.`}
                </p>
                <Link
                  href="/collections"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rosepetal-wine px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-rosepetal-wineHover"
                >
                  Continue shopping
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>

          {/* New Shop Now Button matching mockup */}
          <Link
            href="/collections"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-xs font-semibold tracking-wider rounded-lg shadow-sm hover:shadow-md transition-all group"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="2xl:hidden text-rosepetal-text hover:text-rosepetal-wine p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-full active:bg-rosepetal-blushLight/50"
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
              placeholder="Search sarees, dresses, lehengas, bed linens..."
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
        <div className="2xl:hidden bg-[#FCECEE] border-b border-rosepetal-border px-6 py-6 shadow-xl space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3.5">
            {HEADER_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              if (link.children && link.menuId) {
                const mobileMenuId = `${link.menuId}-mobile`;
                const isOpen = openDropdown === mobileMenuId;

                return (
                  <div key={link.name} className="border-b border-rosepetal-border/40 pb-2">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(mobileMenuId)}
                      aria-expanded={isOpen}
                      aria-controls={mobileMenuId}
                      className="flex w-full items-center justify-between py-1.5 text-left text-lg font-medium tracking-wide text-rosepetal-text/85 transition-colors hover:text-rosepetal-wine"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>

                    <div id={mobileMenuId} className={`grid transition-all duration-200 ${isOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <div className="space-y-1 border-l border-rosepetal-wine/20 pl-3">
                          {link.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => {
                                setOpenDropdown(null);
                                setMobileMenuOpen(false);
                                if (child.shopAllId) {
                                  window.dispatchEvent(new CustomEvent("shop-all:select", { detail: child.shopAllId }));
                                }
                              }}
                              className="block rounded-lg px-3 py-2 font-serif-luxury text-[16px] text-rosepetal-muted transition-colors hover:bg-white/70 hover:text-rosepetal-wine"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium tracking-wide py-1.5 border-b border-rosepetal-border/40 ${
                    isActive
                      ? "text-rosepetal-wine font-semibold"
                      : "text-rosepetal-text/85 hover:text-rosepetal-wine"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/collections"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 bg-rosepetal-wine text-white text-xs uppercase font-semibold tracking-wider rounded-lg flex items-center justify-center gap-2"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
