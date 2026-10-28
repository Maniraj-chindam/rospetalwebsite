import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Rosepetal | Designer Dresses, Lehengas & Occasion Wear",
  description:
    "Get to know Rosepetal Designer Boutique. Explore designer dresses, lehengas and occasion wear, or start a conversation about a custom design.",
  alternates: { canonical: "/about" },
};

const steps = [
  {
    number: "01",
    title: "Find your direction",
    description: "Explore the pieces currently published in our shop, or tell us about the occasion you have in mind.",
  },
  {
    number: "02",
    title: "Look closer",
    description: "Check the available size and colour options, product details and price before deciding what feels right.",
  },
  {
    number: "03",
    title: "Start a conversation",
    description: "Have a question or a design idea? Contact the boutique to discuss the piece and your preferences.",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-[#fbf5f2] pt-16 text-[#3d2329] sm:pt-20">
      <section className="border-b border-[#ddc3c0] bg-[#f4e8e5]">
        <div className="mx-auto grid max-w-[1440px] lg:min-h-[710px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]">
          <div className="relative z-10 flex flex-col justify-center px-6 pb-12 pt-16 sm:px-10 lg:px-16 lg:py-20 xl:px-24">
            <div className="mb-10 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8c3c51]">
              <span>About Rosepetal</span>
              <span className="h-px w-16 bg-[#bc8c96]" aria-hidden="true" />
            </div>
            <h1 className="max-w-[760px] font-serif-luxury text-[clamp(4rem,7.4vw,7.5rem)] font-light leading-[.88] tracking-[-0.045em] text-[#5f1b31]">
              An occasion,<br />
              <em className="font-normal text-[#a44965]">your way.</em>
            </h1>
            <p className="mt-8 max-w-[530px] text-base leading-8 text-[#64565a] sm:text-lg">
              Rosepetal Designer Boutique is a place to explore dresses,
              lehengas and occasion wear, and to begin a more personal design
              conversation when you have something particular in mind.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/collections" className="inline-flex min-h-12 items-center gap-3 rounded-sm bg-[#681b32] px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#832a48]">
                Shop the collection <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/custom-design" className="inline-flex min-h-12 items-center gap-2 border-b border-[#8a4256] px-1 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#681b32] transition-colors hover:text-[#a44965]">
                Explore custom designs <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#966b73]">
              Designer wear &nbsp;·&nbsp; Lehengas &nbsp;·&nbsp; Occasion dressing
            </p>
          </div>
          <div className="relative min-h-[430px] overflow-hidden bg-[#d8b8ad] sm:min-h-[550px] lg:min-h-full">
            <Image src="/shop-all-featured-dress.png" alt="Pink occasion-wear outfit shown as style inspiration" fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover object-[center_27%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#39131e]/45 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute bottom-7 left-7 border-l border-white/80 pl-4 text-[10px] font-medium uppercase tracking-[0.26em] text-white sm:bottom-12 sm:left-12">
              Style, made personal
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] lg:gap-20 lg:px-16 lg:py-28 xl:px-24">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9a4c61]">The boutique</p>
          <h2 className="mt-5 max-w-md font-serif-luxury text-5xl font-light leading-[.98] text-[#5f1b31] sm:text-6xl">
            What feels like <em className="text-[#a44965]">you?</em>
          </h2>
        </div>
        <div className="border-l border-[#d8b9b6] pl-6 sm:pl-10">
          <p className="max-w-2xl font-serif-luxury text-[clamp(1.8rem,3vw,2.65rem)] leading-[1.16] text-[#4b2b31]">
            The best piece starts with how you want to feel in it.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#66585a]">
            Some moments call for a dress you can discover today. Others begin
            with an idea, a colour or a silhouette you want to talk through.
            Rosepetal gives you room for both: browse the current collection
            online, or get in touch about a custom design.
          </p>
        </div>
      </section>

      <section aria-labelledby="about-paths-heading" className="bg-[#eadbd5] px-6 py-20 sm:px-10 lg:px-16 lg:py-28 xl:px-24">
        <div className="mx-auto max-w-[1250px]">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8c3c51]">Find your way in</p>
              <h2 id="about-paths-heading" className="mt-4 font-serif-luxury text-5xl font-light leading-none text-[#5f1b31] sm:text-6xl">
                Two ways to begin
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#685659]">
              Start with the collection or a conversation. Choose the path that suits your occasion.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-7">
            <article className="group overflow-hidden bg-[#fffaf7]">
              <div className="relative h-[300px] overflow-hidden sm:h-[400px]">
                <Image src="/video-designer-frocks.png" alt="Designer dress inspiration" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[center_32%] transition-transform duration-700 group-hover:scale-[1.035]" />
              </div>
              <div className="flex flex-col gap-6 p-7 sm:p-9">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#9a4c61]">01 / Ready to discover</p>
                  <h3 className="mt-3 font-serif-luxury text-4xl text-[#5f1b31]">Explore the collection</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-[#68595b]">
                    See the pieces currently published by the boutique, with their available options and product details.
                  </p>
                </div>
                <Link href="/collections" className="inline-flex w-fit items-center gap-2 border-b border-[#681b32] pb-1 text-xs font-semibold uppercase tracking-[0.17em] text-[#681b32] hover:text-[#a44965]">
                  Browse the shop <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
            <article className="group overflow-hidden bg-[#fffaf7]">
              <div className="relative h-[300px] overflow-hidden sm:h-[400px]">
                <Image src="/hero-designer-lehengas.webp" alt="Embellished lehenga shown as design inspiration" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[66%_center] transition-transform duration-700 group-hover:scale-[1.035]" />
              </div>
              <div className="flex flex-col gap-6 p-7 sm:p-9">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#9a4c61]">02 / Made around your idea</p>
                  <h3 className="mt-3 font-serif-luxury text-4xl text-[#5f1b31]">Discuss a custom design</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-[#68595b]">
                    Share the occasion and the style you have in mind. The boutique can discuss the details with you directly.
                  </p>
                </div>
                <Link href="/custom-design" className="inline-flex w-fit items-center gap-2 border-b border-[#681b32] pb-1 text-xs font-semibold uppercase tracking-[0.17em] text-[#681b32] hover:text-[#a44965]">
                  Start a conversation <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-steps-heading" className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28 xl:px-24">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9a4c61]">A simple beginning</p>
            <h2 id="about-steps-heading" className="mt-4 font-serif-luxury text-5xl font-light leading-none text-[#5f1b31] sm:text-6xl">
              From first look<br />to first hello.
            </h2>
          </div>
          <ol className="border-t border-[#d8b9b6]">
            {steps.map((step) => (
              <li key={step.number} className="grid gap-3 border-b border-[#d8b9b6] py-7 sm:grid-cols-[70px_1fr_1.3fr] sm:gap-6 sm:py-9">
                <span className="font-serif-luxury text-3xl text-[#a44965]" aria-hidden="true">{step.number}</span>
                <h3 className="font-serif-luxury text-3xl leading-none text-[#5f1b31]">{step.title}</h3>
                <p className="max-w-sm text-sm leading-7 text-[#68595b]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#641a33] px-6 py-20 text-[#fff8f4] sm:px-10 lg:px-16 lg:py-28 xl:px-24">
        <div className="pointer-events-none absolute -right-20 -top-36 font-serif-luxury text-[32rem] leading-none text-white/[.035]" aria-hidden="true">R</div>
        <div className="relative mx-auto flex max-w-[1250px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e6bcc8]">We would love to hear from you</p>
            <h2 className="mt-5 max-w-[760px] font-serif-luxury text-[clamp(3.3rem,6vw,6.5rem)] font-light leading-[.95]">
              Have a piece in mind?<br /><em className="text-[#f0bbc9]">Let&apos;s talk.</em>
            </h2>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-sm bg-[#fff8f4] px-7 py-3 text-xs font-semibold uppercase tracking-[0.17em] text-[#641a33] transition-colors hover:bg-[#f0d8dd]">
            Contact the boutique <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
