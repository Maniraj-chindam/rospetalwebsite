import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageCheck, Ruler, Truck } from "lucide-react";

const guidance = [
  {
    title: "Fit & sizing",
    detail: "Ask us about measurements",
    href: "/contact",
    icon: Ruler,
  },
  {
    title: "Delivery",
    detail: "See current delivery terms",
    href: "/shipping",
    icon: Truck,
  },
  {
    title: "Returns",
    detail: "Read the policy",
    href: "/returns",
    icon: PackageCheck,
  },
] as const;

export default function BuyingGuidance() {
  return (
    <section id="home-buying-guidance" className="buying-guidance" aria-labelledby="home-buying-guidance-title">
      <Image
        src="/home-buying-details.webp"
        alt=""
        fill
        sizes="100vw"
        className="buying-guidance__photo"
      />
      <div className="buying-guidance__shade" aria-hidden="true" />
      <div className="buying-guidance__content">
        <p className="buying-guidance__eyebrow">Before you choose</p>
        <h2 id="home-buying-guidance-title" className="buying-guidance__title">
          Beautifully considered,<br /> clearly explained
        </h2>
        <div className="buying-guidance__links">
          {guidance.map(({ title, detail, href, icon: Icon }) => (
            <Link href={href} key={title} className="buying-guidance__row">
              <Icon size={31} strokeWidth={1.45} aria-hidden="true" />
              <span className="buying-guidance__row-title">{title}</span>
              <ArrowRight className="buying-guidance__row-arrow" size={21} strokeWidth={1.4} aria-hidden="true" />
              <span className="buying-guidance__row-detail">{detail}</span>
            </Link>
          ))}
        </div>
        <Link href="/contact" className="buying-guidance__cta">
          Get in touch <ArrowRight size={23} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
