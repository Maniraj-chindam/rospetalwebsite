import test from "node:test";
import assert from "node:assert/strict";

process.env.NEXT_PUBLIC_POS_API_BASE_URL = "https://catalog.example.invalid";
process.env.NEXT_PUBLIC_POS_ASSET_BASE_URL = "https://assets.example.invalid";
const { fetchPosCatalog, groupCatalogByStyle } = await import("../lib/pos-catalog.ts");

const variant = (id, overrides = {}) => ({
  id,
  sku: `RP-${id}`,
  styleCode: "RP-ROSE-01",
  name: "Rose kurta",
  category: "Dresses",
  websiteType: "Designer Long Frocks",
  description: "A cotton kurta with floral print.",
  fabric: "Cotton",
  care: "Gentle wash",
  delivery: "Dispatch after boutique confirmation.",
  size: "M",
  color: "Rose",
  pricePaise: 185000,
  image: "/uploads/rose.jpg",
  images: ["/uploads/rose.jpg", "/uploads/detail.jpg"],
  availableStock: 3,
  updatedAt: "2026-10-23T00:00:00.000Z",
  ...overrides,
});

test("maps paginated POS variants, money and safe images", async () => {
  const original = global.fetch;
  const calls = [];
  global.fetch = async (url) => {
    calls.push(String(url));
    return Response.json(calls.length === 1
      ? { contractVersion: 2, items: [variant("one")], nextCursor: "one" }
      : { contractVersion: 2, items: [variant("two", { size: "L", availableStock: 0 })], nextCursor: null });
  };
  try {
    const products = await fetchPosCatalog();
    assert.equal(calls.length, 2);
    assert.match(calls[1], /after=one/);
    assert.equal(products[0].priceNum, 1850);
    assert.equal(products[0].price, "₹1,850");
    assert.equal(products[0].images?.[1], "https://assets.example.invalid/uploads/detail.jpg");
    assert.equal(products[1].availableStock, 0);
    assert.equal(groupCatalogByStyle(products).length, 1);
    assert.equal(groupCatalogByStyle(products)[0][0].id, "one");
  } finally { global.fetch = original; }
});

test("rejects contract drift and unsafe or repeated products", async () => {
  const original = global.fetch;
  try {
    for (const body of [
      { items: [], nextCursor: null },
      { contractVersion: 2, items: [variant("one", { image: "https://evil.example/photo.jpg" })], nextCursor: null },
      { contractVersion: 2, items: [variant("one", { images: ["/uploads/other.jpg"] })], nextCursor: null },
      { contractVersion: 2, items: [variant("one"), variant("one")], nextCursor: null },
    ]) {
      global.fetch = async () => Response.json(body);
      await assert.rejects(fetchPosCatalog(), /catalog/i);
    }
  } finally { global.fetch = original; }
});
