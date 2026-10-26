# Product details entered once in POS — 26 October 2026

The POS now has one category input and one product-information section. The
website uses that published catalog data directly, including custom categories,
actual/sale prices, description, fabric, care, delivery, sizes, colours and
photos. No duplicate website product entry is needed. Private POS fields remain
outside the public contract.

The adapter accepts bounded, nonempty category names instead of a separate
hardcoded category allowlist. Collection category filters already derive their
values from the loaded catalog. Product details and quick view display the
entered public text even when readiness issues still make the item enquiry-only.
The checkout/readiness checks themselves are unchanged.

Local browser proof used Synthetic POS sync QA, category QA Occasion, actual
price ₹1,200 and sale price ₹900, with S/M and Ivory/Rose/custom QA Ocean variants.
The POS public API and website product details, category filter and quick view
matched the entered values. No production product, payment, stock or shipment
was changed. No packing or garment measurements were invented.

The 26 tests in the configured test command passed, along with lint, production
build/type checks and export validation (15 pages, 50 local links/assets). An ad
hoc wildcard test run includes historical source-layout assertions referring to
the old app/page.tsx structure and tests requiring a separate localhost:3002
server; those fail outside the configured test command. They are unrelated to
the changed catalog files and were left intact.

Deployed to the live website before the matching POS UI/API change on 26 October
2026. The final live verification is in [`deployment-2026-10-26.md`](deployment-2026-10-26.md).
Checkout and Shiprocket booking remain disabled.

Evidence is saved in the POS repository under
`output/qa/catalog-single-entry-2026-10-26/`.
