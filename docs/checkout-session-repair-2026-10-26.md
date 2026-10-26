# Checkout session binding — 26 October 2026

Reopening Razorpay after changing a bag, contact details or delivery address could
reuse the earlier prepared order. The client now binds each session to a SHA-256
hash of its submitted details and verifies that hash, expiry and the current
quoted total before opening the payment window. Changed details fail safely; the
existing uncertain order is retained rather than creating another payment.

Validation: all 25 configured tests, lint, production build and static export
checks passed (15 HTML pages and 50 links/assets). The new regression covers
product replacement, quantity, buyer email, delivery PIN, quote total, expiry and
missing binding. Checking an existing session issues no new gateway-order call.

This does not enable checkout or Shiprocket booking. The exhausted original ₹1
test item remains untouched. Merchant signed-webhook replay, boutique Gmail
verification/Inbox receipt and a controlled real physical shipment remain separate
acceptance requirements. No real payment, refund or courier write was submitted.
