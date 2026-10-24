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
