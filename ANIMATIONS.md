# Animations — Mach33 Media (recreation spec)

Engine on original = **Framer Motion**. Clone uses the same library (`motion`) so feel matches.

## Reusable variants (see `src/components/motion.js`)
```js
// Scroll reveal (most blocks)
reveal = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.44,0,0.56,1] } }
}
// Stagger container
container = { hidden:{}, show:{ transition:{ staggerChildren: 0.09, delayChildren: 0.05 } } }
// Hero item
heroItem = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]}} }
```
Trigger: `whileInView` with `viewport={{ once:true, amount:0.2 }}`.

## Per-section behaviour
1. **Navbar** — mounts with fade+drop (0.5s). `position: sticky; top: 16px`. Adds subtle backdrop blur/darken after scrollY>40.
2. **Hero** — stagger: badge → H1 → subcopy → CTA → trust (each `heroItem`, ~0.09s apart). Ambient glow arc static. Trust avatars fade in last.
3. **Stats** — cards reveal with stagger (0.08s). Numbers **count up** from 0 → target over ~1.5s easeOut when in view.
4. **Partners marquee** — infinite `translateX(0 → -50%)`, `linear`, ~25s, track duplicated ×2. 
5. **VSL** — heading + card reveal; Play button `whileHover={{scale:1.05}}`. (Click could open video; clone shows poster + play affordance.)
6. **Testimonial videos** — grid cards reveal staggered; hover lift.
7. **Reviews** — two marquee rows, opposite directions, ~45s / ~55s linear loops, duplicated tracks. `whileHover` pause via animation-play-state.
8. **Growth CTA** — panel reveal (fade+rise), paragraphs stagger.
9. **Comparison** — rows reveal top→down staggered (0.06s). Row hover: faint blue wash.
10. **Campaigns carousel** — `motion` drag `x` with `dragConstraints`; dots reflect index; arrow advances; spring `{stiffness:300,damping:30}`.
11. **Process** — left column `position:sticky; top:120px`. Right stages each reveal on enter; timeline number crossfades; big Poppins number opacity ~0.15.
12. **Case studies** — 2×3 grid, staggered reveal; card hover translateY(-6px)+border brighten.
13. **Guarantee** — panel reveal; wings/shield fade+scale in; CTA hover.
14. **FAQ** — accordion: `AnimatePresence` height auto (0.3s easeInOut), `+` rotates 45°→`×`, answer fades in.
15. **Final CTA** — panel reveal; 3 checklist items stagger; CTA hover.
16. **Footer** — reveal on enter; social icons hover scale.

## Global interactions
- **Button hover:** `whileHover={{ scale:1.03 }}`, brightness up, glow shadow intensifies; `whileTap={{ scale:0.98 }}`.
- **Card hover:** translateY(-4/-6px), border alpha up, ~0.25s ease.
- **Reduced motion:** variants collapse to opacity-only when `prefers-reduced-motion`.
- Scroll = native smooth; no custom smooth-scroll lib.
