# Rosepetal website: work completed and current status

**Snapshot:** 24 October 2026. This records verified work on the website and the production integration gates at the time of writing. POS catalog data and AWS settings can change independently of this repository.

## Where the project stands

- The public website is deployed at [rosepetalboutique.com](https://rosepetalboutique.com/) through Firebase Hosting. The source is pushed to the `feature/rosepetal-boutique-website` branch of [rosepetal-website](https://github.com/janagamsathwikpatel-art/rosepetal-website).
- Visitors can browse the POS-backed collection, open product pages, select available size and colour variants, save a wishlist, keep a local bag, search, and submit contact or consultation enquiries. The POS has acknowledged test enquiries with references.
- **Customers cannot complete a live online purchase or book a shipment yet.** Website checkout code is connected to POS endpoints, but the POS payment and fulfilment switches are off. No captured payment-to-Shiprocket test has been completed.
- The POS is intended to manage products and website content. A separate website admin account was not added.

## Website work completed

| Area | Implemented |
| --- | --- |
| Storefront and navigation | Responsive home, editorial collection, product detail, lookbook, custom design, About, Contact, search, bag and checkout pages; mobile dock, keyboard-operable navigation, skip link, visible focus and error/empty states. |
| Product experience | Public POS catalog v2 adapter with pagination and response validation; style grouping and size/colour selection; product-specific pages; fabric, care, delivery and SKU where POS supplies them; wishlist and enquiry actions. Generic test names, draft copy, shared colour photos and missing `sizeMeasurements` keep a product enquiry-only. |
| Order preparation | Itemised bag with quantities; POS-priced quote and stock checks; India PIN entry; Shiprocket estimate display when a valid quote exists; Razorpay session, verification and order-status client code. The website rejects stale or inconsistent totals and cannot enable payment without the POS release gate. |
| Enquiries | Contact and consultation forms submit to POS with required-field validation, stable retry IDs, clear errors, and a success reference only after POS acknowledges the save. Two test references were observed in the POS inbox. Delivery to the boutique Gmail inbox is still unproven. |
| Customer information | `/privacy`, `/shipping`, `/returns` and `/terms` are live. They explain the current limitations without inventing a final return or sale promise. Owner-approved full policies are still required before paid checkout. |
| Discovery and SEO | Working `/robots.txt` and `/sitemap.xml`, page titles and descriptions, canonical links on static pages, and client-updated title/canonical on a selected product. Product metadata is still generic in the initial static HTML. |
| Visual and responsive fixes | Dark wine background matching the requested Rosepetal colour direction, stronger white-text contrast, corrected 320px horizontal overflow, and a mobile hero that clears the fixed dock. |
| Release checks | ESLint, production build, **14 automated tests**, and a static-export checker passed. The checker found 15 exported HTML pages and 48 local links/assets. Mobile 320px reflow and keyboard menu open/Escape/focus restoration were checked. |

The latest public route check returned HTTP 200 for `/`, `/collections`, `/product`, `/bag`, `/checkout`, `/contact`, `/about`, `/lookbook`, `/custom-design`, `/privacy`, `/shipping`, `/returns`, `/terms`, `/robots.txt` and `/sitemap.xml`.

## Production integration status

| Dependency | Verified state on 24 October 2026 | What remains |
| --- | --- | --- |
| POS catalog | Public catalog contained 12 `Designer Frock 1` test variants and 4 `NarayanaPeta designer frock` variants. A `RED GREEN YELLOW` variant showed a dark dress photo and its category was `Designer Suits`. | Boutique will correct products in POS: genuine names, exact price/stock, separate matching colour photos, size measurements, fabric, care, delivery, category and measured packed weight/dimensions. POS catalog must expose approved `sizeMeasurements` for each applicable variant. |
| Courier quote | A test variant returned `packaging_required`; a newly published variant returned `unavailable` for PIN `560001`. No live courier charge was verified. | Complete packed data and Shiprocket production setup, then obtain and compare one real quote to the customer-facing total. |
| Razorpay | AWS Secrets Manager in account `115019372452`, `ap-south-1`, returned no `rosepetal/razorpay/website` secret. POS `RazorpayCheckoutEnabled=false`. | Store the live key and webhook secret privately, verify the webhook, then run a controlled real payment with an agreed maximum charge and address. |
| Shiprocket | The same AWS account/region returned no `rosepetal/shiprocket/api-user` secret. POS `ShiprocketFulfillmentEnabled=false`; shipping charge mode is `quoted`. | Store the rotated API-user credentials and matching webhook token privately, verify access, then test booking, AWB, label and tracking against one paid order. |
| Enquiry email | SES identity `rosepetalfashionstudio@gmail.com` was `PENDING` and not verified for sending. POS receipt of test enquiries was confirmed. | Click the SES verification email and prove a new contact and consultation submission both appear in POS and reach the boutique inbox. |
| Brand and policy approval | About and customer-information pages are live, but founder, artisan, studio, authentic photography, and final purchase/return terms have not been supplied and approved. | Replace provisional content with approved facts, photos and policies. |

**Security:** Do not put API keys, passwords or webhook secrets in this document, chat, the website bundle or Git. Store them only in the intended AWS Secrets Manager entries. The website must not call Shiprocket directly from browser JavaScript.

## Remaining release proof

1. Correct and approve the POS catalog. Remove the publishing-test products and resolve the visible colour/photo/category mismatch. Confirm variant measurements and packed parcel data.
2. Verify SES and test end-to-end enquiry email delivery.
3. Create the two named AWS secrets and confirm Razorpay and Shiprocket webhook configuration. Keep both POS release switches off until a controlled acceptance run is ready.
4. Get a live Shiprocket quote for one approved, in-stock product and serviceable India PIN. Confirm the POS and website show the same shipping charge and payable total.
5. With an agreed spending limit and test address, complete one payment → captured Razorpay event → single POS order/stock update → single Shiprocket booking → AWB/tracking flow. Check retries do not create duplicate charges or shipments.
6. Approve policies and authentic brand content, then repeat the full desktop/mobile journey and complete an actual 200% zoom, screen-reader and field Core Web Vitals check. The PageSpeed Insights request made during the release audit returned HTTP 429, so no field performance result is claimed here.

The first intended checkout release is **prepaid delivery within India**, using the verified Nellore pickup location and the exact live Shiprocket estimate as the customer shipping charge. COD and international orders are outside that scope.

For technical release gates and evidence, see [release readiness](release-readiness-2026-10-24.md). This snapshot supersedes older planning assumptions where the merchant or catalog status differs.
