"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Heart, Menu, X, ArrowRight } from "lucide-react";
import RosepetalLogo from "./RosepetalLogo";
import { HEADER_NAV_LINKS } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { wishlist } = useBoutique();

  useEffect(() => { setMobileMenuOpen(false); setIsSearchOpen(false); }, [pathname]);

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/collections${searchQuery.trim() ? `?q=${encodeURIComponent(searchQuery.trim())}` : ""}`);
    setIsSearchOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-rosepetal-border/60 bg-[#FFF5F6]/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <RosepetalLogo />
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {HEADER_NAV_LINKS.map((link) => (
            <Link key={link.name} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={`whitespace-nowrap rounded-sm py-2 text-sm font-medium transition-colors hover:text-rosepetal-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine xl:text-base ${pathname === link.href ? "text-rosepetal-wine underline underline-offset-8" : "text-rosepetal-text"}`}>{link.name}</Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button type="button" onClick={() => setIsSearchOpen((open) => !open)} aria-label="Search styles" aria-expanded={isSearchOpen} aria-controls="header-search" className="grid h-11 w-11 place-items-center rounded-full text-rosepetal-text hover:text-rosepetal-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine"><Search className="h-5 w-5" aria-hidden="true" /></button>
          <Link href="/collections?filter=wishlist" aria-label={`Saved styles, ${wishlist.length}`} className="relative grid h-11 w-11 place-items-center rounded-full text-rosepetal-text hover:text-rosepetal-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine"><Heart className="h-5 w-5" aria-hidden="true" />{wishlist.length > 0 && <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-rosepetal-wine px-1 text-[10px] text-white">{wishlist.length}</span>}</Link>
          <Link href="/collections" className="hidden min-h-11 items-center gap-2 rounded-lg bg-rosepetal-wine px-5 text-sm font-semibold text-white transition-colors hover:bg-rosepetal-wineHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2 sm:inline-flex">Explore styles <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" className="grid h-11 w-11 place-items-center rounded-full text-rosepetal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine lg:hidden">{mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
        </div>
      </div>
      {isSearchOpen && <form id="header-search" onSubmit={search} role="search" className="flex items-center gap-3 border-t border-rosepetal-border bg-[#FFF9F7] px-4 py-3 sm:justify-center"><label htmlFor="site-search" className="sr-only">Search styles</label><input id="site-search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search sarees, dresses, colours…" autoFocus className="min-h-11 w-full max-w-xl rounded-lg border border-rosepetal-border bg-white px-4 text-base text-rosepetal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine" /><button type="submit" className="min-h-11 rounded-lg bg-rosepetal-wine px-5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine">Search</button></form>}
      {mobileMenuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-rosepetal-border bg-[#FFF5F6] px-5 py-4 shadow-xl lg:hidden"><div className="flex flex-col gap-1">{HEADER_NAV_LINKS.map((link) => <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} aria-current={pathname === link.href ? "page" : undefined} className="rounded-lg px-3 py-3 text-base font-medium text-rosepetal-text hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine">{link.name}</Link>)}</div></nav>}
    </header>
  );
}
