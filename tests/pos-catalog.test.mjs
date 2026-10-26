import test from "node:test";
import assert from "node:assert/strict";

process.env.NEXT_PUBLIC_POS_API_BASE_URL = "https://catalog.example.invalid";
process.env.NEXT_PUBLIC_POS_ASSET_BASE_URL = "https://assets.example.invalid";
const { fetchPosCatalog, groupCatalogByStyle } = await import("../lib/pos-catalog.ts");

const variant = (id, overrides = {}) => ({
  id,
  sku: `RP-${id}`,
  styleCode: "RP-ROSE-01",
  name: "Rose kurta",
  category: "Dresses",
  websiteType: "Designer Long Frocks",
  description: "A cotton kurta with floral print.",
  fabric: "Cotton",
  care: "Gentle wash",
  delivery: "Dispatch after boutique confirmation.",
  size: "M",
  sizeMeasurements: "Bust 96 cm; length 110 cm",
  color: "Rose",
  pricePaise: 185000,
  image: "/uploads/rose.jpg",
  images: ["/uploads/rose.jpg", "/uploads/detail.jpg"],
  availableStock: 3,
  updatedAt: "2026-10-23T00:00:00.000Z",
  ...overrides,
});

test("maps paginated POS variants, money and safe images", async () => {
  const original = global.fetch;
  const calls = [];
  global.fetch = async (url) => {
    calls.push(String(url));
    return Response.json(calls.length === 1
      ? { contractVersion: 2, items: [variant("one")], nextCursor: "one" }
      : { contractVersion: 2, items: [variant("two", { size: "L", availableStock: 0 })], nextCursor: null });
  };
  try {
    const products = await fetchPosCatalog();
    assert.equal(calls.length, 2);
    assert.match(calls[1], /after=one/);
    assert.equal(products[0].priceNum, 1850);
    assert.equal(products[0].price, "₹1,850");
    assert.equal(products[0].images?.[1], "https://assets.example.invalid/uploads/detail.jpg");
    assert.equal(products[0].sizeMeasurements, "Bust 96 cm; length 110 cm");
    assert.equal(products[1].availableStock, 0);
    assert.equal(groupCatalogByStyle(products).length, 1);
    assert.equal(groupCatalogByStyle(products)[0][0].id, "one");
  } finally { global.fetch = original; }
});

test('maps actual and sale prices while keeping the payable price authoritative',async()=>{
 const original=global.fetch;
 try{
  global.fetch=async()=>Response.json({contractVersion:2,items:[variant('sale',{pricePaise:150000,actualPricePaise:200000,salePricePaise:150000})],nextCursor:null});
  const [product]=await fetchPosCatalog();assert.equal(product.priceNum,1500);assert.equal(product.price,'₹1,500');assert.equal(product.actualPriceNum,2000);assert.equal(product.actualPrice,'₹2,000');
  for(const extra of [{actualPricePaise:100000},{actualPricePaise:200000,salePricePaise:123}]){
   global.fetch=async()=>Response.json({contractVersion:2,items:[variant('invalid',extra)],nextCursor:null});await assert.rejects(fetchPosCatalog(),/invalid/);
  }
 }finally{global.fetch=original;}
});

test('accepts the POS category and preserves entered product details without website re-entry',async()=>{
 const original=global.fetch;
 try{
  const entered=variant('custom-category',{category:'Occasion wear',description:'Entered once in POS',fabric:'POS fabric',care:'POS care',delivery:'POS delivery',pricePaise:90000,actualPricePaise:120000,salePricePaise:90000});
  global.fetch=async()=>Response.json({contractVersion:2,items:[entered],nextCursor:null});
  const [product]=await fetchPosCatalog();
  for(const key of ['category','name','description','fabric','care','delivery','size','color','sku'])assert.equal(product[key],entered[key]);
  assert.equal(product.priceNum,900);assert.equal(product.actualPriceNum,1200);
  for(const category of ['', ' '.repeat(2), 'x'.repeat(61), 123]){
   global.fetch=async()=>Response.json({contractVersion:2,items:[{...entered,category}],nextCursor:null});await assert.rejects(fetchPosCatalog(),/invalid/);
  }
 }finally{global.fetch=original;}
});

test("rejects contract drift and unsafe or repeated products", async () => {
  const original = global.fetch;
  try {
    for (const body of [
      { items: [], nextCursor: null },
      { contractVersion: 2, items: [variant("one", { image: "https://evil.example/photo.jpg" })], nextCursor: null },
      { contractVersion: 2, items: [variant("one", { images: ["/uploads/other.jpg"] })], nextCursor: null },
      { contractVersion: 2, items: [variant("one"), variant("one")], nextCursor: null },
    ]) {
      global.fetch = async () => Response.json(body);
      await assert.rejects(fetchPosCatalog(), /catalog/i);
    }
  } finally { global.fetch = original; }
});
