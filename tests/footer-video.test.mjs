import assert from "node:assert/strict";
import test from "node:test";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3002";

test("footer uses the Rosepetal reel as a readable background", async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const footerHtml = html.match(/<footer[\s\S]*?<\/footer>/)?.[0];

  assert.ok(footerHtml, "expected the footer to render");
  assert.match(footerHtml, /src="\/rosepetal-footer-reel\.mp4"/);
  assert.match(footerHtml, /autoPlay/);
  assert.match(footerHtml, /muted/);
  assert.match(footerHtml, /loop/);
  assert.match(footerHtml, /playsInline/);
  assert.match(footerHtml, /absolute inset-0 z-0 h-full w-full object-cover/);
  assert.match(footerHtml, /^<footer class="relative isolate overflow-hidden text-rosepetal-text">/);
});
