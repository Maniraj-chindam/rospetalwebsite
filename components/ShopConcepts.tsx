"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS_CATALOG, type ProductItem } from "@/data/boutique-data";
import styles from "./ShopConcepts.module.css";

export type ShopConcept = "editorial" | "heritage" | "modern";

const categories = ["All pieces", "Sarees", "Lehengas", "Dresses", "Handlooms", "Designer Suits"];

const concepts: { id: ShopConcept; name: string; label: string }[] = [
  { id: "editorial", name: "The Editorial", label: "01" },
  { id: "heritage", name: "The Heritage Gallery", label: "02" },
  { id: "modern", name: "The Modern Edit", label: "03" },
];

function ConceptSwitcher({ active }: { active: ShopConcept }) {
  return (
    <nav className={styles.switcher} aria-label="Shop concept previews">
      <Link href="/shop-concepts" className={styles.switcherBack}>Explore the three layouts</Link>
      <div className={styles.switcherLinks}>
        {concepts.map((concept) => (
          <Link
            key={concept.id}
            href={`/shop-concepts/${concept.id}`}
            aria-current={active === concept.id ? "page" : undefined}
            className={active === concept.id ? styles.switcherActive : ""}
          >
            <span>{concept.label}</span> {concept.name}
          </Link>
        ))}
      </div>
      <Link href="/collections" className={styles.currentLink}>Current shop <ArrowUpRight size={14} /></Link>
    </nav>
  );
}

