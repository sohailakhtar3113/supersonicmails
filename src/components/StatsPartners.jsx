"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

/* ------------------------------------------------------------------ *
 * The numbers.
 *
 * Built as a hairline-divided quadrant rather than a bento with a hero
 * tile. The bento gave one metric double height, which meant its content
 * had to be spread across a span the other three never had — the source
 * of the dead gap. Four equal cells remove the problem at the root
 * instead of decorating around it, and reading order still leads with
 * revenue.
 *
 * The rules between cells are a 1px grid gap over a tinted container,
 * so they are perfectly even at every breakpoint with no border maths
 * and no double-borders where cells meet.
 * ------------------------------------------------------------------ */

const IconRevenue = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M17 7h4v4" />
  </svg>
);
const IconBrands = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.6" />
    <rect x="14" y="3" width="7" height="7" rx="1.6" />
    <rect x="3" y="14" width="7" height="7" rx="1.6" />
    <rect x="14" y="14" width="7" height="7" rx="1.6" />
  </svg>
);
const IconSend = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);
const IconRepeat = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const STAT_ITEMS = [
  {
    key: "revenue",
    icon: IconRevenue,
    eyebrow: "Revenue driven",
    value: 8,
    suffix: "-Figs",
    blurb:
      "8-Figures in strictly tracked, attributable backend revenue driven for our partners.",
  },
  {
    key: "brands",
    icon: IconBrands,
    eyebrow: "Portfolio",
    value: 45,
    suffix: "+",
    unit: "Brands",
    blurb:
      "Scaled past their plateaus by plugging into our ROI-First Retention Systems.",
  },
  {
    key: "emails",
    icon: IconSend,
    eyebrow: "Volume",
    value: 5,
    suffix: "M+",
    unit: "Monthly",
    blurb:
      "High-deliverability emails sent without burning list health or sacrificing margins.",
  },
  {
    key: "returning",
    icon: IconRepeat,
    eyebrow: "Retention",
    prefix: "Maximum",
    value: 64,
    suffix: "%",
    blurb:
      "Returning customer rate achieved by replacing generic newsletter blasts with behavioral flows.",
  },
];

/* Count-up. Every ticker fires together off the section-level `start`. */
function NumberTicker({ value, start, className }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(mv, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = mv.on("change", (v) => setDisplay(Math.round(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [start, value, reduce, mv]);

  return <span className={className}>{display}</span>;
}

const cellVar = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const gridVar = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

function Cell({ item, start }) {
  const ref = useRef(null);

  // Spotlight via CSS vars — no state, so no re-render per mousemove.
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      variants={cellVar}
      onMouseMove={onMove}
      onMouseLeave={() => ref.current?.style.setProperty("--mx", "-500px")}
      style={{ "--mx": "-500px", "--my": "-500px" }}
      className="group relative flex flex-col justify-between gap-8 bg-[#080C1C] p-7 transition-colors duration-500 hover:bg-[#0B1026] md:gap-10 md:p-10"
    >
      {/* Spotlight sits behind the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx) var(--my), rgba(51,98,255,0.14), transparent 65%)",
        }}
      />

      {/* Eyebrow */}
      <div className="relative z-10 flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[#3362FF]/[0.12] text-[#8FA9FF] ring-1 ring-inset ring-[#3362FF]/25 transition-colors duration-500 group-hover:bg-[#3362FF]/20 group-hover:text-[#C3D2FF]">
          <item.icon width={15} height={15} />
        </span>
        <span className="font-body text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#8FA9FF]/90">
          {item.eyebrow}
        </span>
      </div>

      {/* Figure + blurb */}
      <div className="relative z-10">
        {/* "Maximum" rides above the figure: at display size it pushed "64%"
            onto a second line and read like a typo. */}
        {item.prefix && (
          <span className="font-body mb-2 block text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#E1E3E9]/70">
            {item.prefix}
          </span>
        )}

        <div
          className="flex flex-wrap items-end font-display text-white"
          style={{
            fontSize: "clamp(44px, 4.8vw, 68px)",
            fontWeight: 600,
            lineHeight: 0.9,
            letterSpacing: "-0.025em",
          }}
        >
          <NumberTicker value={item.value} start={start} />
          <span className="text-[#9fb4ff]">{item.suffix}</span>
          {item.unit && (
            <span className="ml-2.5 text-[0.34em] font-medium text-[#E1E3E9]">
              {item.unit}
            </span>
          )}
        </div>

        <p className="font-body mt-4 max-w-[42ch] text-[14.5px] leading-relaxed text-[#8A90A2]">
          {item.blurb}
        </p>
      </div>
    </motion.div>
  );
}

export default function StatsPartners() {
  const reduce = useReducedMotion();
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.3 });
  const gridRef = useRef(null);
  const started = useInView(gridRef, { once: true, amount: 0.2 });

  return (
    <section className="container-page relative pt-8 pb-14 md:py-24">
      {/* Ambient section glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.22] blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(51,98,255,0.4) 0%, transparent 70%)",
        }}
      />

      {/* The -80px pull closes a gap that only exists on desktop, where the
          section carries py-24. On phones the section has just pt-8, so the
          same pull wiped the gap out completely and the heading collided with
          the CTA above it — hence md: only. */}
      <div className="relative z-10 md:-mt-20">
        {/* Heading */}
        <motion.div
          ref={headRef}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 max-w-2xl md:mb-14"
        >
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-[#8FA9FF]">
            The numbers
          </span>
          <h2
            className="font-display mt-3 text-white"
            style={{
              fontSize: "clamp(22px, 5vw, 46px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Engineered For <span className="serif-i">8-Figure Brands</span>
          </h2>
          <p className="font-body mt-4 max-w-xl text-[17px] leading-relaxed text-[#A7ADBE]">
            We&rsquo;ll turn your email list into your highest-margin sales
            channel or you don&rsquo;t pay.
          </p>
        </motion.div>

        {/* Quadrant. gap-px over a tinted container draws the hairlines. */}
        <div className="overflow-hidden rounded-[24px] border border-white/[0.09] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
          <motion.div
            ref={gridRef}
            variants={gridVar}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-px bg-white/[0.09] sm:grid-cols-2"
          >
            {STAT_ITEMS.map((item) => (
              <Cell key={item.key} item={item} start={started} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
