# One-rupee payment-only checkout — 25 October 2026

Only the POS-approved `Razorpay Test Saree`, variant
`7552dfbd-31bf-4ef8-8b1c-98f84cb8784a`, can use checkout: one unit, ₹1 total,
zero delivery charge and no physical shipment. Other products remain enquiry-only.
The backend enforces this restriction against direct requests and mixed bags.

The website consumes explicit `paymentTestOnly`/`checkoutAllowed` catalog flags,
validates the payment-test quote separately from real courier quotes, and collects/validates contact and Indian address details before opening
Razorpay, while keeping this test non-shipping. Buy now opens that form directly;
Add to cart remains available. Ordinary product-readiness
checks remain. The existing idempotent request retry and Razorpay contact-prefill
fixes from main are retained. After capture, confirmation says no shipment is due.

Validation: 18 website unit tests, lint, production build and static-export checks
passed. The POS backend has 131 passing tests. Local browser checks used an
isolated in-memory API and mock gateway. Live API checks confirmed exactly one
payable quote among 17 variants, ₹1 total and blocked other/mixed/multiple-item
sessions. No payment was submitted by the agent. The configured Razorpay
credentials are live; the owner completing payment will be charged ₹1.

General POS checkout and all Shiprocket booking remain disabled. The dedicated
exception is controlled by the backend's `RazorpayPaymentTestProductId`
CloudFormation parameter; removing that value closes the test without opening
ordinary checkout. Test orders retain a permanent no-shipment marker.
