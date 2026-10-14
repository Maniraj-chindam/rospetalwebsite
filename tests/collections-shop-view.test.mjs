import assert from "node:assert/strict";
import test from "node:test";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3002";

test("collection links open a filterable product-shop view", async () => {
  const response = await fetch(`${siteUrl}/collections?category=Lehengas&type=Kanchipuram+Pattu+Lehengas`);

  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Kanchipuram Pattu Lehengas/);
  assert.match(html, /data-collection-shop-view/);
  assert.match(html, /data-back-to-collections/);
  assert.match(html, /Back to Shop/);
  assert.match(html, /Filter pieces/);
  assert.match(html, /Colour/);
  assert.match(html, /Fabric/);
  assert.match(html, /Weave/);
  assert.match(html, /Sort by/);
  assert.match(html, /data-collection-product-card/);
});
