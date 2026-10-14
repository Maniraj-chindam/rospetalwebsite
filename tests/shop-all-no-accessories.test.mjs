import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Shop All category choices do not include Accessories", async () => {
  const data = await readFile(new URL("../data/boutique-data.ts", import.meta.url), "utf8");
  const collectionClient = await readFile(new URL("../components/CollectionsClient.tsx", import.meta.url), "utf8");
  const shopAllItems = data.match(/export const HOME_CATEGORIES = \[([\s\S]*?)\n\];/)?.[1];

  assert.ok(shopAllItems, "expected Shop All category data");
  assert.doesNotMatch(shopAllItems, /id: "accessories"/);
  assert.doesNotMatch(shopAllItems, /name: "Accessories"/);
  assert.doesNotMatch(collectionClient.match(/const CATEGORIES = \[([^\]]*)\]/)?.[1] ?? "", /"Accessories"/);
});
