# Mach33 Media — Homepage Analysis

Source: https://mach33media.com/ — inspected live with a real Chromium (Playwright) session.
Rendered page height: **13,624px** desktop (1440×900), **15,239px** mobile (390×844).

## Platform
Built and published with **Framer**. Bundle: `framerusercontent.com/sites/5CH2IEFeGtKaLJRTxMZyiz/script_main.*.mjs`.
Animation engine = **Framer Motion** (window globals `MotionHandoffAnimation`, `MotionIsMounted`, etc.). See `TECH_STACK_ANALYSIS.md`.

## Layout system
- **Content container:** centered, max width ≈ **1200px** (`720px` for narrow text blocks like hero copy / FAQ). Side padding ≈ 20–40px.
- **Background:** flat near‑black navy `#00020F` across the whole page; sections layer radial/linear glows and decorative SVGs on top.
- **Grid:** CSS fl/grid. Stats = 4‑up grid (2×2 tendency), Case studies = **2 columns × 3 rows**, Comparison = 2‑column rows, Reviews = 2 horizontal marquee rows, Campaigns = horizontal carousel.
- **Vertical rhythm:** large section gaps (~120–160px between sections).

## Section order (top → bottom)
1. **Navbar** — sticky, floating rounded pill. Left: MACH33 logo ("Previously 360Funnels"). Center pill: Home · Case Studies · Reviews · Process. Right: blue "Apply for an Audit →" pill. Mobile: logo + hamburger.
2. **Hero** — starfield + glowing blue horizon **arc** (planet limb) SVG at top. Badge pill "● FOR DTC BRANDS DOING $200K+/MONTH". H1 serif "Scale Your Profits, Not Just Revenue". Sub copy. Blue CTA. Trust row (avatar stack + 5 stars + "Trusted by 105+ Brands").
3. **Stats + heading** — 4 cards ($150M+ Revenue Generated · 105+ Brands Scaled · 1B+ Profitable Emails Sent · 5:1 LTV:CAC), grid‑lined card backgrounds with a top blue accent line. Heading "Where Retention Becomes *Real Revenue*" (italic serif on last words). "Our Trusted Partners:" + logo **marquee** (Klaviyo, Loop, Shopify partners repeating).
4. **VSL** — "See How We Can Help Your Brand" + large video card (poster "PROFIT FIRST") with "▶ Play Video" pill. CTA + trust below.
5. **Testimonial videos** — badge "Proof", heading "Hear From The Brands *We've Scaled*". Grid of video cards (YouTube thumbs) each with a quote + name (Vatanak Sau, Jeeven Nullatamby, Yannick Rebsamenn, Bill Lee, Rafi).
6. **Reviews marquee** — heading "What Brands Are *Saying*", "Rated 4.9/5 on Trustpilot". Two rows of review cards scrolling in opposite directions (quote‑mark cards + avatar/name/role cards). Two light "beam" SVGs angle in behind the heading.
7. **Growth‑lever CTA** — badge "If you're doing $200K+ per month", heading "Your Biggest Growth Lever Isn't More Ad Spend.", two paragraphs. Inside a bordered glow card.
8. **Comparison** — badge "Comparison", heading "Choosing *Mach33* Over Others". Two columns: **Other Agencies** (red ✕ rows, hatched bg) **vs** **MACH33** (blue ✓ rows). "V/S" badge between headers. 7 rows.
9. **Campaigns carousel** — heading "A Look Inside The Campaigns Driving $150M+ in Revenue". Horizontal carousel of tall mobile‑mockup screenshots (Testorush, MHM Tee, Herbavita, Manara, …), 3 dot indicators + arrow.
10. **Process** — badge "RETENTION GROWTH SYSTEM", heading "How We Scale Your *Brand Profitably*", CTA + trust in a **sticky left column**; right column scrolls through Stage 01 Deep Research / 02 Iteration / 03 Optimization & Scale along a vertical timeline with huge faded Poppins numbers.
11. **Case studies** — badge "Case Studies", heading "The Results Speak *For Themselves*". 2×3 grid of result cards: each = blue gradient visual (big stat + dashboard screenshot overlay) then bold title + gray description. "View All Case Studies →" button + trust.
12. **Guarantee** — bordered card, angel‑wings SVG + shield‑check icon, heading "Zero Risk. Iron‑Clad *Guarantee*", two paragraphs, CTA + trust. Blue diagonal light streaks on both sides.
13. **FAQ** — heading "Frequently Asked Questions", 5 accordion rows with `+` toggles (answers captured in this repo's data).
14. **Final CTA** — bordered card with diagonal blue streaks, heading "Your Brand Is Probably Sitting On 25–40% More Revenue Right Now", "Let's go find and unlock it", 3 green‑check items, CTA + trust.
15. **Footer** — grid‑line bg. Logo + "Previously 360Funnels". Nav links (Case Studies · Reviews · Process). Blue CTA + trust. Social icons (LinkedIn, X, Instagram). Divider. "© 2026 Mach33 Media. All rights reserved" + Privacy Policy · Terms & Conditions.

## Buttons
- **Primary "Apply for an Audit":** blue gradient `linear-gradient(#4C75FF → #1A4FFF)` (solid `#3362FF`), white text, pill radius (~40px / fully round), right arrow icon, soft blue glow shadow. Hover: slight lift / brightness.
- **Nav center pill:** dark translucent `#131839`-ish, active item white text, inactive `#A7ADBE`.
- **Badges/pills:** translucent fill, 100px radius, 6px padding, small caps‑ish label.

## Cards
- Rounded corners (~16–24px), 1px subtle border (white @ ~6–10% alpha), dark translucent fill, occasional inner grid‑line SVG + top blue accent line (stats). Case‑study cards have a saturated blue gradient media area on top.

## Interactions / scroll
- Sticky navbar (stays pinned; subtle backdrop). Sticky left column in Process. Two marquees (partners, reviews) auto‑scroll. Campaign carousel is sw?ipe/drag + dots. FAQ accordions expand on click. On‑scroll reveal (fade + rise) on most blocks. Smooth native scroll (no Lenis). See `ANIMATIONS.md`.

## Responsiveness
- Desktop pill navbar → mobile logo + hamburger.
- Multi‑column grids collapse to single column (stats stack full‑width, case studies 1‑col, comparison stacks).
- Hero H1 scales down (~70px → ~44px). Section headings scale down accordingly.
