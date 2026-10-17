import assert from "node:assert/strict";
import test from "node:test";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3002";

test("Our Collections places Designer Frocks and Designer Dresses in the fourth and fifth cards", async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const section = html.match(/EXPLORE[\s\S]*?<!-- ={10,}/)?.[0] ?? html.match(/EXPLORE[\s\S]*?id="shop-all"/)?.[0];

  assert.ok(section, "expected the Our Collections section to render");

  const labels = ["SAREES", "DRESSES", "LEHENGAS", "DESIGNER FROCKS", "DESIGNER DRESSES", "SHORT KURTIS", "BED LINENS", "BLANKETS &amp; QUILTS"];
  let priorIndex = -1;
  for (const label of labels) {
    const index = section.indexOf(`>${label}<`);
    assert.ok(index > priorIndex, `expected ${label} in the approved card order`);
    priorIndex = index;
  }

  assert.match(section, /aria-label="Scroll collections left"/);
  assert.match(section, /aria-label="Scroll collections right"/);
  assert.match(section, /overflow-x-auto/);
});
