import assert from "node:assert/strict";
import test from "node:test";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3002";

test("hero presents the supplied Rosepetal designer boutique image", async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const heroHtml = html.match(/<section id="step-01"[\s\S]*?<section id="shop-all"/)?.[0];

  assert.ok(heroHtml, "expected the hero section to render");
  assert.match(heroHtml, /rosepetal-designer-boutique-hero\.png/);
  assert.match(heroHtml, /scale-\[1\.25\]/);
  assert.match(heroHtml, /data-hero-image-actions/);
  assert.match(heroHtml, /aria-label="Explore collections"/);
  assert.match(heroHtml, /data-hero-consultation-cover/);
  assert.doesNotMatch(heroHtml, /aria-label="Book a consultation"/);
  assert.doesNotMatch(heroHtml, /rgba\(27,7,15,0\.58\)/);
  assert.doesNotMatch(heroHtml, /rosepetal-4k-lookbook\.mp4/);
  assert.doesNotMatch(heroHtml, /EXPLORE COLLECTIONS/);
  assert.doesNotMatch(heroHtml, /WATCH OUR STORY/);
});
