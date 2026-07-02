# Technology Detection — Mach33 Media

Detected via live browser inspection (window globals, loaded scripts, DOM, network).

## Verdict
| Tech | Present? | Evidence |
|---|---|---|
| **Framer (site builder)** | ✅ YES | `framerusercontent.com/sites/5CH2IEFeGtKaLJRTxMZyiz/script_main.BlKFtOfE.mjs`, `events.framer.com/script`, all assets on `framerusercontent.com`. |
| **Framer Motion** | ✅ YES | window globals `MotionHandoffAnimation`, `MotionHasOptimisedAnimation`, `MotionCancelOptimisedAnimation`, `MotionIsMounted`, `MotionCheckAppearSync`, `animator`. Framer's built-in animation runtime = Motion. |
| GSAP / ScrollTrigger | ❌ NO | no `gsap`/`TweenMax`/`ScrollTrigger` globals. |
| Lenis | ❌ NO | no `Lenis` global, no `.lenis` class, native scroll. |
| Locomotive Scroll | ❌ NO | no `[data-scroll]` / `LocomotiveScroll`. |
| Three.js / heavy WebGL | ❌ NO | no `THREE`. (`<canvas>` elements exist — Framer uses them for small effects/gradients, not a 3D scene.) |
| Swiper / Barba / jQuery | ❌ NO | none present. |
| Analytics | — | MS Clarity, Meta Pixel, Google gtag (`G-WWPNKWFZGS`) — ignored in clone. |

## Clone strategy
Rebuild the Framer Motion behaviour with **`motion` (Framer Motion) in React** — same library, so timing/easing/spring feel is native and faithful. Marquees + sticky use CSS/transform + `position:sticky`. No GSAP/Lenis needed.

## Animation inventory (observed)
Framer's default reveal is an opacity+translateY transition on viewport entry, plus spring-based hover on interactive elements. Estimated parameters (Framer Motion defaults + what's visible):

| Animation | Trigger | Duration | Easing | Delay | Notes |
|---|---|---|---|---|---|
| **Section reveal** (fade + rise) | element enters viewport (~15% in) | ~0.6s | easeOut / `[0.44,0,0.56,1]` | staggered 0.06–0.12s per child | opacity 0→1, y 20–40px→0. Runs once. |
| **Hero entrance** | on load | ~0.8s | easeOut | badge→H1→sub→CTA→trust stagger ~0.1s | y-rise + fade; H1 slightly larger settle. |
| **Nav** | on load / sticky | ~0.4s | easeOut | — | fades/drops in; stays `position:sticky` top. Subtle bg on scroll. |
| **Partner logos marquee** | always | ~20–30s loop | linear | — | translateX(-50%) infinite, duplicated track. |
| **Reviews marquee (2 rows)** | always | ~40–60s loop | linear | — | opposite directions, duplicated track; pause-on-hover optional. |
| **Campaign carousel** | drag / dots | spring | Framer spring | — | translateX between slides; 3 dot states + arrow. |
| **FAQ accordion** | click | ~0.3s | easeInOut | — | height auto + `+`→`×` icon rotate, chevron/opacity of answer. |
| **Sticky Process column** | scroll | — | — | — | left column `position:sticky`; right stages reveal on scroll along timeline. |
| **Button hover** | hover | ~0.2s | ease / spring | — | brightness + slight scale/lift, glow intensifies. |
| **Card hover** | hover | ~0.25s | ease | — | subtle border/opacity/translateY lift. |
| **Count-up stats** | in view | ~1.5s | easeOut | — | numbers animate up (observed 105→106 tick). |
| **Glow / beams** | ambient | slow | — | — | static SVG glows; subtle opacity breathing possible. |

Implemented in Phase 5 with `motion` variants (see `ANIMATIONS.md` for the concrete variant configs used).
