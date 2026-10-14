import assert from "node:assert/strict";
import test from "node:test";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3002";

test("Shop All presents the approved storefront before New Arrivals", async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const shopAllStart = html.indexOf('<section id="shop-all"');
  const newArrivalsStart = html.indexOf('<section id="new-arrivals"');

  assert.notEqual(shopAllStart, -1, "expected the Shop All section to render");
  assert.ok(
    shopAllStart < newArrivalsStart,
    "expected Shop All to appear immediately before New Arrivals",
  );

  const sectionHtml = html.slice(shopAllStart, newArrivalsStart);

  assert.match(sectionHtml, /Everything beautiful,[\s\S]*?all in one place\./);
  assert.match(sectionHtml, /Shop all collections/);
  assert.match(sectionHtml, /aria-controls="shop-all-category-gallery"/);
  assert.match(sectionHtml, /id="shop-all-category-gallery"/);

  const categoryNav = sectionHtml.match(/<nav aria-label="Shop all categories"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(categoryNav, "expected the Shop All category navigation to render");

  const expectedCollections = [
    ["Designer Dresses", "/collections?category=Dresses"],
    ["Handloom Collection", "/collections?category=Handlooms"],
    ["Designer Frocks", "/collections?category=Dresses"],
    ["Lehenga Collection", "/collections?category=Lehengas"],
  ];

  for (const [label, href] of expectedCollections) {
    assert.match(categoryNav, new RegExp(label));
    assert.match(
      categoryNav,
      new RegExp(href.replace(/[?+]/g, (character) => `\\${character}`)),
    );
  }

  assert.doesNotMatch(categoryNav, />Sarees</);
  assert.doesNotMatch(categoryNav, />Short Kurtis</);
  assert.doesNotMatch(categoryNav, />Bed &amp; Bath</);

  for (const image of [
    "%2Fshop-all-featured-saree.png",
    "%2Fshop-all-featured-lehenga.png",
    "%2Fshop-all-featured-dress.png",
  ]) {
    assert.match(sectionHtml, new RegExp(image));
  }

  const approvedCategoryCards = [
    "Customized Designer Dresses",
    "Embroidered Designer Dresses",
    "Maggam Work Dresses",
    "A-Line Designer Dresses",
    "Straight-Cut Designer Dresses",
    "Designer Kurtas &amp; Kurtis",
    "Handloom Designer Dresses",
    "Gadwal Pattu Dresses",
    "Narayanpet Handloom Dresses",
    "Mangalagiri Pattu Dresses",
    "Jamdani Dresses",
    "Kalamkari Dresses",
    "Chanderi Cotton Dresses",
    "Kota Silk Dresses",
    "Designer Long Frocks",
    "Customized Designer Frocks",
    "Pen Kalamkari Designer Lehengas",
    "Gadwal Pattu Lehengas",
    "Kanchipuram Pattu Lehengas",
    "Mangalagiri Pattu Lehengas",
    "Narayanpet Handloom Lehengas",
  ];

  for (const categoryName of approvedCategoryCards) {
    assert.match(sectionHtml, new RegExp(`>${categoryName}<`));
  }

  for (const image of [
    "lehengas-new-photo.jpg",
    "thridha-handloom-02.webp",
    "shop-all-featured-lehenga.png",
    "thridha-handloom-04.webp",
    "thridha-handloom-03.webp",
  ]) {
    assert.match(sectionHtml, new RegExp(image.replace(".", "\\.")));
  }

  assert.equal((sectionHtml.match(/data-shop-all-category-card/g) ?? []).length, 21);

  assert.doesNotMatch(sectionHtml, /images\.unsplash\.com|generated_images/i);
});
