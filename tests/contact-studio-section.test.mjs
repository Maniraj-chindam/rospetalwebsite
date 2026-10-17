import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("home contact area keeps one compact live contact layout", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /data-contact-studio-section/);
  assert.match(page, /We&apos;d Love to\s*<br\s*\/>\s*Hear From You/);
  assert.doesNotMatch(page, /WE&apos;D LOVE TO HEAR FROM YOU/);
  assert.match(page, /src="\/contact-floral-backdrop\.png"/);
  assert.match(page, /py-6 sm:py-8/);
  assert.match(page, /rows=\{3\}/);
});
