# Rosepetal website product decisions

- On 2026-10-27, live prepaid checkout is gated by POS-approved variant IDs and a controlled one-run acceptance path while general payment/booking switches remain off. Unapproved pieces stay enquiry-only; the site accepts the POS `approval_required` quote status and never creates a payable session from it. Do not invent product, packing, recipient or price facts for launch.

- On 2026-10-26, the owner required one product entry in POS, with matching
  categories, actual/sale prices, descriptions, fabric, care, delivery, variants
  and photos on the website. Fetch published POS catalog data; do not introduce
  a second manually maintained website product record. Accept bounded nonempty
  custom POS categories as well as the common category names.
- Display entered published product text in product details and quick view even
  when readiness checks keep a piece enquiry-only. Retain readiness notices,
  exact payment-test restrictions and server payment/shipping gates. Never
  invent garment or packed measurements or expose private POS fields.
- Preserve uncommitted work. Use Harsha
  <reddyharshavardhan145@gmail.com> for commits. The authorized website push remote
  is `maniraj`, currently on `main`; do not push to the unrelated `origin` remote.
- On 2026-10-26, this catalog change was deployed to Firebase Hosting from
  `a1dc270`, before the matching POS UI/API release. The live website reads the
  main POS product category, prices and text through the catalog. Checkout and
  Shiprocket booking remain disabled. See `docs/deployment-2026-10-26.md`.
