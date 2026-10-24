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
