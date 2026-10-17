import assert from "node:assert/strict";
import test from "node:test";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3002";

test("New Arrivals shows real local products linked to their matching collections", async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const sectionHtml = html.match(
    /<section id="new-arrivals"[\s\S]*?<section id="shop-by-price"/,
  )?.[0];

  assert.ok(sectionHtml, "expected the New Arrivals section to render");

  const expectedProducts = [
    {
      name: "Blush Mirrorwork Lehenga",
      image: "%2Flehengas-new-photo.jpg",
      href: "/collections?category=Lehengas",
    },
    {
      name: "Heritage Silk Saree",
      image: "%2Fheritage-silk-saree-green.png",
      href: "/collections?category=Sarees",
    },
    {
      name: "Black Floral Short Kurti",
      image: "%2Fshort-kurti-new-photo.png",
      href: "/collections?category=Designer+Suits",
    },
    {
      name: "Plum Evening Dress",
      image: "%2Fdress_1.jpg",
      href: "/collections?category=Dresses",
    },
  ];

  for (const product of expectedProducts) {
    assert.match(sectionHtml, new RegExp(product.name));
    assert.match(sectionHtml, new RegExp(`(?:${product.image}|${decodeURIComponent(product.image)})`));
    assert.match(
      sectionHtml,
      new RegExp(product.href.replace(/[?+]/g, (character) => `\\${character}`)),
    );
  }

  assert.doesNotMatch(sectionHtml, /images\.unsplash\.com/);
  assert.doesNotMatch(sectionHtml, /generated_images|new-arrivals-bg-opt/i);
  assert.match(
    sectionHtml,
    /alt="Heritage Silk Saree"[\s\S]*?class="[^"]*object-top[^"]*"/,
    "expected the tall green saree portrait to keep the model's face in frame",
  );
  assert.match(
    sectionHtml,
    /Black Floral Short Kurti[\s\S]*?₹ 1,499/,
    "expected the short kurti to use the affordable mid-range price",
  );
  assert.doesNotMatch(sectionHtml, /₹ 4,900/);
});
