"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import RosepetalLogo from "./RosepetalLogo";
import { HEADER_NAV_LINKS } from "@/data/boutique-data";
import { useBoutique } from "@/context/BoutiqueContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const { wishlist, bag, isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useBoutique();
  const bagCount = bag.reduce((total, item) => total + item.qty, 0);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) searchRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (isSearchOpen) {
        setIsSearchOpen(false);
        searchTriggerRef.current?.focus();
      } else if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuTriggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [isSearchOpen, mobileMenuOpen, setIsSearchOpen]);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    setIsSearchOpen(false);
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  };

  return (
    <header className={`inset-x-0 top-0 z-50 border-b border-white/20 text-white transition-colors duration-300 ${isHomePage && !isScrolled ? "absolute bg-gradient-to-b from-black/65 via-black/25 to-transparent" : "fixed bg-[#A12D59]/95 shadow-lg backdrop-blur-md"}`}>
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-3 px-3 sm:h-20 sm:px-6 lg:px-8">
        <RosepetalLogo />
        <nav aria-label="Primary" className="hidden min-w-0 flex-1 items-center justify-center gap-3 xl:flex 2xl:gap-6">
          {HEADER_NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={`whitespace-nowrap rounded-sm py-1 text-sm font-medium tracking-wide transition-colors hover:text-[#FDE8C5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${pathname === link.href ? "border-b-2 border-[#FDE8C5] text-white" : "text-white/95"}`}>
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <button ref={searchTriggerRef} type="button" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-expanded={isSearchOpen} aria-controls="site-search" aria-label={isSearchOpen ? "Close search" : "Open search"} className="flex size-10 items-center justify-center rounded-full text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><Search className="size-5" aria-hidden="true" /></button>
          <Link href="/collections?filter=wishlist" aria-label={`Wishlist, ${wishlist.length} ${wishlist.length === 1 ? "item" : "items"}`} className="relative flex size-10 items-center justify-center rounded-full text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><Heart className="size-5" aria-hidden="true" /><span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-rosepetal-wine">{wishlist.length}</span></Link>
          <Link href="/bag" aria-label={`Bag, ${bagCount} ${bagCount === 1 ? "piece" : "pieces"}`} className="relative flex size-10 items-center justify-center rounded-full text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><ShoppingBag className="size-5" aria-hidden="true" />{bagCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-rosepetal-wine">{bagCount}</span>}</Link>
          <Link href="/collections" className="hidden items-center gap-1.5 rounded-lg border border-white/40 bg-white/20 px-4 py-2.5 text-xs font-semibold tracking-wider text-white transition-colors hover:bg-white hover:text-rosepetal-wine sm:inline-flex xl:hidden 2xl:inline-flex">Shop Now <ArrowRight className="size-3.5" aria-hidden="true" /></Link>
          <button ref={menuTriggerRef} type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} className="flex size-10 items-center justify-center rounded-full text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white xl:hidden">{mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}</button>
        </div>
      </div>
      {isSearchOpen && <form id="site-search" role="search" onSubmit={submitSearch} className="border-b border-rosepetal-border bg-[#fff5f6] px-4 py-3 text-rosepetal-text shadow-inner"><div className="mx-auto flex max-w-xl items-center gap-3"><label htmlFor="site-search-input" className="sr-only">Search Rosepetal</label><Search className="size-5 text-rosepetal-wine" aria-hidden="true" /><input ref={searchRef} id="site-search-input" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search pieces and pages" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-rosepetal-muted focus-visible:ring-2 focus-visible:ring-rosepetal-wine" /><button type="submit" className="rounded-md bg-rosepetal-wine px-4 py-2 text-xs font-semibold text-white hover:bg-rosepetal-wineHover">Search</button></div></form>}
      {mobileMenuOpen && <nav id="mobile-navigation" aria-label="Mobile" className="border-b border-rosepetal-border bg-[#FCECEE] px-6 py-4 text-rosepetal-text shadow-xl xl:hidden"><ul className="mx-auto grid max-w-xl gap-1">{HEADER_NAV_LINKS.map((link) => <li key={link.href}><Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setMobileMenuOpen(false)} className="block rounded-md border-b border-rosepetal-border/50 px-2 py-2.5 text-base font-medium hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rosepetal-wine">{link.name}</Link></li>)}</ul></nav>}
    </header>
  );
}
