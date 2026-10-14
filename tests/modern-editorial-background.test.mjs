import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the site uses the approved clean background", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /--background:\s*#FFFDFB;/);
  assert.doesNotMatch(css, /background-image:/);
  assert.doesNotMatch(css, /background-attachment:/);
  assert.doesNotMatch(css, /--background:\s*#FCECEE;/);
});
