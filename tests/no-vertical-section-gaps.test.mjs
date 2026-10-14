import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("home page sections use a continuous background without outer vertical gaps", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /<div className="w-full">/);
  assert.doesNotMatch(page, /py-16 sm:py-20 my-2/);
  assert.match(page, /<section id="shop-all" className="px-4 sm:px-6 lg:px-8">/);
  assert.match(page, /<section id="shop-by-price" className="scroll-mt-20 sm:scroll-mt-24">/);
  assert.match(page, /<section id="customer-reviews" className="relative scroll-mt-20 overflow-hidden/);
  assert.match(page, /shopAllExpanded \? "min-h-0 bg-white px-5 py-7 sm:px-8 sm:py-9" : "min-h-0 p-0"/);
});
