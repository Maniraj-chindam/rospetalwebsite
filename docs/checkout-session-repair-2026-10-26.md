# Checkout session binding — 26 October 2026

Changing the bag could reuse an earlier prepared order, while contact/address
edits discarded that order and could create another chargeable checkout. The
client now retains the prepared order and binds each session to a SHA-256
hash of its submitted details and verifies that hash, expiry and the current
quoted total before opening the payment window. Changed details fail safely; the
existing uncertain order is retained rather than creating another payment.
Field edits no longer clear an unexpired prepared session.

Validation: all 25 configured tests, lint, production build and static export
checks passed (15 HTML pages and 50 links/assets). The new regression covers
product replacement, quantity, buyer email, delivery PIN, quote total, expiry and
missing binding. Checking an existing session issues no new gateway-order call.
An isolated browser pass also cancelled the simulated payment dialog, changed
the address, verified the refusal without a second order, restored the original
details, and completed the same simulated order. The POS showed Paid and reached
Delivered through simulated booking, AWB, pickup, documents and tracking.

This does not enable checkout or Shiprocket booking. The exhausted original ₹1
test item remains untouched. Merchant signed-webhook replay, boutique Gmail
verification/Inbox receipt and a controlled real physical shipment remain separate
acceptance requirements. No real payment, refund or courier write was submitted.
