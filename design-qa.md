# Homepage visual QA

final result: passed

## Evidence

| Section | Source visual truth | Browser implementation capture |
| --- | --- | --- |
| Hero, option 5 | `/Users/ashwinkorra/.codex/generated_images/01a145d2-17f0-7713-bee4-9ab779ba4a79/exec-6e564b43-12bb-4394-a6aa-f949a1b77394.png`; original homepage screenshot supplied 28 October 2026 | `docs/qa-images/hero-option5-desktop.png`, `docs/qa-images/hero-option5-mobile.png` |
| 1, atelier | `/Users/ashwinkorra/.codex/generated_images/01a145d2-17f0-7713-bee4-9ab779ba4a79/exec-c24412a1-9374-44b3-a4b1-d717a6e2ba30.png` | `docs/qa-images/atelier-desktop.png`, `docs/qa-images/atelier-mobile.png` |
| 4, buying details | `/Users/ashwinkorra/.codex/generated_images/01a145d2-17f0-7713-bee4-9ab779ba4a79/exec-3290f089-5222-42a3-b408-5f97ddf86ecd.png` | `docs/qa-images/guidance-desktop.png`, `docs/qa-images/guidance-mobile.png` |

The section 1 and 4 source mockups and desktop captures are 1825 × 862 pixels at an 1825 × 862 CSS viewport. The option 5 source asset and hero desktop capture are 1672 × 941 pixels at a 1672 × 941 CSS viewport. Mobile captures are 390 × 844 pixels at a 390 × 844 CSS viewport. Device scale factor is 1 throughout, so no density normalization was needed. Captures came from the local production export in the in-app browser. Source and implementation were opened together in the same comparison input for each desktop design.

## State and comparison

- Homepage with both new sections following the collection area; no catalog items were available in the local preview state.
- The selected option 5 photo is a separate optimized WebP asset. The desktop hero keeps its burgundy negative space left and embroidered garments right. The original site's headline, navigation, eyebrow, CTA and decorative petals remain live code. The mobile crop keeps the lehenga visible above a readable text area. The description now reflects designer dresses and lehengas.
- Section 1 retains the reference's left atelier scene, ivory copy panel, live serif heading, detail inset, fine divider and story action. Its desktop photo/copy proportions and vertical scale match the selected direction; mobile stacks the photo and copy without horizontal overflow.
- Section 4 retains the reference's burgundy textile scene, dark readable overlay, large serif heading, three ruled information rows and contact action. Mobile rows remain readable and tappable.
- A focused crop was unnecessary: both full-view desktop comparisons show every key component and the full 390-pixel captures show mobile typography, row spacing and actions.

## Findings and fixes

1. **P2, fixed:** Initial desktop sections were visibly shorter than the selected 862-pixel reference. Increased their desktop minimum height and captured them again at the matching viewport.
2. **P2, fixed:** The textile photo in section 4 was hidden behind its background by a negative stacking level. Moved the photo, shade and content into ordered positive layers. The final browser capture shows the fabric clearly with readable text.
3. **P3, acceptable:** The generated photo-only details differ from the original concept art. The layout, typography and interactive elements are coded; the imagery is illustrative and should be replaced with approved studio photography when available.
4. **Hero option 5:** No P0/P1/P2 visual mismatch after the first implementation. The selected source image is photo-only, so the coded navigation and copy appear in the implementation comparison but not in the source. The foreground red lehenga remains dominant at desktop and phone sizes.

The section links resolve to existing `/about`, `/contact`, `/shipping` and `/returns` export pages. The hero Shop Now link resolves to `/collections`. These visible destinations were checked in the browser accessibility state and by the export validator. The local browser reported no console errors. No new P0, P1 or P2 findings remain.

## Checks

- Browser-rendered desktop and 390-pixel mobile screenshots for all three designs: passed.
- 35 configured tests, ESLint, production build and export validation (15 pages, 52 links/assets): passed.
- Payment, checkout and shipping flows were outside this visual change and were not exercised.
