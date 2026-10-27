# Homepage sections 1 and 4 — visual QA

final result: passed

## Evidence

| Section | Source visual truth | Browser implementation capture |
| --- | --- | --- |
| 1, atelier | `/Users/ashwinkorra/.codex/generated_images/01a145d2-17f0-7713-bee4-9ab779ba4a79/exec-c24412a1-9374-44b3-a4b1-d717a6e2ba30.png` | `docs/qa-images/atelier-desktop.png`, `docs/qa-images/atelier-mobile.png` |
| 4, buying details | `/Users/ashwinkorra/.codex/generated_images/01a145d2-17f0-7713-bee4-9ab779ba4a79/exec-3290f089-5222-42a3-b408-5f97ddf86ecd.png` | `docs/qa-images/guidance-desktop.png`, `docs/qa-images/guidance-mobile.png` |

The source mockups are 1825 × 862 pixels. The desktop implementation captures are 1825 × 862 pixels at an 1825 × 862 CSS viewport, device scale factor 1. The mobile captures are 390 × 844 pixels at a 390 × 844 CSS viewport, device scale factor 1. No density normalization was needed. Captures came from the local production export in the in-app browser. Source and implementation were opened together in the same comparison input for each desktop section.

## State and comparison

- Homepage with both new sections following the collection area; no catalog items were available in the local preview state.
- Section 1 retains the reference's left atelier scene, ivory copy panel, live serif heading, detail inset, fine divider and story action. Its desktop photo/copy proportions and vertical scale match the selected direction; mobile stacks the photo and copy without horizontal overflow.
- Section 4 retains the reference's burgundy textile scene, dark readable overlay, large serif heading, three ruled information rows and contact action. Mobile rows remain readable and tappable.
- A focused crop was unnecessary: both full-view desktop comparisons show every key component and the full 390-pixel captures show mobile typography, row spacing and actions.

## Findings and fixes

1. **P2, fixed:** Initial desktop sections were visibly shorter than the selected 862-pixel reference. Increased their desktop minimum height and captured them again at the matching viewport.
2. **P2, fixed:** The textile photo in section 4 was hidden behind its background by a negative stacking level. Moved the photo, shade and content into ordered positive layers. The final browser capture shows the fabric clearly with readable text.
3. **P3, acceptable:** The generated photo-only details differ from the original concept art. The layout, typography and interactive elements are coded; the imagery is illustrative and should be replaced with approved studio photography when available.

The section links resolve to existing `/about`, `/contact`, `/shipping` and `/returns` export pages. Their visible destinations were checked in the browser accessibility state and by the export validator. The local browser reported no console errors. No new P0, P1 or P2 findings remain.

## Checks

- Browser-rendered desktop and 390-pixel mobile screenshots: passed.
- 35 configured tests, ESLint, production build and export validation (15 pages, 52 links/assets): passed.
- Payment, checkout and shipping flows were outside this visual change and were not exercised.
