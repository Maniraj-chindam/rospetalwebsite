import test from "node:test";
import assert from "node:assert/strict";

const { assessBagProducts, productReadinessIssues } = await import("../lib/product-readiness.ts");

const product = (id, overrides = {}) => ({
  id, styleCode: "RP-01", name: "Rose kurta", category: "Dresses", description: "Cotton kurta with a floral print.",
  fabric: "Cotton", care: "Gentle wash", delivery: "Dispatch timing confirmed with the boutique.",
  size: "M", sizeMeasurements: "Bust 96 cm; length 110 cm", color: "Rose", image: `https://assets.example.invalid/uploads/${id}.jpg`,
  priceNum: 1850, availableStock: 2, ...overrides,
});

test("a bag with confirmed, individually photographed variants is ready", () => {
  const catalog = [product("one"), product("two", { color: "Ivory" })];
  assert.deepEqual(assessBagProducts([{ productId: "one", qty: 1 }], catalog), {
    ready: true, missingIds: [], unconfirmedIds: [],
  });
});

test("stale and provisional bag items cannot proceed to payment", () => {
  const catalog = [
    product("one", { description: "Website publishing test; stock availability is to be confirmed by the boutique." }),
    product("two", { color: "Ivory", image: "https://assets.example.invalid/uploads/one.jpg" }),
  ];
  const result = assessBagProducts([{ productId: "one", qty: 1 }, { productId: "missing", qty: 1 }], catalog);
  assert.equal(result.ready, false);
  assert.deepEqual(result.missingIds, ["missing"]);
  assert.deepEqual(result.unconfirmedIds, ["one"]);
  assert.match(productReadinessIssues(catalog[1], catalog).join(" "), /individual photo/i);
  assert.equal(assessBagProducts([], catalog).ready, false);
});

test("a generic test name cannot become buyable by changing only the description", () => {
  const item = product("test-item", { name: "Designer Frock 1" });
  assert.match(productReadinessIssues(item, [item]).join(" "), /name needs boutique confirmation/i);
  assert.equal(assessBagProducts([{ productId: item.id, qty: 1 }], [item]).ready, false);
});

test("a size label without actual measurements is enquiry only", () => {
  const item = product("no-measurements", { sizeMeasurements: undefined });
  assert.match(productReadinessIssues(item, [item]).join(" "), /size measurements/i);
  assert.equal(assessBagProducts([{ productId: item.id, qty: 1 }], [item]).ready, false);
});

test("checkout gate does not conceal missing colour photos or provisional details", () => {
  const red = product("red", { color: "Red", name: "Designer Frock 1", sizeMeasurements: undefined, checkoutAllowed: false });
  const ivory = product("ivory", { color: "Ivory", image: red.image, checkoutAllowed: false });
  const issues = productReadinessIssues(red, [red, ivory]).join(" ");
  assert.match(issues, /individual photo/i);
  assert.match(issues, /measurements/i);
  assert.match(issues, /name needs boutique confirmation/i);
  assert.match(issues, /checkout is limited/i);
});

test('only the server-approved exact rupee test item bypasses garment readiness',()=>{
 const id='7552dfbd-31bf-4ef8-8b1c-98f84cb8784a';
 const approved=product(id,{styleCode:'RP-RAZORPAY-TEST-SAREE',name:'Razorpay Test Saree',priceNum:1,paymentTestOnly:true,checkoutAllowed:true,sizeMeasurements:undefined});
 assert.equal(productReadinessIssues(approved,[approved]).length,0);
 for(const patch of [{id:'another'},{priceNum:2},{paymentTestOnly:false},{checkoutAllowed:false}])assert.ok(productReadinessIssues({...approved,...patch},[approved]).length>0);
 assert.equal(assessBagProducts([{productId:id,qty:1},{productId:'other',qty:1}],[approved,product('other',{checkoutAllowed:false})]).ready,false);
});
