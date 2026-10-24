# Rosepetal commerce and Shiprocket: Phase 0 readiness

> Historical snapshot from 23 October 2026. For the current implementation and release status, see [website progress](website-progress-2026-10-24.md). Statements below about the catalog, merchant account and API users may no longer describe production.

Checked 23 October 2026 against the website repository, the supplied POS API description, and the signed-in Shiprocket seller dashboard.

## Verified current state

| Item | Status | Evidence or implication |
| --- | --- | --- |
| Website hosting | Static Next.js export on Firebase Hosting | Server-only credentials and order processing need the trusted POS/AWS backend. |
| POS catalog | Public catalog adapter exists; live Shop has no published products | Product approval, content, and availability must be completed before a purchase test. |
| Shiprocket seller sign-in | Working | Signed-in dashboard visible. |
| Shiprocket domestic KYC | Dashboard marks it completed | Recheck any account restrictions before the first live shipment. |
| Pickup address | One verified primary address in Nellore; owner confirmed it for Rosepetal pickup and returns | Use this saved Shiprocket location as the launch origin. |
| Shiprocket API users | Zero | Need a dedicated API-user email different from the seller sign-in email. |
| Shiprocket sandbox | Enabled with the owner's approval on 23 October 2026 | Test credentials are shown only inside the Shiprocket account; they were not copied into this repository or chat. |
| Shiprocket wallet | ₹0 shown | Funding and first live shipment remain operational launch tasks. Do not recharge automatically. |
| Shiprocket GSTIN invoicing | Disabled in Billing & GSTIN settings | Confirm the boutique's tax and invoicing requirements before changing it. |
| Tracking webhook | No configuration visible in the current panel | Backend callback must exist before configuration and verification. |
| Launch shipping scope | Prepaid orders within India, confirmed by owner | COD and international shipping are outside the first checkout release. |
| Merchant gateway | No active merchant account or keys supplied | Paid checkout cannot go live until a provider is selected and activated. |

## Decisions awaiting the owner

1. A dedicated Shiprocket API-user email, distinct from the seller sign-in email. Passwords and tokens must never be shared in chat, browser URL, source files, or Git.
2. Payment provider and merchant account status. Razorpay is a proposed adapter, not an active integration.
3. Shipping charge policy: live courier rate, fixed customer charge, free-shipping threshold, and who absorbs differences. The owner has not confirmed this yet.
4. Returns, exchanges, RTO, shipping restrictions, and customer-facing delivery terms.
5. Approved catalog fields for each SKU: photos, size, fabric, care, tax/HSN, packed weight and dimensions, and availability.
6. Confirmed boutique support email and business details for invoices, policies, and customer receipts.

## Proposed integration boundary

The POS/AWS backend owns orders, stock reservations, merchant payment verification, Shiprocket authentication, shipping quotes, shipment creation, tracking state, and private customer data. The Firebase website receives only public catalog data and purpose-built checkout responses. Shiprocket API-user credentials, bearer tokens, payment secrets, and webhook security tokens stay in server-side secret storage.

The first release is limited to prepaid domestic orders. The backend should allow browser requests only from the production website origin and the named staging origin; the Shiprocket API is never called from browser JavaScript. The intended API-user modules are Orders, Courier, and Shipments. Confirm the exact minimum permissions with a sandbox serviceability and order-lifecycle test before using live credentials. The API-user form also offers an optional PII IP allowlist; do not enter a dynamic Lambda address as if it were a stable egress IP.

Planned backend interfaces (none are live yet):

- `POST /api/enquiries`: validated contact/consultation lead with acknowledgement ID.
- `POST /api/checkout/quote`: server-priced items, stock check, delivery serviceability, shipping options, and expiry.
- `POST /api/checkout/session`: stock reservation and gateway payment order created from the selected quote.
- `POST /api/webhooks/payment`: authenticated, deduplicated payment events.
- `POST /api/webhooks/logistics`: authenticated, deduplicated Shiprocket tracking events.
- `GET /api/orders/{publicToken}`: limited customer order and tracking view; no staff-only data.

Shiprocket order creation must follow verified payment and packing approval. Save the website order ID, POS order ID, Shiprocket order ID, shipment ID, and AWB together. Retry with idempotency controls so an API timeout cannot create a second shipment. Map Shiprocket shipping prices in rupees to the POS's integer-paise accounting.

References: [Shiprocket API](https://apidocs.shiprocket.in/), [authentication](https://apidocs-test.shiprocket.in/guides/authentication/), and [webhooks](https://apidocs-test.shiprocket.in/guides/webhooks/).

## Phase 0 completion criteria

- Owner decisions above are recorded.
- Confirmed pickup origin, API-user email, launch service area, and payment provider are available.
- Dedicated production Shiprocket API user is configured through the seller account; sandbox access is enabled; secrets are stored only in the trusted backend.
- A serviceability call can be made in the approved test environment without exposing credentials to the website.
- Phase 1 can begin with no unresolved architecture or ownership decisions.
