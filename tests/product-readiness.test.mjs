import test from "node:test";
import assert from "node:assert/strict";

const { assessBagProducts, productReadinessIssues } = await import("../lib/product-readiness.ts");

const product = (id, overrides = {}) => ({
  id, styleCode: "RP-01", name: "Rose kurta", category: "Dresses", description: "Cotton kurta with a floral print.",
  fabric: "Cotton", care: "Gentle wash", delivery: "Dispatch timing confirmed with the boutique.",
  size: "M", color: "Rose", image: `https://assets.example.invalid/uploads/${id}.jpg`,
  priceNum: 1850, availableStock: 2, ...overrides,
});

test("a bag with confirmed, individually photographed variants is ready", () => {
  const catalog = [product("one"), product("two", { color: "Ivory" })];
  assert.deepEqual(assessBagProducts([{ productId: "one", qty: 1 }], catalog), {
    ready: true, missingIds: [], unconfirmedIds: [],
  });
});

test("stale and provisional bag items cannot proceed to payment", () => {
  const catalog = [
    product("one", { description: "Website publishing test; stock availability is to be confirmed by the boutique." }),
    product("two", { color: "Ivory", image: "https://assets.example.invalid/uploads/one.jpg" }),
  ];
  const result = assessBagProducts([{ productId: "one", qty: 1 }, { productId: "missing", qty: 1 }], catalog);
  assert.equal(result.ready, false);
  assert.deepEqual(result.missingIds, ["missing"]);
  assert.deepEqual(result.unconfirmedIds, ["one"]);
  assert.match(productReadinessIssues(catalog[1], catalog).join(" "), /individual photo/i);
  assert.equal(assessBagProducts([], catalog).ready, false);
});
