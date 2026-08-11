"use client";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ASSET, COMPARE } from "./data";
import { Reveal } from "./motion";

/**
 * Us-vs-them, rebuilt as ONE unified ledger instead of a grid of loose cards.
 *
 * The persuasion comes from making the eye travel horizontally across a single
 * row — claim on the left, rebuttal on the right — so every line reads as a
 * direct answer. A lit right-hand column and a scroll-driven beam down the
 * centre rule keep the winning side visually dominant the whole way down.
 *
 * Icons are inline SVG rather than images specifically so the strokes can be
 * drawn on with pathLength; a raster tick cannot animate.
 */

/* Cross — drawn on scroll, deliberately muted and a touch desaturated. */
function CrossMark({ reduce }) {
  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 1 },
        viewport: { once: true, amount: 0.6 },
      };
  return (
    <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full border border-white/[0.09] bg-white/[0.03]">
      <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none" aria-hidden>
        <motion.path
          d="M7 7L17 17"
          stroke="#7B8399"
          strokeWidth="2.4"
          strokeLinecap="round"
          {...draw}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M17 7L7 17"
          stroke="#7B8399"
          strokeWidth="2.4"
          strokeLinecap="round"
          {...draw}
          transition={{ duration: 0.4, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </span>
  );
}

/* Check — same treatment, but lit in brand blue and drawn as one stroke. */
function CheckMark({ reduce, i }) {
  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true, amount: 0.6 },
      };
  return (
    <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full border border-[#3362FF]/40 bg-[#3362FF]/15 shadow-[0_0_14px_-2px_rgba(51,98,255,0.55)]">
      <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden>
        <motion.path
          d="M5 12.5L9.8 17L19 7.5"
          stroke="#A9C0FF"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...draw}
          transition={{
            duration: 0.55,
            delay: 0.1 + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>
    </span>
  );
}

export default function Comparison() {
  const panelRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const reduce = useReducedMotion();

  // Beam that travels down the centre rule as the panel scrolls through view.
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start 85%", "end 60%"],
  });
  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Mouse spotlight via CSS vars — no state, so no re-render per mousemove.
  const onMove = (e) => {
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    const el = panelRef.current;
    if (el) el.style.setProperty("--mx", "-400px");
    setHovered(null);
  };

  return (
    <section className="container-page relative pt-6 pb-14 md:pt-12 md:pb-20">
      <img
        src={ASSET.headingGlow}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 w-[717px] max-w-none -translate-x-1/2 opacity-55"
      />

      <Reveal className="relative z-10 mb-11 text-center md:mb-14">
        <p className="font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FA0FF]">
          Comparison
        </p>
        <h2
          className="mt-3 text-[22px] font-semibold leading-[1.25] text-white sm:text-[32px] md:text-[44px]"
          style={{ fontFamily: "'Clash Display', Georgia, serif" }}
        >
          Choosing Supersonic Mails Over Others
        </h2>
      </Reveal>

      <motion.div
        ref={panelRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        initial={reduce ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ "--mx": "-400px", "--my": "-400px" }}
        className="relative z-10 mx-auto max-w-[1060px] overflow-hidden rounded-[26px] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(13,18,42,0.72),rgba(6,9,26,0.6))] backdrop-blur-xl"
      >
        {/* Lit right half — the winning column is never not glowing. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block"
          style={{
            background:
              "linear-gradient(180deg, rgba(51,98,255,0.12) 0%, rgba(51,98,255,0.05) 45%, rgba(51,98,255,0.10) 100%)",
          }}
        />

        {/* Diagonal hatch over the losing column, as CSS not a texture file. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 opacity-[0.55] md:block"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.028) 0px, rgba(255,255,255,0.028) 1px, transparent 1px, transparent 7px)",
          }}
        />

        {/* Mouse spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 md:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx) var(--my), rgba(51,98,255,0.13), transparent 65%)",
          }}
        />

        {/* Centre rule + the beam that fills it on scroll */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/[0.08] md:block"
        >
          <motion.div
            className="w-full bg-gradient-to-b from-transparent via-[#3362FF] to-[#8FA9FF]"
            style={{
              height: reduce ? "100%" : beamHeight,
              boxShadow: "0 0 12px rgba(51,98,255,0.9)",
            }}
          />
        </div>

        {/* ── Column headers ── */}
        <div className="relative hidden grid-cols-2 border-b border-white/[0.08] md:grid">
          <div className="px-8 py-7 lg:px-10">
            <span className="font-display text-[15px] font-medium uppercase tracking-[0.14em] text-[#69718A]">
              Other Agencies
            </span>
          </div>
          <div className="flex items-center justify-end gap-3 px-8 py-7 lg:px-10">
            <span className="font-display text-[15px] font-medium uppercase tracking-[0.14em] text-white">
              Supersonic Mails
            </span>
          </div>

          {/* V/S medallion, straddling the rule. The conic ring reuses the
              beam-spin keyframe already defined for the stats bento. */}
          <div className="absolute left-1/2 top-1/2 z-20 h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <div
                className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 [animation:beam-spin_6s_linear_infinite] motion-reduce:animate-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(255,255,255,0.10) 0deg, rgba(255,255,255,0.10) 280deg, rgba(51,98,255,0.9) 330deg, #AEC4FF 350deg, rgba(255,255,255,0.10) 360deg)",
                }}
              />
              <div className="absolute inset-[1.5px] grid place-items-center rounded-full bg-[#080C1E]">
                <span className="font-display text-[13px] font-semibold tracking-wide text-white">
                  V/S
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Rows ── */}
        <div className="relative">
          {COMPARE.map(([left, right], i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              className="relative grid grid-cols-1 border-t border-white/[0.14] first:border-t-0 md:grid-cols-2 md:border-white/[0.06] md:first:border-t-0"
            >
              {/* Sliding highlight — one element, shared across rows, so motion
                  morphs its position instead of cross-fading two boxes. */}
              {hovered === i && !reduce && (
                <motion.span
                  layoutId="cmp-row-highlight"
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-0 bg-white/[0.035]"
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                />
              )}

              {/* Them */}
              <div className="relative z-10 flex items-start gap-3.5 px-6 py-5 md:px-8 md:py-6 lg:px-10">
                <CrossMark reduce={reduce} />
                <div className="min-w-0">
                  <span className="font-display mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5C6480] md:hidden">
                    Other Agencies
                  </span>
                  <span className="font-rethink block text-[15px] leading-[1.5] text-[#868DA1] md:text-[16px]">
                    {left}
                  </span>
                </div>
              </div>

              {/* Us */}
              {/* On mobile the pair is stacked, so the winning half carries a
                  faint blue wash — that, plus a fainter inner rule, is what
                  makes each them/us pair read as one row rather than four. */}
              <div className="relative z-10 flex items-start gap-3.5 border-t border-white/[0.04] bg-[#3362FF]/[0.055] px-6 py-5 md:border-t-0 md:bg-transparent md:px-8 md:py-6 lg:px-10">
                <CheckMark reduce={reduce} i={i} />
                <div className="min-w-0">
                  <span className="font-display mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FA0FF] md:hidden">
                    Supersonic Mails
                  </span>
                  <span className="font-display block text-[15px] font-medium leading-[1.5] text-white md:text-[16px]">
                    {right}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
