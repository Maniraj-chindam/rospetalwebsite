# Rosepetal Designer Boutique

This is a Next.js static export hosted on Firebase Hosting. The currently published catalog is a style gallery because the approved sellable SKU, price, size and stock data has not been connected. The customer-facing bag and checkout pages are prepared, but no item can be bought or paid for until that data and a secure checkout service are live. There is no website admin account; the boutique plans to connect its CRM later for product and site-content management.

## Run locally

```sh
pnpm install
pnpm dev
```

For the production export and Firebase Hosting emulator:

```sh
pnpm build
pnpm dlx firebase-tools emulators:start --only hosting --project rosepetal-boutique-live
```

With the emulator running, run `npm run test:smoke` to check each public route and its local images.

## Enquiries

Contact, piece and consultation requests use `sendEnquiry` in `lib/enquiry.ts`. The static site needs a real HTTPS form endpoint at build time:

```sh
NEXT_PUBLIC_ENQUIRY_ENDPOINT=https://your-form-service.example/submit pnpm build
```

The endpoint receives JSON with `type`, `name`, `email`, `phone`, `message`, and optional `piece` / `preferredDate`. It must allow cross-origin requests from the production domain, validate and rate-limit submissions server-side, deliver them to a verified boutique inbox, and return a non-2xx response when delivery fails. Never put an email API secret in a `NEXT_PUBLIC_` variable. Until an endpoint is configured, the forms show an explicit unavailable error and never claim success.

Before publishing a production form, send a real test enquiry from both forms and confirm it in the boutique's inbox. The recipient email, studio address, customer reviews, founder story and item-level prices, fabric, sizes, stock, care and delivery facts still need owner approval. The public gallery deliberately says “Price on request” and labels its images as style references until that data is supplied.

The boutique phone supplied by the owner is `+91 91823 18862`. The receiving email, studio address, reviews and founder story remain unconfirmed.

## Online checkout preparation

`ProductItem` supports a confirmed `sku`, `pricePaise`, and size/stock variants. Only products with those values and `verifiedForSale: true` become purchasable. Bag contents are stored in the customer's browser and are **not** a stock reservation. The checkout form collects contact and India delivery details, then asks a server for the canonical itemised total and shipping charge before showing a payment button. Payment confirmation is displayed only after the server reports a verified paid status.

Set `NEXT_PUBLIC_CHECKOUT_API_BASE_URL` at build time when the checkout service is ready. The browser contract is:

- `POST /quote` with `{ items: [{ productId, size, quantity }], customer }` returns `{ quoteId, lines, subtotalPaise, shippingPaise, totalPaise, currency: "INR" }`.
- `POST /pay` with `{ quoteId }` returns `{ paymentUrl }`, a secure hosted payment URL.
- `GET /status?token=...` returns `{ status: "paid" | "pending" | "failed" }` based on the provider's server-verified payment state. The payment provider should return to `/checkout/return?token=...` with an opaque token.

The backend must retrieve authoritative prices and stock, validate the shipping address, reserve/decrement stock safely, create an idempotent order, use a secret payment key only server-side, verify provider webhooks or signatures, persist the order, and notify the boutique. A browser response or return URL alone must never mark an order as paid. The Firebase project currently has billing disabled, so Firebase Cloud Functions cannot be deployed there; a separate serverless service or a billing-enabled Firebase project is required. Live checkout also needs the merchant account and approved product/delivery data.

CRM integration and paid-order sync are deferred at the owner's request. When that API is available, replace the static catalog and content source with a validated read adapter, and make the checkout service check the CRM's live prices and stock before payment.
