import Link from "next/link";
import { CONTACT_INFO } from "@/data/boutique-data";

export default function CustomerInfoPage({ eyebrow, title, intro, sections }: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; text: string }[];
}) {
  return <div className="min-h-[70dvh] px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/50 bg-[#fff9f7] p-6 text-rosepetal-text shadow-xl sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rosepetal-wine">{eyebrow}</p>
      <h1 className="mt-3 font-serif-luxury text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-5 text-sm leading-7 text-rosepetal-muted">{intro}</p>
      <div className="mt-8 divide-y divide-rosepetal-border border-y border-rosepetal-border">
        {sections.map((section) => <section key={section.heading} className="py-6"><h2 className="font-serif-luxury text-2xl">{section.heading}</h2><p className="mt-2 text-sm leading-7 text-rosepetal-muted">{section.text}</p></section>)}
      </div>
      <p className="mt-8 text-sm leading-7">Need a detail confirmed before you decide? Email <a className="font-semibold text-rosepetal-wine underline" href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a> or <Link href="/contact" className="font-semibold text-rosepetal-wine underline">send an enquiry</Link>.</p>
    </div>
  </div>;
}
