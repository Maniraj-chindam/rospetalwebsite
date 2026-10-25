# Customer catalog publication guard — 25 October 2026

The website now excludes POS payment-test items and visibly incomplete product variants from customer pages. This is a website display rule; it does not change POS records or merchant release switches.

## Current live POS evidence

The public POS catalog contained 17 variants at verification time:

| Style | Variants | Publication issue |
| --- | ---: | --- |
| `DF1` — Designer Frock 1 | 12 | All lack size measurements; Red, Ivory and Dark brown share one collage image; name is provisional. |
| `RP-BED37BF1` — NarayanaPeta designer frock | 4 | All lack size measurements. Category and product facts still need boutique approval. |
| `RP-RAZORPAY-TEST-SAREE` | 1 | Internal payment test, stock zero. Public website hides it regardless of its POS checkout flag. |

The resulting customer catalog is **empty** until POS data is corrected. Home and Shop show their existing empty states; direct product URLs show the existing unavailable message. Search, wishlist, Bag and checkout use the same customer-visible rule. Saved wishlist and bag entries for hidden items are removed after a successful catalog refresh; a catalog error does not erase them.

[Deployed Shop screenshot](catalog-publication-2026-10-25-shop.png). Browser checks confirmed the test item's direct link is unavailable, a previously saved test-item wishlist entry is removed, and provisional garments no longer appear in Search or Home.

## Publication rule

An ordinary POS variant appears only when its name and descriptive fields are not provisional, size measurements and colour are present, and distinct colours within one style do not reuse the same primary image. The POS still controls actual/sale price, stock and checkout permission. A content-complete product with `checkoutAllowed=false` may appear for enquiry, but cannot enter checkout. `paymentTestOnly` items never appear in the customer catalog.

These checks catch missing or obviously provisional data. They cannot prove that a name, photo, fabric, measurement, price or packing dimension is true or approved. The boutique/POS owner must verify each variant and publish the correct facts and separate colour photos in POS. The website should then be rechecked on desktop and phone. The payment-test item must also be unpublished in POS if it should disappear from the public POS API; this website change hides it only from customer-facing pages.

No test item's stock was replenished, no paid order was reused, and no POS, Razorpay or Shiprocket configuration was changed.
