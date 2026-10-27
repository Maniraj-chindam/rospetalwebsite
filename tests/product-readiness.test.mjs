import test from "node:test";
import assert from "node:assert/strict";

const { assessBagProducts, customerVisibleCatalog, productContentIssues, productReadinessIssues } = await import("../lib/product-readiness.ts");

const product = (id, overrides = {}) => ({
  id, styleCode: "RP-01", name: "Rose kurta", category: "Dresses", description: "Cotton kurta with a floral print.",
  fabric: "Cotton", care: "Gentle wash", delivery: "Dispatch timing confirmed with the boutique.",
  size: "M", sizeMeasurements: "Bust 96 cm; length 110 cm", color: "Rose", image: `https://assets.example.invalid/uploads/${id}.jpg`,
  priceNum: 1850, availableStock: 2, checkoutAllowed: true, ...overrides,
});

test("a bag with confirmed, individually photographed variants is ready", () => {
  const catalog = [product("one"), product("two", { color: "Ivory" })];
  assert.deepEqual(assessBagProducts([{ productId: "one", qty: 1 }], catalog), {
    ready: true, missingIds: [], unconfirmedIds: [],
  });
});

test("a missing product blocks checkout but provisional copy stays visible as a notice", () => {
  const catalog = [
    product("one", { description: "Website publishing test; stock availability is to be confirmed by the boutique." }),
    product("two", { color: "Ivory", image: "https://assets.example.invalid/uploads/one.jpg" }),
  ];
  const result = assessBagProducts([{ productId: "one", qty: 1 }, { productId: "missing", qty: 1 }], catalog);
  assert.equal(result.ready, false);
  assert.deepEqual(result.missingIds, ["missing"]);
  assert.deepEqual(result.unconfirmedIds, []);
  assert.match(productReadinessIssues(catalog[1], catalog).join(" "), /individual photo/i);
  assert.equal(assessBagProducts([], catalog).ready, false);
});

test("a generic test name is flagged without overriding POS checkout eligibility", () => {
  const item = product("test-item", { name: "Designer Frock 1" });
  assert.match(productReadinessIssues(item, [item]).join(" "), /name needs boutique confirmation/i);
  assert.equal(assessBagProducts([{ productId: item.id, qty: 1 }], [item]).ready, true);
});

test("missing garment measurements remain visible without overriding POS checkout eligibility", () => {
  const item = product("no-measurements", { sizeMeasurements: undefined });
  assert.match(productReadinessIssues(item, [item]).join(" "), /size measurements/i);
  assert.equal(assessBagProducts([{ productId: item.id, qty: 1 }], [item]).ready, true);
});

test("checkout gate does not conceal missing colour photos or provisional details", () => {
  const red = product("red", { color: "Red", name: "Designer Frock 1", sizeMeasurements: undefined, checkoutAllowed: false });
  const ivory = product("ivory", { color: "Ivory", image: red.image, checkoutAllowed: false });
  const issues = productReadinessIssues(red, [red, ivory]).join(" ");
  assert.match(issues, /individual photo/i);
  assert.match(issues, /measurements/i);
  assert.match(issues, /name needs boutique confirmation/i);
  assert.match(issues, /available for enquiry/i);
});

test("every POS-published variant stays visible even when its details need confirmation", () => {
  const red = product("red", { color: "Red", name: "Designer Frock 1", sizeMeasurements: undefined, checkoutAllowed: false });
  const ivory = product("ivory", { color: "Ivory", image: red.image, checkoutAllowed: false });
  const paymentTest = product("payment-test", { name: "Razorpay Test Saree", paymentTestOnly: true, availableStock: 0 });
  assert.deepEqual(customerVisibleCatalog([red, ivory, paymentTest]).map((item) => item.id), ["red", "ivory", "payment-test"]);
  assert.match(productContentIssues(red, [red, ivory]).join(" "), /measurements/i);
  assert.equal(assessBagProducts([{ productId: red.id, qty: 1 }], [red, ivory, paymentTest]).ready, false);
});

test("a corrected POS variant appears for enquiry without opening checkout", () => {
  const corrected = product("corrected", { checkoutAllowed: false });
  assert.deepEqual(customerVisibleCatalog([corrected]).map((item) => item.id), ["corrected"]);
  assert.equal(assessBagProducts([{ productId: corrected.id, qty: 1 }], [corrected]).ready, false);
});

test('POS prebook pieces remain request-only until approved, then can use checkout',()=>{
 const selected=product('prebook',{prebookOnly:true,checkoutAllowed:false});
 assert.deepEqual(customerVisibleCatalog([selected]),[selected]);
 assert.match(productReadinessIssues(selected,[selected]).join(' '),/prebook payment is not available yet/i);
 assert.equal(assessBagProducts([{productId:selected.id,qty:1}],[selected]).ready,false);
 const approved={...selected,checkoutAllowed:true};
 assert.equal(assessBagProducts([{productId:approved.id,qty:1}],[approved]).ready,true);
 assert.equal(assessBagProducts([{productId:approved.id,qty:1}],[{...approved,sizeMeasurements:''}]).ready,true);
});

test('only the server-approved exact rupee test item bypasses garment readiness',()=>{
 const id='7552dfbd-31bf-4ef8-8b1c-98f84cb8784a';
 const approved=product(id,{styleCode:'RP-RAZORPAY-TEST-SAREE',name:'Razorpay Test Saree',priceNum:1,paymentTestOnly:true,checkoutAllowed:true,sizeMeasurements:undefined});
 assert.equal(productReadinessIssues(approved,[approved]).length,0);
 for(const patch of [{id:'another'},{priceNum:2},{paymentTestOnly:false},{checkoutAllowed:false}])assert.ok(productReadinessIssues({...approved,...patch},[approved]).length>0);
 assert.equal(assessBagProducts([{productId:id,qty:1},{productId:'other',qty:1}],[approved,product('other',{checkoutAllowed:false})]).ready,false);
});