function ShopToolbar({
  category,
  onCategoryChange,
  sort,
  onSortChange,
  count,
}: {
  category: string;
  onCategoryChange: (category: string) => void;
  sort: string;
  onSortChange: (sort: string) => void;
  count: number;
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.categoryList} aria-label="Filter by category">
        {categories.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={category === name}
            onClick={() => onCategoryChange(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className={styles.sortLine}>
        <span>{count} {count === 1 ? "piece" : "pieces"}</span>
        <label>
          <SlidersHorizontal size={14} aria-hidden="true" />
          <span className={styles.srOnly}>Sort products</span>
          <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </label>
      </div>
    </div>
  );
}

function ProductGrid({ products, className = "" }: { products: ProductItem[]; className?: string }) {
  return (
    <div className={`${styles.productGrid} ${className}`}>
      {products.map((product) => (
        <article className={styles.productShell} key={product.id}>
          <ProductCard product={product} />
        </article>
      ))}
    </div>
  );
}

export function EditorialHero() {
  return (
    <section className={styles.editorialHero} aria-labelledby="editorial-title">
      <div className={styles.editorialCopy}>
        <p className={styles.eyebrow}>Rosepetal / The boutique edit</p>
        <span className={styles.issueNumber}>Volume 01 <span>—</span> A study in beautiful dressing</span>
        <h1 id="editorial-title">Where every<br /><em>piece has a story.</em></h1>
        <p className={styles.heroDescription}>An invitation to dress with feeling. Discover considered silhouettes, handwoven heirlooms and pieces made for your most memorable moments.</p>
        <a href="#editorial-products" className={styles.textCta}>Explore the collection <ArrowRight size={18} aria-hidden="true" /></a>
        <div className={styles.editorialFootnote}><span>Crafted with care</span><span>Curated in Hyderabad</span></div>
      </div>
      <div className={styles.editorialVisual}>
        <div className={styles.editorialPhoto}>
          <Image src="/libas-dress-04.jpg" alt="Rosepetal eveningwear styled in a warm interior" fill priority sizes="(max-width: 800px) 100vw, 48vw" className={styles.coverImage} />
        </div>
        <div className={styles.editorialInset}>
          <Image src="/heritage-silk-saree-green.png" alt="Green and violet heritage silk saree" fill sizes="(max-width: 800px) 34vw, 14vw" className={styles.coverImage} />
        </div>
        <span className={styles.verticalCaption}>The art of being beautifully yourself</span>
      </div>
    </section>
  );
}

function HeritageHero() {
  return (
    <section className={styles.heritageHero} aria-labelledby="heritage-title">
      <div className={styles.heritageHeroCopy}>
        <p className={styles.eyebrow}>Rosepetal / Heritage collection</p>
        <div className={styles.heritageRule} />
        <h1 id="heritage-title">The beauty<br />of <em>belonging.</em></h1>
        <p>For celebrations that stay with you. Rich handlooms, luminous silk and couture details, chosen with care.</p>
        <a href="#heritage-products" className={styles.filledCta}>Discover the collection <ArrowUpRight size={17} aria-hidden="true" /></a>
        <div className={styles.heritageSignature}>Handpicked with heart. Worn for a lifetime.</div>
      </div>
      <div className={styles.heritageVisual}>
        <div className={styles.heritageMainPhoto}>
          <Image src="/lehengas-new-photo.jpg" alt="Rosepetal bridal lehenga in a warm interior" fill priority sizes="(max-width: 800px) 100vw, 45vw" className={styles.coverImage} />
        </div>
        <div className={styles.heritageSmallPhoto}>
          <Image src="/thridha-handloom-01.webp" alt="Handwoven green silk saree" fill sizes="(max-width: 800px) 30vw, 13vw" className={styles.coverImage} />
        </div>
        <span className={styles.heritagePhotoLabel}>The occasion edit · 2026</span>
      </div>
    </section>
  );
}

const categoryTiles = [
  { name: "Sarees", line: "A legacy in every drape", image: "/heritage-silk-saree-green.png" },
  { name: "Dresses", line: "Made for your moments", image: "/libas-dress-02.jpg" },
  { name: "Lehengas", line: "The art of celebration", image: "/lehengas-new-photo.jpg" },
];

function ModernHero({ onCategoryChange }: { onCategoryChange: (category: string) => void }) {
  return (
    <section className={styles.modernHero} aria-labelledby="modern-title">
      <div className={styles.modernHeading}>
        <div>
          <p className={styles.eyebrow}>The Rosepetal shop / 2026</p>
          <h1 id="modern-title">Find your<br /><em>beautiful.</em></h1>
        </div>
        <div className={styles.modernIntro}>
          <span className={styles.modernAsterisk}>✳</span>
          <p>A curated world of pieces to wear, treasure and return to. Start with what moves you.</p>
          <a href="#modern-products">Shop all pieces <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </div>
      <div className={styles.modernTiles}>
        {categoryTiles.map((tile, index) => (
          <a
            key={tile.name}
            href="#modern-products"
            className={styles.modernTile}
            onClick={() => onCategoryChange(tile.name)}
          >
            <div className={styles.tileImage}>
              <Image src={tile.image} alt="" fill priority={index === 0} sizes="(max-width: 700px) 85vw, 33vw" className={styles.coverImage} />
            </div>
            <span className={styles.tileNumber}>0{index + 1}</span>
            <div className={styles.tileText}><div><span>{tile.line}</span><h2>{tile.name}</h2></div><ArrowUpRight size={22} aria-hidden="true" /></div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function ShopConcepts({ concept }: { concept: ShopConcept }) {
  const [category, setCategory] = useState("All pieces");
  const [sort, setSort] = useState("featured");
  const products = useMemo(() => {
    const filtered = category === "All pieces" ? PRODUCTS_CATALOG : PRODUCTS_CATALOG.filter((product) => product.category === category);
    return [...filtered].sort((first, second) => {
      if (sort === "price-low") return first.priceNum - second.priceNum;
      if (sort === "price-high") return second.priceNum - first.priceNum;
      if (sort === "name") return first.name.localeCompare(second.name);
      return 0;
    });
  }, [category, sort]);

  return (
    <div className={`${styles.page} ${styles[concept]}`}>
      <ConceptSwitcher active={concept} />
      {concept === "editorial" && <EditorialHero />}
      {concept === "heritage" && <HeritageHero />}
      {concept === "modern" && <ModernHero onCategoryChange={setCategory} />}

      <section className={styles.catalog} id={`${concept}-products`} aria-labelledby={`${concept}-catalog-title`}>
        <div className={styles.catalogHeading}>
          <div>
            <p className={styles.eyebrow}>{concept === "editorial" ? "The curated wardrobe" : concept === "heritage" ? "The collection" : "Explore the edit"}</p>
            <h2 id={`${concept}-catalog-title`}>{concept === "editorial" ? <>Pieces to <em>fall for.</em></> : concept === "heritage" ? <>A lifetime of <em>loveliness.</em></> : <>Your next <em>favourite.</em></>}</h2>
          </div>
          <p>{concept === "editorial" ? "Thoughtfully chosen. Effortlessly yours." : concept === "heritage" ? "The familiar, made extraordinary." : "Considered pieces for every version of you."}</p>
        </div>
        <ShopToolbar category={category} onCategoryChange={setCategory} sort={sort} onSortChange={setSort} count={products.length} />
        <ProductGrid products={products} className={concept === "modern" ? styles.modernProductGrid : ""} />
      </section>

      <section className={styles.closingNote}>
        <p>{concept === "heritage" ? "Made for the moments you will remember." : concept === "modern" ? "Style begins with a feeling." : "For the story only you can tell."}</p>
        <Link href="/contact">Visit our boutique <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
