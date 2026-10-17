import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="grid items-center gap-10 rounded-3xl border border-rosepetal-border bg-[#FFF9F7] p-6 shadow-xl lg:grid-cols-2 lg:p-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rosepetal-wine">About Rosepetal</p>
          <h1 className="mt-4 font-serif-luxury text-4xl leading-tight text-rosepetal-text sm:text-6xl">Style begins with a conversation.</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-rosepetal-text">Rosepetal Designer Boutique presents sarees, dresses and occasionwear alongside a custom-design enquiry service. Browse the styles for inspiration, then tell us what you are looking for.</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-rosepetal-muted">For custom pieces and reference styles, we confirm the material, fit, availability, price and delivery details with you before you make a decision.</p>
          <Link href="/contact" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-rosepetal-wine px-6 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine focus-visible:ring-offset-2">Start an enquiry <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-2xl bg-rosepetal-card"><Image src="/libas-dress-01.jpg" alt="Coral floral dress style inspiration" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
      </div>
      <section className="mx-auto mt-12 max-w-3xl rounded-2xl border border-white/40 bg-white/90 p-7 text-center sm:p-10" aria-labelledby="our-story-heading">
        <h2 id="our-story-heading" className="font-serif-luxury text-3xl text-rosepetal-text">The people behind Rosepetal</h2>
        <p className="mt-4 text-sm leading-relaxed text-rosepetal-muted">We are preparing the founder, studio and artisan story with verified details and photographs. If you would like to know more in the meantime, please get in touch.</p>
        <Link href="/contact" className="mt-5 inline-block text-sm font-semibold text-rosepetal-wine underline underline-offset-4">Contact us</Link>
      </section>
    </div>
  );
}
