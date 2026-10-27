import test from "node:test";
import assert from "node:assert/strict";

process.env.NEXT_PUBLIC_POS_API_BASE_URL = "https://api.example.invalid";
const { quoteBag } = await import("../lib/checkout-quote.ts");
const lines = [{ productId: "variant-one", qty: 1 }];
const quote = (overrides = {}) => ({
  currency: "INR",
  items: [{ productId: "variant-one", sku: "RP-01-M", name: "Rose kurta", size: "M", color: "Rose", qty: 1, unitPricePaise: 185000, lineTotalPaise: 185000 }],
  subtotalPaise: 185000, deliveryPincode: "560001", deliveryStatus: "available",
  deliveryQuote: { courierCompanyId: 12, courierName: "Test Courier", estimatedChargePaise: 8000, estimatedDeliveryDays: 4 },
  quotedAt: new Date(Date.now() - 60_000).toISOString(), expiresAt: new Date(Date.now() + 600_000).toISOString(),
  shippingPaise: 8000, totalPaise: 193000, checkoutAvailable: true, reason: "", ...overrides,
});

test("a live quote supplies the exact payable total", async () => {
  const original = global.fetch;
  global.fetch = async (url, options) => {
    assert.equal(url, "https://api.example.invalid/api/checkout/quote");
    assert.equal(options.method, "POST");
    assert.deepEqual(JSON.parse(options.body), { items: lines, deliveryPincode: "560001" });
    return Response.json(quote());
  };
  try { assert.equal((await quoteBag(lines, "560001")).totalPaise, 193000); }
  finally { global.fetch = original; }
});

test("unpriced shipping and inconsistent totals cannot open checkout", async () => {
  const original = global.fetch;
  try {
    for (const body of [
      quote({ totalPaise: 190000 }),
      quote({ shippingPaise: 7000 }),
      quote({ deliveryQuote: null }),
      quote({ checkoutAvailable: false, shippingPaise: 8000 }),
      quote({ expiresAt: new Date(Date.now() - 1_000).toISOString() }),
    ]) {
      global.fetch = async () => Response.json(body);
      await assert.rejects(quoteBag(lines, "560001"), /quote was invalid/i);
    }
    global.fetch = async () => Response.json(quote({ deliveryStatus: "packaging_required", deliveryQuote: null, shippingPaise: null, totalPaise: null, checkoutAvailable: false }));
    assert.equal((await quoteBag(lines, "560001")).checkoutAvailable, false);
  } finally { global.fetch = original; }
});

test("a quote error reaches the customer without a false payable total", async () => {
  const original = global.fetch;
  global.fetch = async () => Response.json({ error: "Packed measurements are missing" }, { status: 422 });
  try { await assert.rejects(quoteBag(lines, "560001"), /Packed measurements are missing/); }
  finally { global.fetch = original; }
});

test("an unapproved POS variant remains enquiry-only even when the quote endpoint responds", async () => {
  const original = global.fetch;
  global.fetch = async () => Response.json(quote({ deliveryStatus: "approval_required", deliveryQuote: null, shippingPaise: null, totalPaise: null, checkoutAvailable: false, reason: "Boutique approval pending." }));
  try { const value = await quoteBag(lines, "560001"); assert.equal(value.checkoutAvailable, false); assert.equal(value.totalPaise, null); }
  finally { global.fetch = original; }
});

test("a stalled courier quote times out and can be retried", async () => {
  const original = global.fetch;
  let calls = 0;
  global.fetch = async (_url, options) => {
    calls += 1;
    if (calls > 1) return Response.json(quote());
    return new Promise((_resolve, reject) => options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true }));
  };
  try {
    await assert.rejects(quoteBag(lines, "560001"), /timed out/i);
    assert.equal((await quoteBag(lines, "560001")).totalPaise, 193000);
    assert.equal(calls, 2);
  } finally { global.fetch = original; }
});

test('one-rupee payment-only quote needs no courier and rejects forged exceptions',async()=>{
 const original=global.fetch,id='7552dfbd-31bf-4ef8-8b1c-98f84cb8784a';
 const testLines=[{productId:id,qty:1}];
 const value=quote({checkoutMode:'payment_test',items:[{productId:id,sku:'TEST',name:'Razorpay Test Saree',size:'Test size',color:'Test colour',qty:1,unitPricePaise:100,lineTotalPaise:100}],subtotalPaise:100,deliveryPincode:null,deliveryStatus:'not_required',deliveryQuote:null,shippingPaise:0,totalPaise:100});
 try{
  global.fetch=async()=>Response.json(value);assert.equal((await quoteBag(testLines)).totalPaise,100);
  for(const patch of [{totalPaise:101},{shippingPaise:1},{subtotalPaise:200},{checkoutMode:undefined},{items:[{...value.items[0],productId:'other'}]}]){
   global.fetch=async()=>Response.json({...value,...patch});await assert.rejects(quoteBag(testLines),/invalid/);
  }
 }finally{global.fetch=original;}
});
