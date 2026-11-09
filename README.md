# Rosepetal Designer Boutique website

This is a Next.js static export hosted on Firebase Hosting. The POS is the source of truth for the public catalog, server-priced bag quotes, enquiries, payment sessions and fulfilment. The website never stores gateway credentials or prices a paid order by itself.

## Local development and release checks

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
npm run check:export
# Or run the complete sequence:
npm run release:check
```

`npm test` covers the catalog contract, provisional and stale bag items, enquiry acknowledgements, courier quote totals, and checkout responses. `npm run check:export` checks exported routes and local links/assets after the build. Older visual tests in `tests/` target superseded shop designs and are not release checks. A manual browser pass is also required before deployment.

The build exports to `out/`. Firebase Hosting serves static files only; Next.js API routes will not run there. The authorized release source is `maniraj/main` in `Maniraj-chindam/rospetalwebsite`. Run `npm run deploy:hosting` from a clean, synced `main` checkout. The command checks the remote revision and Firebase project, runs lint/tests/build/export, deploys the generated files, then compares live page hashes on both Hosting domains. Use `node scripts/deploy-hosting.mjs --check` to run the same source and build checks without deploying.

Do not deploy directly from another checkout or Firebase console upload. This repository guard cannot prevent a separate Firebase account with Hosting deploy access from replacing the release; the project owner must limit that access to the authorized release operator or CI identity. If the live site differs, check Firebase Hosting release history and compare its timestamp with `maniraj/main` before restoring it.

## Live integrations

- `GET /api/catalog` supplies owner-published POS variants. A published variant is display data, not a reservation or permission to charge. Clothing stays enquiry-only until each variant also supplies approved `sizeMeasurements` text; the current POS contract does not yet expose that optional field.
- `POST /api/enquiries` saves contact and consultation requests. A reference appears only after POS acknowledges the save. The sender email still requires SES verification before boutique inbox delivery can be claimed.
- `POST /api/checkout/quote` supplies live POS pricing and a Shiprocket estimate when each piece has confirmed packed measurements. The website rejects an inconsistent or expired payable total.
- Razorpay session, verification and status calls remain gated by the POS release switch and merchant credentials. The website also blocks provisional or missing catalog items from payment.

See the [current website progress](docs/website-progress-2026-10-24.md) for completed work and remaining steps, and [release readiness](docs/release-readiness-2026-10-24.md) for acceptance gates. The confirmed public contact details are `+91 91823 18862` and `rosepetalfashionstudio@gmail.com`. Founder, artisan, studio, photography, return and sale-policy claims still need owner approval.
