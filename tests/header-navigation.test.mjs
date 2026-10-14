import assert from "node:assert/strict";
import test from "node:test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3002";

test("header exposes the requested collection menus and their options", async () => {
  const response = await fetch(BASE_URL);
  assert.equal(response.status, 200);

  const html = await response.text();
  const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? "";

  for (const menuId of [
    "designer-dresses-menu",
    "handloom-collection-menu",
    "designer-frocks-menu",
    "lehenga-collection-menu",
  ]) {
    assert.match(header, new RegExp(`aria-controls="${menuId}"`));
    assert.match(header, new RegExp(`id="${menuId}"`));
  }

  const expectedOptions = [
    "Customized Designer Dresses",
    "Embroidered Designer Dresses",
    "Maggam Work Dresses",
    "A-Line Designer Dresses",
    "Straight-Cut Designer Dresses",
    "Designer Kurtas &amp; Kurtis",
    "Handloom Designer Dresses",
    "Gadwal Pattu Dresses",
    "Narayanpet Handloom Dresses",
    "Mangalagiri Pattu Dresses",
    "Jamdani Dresses",
    "Kalamkari Dresses",
    "Chanderi Cotton Dresses",
    "Kota Silk Dresses",
    "Designer Long Frocks",
    "Customized Designer Frocks",
    "Pen Kalamkari Designer Lehengas",
    "Gadwal Pattu Lehengas",
    "Kanchipuram Pattu Lehengas",
    "Mangalagiri Pattu Lehengas",
    "Narayanpet Handloom Lehengas",
  ];

  for (const option of expectedOptions) {
    assert.match(header, new RegExp(`>${option}<`));
  }

  for (const cardId of [
    "pen-kalamkari-designer-lehengas",
    "gadwal-pattu-lehengas",
    "kanchipuram-pattu-lehengas",
    "mangalagiri-pattu-lehengas",
    "narayanpet-handloom-lehengas",
  ]) {
    assert.match(header, new RegExp(`href="/\\?shopAll=${cardId}#shop-all"`));
  }

  const desktopOrder = ["Home", "Shop", "Designer Dresses", "Handloom Collection", "Designer Frocks", "Lehenga Collection"];
  let previousPosition = -1;
  for (const label of desktopOrder) {
    const position = header.indexOf(`>${label}<`);
    assert.ok(position > previousPosition, `expected ${label} in the approved header order`);
    previousPosition = position;
  }
  assert.match(header, /whitespace-nowrap/);
  assert.match(header, /bg-\[#FFF5F6\]\/95/);
  assert.match(header, /bg-white p-2/);
  assert.doesNotMatch(header, /bg-\[#FFF9F7\]\/98 p-2/);

  for (const removedLabel of ["Dresses", "Bed &amp; Bath", "Custom Orders", "About", "Contact"]) {
    assert.doesNotMatch(header, new RegExp(`>${removedLabel}<`));
  }
  assert.match(header, /aria-label="Shopping bag"/);
});
