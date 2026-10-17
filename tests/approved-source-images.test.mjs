import assert from "node:assert/strict";
import test from "node:test";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3002";

test("Shop All uses the approved Thridha Varnam and Libas product photography", async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const shopAllStart = html.indexOf('<section id="shop-all"');
  const newArrivalsStart = html.indexOf('<section id="new-arrivals"');
  const sectionHtml = html.slice(shopAllStart, newArrivalsStart);

  for (let index = 1; index <= 8; index += 1) {
    const suffix = String(index).padStart(2, "0");
    assert.match(sectionHtml, new RegExp(`thridha-handloom-${suffix}\\.webp`));
    assert.match(sectionHtml, new RegExp(`libas-dress-${suffix}\\.jpg`));
  }

  assert.doesNotMatch(sectionHtml, /images\.unsplash\.com|generated_images/i);
});

test("Collections displays approved source photography as local assets", async () => {
  const response = await fetch(`${siteUrl}/collections`);
  assert.equal(response.status, 200);

  const html = await response.text();
  for (const image of [
    "thridha-handloom-01.webp",
    "thridha-handloom-02.webp",
    "thridha-handloom-03.webp",
    "thridha-handloom-04.webp",
    "libas-dress-01.jpg",
    "libas-dress-02.jpg",
    "libas-dress-03.jpg",
    "libas-dress-04.jpg",
  ]) {
    assert.match(html, new RegExp(image.replace(".", "\\.")));
  }
});
