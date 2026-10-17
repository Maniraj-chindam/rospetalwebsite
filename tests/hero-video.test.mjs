import assert from "node:assert/strict";
import test from "node:test";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3002";

test("hero presents the latest supplied Rosepetal designer boutique image", async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const heroHtml = html.match(/<section id="step-01"[\s\S]*?<section id="shop-all"/)?.[0];

  assert.ok(heroHtml, "expected the hero section to render");
  assert.match(heroHtml, /hero-rosepetal-bridal-silk\.jpg/);
  assert.doesNotMatch(heroHtml, /rosepetal-custom-designer-hero\.png/);
  assert.doesNotMatch(heroHtml, /rosepetal-designer-boutique-hero\.png/);
  assert.match(heroHtml, /SHOP NOW/);
  assert.match(heroHtml, /Where Heritage Craft Meets Modern/);
  assert.doesNotMatch(heroHtml, /data-hero-consultation-cover/);
  assert.doesNotMatch(heroHtml, /aria-label="Book a consultation"/);
  assert.doesNotMatch(heroHtml, /rgba\(27,7,15,0\.58\)/);
  assert.doesNotMatch(heroHtml, /rosepetal-4k-lookbook\.mp4/);
});
