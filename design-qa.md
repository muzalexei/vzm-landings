# Design QA — consulting-223fz

final result: passed

## Target and evidence

- Selected source: FINRE Investment Website Design, https://dribbble.com/shots/27629161-FINRE-Investment-Website-Design.
- Source visual truth: `/workspace/scratch/design/finre.png` (3200 × 2400 pixels).
- This is an adaptation to an existing Russian 223-ФЗ consulting site with the user's supplied portrait, rather than a reproduction of the investment product or its claims.
- Browser-rendered implementation: [desktop](docs/redesign/desktop.png), [mobile](docs/redesign/mobile.png).
- Focused evidence: [desktop hero](docs/redesign/hero-desktop.png), [mobile hero](docs/redesign/hero-mobile.png).
- Full composition comparison: `/workspace/scratch/design/comparison-final.png`, showing the source front page and final implementation together. The source front-page region was cropped using the 3200/1824 scale factor and normalized to 720 × 792 pixels; the implementation region was cropped to 1344 × 1478 and normalized to the same size. No comparison of browser chrome or background presentation board was used.
- Viewports: 1440 × 1100, 768 × 1024, 390 × 844, 320 × 740 CSS pixels, deviceScaleFactor 1.
- State: initial page; all services selected; FAQ closed. Full screenshots preserve their native CSS-pixel density. Focused screenshots preserve native density.
- The reference supplies no mobile layout. The mobile implementation uses the same visual language with a single-column conversion path and navigation menu.

## Findings and iteration history

1. [P1] The existing Google Forms URL returned HTTP 404 / Page Not Found during a real browser read. A working conversion destination is required.
   - Fix: the contact button now opens the user-selected personal Telegram account (`https://t.me/thevzm`). The selected account's public landing page returned HTTP 200, “Telegram: Contact @thevzm”. No message was sent.
   - Post-fix evidence: all four viewport interaction checks verified the Telegram conversion path; after the user supplied @thevzm, a final mobile browser check confirmed both contact links and the `telegram_open` event. The actual Telegram web page was checked separately; no message was sent.
2. [P2] Muted text in the hero had 4.16:1 contrast (`#667085` on `#e8ebf0`).
   - Fix: muted text changed to `#5e697b`; the description and small service labels use the same darker token.
   - Post-fix evidence: final browser captures `docs/redesign/desktop.png` and `docs/redesign/mobile.png`, together with `/workspace/scratch/design/comparison-final.png`. Muted hero text now exceeds 4.5:1.
3. Final comparison found no remaining actionable P0/P1/P2 issues. The portrait crop, warm photographic background, Russian copy, consulting brand and service content are intentional changes for the requested adaptation.

## Required fidelity surfaces

- Fonts and typography: locally hosted Manrope in 400/500/600/700 weights supports Cyrillic. The geometric sans family, large wordmark, compact heading line-height and measured hierarchy reflect the reference. Actual font loading verified in Chromium. Heading and CTA wrapping checked at all four widths.
- Spacing and layout rhythm: large masthead, rounded gray hero, portrait on the left and content on the right, three facts, centered About and paired benefit tiles follow the reference composition. The supplied portrait remains a photograph and overlaps the hero slightly. Lower sections use a consistent grid and separators. No horizontal overflow at any tested width.
- Colors and visual tokens: navy `#2b3752`, gray hero `#e8ebf0`, white canvas, muted `#5e697b`, lightly tinted service surfaces. Muted hero text exceeds 4.5:1 after correction. Dark and white CTA states, focus outlines and reduced-motion support are present.
- Image quality and asset fidelity: the user's original 853 × 1280 JPEG is used unchanged, without generative face edits. Cropping checked at desktop/mobile sizes. No broken images. Icons are external Phosphor SVG assets with their MIT license; no handcrafted illustration replacements. Manrope's OFL license is included.
- Copy and content: investment copy is replaced with the site's consulting purpose. Services retain the six existing areas. Unsubstantiated marketing statistics and illustrative success claims were replaced with a description of the actual service process; no new client successes, testimonials or performance claims were invented. SEO, canonical URL, professional-service schema and existing Metrika counter remain.

## Interaction verification

Browser automation passed on all four widths:
- Supplier/customer filters each show four relevant services; All shows six.
- FAQ details open and expose answers.
- Primary CTA navigates to the contact section.
- Contact link opens the intended Telegram destination in a new tab.
- On mobile, the menu opens, closes on navigation, closes with Escape and returns focus on Escape.
- Existing Metrika goal names for landing, CTA, section visibility and scroll depths are preserved. DataLayer events verified, including `telegram_open` with UTM context.
- No page errors, failed HTTP asset responses, broken images or horizontal overflow.
- `node --check consulting-223fz/script.js` and `git diff --check` passed.

## Implementation checklist

- [x] Desktop and mobile layout reviewed against selected visual direction.
- [x] Supplied portrait, local font files and licensed icon assets included.
- [x] Core navigation, filters, FAQ, contact destination and analytics verified.
- [x] Conversion destination and contrast issues fixed and final browser captures reviewed.

## Follow-up polish and limits

- Safari and Firefox were not exercised; verification used Chromium.
- Telegram uses the personal account explicitly supplied by the user: @thevzm.
