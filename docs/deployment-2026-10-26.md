# Website deployment — 26 October 2026

The website catalog update is live at [rosepetalboutique.com](https://rosepetalboutique.com/) on Firebase Hosting project `rosepetal-boutique-live`, from source commit `a1dc270`. It was deployed before the matching POS UI/API release. Products remain entered and published once in the POS; the website reads their public catalog details.

The 26 configured tests, ESLint, production build/type checks and export validation passed (15 pages and 50 local links/assets). Production `/collections` and `/product` returned HTTP 200 and matched the exported HTML byte for byte by SHA-256. Historical wildcard tests outside the configured command include old source-layout assertions and tests expecting a separate localhost:3002 server; these were not a release gate.

Live browser verification of NarayanaPeta designer frock showed the POS category `customised frocks`, ₹6,800 price, exact published description, fabric, care and delivery text, size, colour and a loaded photo. The item remained enquiry-only because its measurements need confirmation. The POS catalog comparison found the same eight published variant IDs, prices, descriptions, photos and stock after deployment; the only returned changes were category labels corrected to the main POS categories. No product records were rewritten.

Razorpay checkout and Shiprocket booking remain disabled. This website release did not create a payment, order or shipment. The [POS deployment record](https://github.com/reddyharshavardhan145-ship-it/rosepetal-boutique/blob/main/docs/deployment-2026-10-26.md) contains the combined release checks and live browser evidence.
