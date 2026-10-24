import test from "node:test";
import assert from "node:assert/strict";

process.env.NEXT_PUBLIC_POS_API_BASE_URL = "https://api.example.invalid";
const { createCheckoutSession, verifyCheckout, getCheckoutStatus } = await import("../lib/checkout.ts");
const session = {
  reference: "RP-W-ABCDEF12", paymentStatus: "AwaitingPayment", fulfillmentStatus: "On hold",
  totalPaise: 193000, expiresAt: new Date(Date.now() + 900_000).toISOString(), currency: "INR",
  checkoutToken: "a".repeat(48), razorpayOrderId: "order_ABC123", keyId: "rzp_test_ABC123",
};
const buyer = { name: "Synthetic Test", email: "qa@example.invalid", phone: "+919000000000" };
const address = { line1: "Test address", line2: "", city: "Bengaluru", state: "Karnataka", pincode: "560001", country: "IN" };

test("checkout sends items to POS and validates the gateway session", async () => {
  const original = global.fetch;
  global.fetch = async (url, options) => {
    assert.equal(url, "https://api.example.invalid/api/checkout/session");
    assert.equal(options.headers["x-request-id"], "request-id-1234567890");
    assert.deepEqual(JSON.parse(options.body).items, [{ productId: "variant-one", qty: 1 }]);
    return Response.json(session);
  };
  try {
    assert.equal((await createCheckoutSession([{ productId: "variant-one", qty: 1 }], buyer, address, "request-id-1234567890")).razorpayOrderId, session.razorpayOrderId);
    global.fetch = async () => Response.json({ ...session, totalPaise: "193000" });
    await assert.rejects(createCheckoutSession([{ productId: "variant-one", qty: 1 }], buyer, address, "request-id-1234567890"), /order status was invalid/i);
  } finally { global.fetch = original; }
});

test("a mismatched Razorpay callback is rejected before contacting POS", async () => {
  const original = global.fetch;
  global.fetch = async () => { throw new Error("The API must not be called"); };
  try { await assert.rejects(verifyCheckout(session, { razorpay_order_id: "order_OTHER", razorpay_payment_id: "pay_123", razorpay_signature: "signature" }), /did not match/); }
  finally { global.fetch = original; }
});

test("payment verification and status require a valid order acknowledgement", async () => {
  const original = global.fetch;
  global.fetch = async (url) => Response.json(url.includes("/verify")
    ? { reference: session.reference, paymentStatus: "Paid", fulfillmentStatus: "Ready to book", totalPaise: 193000 }
    : { reference: session.reference, paymentStatus: "Processing", fulfillmentStatus: "On hold", totalPaise: 193000 });
  try {
    assert.equal((await verifyCheckout(session, { razorpay_order_id: session.razorpayOrderId, razorpay_payment_id: "pay_123", razorpay_signature: "signature" })).paymentStatus, "Paid");
    assert.equal((await getCheckoutStatus(session.checkoutToken)).paymentStatus, "Processing");
    global.fetch = async () => Response.json({ paymentStatus: "Paid" });
    await assert.rejects(getCheckoutStatus(session.checkoutToken), /status was invalid/);
  } finally { global.fetch = original; }
});

test("a lost checkout response reuses its request ID without storing customer details", async () => {
  const original = global.fetch, originalStorage = global.sessionStorage;
  const values = new Map(), ids = [];
  global.sessionStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
  let calls = 0;
  global.fetch = async (_url, options) => {
    ids.push(options.headers['x-request-id']); calls++;
    if (calls === 1) throw new Error('Synthetic lost response');
    return Response.json(session);
  };
  try {
    const items = [{ productId: 'retry-variant', qty: 1 }];
    await assert.rejects(createCheckoutSession(items, buyer, address), /lost response/);
    assert.equal((await createCheckoutSession(items, buyer, address)).razorpayOrderId, session.razorpayOrderId);
    assert.equal(ids[0], ids[1]);
    const stored = [...values.values()].join('');
    assert.ok(!stored.includes(buyer.email) && !stored.includes(address.line1) && !stored.includes(buyer.phone));
    await createCheckoutSession([{ productId: 'different-variant', qty: 1 }], buyer, address);
    assert.notEqual(ids[2], ids[1]);
  } finally { global.fetch = original; if (originalStorage === undefined) delete global.sessionStorage; else global.sessionStorage = originalStorage; }
});

test("a definitive expired order can restart but a paid or uncertain order retains its request ID", async () => {
  const original = global.fetch, originalStorage = global.sessionStorage;
  const values = new Map(), ids = [];
  global.sessionStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
  let message = 'Checkout is being prepared or needs reconciliation. Please retry shortly.';
  global.fetch = async (_url, options) => {
    ids.push(options.headers['x-request-id']); return Response.json({ error: message }, { status: 409 });
  };
  try {
    const items = [{ productId: 'expired-variant', qty: 1 }];
    await assert.rejects(createCheckoutSession(items, buyer, address));
    message = 'This checkout already has a payment. Check your order status before paying again.';
    await assert.rejects(createCheckoutSession(items, buyer, address));
    assert.equal(ids[0], ids[1]);
    message = 'Checkout expired. Please start again.';
    await assert.rejects(createCheckoutSession(items, buyer, address));
    global.fetch = async (_url, options) => { ids.push(options.headers['x-request-id']); return Response.json(session); };
    await createCheckoutSession(items, buyer, address);
    assert.notEqual(ids[2], ids[3]);
  } finally { global.fetch = original; if (originalStorage === undefined) delete global.sessionStorage; else global.sessionStorage = originalStorage; }
});
