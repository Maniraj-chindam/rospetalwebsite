"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { HEADER_NAV_LINKS, type ProductItem } from "@/data/boutique-data";
import { fetchPosCatalog, groupCatalogByStyle } from "@/lib/pos-catalog";

const collectionLinks = [
  { name: "Sarees", href: "/collections?category=Sarees" },
  { name: "Lehengas", href: "/collections?category=Lehengas" },
  { name: "Dresses", href: "/collections?category=Dresses" },
  { name: "Handlooms", href: "/collections?category=Handlooms" },
];
const informationLinks = [
  { name: "Privacy", href: "/privacy", terms: "privacy personal information data" },
  { name: "Delivery", href: "/shipping", terms: "delivery shipping courier" },
  { name: "Returns", href: "/returns", terms: "returns exchange alteration refund" },
  { name: "Order information", href: "/terms", terms: "terms orders payment policy" },
];

export default function SearchResults() {
  const query = useSearchParams().get("q")?.trim() ?? "";
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetchPosCatalog(controller.signal)
      .then((items) => { setProducts(items); setStatus("ready"); })
      .catch(() => { if (!controller.signal.aborted) setStatus("error"); });
    return () => controller.abort();
  }, []);

  const term = query.toLocaleLowerCase();
  const matchingProducts = useMemo(() => products.filter((item) =>
    [item.name, item.category, item.description, item.color, item.sku, item.styleCode, item.fabric]
      .some((value) => value?.toLocaleLowerCase().includes(term))
  ), [products, term]);
  const matchingGroups = useMemo(() => {
    const allGroups = new Map(groupCatalogByStyle(products).map((variants) => [variants[0].styleCode || variants[0].id, variants]));
    return groupCatalogByStyle(matchingProducts).map((matches) => ({
      product: matches[0],
      variants: allGroups.get(matches[0].styleCode || matches[0].id) || matches,
    }));
  }, [matchingProducts, products]);
  const matchingPages = [...HEADER_NAV_LINKS, ...collectionLinks, ...informationLinks].filter((link) =>
    link.name.toLocaleLowerCase().includes(term) ||
    ("terms" in link && typeof link.terms === "string" && link.terms.includes(term)) ||
    (term === "bridal" && link.name === "Lehengas") ||
    (term === "appointment" && link.name === "Custom Designs")
  );

  return (
    <div className="mx-auto min-h-[65vh] max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <header className="mb-8 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FDE8C5]">Explore Rosepetal</p>
        <h1 className="mt-2 font-serif-luxury text-4xl sm:text-5xl">Search</h1>
        <p className="mt-3 text-sm text-white/90">{query ? <>Results for “{query}”</> : "Try searching for a piece, collection or page."}</p>
      </header>
      {!query && <div className="mx-auto max-w-3xl rounded-2xl bg-white/90 p-6 text-center text-rosepetal-text">Use the search button above, or browse the links below.</div>}
      {query && matchingPages.length > 0 && <section className="mb-8 rounded-2xl bg-white/95 p-6 shadow-lg"><h2 className="font-serif-luxury text-2xl text-rosepetal-wine">Pages and collections</h2><div className="mt-4 flex flex-wrap gap-2">{matchingPages.map((link) => <Link key={link.href} href={link.href} className="rounded-full border border-rosepetal-wine/30 px-4 py-2 text-sm text-rosepetal-wine hover:bg-rosepetal-wine hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine">{link.name}</Link>)}</div></section>}
      {query && status === "loading" && <p role="status" className="text-center text-white">Searching the live collection…</p>}
      {query && status === "error" && <p role="status" className="rounded-xl bg-white/95 p-5 text-center text-rosepetal-text">The live collection could not be loaded. You can still use the page links or try again later.</p>}
      {query && status === "ready" && (matchingGroups.length > 0 || matchingPages.length === 0) && <section><h2 className="mb-5 font-serif-luxury text-2xl text-white">Designs {matchingGroups.length > 0 && <span className="text-base">({matchingGroups.length})</span>}</h2>{matchingGroups.length > 0 ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{matchingGroups.map(({product, variants}) => <div key={product.styleCode || product.id} className="rounded-xl bg-white p-3"><ProductCard product={product} variants={variants} /></div>)}</div> : <p role="status" className="rounded-xl bg-white/95 p-5 text-center text-rosepetal-text">No published pieces match “{query}”. Browse the collection or contact us for help finding a piece.</p>}</section>}
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/collections" className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-rosepetal-wine hover:bg-[#FDE8C5]">Browse Shop</Link><Link href="/contact" className="rounded-md border border-white px-5 py-3 text-sm font-semibold text-white hover:bg-white/15">Contact boutique</Link></div>
    </div>
  );
}
