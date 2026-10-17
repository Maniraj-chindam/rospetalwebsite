import assert from "node:assert/strict";
import test from "node:test";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3002";

test("customer reviews present Rosepetal sample customer stories without external attribution", async () => {
  const response = await fetch(siteUrl);

  assert.equal(response.status, 200);

  const html = await response.text();
  const sectionHtml = html.match(
    /<section id="customer-reviews"[\s\S]*?<section id="step-06"/,
  )?.[0];

  assert.ok(sectionHtml, "expected the Customer Reviews section to render");
  assert.match(sectionHtml, /Loved by Our Customers/);
  assert.match(sectionHtml, /Rosepetal customer stories/);
  assert.match(sectionHtml, /Ananya R\./);
  assert.match(sectionHtml, /The handloom saree felt beautifully light/);
  assert.match(sectionHtml, /Meera K\./);
  assert.match(sectionHtml, /my lehenga fit as though it had been made for me/);
  assert.match(sectionHtml, /Sravya P\./);
  assert.match(sectionHtml, /guided me to a silhouette that felt elegant and effortless/);
  assert.equal((sectionHtml.match(/data-review-card/g) ?? []).length, 6);
  assert.match(sectionHtml, /rounded-\[1\.5rem\]/);
  assert.match(sectionHtml, /Customer story review cards/);
  assert.match(sectionHtml, /aria-label="Show previous reviews"/);
  assert.match(sectionHtml, /aria-label="Show more reviews"/);
  assert.match(sectionHtml, /Sample customer stories/);
  assert.doesNotMatch(sectionHtml, /Libas|View original review|Reviews sourced from/);

  assert.doesNotMatch(html, /id="warm-hug-section"|\/bed\.mp4|Home Collection/);
});
