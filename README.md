# Rosepetal Designer Boutique

This is a Next.js static export hosted on Firebase Hosting. Shop and search read the POS public catalog v2; only owner-published variants appear, and the site is empty until approved products are published in the POS. Contact and consultation forms save requests to the private POS enquiry inbox through `POST /api/enquiries`; the site shows a reference only after the server confirms the save. WhatsApp is offered as an explicit fallback on failure, and customers must tap **Send** there. Paid checkout and website stock reservations are not live.

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

Run `node --experimental-strip-types --test tests/pos-catalog.test.mjs` to check the public POS adapter. The POS backend and staff editor own the catalog contract; see `docs/website-catalog-v2.md` in the POS repository. Deploy the backend contract before deploying a website build that requires it.

## Before enabling online sales

The owner needs to provide approved SKU, price, size, stock, fabric, care, and delivery data, plus a merchant payment account and a secure checkout backend. Product and site content will be managed through a CRM later; the CRM API and paid-order sync are deferred. Do not present a payment as successful until the backend verifies the provider's payment result.

The studio address, email, visiting hours, customer reviews, and founder details also need owner confirmation before they are used as factual claims. `+91 91823 18862` is the confirmed phone and WhatsApp destination. Email alerts require a confirmed boutique inbox and verified sender identity; staff can read saved enquiries in the POS meanwhile.
