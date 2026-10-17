import assert from "node:assert/strict";
import test from "node:test";

const base = new URL(process.env.SITE_URL ?? "http://127.0.0.1:3103");
const routes = ["/", "/collections", "/custom-design", "/lookbook", "/about", "/contact", "/bag", "/checkout", "/checkout/return"];

test("every public route and its local product images load", async () => {
  const imageUrls = new Set();
  for (const route of routes) {
    const response = await fetch(new URL(route, base));
    assert.equal(response.status, 200, `${route} should load`);
    const html = await response.text();
    assert.match(html, /<main\b/, `${route} should have its main landmark`);
    for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
      const url = new URL(match[1].replaceAll("&amp;", "&"), base);
      if (url.origin === base.origin) imageUrls.add(url.href);
    }
  }
  for (const url of imageUrls) {
    const response = await fetch(url);
    assert.equal(response.status, 200, `${url} should load`);
    assert.match(response.headers.get("content-type") ?? "", /^image\//, `${url} should be an image`);
  }
});

test("retired shop-design previews are not public", async () => {
  const response = await fetch(new URL("/shop-concepts", base));
  assert.equal(response.status, 404);
});
