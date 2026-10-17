"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./ShopConcepts.module.css";

export function EditorialHero() {
  return (
    <section className={styles.editorialHero} aria-labelledby="editorial-title">
      <div className={styles.editorialCopy}>
        <p className={styles.eyebrow}>Rosepetal / The boutique edit</p>
        <span className={styles.issueNumber}>An edit in colour and silhouette</span>
        <h1 id="editorial-title">Where every<br /><em>piece has a story.</em></h1>
        <p className={styles.heroDescription}>Browse a visual selection of sarees, dresses and occasionwear. Discover the pieces and details you love.</p>
        <a href="#editorial-products" className={styles.textCta}>Explore the styles <ArrowRight size={18} aria-hidden="true" /></a>
      </div>
      <div className={styles.editorialVisual}>
        <div className={styles.editorialPhoto}>
          <Image src="/libas-dress-04.jpg" alt="Pink floral ruffle dress" fill priority sizes="(max-width: 800px) 100vw, 48vw" className={styles.coverImage} />
        </div>
        <div className={styles.editorialInset}>
          <Image src="/thridha-handloom-01.webp" alt="Green saree with a purple border" fill sizes="(max-width: 800px) 34vw, 14vw" className={styles.coverImage} />
        </div>
        <span className={styles.verticalCaption}>Explore your style</span>
      </div>
    </section>
  );
}
