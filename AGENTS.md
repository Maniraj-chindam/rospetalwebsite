# Rosepetal website product decisions

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
- This catalog change has been checked locally and is not deployed. For the
  matching POS change, deploy the website's custom-category adapter before the
  POS API/UI. Keep checkout and Shiprocket booking disabled.
