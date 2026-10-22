# Rosepetal Designer Boutique

This is a Next.js static export hosted on Firebase Hosting. The site currently presents collections and directs contact and consultation requests to the boutique's WhatsApp number, `+91 91823 18862`. Customers must tap **Send** in WhatsApp; opening the chat does not deliver a message. No server endpoint, paid checkout, stock reservation, or CRM integration is live.

## Run locally

```sh
pnpm install
pnpm dev
```

## Build and deploy

```sh
pnpm build
pnpm dlx firebase-tools emulators:start --only hosting --project rosepetal-boutique-live
pnpm dlx firebase-tools deploy --only hosting --project rosepetal-boutique-live
```

The export is written to `out/`. Firebase Hosting serves static files only; Next.js API routes will not run there. The Firebase project is configured in `.firebaserc`.

## Before enabling online sales

The owner needs to provide approved SKU, price, size, stock, fabric, care, and delivery data, plus a merchant payment account and a secure checkout backend. Product and site content will be managed through a CRM later; the CRM API and paid-order sync are deferred. Do not present a payment as successful until the backend verifies the provider's payment result.

The studio address, email, visiting hours, customer reviews, and founder details also need owner confirmation before they are used as factual claims. WhatsApp is currently the only confirmed contact destination. A real contact form service can replace the WhatsApp handoff once its endpoint and recipient inbox are verified.
