# Colors — Mach33 Media

All values read from computed styles / detected background rules on the live site.

## Core
| Token | Value | Usage |
|---|---|---|
| Page background | `#00020F` (rgb 0,2,15) | body / all sections base |
| Deep panel | `#000529` (rgb 0,5,41) | dark-on-light pill text, gradient stops |
| Card/nav dark | `#131839` (rgb 19,24,56/57) | nav pill, stage badges, dark fills |
| White | `#FFFFFF` | headings, primary text |
| Muted text | `#A7ADBE` (rgb 167,173,190) | body copy, inactive nav, sub-labels |
| Light label | `#E1E3E9` (rgb 225,227,233) | "Our Trusted Partners" |
| Light-blue label | `#CCD7FF` (rgb 204,215,255) | "Proof" badge text |

## Accent blue (brand)
| Token | Value | Usage |
|---|---|---|
| Primary blue | `#3362FF` (rgb 51,98,255) | buttons, accents, checks |
| Button gradient | `linear-gradient(#4C75FF 0%, #1A4FFF 100%)` | Apply-for-an-Audit buttons |
| Blue glow (radial) | `radial-gradient(50% 50% at 50% 50%, #5C7DF4 0%, rgba(92,126,245,0) 100%)` | hero/heading glows |
| Faint blue wash | `rgba(51,99,255,0.15) → transparent` | comparison row separators / beams |
| Deep blue stop | `rgba(0,9,77,x)` | multi-stop card gradients |
| Blue border tint | `rgba(0,59,255,0.45)` | accent line on stat cards |

## Semantic
| Token | Value | Usage |
|---|---|---|
| Success green | ~`#22C55E`/emerald | green check dots (final CTA), live-status dot |
| Cross red | red circle icon | comparison "Other Agencies" ✕ |
| Star gold | ~`#F5B301` | 5-star ratings |

## Complex gradients captured
- Card media (case studies): saturated royal-blue gradient with grid texture.
- Guarantee/Final CTA panel: `linear-gradient(213deg, rgba(0,0,0,.6) 0%, rgba(0,9,77,.44) 23%, rgba(51,99,255,.23) 36%, #000529 53%, rgba(0,9,77,.68) 78%, rgba(19,24,56,.67) 100%)` + diagonal light-streak PNGs.

Implemented as CSS custom properties in `globals.css` (`--bg`, `--accent`, `--muted`, etc.).
