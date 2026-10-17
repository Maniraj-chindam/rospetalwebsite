import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("home uses a clean surface with the approved contact backdrop", async () => {
  const [page, styles, layout, fallingPetals] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/FallingRosePetals.tsx", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(styles, /background-image:/);
  assert.doesNotMatch(page, /collections-arch-bg\.png/);
  assert.doesNotMatch(page, /bg-\[radial-gradient/);
  assert.match(page, /<section id="step-06" data-contact-studio-section className="relative isolate overflow-hidden bg-\[#fbeded\] py-6 sm:py-8">/);
  assert.match(page, /src="\/contact-floral-backdrop\.png"/);
  assert.match(layout, /import FallingRosePetals from "@\/components\/FallingRosePetals"/);
  assert.match(layout, /<FallingRosePetals \/>/);
  assert.match(fallingPetals, /data-falling-rose-petals/);
  assert.match(fallingPetals, /pointer-events-none/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(page, /shopAllExpanded \? "min-h-0 bg-white px-5 py-7 sm:px-8 sm:py-9" : "min-h-0 p-0"/);
});
