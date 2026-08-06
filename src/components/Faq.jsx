"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "motion/react";
import { ASSET, FAQ } from "./data";
import { Reveal, revealSm, container } from "./motion";

/**
 * FAQ — built on Radix Accordion so the interaction is the real thing:
 * roving focus with Arrow keys, Home/End jumps, Space/Enter toggle, and
 * the aria-expanded / aria-controls / role wiring handled by the primitive.
 *
 * `type="single" collapsible` is the classic SaaS behaviour — opening one
 * answer closes the previous, and clicking an open row closes it again.
 * The height animation is CSS (see .faq-panel in globals.css) driven by
 * Radix's --radix-accordion-content-height, which keeps it off the main
 * thread and free of the layout jank you get animating to `auto`.
 */
/**
 * Panel keyframes ship with the component instead of living in globals.css.
 * They must be real CSS — the open/close height animates to Radix's measured
 * --radix-accordion-content-height, which no utility class can express, and
 * `height: auto` is not animatable. React 19 hoists and dedupes this by href,
 * so the seven items share one copy.
 */
const PANEL_CSS = `
@keyframes faq-down  { from { height: 0 } to { height: var(--radix-accordion-content-height) } }
@keyframes faq-up    { from { height: var(--radix-accordion-content-height) } to { height: 0 } }
@keyframes faq-answer-in { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: none } }

.faq-panel { overflow: hidden }
.faq-panel[data-state="open"]   { animation: faq-down 560ms cubic-bezier(0.22, 1, 0.36, 1) }
.faq-panel[data-state="closed"] { animation: faq-up 440ms cubic-bezier(0.65, 0, 0.35, 1) }
.faq-panel[data-state="open"] .faq-answer {
  animation: faq-answer-in 560ms cubic-bezier(0.22, 1, 0.36, 1) 150ms both;
}

@media (prefers-reduced-motion: reduce) {
  .faq-panel[data-state="open"],
  .faq-panel[data-state="closed"],
  .faq-panel[data-state="open"] .faq-answer { animation: none }
}
`;

function Item({ q, a, value }) {
  return (
    <Accordion.Item value={value} asChild>
      <motion.div
        variants={revealSm}
        className="group overflow-hidden rounded-[18px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(16,22,48,0.45),rgba(6,9,26,0.4))] transition-colors duration-300 hover:border-white/[0.16] data-[state=open]:border-[#3362FF]/35 data-[state=open]:bg-[linear-gradient(180deg,rgba(24,34,74,0.55),rgba(8,12,32,0.45))] data-[state=open]:shadow-[0_0_0_1px_rgba(51,98,255,0.12),0_18px_44px_-24px_rgba(51,98,255,0.55)]"
      >
        <Accordion.Header asChild>
          <h3 className="m-0">
            <Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between gap-5 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3362FF]/70 md:px-7 md:py-6">
              <span className="font-display text-[16px] font-medium leading-[1.45] text-[#E8EAF2] transition-colors duration-300 group-hover:text-white group-data-[state=open]:text-white md:text-[18.5px]">
                {q}
              </span>

              {/* Plus that unwinds into a minus.
                  Geometry and rotation live here as utilities rather than in
                  globals.css on purpose: the vertical bar is only vertical
                  because of its rotate, so if that stylesheet is ever stale or
                  fails to load, a custom-class version silently degrades to two
                  flat bars — a dash, with no plus ever visible. Utilities ship
                  with the component and cannot desync from it. */}
              {/* `rotate` must be listed explicitly: Tailwind v4 emits the
                  standalone `rotate:` property, and `transition-property:
                  transform` does NOT cover it — omit it and the badge snaps
                  to 180deg instantly instead of sweeping. */}
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition-[transform,rotate,background-color,border-color,color] duration-[620ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:border-white/20 group-hover:text-white group-data-[state=open]:rotate-180 group-data-[state=open]:border-[#3362FF]/45 group-data-[state=open]:bg-[#3362FF]/15 group-data-[state=open]:text-white motion-reduce:transition-none">
                <span className="absolute h-[1.6px] w-[13px] rounded-full bg-current" />
                {/* 90deg -> 180deg, not 90 -> 0: both land horizontal, but
                    increasing the angle sweeps clockwise (to the right) while
                    decreasing it unwinds anticlockwise. */}
                <span className="absolute h-[1.6px] w-[13px] rotate-90 rounded-full bg-current transition-[transform,rotate] duration-[620ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-data-[state=open]:rotate-180 motion-reduce:transition-none" />
              </span>
            </Accordion.Trigger>
          </h3>
        </Accordion.Header>

        <Accordion.Content className="faq-panel">
          <p className="faq-answer font-rethink max-w-[70ch] px-5 pb-6 text-[15px] leading-[1.7] text-[#A2A9BC] md:px-7 md:pb-7 md:text-[16px]">
            {a}
          </p>
        </Accordion.Content>
      </motion.div>
    </Accordion.Item>
  );
}

export default function Faq() {
  return (
    <section className="container-page relative py-16 md:py-24">
      <style href="faq-accordion" precedence="high">
        {PANEL_CSS}
      </style>

      <img
        src={ASSET.headingGlow}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-4 w-[640px] max-w-none -translate-x-1/2 opacity-50"
      />

      <Reveal className="relative z-10 mb-11 text-center md:mb-14">

        <h2
          className="mt-3 text-[30px] font-semibold leading-[1.15] text-white md:text-[44px]"
          style={{ fontFamily: "'Clash Display', Georgia, serif" }}
        >
          Frequently Asked Questions
        </h2>
      </Reveal>

      {/* No defaultValue — every row starts closed, so each shows a "+". */}
      <Accordion.Root type="single" collapsible asChild>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          className="relative z-10 mx-auto flex max-w-[860px] flex-col gap-3.5"
        >
          {FAQ.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} value={`faq-${i}`} />
          ))}
        </motion.div>
      </Accordion.Root>
    </section>
  );
}
