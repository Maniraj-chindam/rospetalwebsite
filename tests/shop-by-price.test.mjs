import assert from "node:assert/strict";
import test from "node:test";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3002";

test("Shop by Price replaces the crafted banner with four working price ranges", async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const sectionStart = html.indexOf('<section id="shop-by-price"');
  const nextSectionStart = html.indexOf('<section id="customer-reviews"');

  assert.notEqual(sectionStart, -1, "expected Shop by Price to render");
  assert.ok(sectionStart < nextSectionStart, "expected Shop by Price before Customer Reviews");

  const sectionHtml = html.slice(sectionStart, nextSectionStart);
  const expectedRanges = [
    ["Under ₹5,000", "/collections?minPrice=0&amp;maxPrice=5000"],
    ["₹5,000 – ₹10,000", "/collections?minPrice=5001&amp;maxPrice=10000"],
    ["₹10,000 – ₹25,000", "/collections?minPrice=10001&amp;maxPrice=25000"],
    ["₹25,000 &amp; Above", "/collections?minPrice=25001"],
  ];

  assert.match(sectionHtml, />Shop by Price</);
  assert.match(sectionHtml, /href="\/collections">View All</);

  for (const [label, href] of expectedRanges) {
    assert.match(sectionHtml, new RegExp(label));
    assert.match(sectionHtml, new RegExp(href.replace(/[?&]/g, "\\$&")));
  }

  const approvedImages = [
    "/libas-dress-01.jpg",
    "/libas-dress-02.jpg",
    "/thridha-handloom-01.webp",
    "/thridha-handloom-04.webp",
  ];

  for (const image of approvedImages) {
    assert.match(sectionHtml, new RegExp(encodeURIComponent(image).replace(/[.]/g, "\\$&")));
  }

  assert.equal((sectionHtml.match(/data-price-card/g) ?? []).length, 4);
  assert.doesNotMatch(sectionHtml, /images\.unsplash\.com|generated_images/i);
  assert.doesNotMatch(html, /Crafted with Heart|MORE THAN FASHION/);
});
