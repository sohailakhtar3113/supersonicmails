# Typography — Mach33 Media

## Font families (self-hosted from the real Framer woff2 files → `public/fonts/`)
- **Awesome Serif Semi Bold Tall** (600) — hero H1. High-contrast condensed display serif.
- **Awesome Serif Italic Regular** (400) / **Italic Bold** (700) — italic accent words inside headings ("Real Revenue", "Saying", "Mach33", "For Themselves", "Guarantee", "Brand Profitably", "We've Scaled", "Real").
- **Awesome Serif Regular** (400) / **Bold Tall** (700).
- **Inter Display** (300–900, + italics) — section H2/H3 headings, nav, most UI text.
- **Inter** (400/500/600/700 + italics) — badges, small labels, review body.
- **Rethink Sans** (400–700) — "See How We Can Help Your Brand".
- **Poppins** (400) — giant faded stage numbers (01/02/03) in Process.

Framer references each as `"X", "X Placeholder", serif/sans-serif`. We drop the Placeholder fallback and self-host.

## Scale (desktop, computed)
| Element | Font | Size / line-height | Weight | Letter-spacing | Color |
|---|---|---|---|---|---|
| Hero H1 | Awesome Serif Semi Bold Tall | 70 / 84px | 600 | normal | #fff |
| Section H2 (large) | Inter Display | 50 / 60px | 400 | -0.5px | #fff |
| Section H2 (std) | Inter Display | 42 / 50.4px | 400 | -0.42px | #fff |
| "Growth Lever" H2 | Inter Display | 40 / 48px | 500 | -0.4px | #fff |
| Guarantee H3 | Inter Display | 36 / 43.2px | 700 | -0.36px | #fff |
| Card/stage H3 | Inter Display | 24 / 31.2px | 500 | -0.48px | #fff |
| Case-study card title | Inter | 20 / 30px | 700 | normal | #fff |
| Testimonial quote | Inter Display | 22 / 26.4px | 400 | -0.22px | #A7ADBE |
| Stage numbers | Poppins | 42px (rendered ~120px w/ scale) | 400 | normal | faded |
| Body / sub copy | Inter | 18 / 27px | 500 | normal | #A7ADBE |
| Nav item | Inter Display | 18 / 27px | 500 | normal | #fff active / #A7ADBE |
| Badge label | Inter | 17 / 25.5px | 400 | normal | #A7ADBE |
| Review body | Inter Display | 16 / 19.2px | 400 | normal | #fff |
| Role sub-label | Inter Display | 14 / 16.8px | 400 | normal | #A7ADBE |
| VSL "See How…" | Rethink Sans | 24 / 36px | 500 | normal | #fff |
| Play Video | Inter Display | 18 / 27px | 500 | normal | #000529 (on white pill) |

## Notes
- Headings mix upright Inter Display + **italic Awesome Serif** for emphasis words → recreated with per-word `<span class="serif-italic">`.
- Hero uses the serif for the whole H1; all other section headings use Inter Display with a serif-italic accent tail.
- Body defaults: Inter, 18px, `#A7ADBE`, line-height 1.5.
