# Rosepetal Designer Boutique

This is a Next.js static export hosted on Firebase Hosting. The public collection is an enquiry-led style gallery. It does not take payments or reserve stock.

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

## Enquiries

Contact, piece and consultation requests use `sendEnquiry` in `lib/enquiry.ts`. The static site needs a real HTTPS form endpoint at build time:

```sh
NEXT_PUBLIC_ENQUIRY_ENDPOINT=https://your-form-service.example/submit pnpm build
```

The endpoint receives JSON with `type`, `name`, `email`, `phone`, `message`, and optional `piece` / `preferredDate`. It must allow cross-origin requests from the production domain, validate and rate-limit submissions server-side, deliver them to a verified boutique inbox, and return a non-2xx response when delivery fails. Never put an email API secret in a `NEXT_PUBLIC_` variable. Until an endpoint is configured, the forms show an explicit unavailable error and never claim success.

Before publishing a production form, send a real test enquiry from both forms and confirm it in the boutique's inbox. The recipient email, phone, studio address, customer reviews, founder story and item-level prices, fabric, sizes, stock, care and delivery facts still need owner approval. The public gallery deliberately says “Price on request” and labels its images as style references until that data is supplied.
