import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("home page sections use consistent, harmonic luxury vertical section spacing", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /<div className="w-full">/);
  assert.match(page, /relative overflow-hidden py-12 sm:py-16 lg:py-20/);
  assert.match(page, /<section id="shop-all" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">/);
  assert.match(page, /relative isolate mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20/);
  assert.match(page, /<section id="shop-by-price" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 lg:py-20">/);
  assert.match(page, /<section id="customer-reviews" className="relative scroll-mt-20 overflow-hidden/);
  assert.match(page, /shopAllExpanded \? "min-h-0 bg-white px-5 py-7 sm:px-8 sm:py-9" : "min-h-0 p-0"/);
});
