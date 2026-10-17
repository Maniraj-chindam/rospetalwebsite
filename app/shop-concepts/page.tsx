import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./page.module.css";

const concepts = [
  {
    number: "01",
    name: "The Editorial",
    description: "An airy fashion story with generous space, expressive typography and a considered product edit.",
    palette: "Warm ivory · Rose wine",
    image: "/libas-dress-04.jpg",
    href: "/shop-concepts/editorial",
    className: styles.editorial,
  },
  {
    number: "02",
    name: "The Heritage Gallery",
    description: "A rich jewel-box setting for bridal wear, handlooms and occasion pieces.",
    palette: "Deep plum · Antique gold",
    image: "/lehengas-new-photo.jpg",
    href: "/shop-concepts/heritage",
    className: styles.heritage,
  },
  {
    number: "03",
    name: "The Modern Edit",
    description: "A photography-led boutique with a clear route from category discovery to shopping.",
    palette: "Soft porcelain · Raspberry",
    image: "/heritage-silk-saree-green.png",
    href: "/shop-concepts/modern",
    className: styles.modern,
  },
];

export default function ShopConceptsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p>Rosepetal / Shop design study</p>
        <h1>Three ways to<br /><em>tell the story.</em></h1>
        <div className={styles.introBottom}>
          <span>Explore each full page, then choose the direction that feels most like Rosepetal.</span>
          <Link href="/collections">View current shop <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </header>

      <main className={styles.grid} aria-label="Shop layout concepts">
        {concepts.map((concept) => (
          <Link key={concept.number} href={concept.href} className={`${styles.card} ${concept.className}`}>
            <div className={styles.imageWrap}>
              <Image src={concept.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" className={styles.cardImage} />
              <span className={styles.cardNumber}>{concept.number} / 03</span>
              <span className={styles.openIcon}><ArrowUpRight size={22} aria-hidden="true" /></span>
            </div>
            <div className={styles.cardCopy}>
              <p>{concept.palette}</p>
              <h2>{concept.name}</h2>
              <span>{concept.description}</span>
              <strong>Explore full page <ArrowUpRight size={16} aria-hidden="true" /></strong>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
