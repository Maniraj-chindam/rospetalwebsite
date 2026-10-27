import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function AtelierStory() {
  return (
    <section id="home-atelier" className="atelier-story" aria-labelledby="home-atelier-title">
      <div className="atelier-story__media">
        <Image
          src="/home-atelier-editorial.webp"
          alt="Illustrative scene of artisans embroidering a rose-coloured garment"
          fill
          sizes="(max-width: 767px) 100vw, 53vw"
          className="atelier-story__photo"
        />
      </div>

      <div className="atelier-story__content">
        <div className="atelier-story__copy">
          <p className="atelier-story__eyebrow"><span>THE ATELIER</span></p>
          <h2 id="home-atelier-title" className="atelier-story__title">
            Made personal,<br />
            <em>from the first<br className="atelier-story__desktop-break" /> conversation</em>
          </h2>
          <div className="atelier-story__divider" aria-hidden="true">
            <span /><Sparkles size={19} strokeWidth={1.3} /><span />
          </div>
          <Link href="/about" className="atelier-story__link">
            Discover our story <ArrowRight size={20} strokeWidth={1.7} aria-hidden="true" />
          </Link>
        </div>
        <div className="atelier-story__detail" aria-hidden="true">
          <Image
            src="/home-buying-details.webp"
            alt=""
            fill
            sizes="180px"
            className="atelier-story__detail-photo"
          />
        </div>
      </div>
    </section>
  );
}
