# Rosepetal release plan — 24 October 2026

This plan separates verified website behavior from work that requires real boutique data, merchant credentials or a controlled transaction. Do not turn on payment or shipment booking merely because a page renders.

| Phase | Acceptance gate | Current evidence | Owner or POS input still needed |
| --- | --- | --- | --- |
| 1. Public site and policy routes | All pages, robots and sitemap return 200; navigation and enquiry-only states are usable | Firebase routes verified; responsive shop fixes deployed | Approve final privacy, delivery, returns and purchase terms before payment |
| 2. Catalog | Each published variant has approved name, SKU, price, stock, size measurements, fabric, care, delivery text, actual colour photos and packed dimensions | Public POS catalog still has 12 `Designer Frock 1` test variants, draft copy and one shared image | Boutique must supply and approve facts/photos; measure actual packed parcels in POS |
| 3. Enquiries | Contact and consultation save in POS and a notification reaches the confirmed inbox | Contact `RP-E-CABD6549` and consultation `RP-E-E33F5AE4` were saved and visible in the POS inbox | Complete SES verification for `rosepetalfashionstudio@gmail.com`, then confirm a new message arrives in Gmail |
| 4. Courier quotes | For an approved in-stock SKU, a real India PIN gets a live Shiprocket courier, charge and expiry | Test variant returns `packaging_required`; no live quote | POS packed dimensions, Shiprocket API-user secret and usable courier account |
| 5. Payment | A controlled test payment is captured once, a POS order and stock commitment appear once, and webhook replay does not duplicate them | Razorpay secret missing and checkout switch off | Configure secret and webhook in merchant account; agree on a real test order and amount |
| 6. Fulfilment | Paid order books Shiprocket once and shows AWB, label, tracking and failure recovery | Shiprocket secret missing and booking switch off | Configure secret/webhook, then run a real booking against the controlled order |
| 7. Release verification | Catalog/bag/enquiry/quote/checkout tests, lint, build, keyboard, zoom, contrast and performance checks pass | Website release tests and build can run locally | Recheck on the final catalog and after a real order; field Core Web Vitals need sufficient Chrome traffic |

## Current production blockers

- AWS account `115019372452`, region `ap-south-1`: Secrets Manager names `rosepetal/razorpay/website` and `rosepetal/shiprocket/api-user` are absent. Never paste credential values into chat or commit them.
- POS stack `rosepetal-boutique`: `RazorpayCheckoutEnabled=false`, `ShiprocketFulfillmentEnabled=false`, `WebsiteShippingChargeMode=quoted`.
- Amazon SES identity `rosepetalfashionstudio@gmail.com`: a fresh verification email was requested on 24 October; the identity is `PENDING` until the boutique clicks its verification link. Email delivery is unproven.
- A live quote for `DF1-BROWN-L`, quantity one, delivery PIN `560001` returned `deliveryStatus=packaging_required`, no courier quote and `checkoutAvailable=false`.
- No production payment or shipment was made during this release check. PageSpeed Insights API returned HTTP 429, so field Core Web Vitals remain unmeasured.

## Controlled acceptance sequence

1. Replace or unpublish the test catalog. Photograph each colour, check every variant and enter measured parcel data in POS.
2. Verify the SES sender and test a new contact and consultation enquiry, matching each reference in POS and the boutique inbox.
3. Store merchant credentials through AWS Secrets Manager and verify webhook signatures. Keep release switches off while testing contract and failure states.
4. Quote one approved SKU to a real serviceable PIN. Record the selected courier, shipping charge and expiry; confirm the website shows the same total.
5. Agree a capped test purchase and shipping address. Enable checkout only for that controlled acceptance run, pay once, and verify a single captured Razorpay payment, POS order, stock movement and webhook retry behavior.
6. Enable fulfilment after payment reconciliation is sound. Book once, then verify AWB, label, tracking and the customer-facing order status. Handle failed booking without a second charge.
7. Approve legal/customer copy and studio photography, run the full accessibility and performance pass, then release to all customers.

The POS repository currently contains extensive uncommitted work from another task. Integrate there without resetting or overwriting it.
