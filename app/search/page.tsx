import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResults from "./search-results";

export const metadata: Metadata = {
  title: "Search | Rosepetal Designer Boutique",
  description: "Find Rosepetal collections, custom design information and boutique pages.",
};

export default function SearchPage() {
  return <Suspense fallback={<main className="min-h-[60vh] pt-28 text-center text-white">Loading search…</main>}><SearchResults /></Suspense>;
}
