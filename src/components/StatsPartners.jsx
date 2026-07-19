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
 * Stat bento — a premium, enterprise-grade metrics section.
 * Bespoke display config lives here so each metric can carry its own
 * number/suffix/icon/copy and visual weight (hierarchy over uniformity).
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
    value: 7,
    suffix: "-Figs",
    blurb:
      "7-Figures in strictly tracked, attributable backend revenue driven for our partners.",
    hero: true,
  },
  {
    key: "brands",
    icon: IconBrands,
    eyebrow: "Portfolio",
    value: 35,
    suffix: "+",
    unit: "Brands",
    blurb:
      "Scaled past their plateaus by plugging into our ROI-First Retention Systems.",
  },
  {
    key: "emails",
    icon: IconSend,
    eyebrow: "Volume",
    value: 2,
    suffix: "M+",
    unit: "Monthly",
    blurb:
      "High-deliverability emails sent without burning list health or sacrificing margins.",
  },
  {
    key: "returning",
    icon: IconRepeat,
    eyebrow: "Retention",
    prefix: "Maximum ",
    value: 64,
    suffix: "%",
    blurb:
      "Returning customer rate achieved by replacing generic newsletter blasts with behavioral flows.",
  },
];

/* Count-up number. All tickers fire together via the section-level `start`. */
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
      duration: 1.5,
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

function IconBadge({ Icon, className = "", size = 18 }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-[11px] bg-[#3362FF]/[0.12] text-[#8FA9FF] ring-1 ring-inset ring-[#3362FF]/25 ${className}`}
    >
      <Icon width={size} height={size} />
    </span>
  );
}

const cardVar = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const gridVar = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* Card shell: rotating-beam OR hairline border, grid texture, mouse spotlight. */
function StatShell({ item, start, className = "" }) {
  const ref = useRef(null);

  // Mouse-reactive spotlight via CSS vars — no React state, no re-renders.
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", `-300px`);
    el.style.setProperty("--my", `-300px`);
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVar}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ "--mx": "-300px", "--my": "-300px" }}
      className={`group relative overflow-hidden rounded-[24px] ${className}`}
    >
      {/* Border layer: rotating beam for the hero, hairline for the rest */}
      {item.hero ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div
            className="absolute left-1/2 top-1/2 aspect-square w-[150%] [animation:beam-spin_7s_linear_infinite] motion-reduce:animate-none"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(255,255,255,0.06) 0deg, rgba(255,255,255,0.06) 292deg, rgba(51,98,255,0.85) 330deg, #AEC4FF 345deg, rgba(255,255,255,0.06) 360deg)",
            }}
          />
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.09]" />
      )}

      {/* Inner surface (reveals the 1px border/beam) */}
      <div
        className="absolute inset-[1px] rounded-[23px]"
        style={{ background: "linear-gradient(180deg, #10152E 0%, #090D20 100%)" }}
      />

      {/* Grid texture, fading in from the top-left corner */}
      <div
        className="pointer-events-none absolute inset-[1px] rounded-[23px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,150,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,255,0.055) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(130% 120% at 0% 0%, #000 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(130% 120% at 0% 0%, #000 0%, transparent 72%)",
        }}
      />

      {/* Ambient corner glow for the hero */}
      {item.hero && (
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[70px]"
          style={{
            background:
              "radial-gradient(circle, rgba(51,98,255,0.35), transparent 70%)",
          }}
        />
      )}

      {/* Mouse spotlight */}
      <div
        className="pointer-events-none absolute inset-[1px] rounded-[23px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx) var(--my), rgba(51,98,255,0.18), transparent 62%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between gap-5 p-5 md:p-6">
        <div className="flex items-center gap-2.5">
          <IconBadge
            Icon={item.icon}
            size={item.hero ? 19 : 17}
            className={item.hero ? "h-10 w-10" : "h-9 w-9"}
          />
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8FA9FF]/90">
            {item.eyebrow}
          </span>
        </div>

        <div>
          <div
            className="flex flex-wrap items-end font-display text-white"
            style={{
              fontSize: item.hero
                ? "clamp(48px, 5.6vw, 84px)"
                : "clamp(34px, 3.4vw, 46px)",
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            {item.prefix && <span>{item.prefix}</span>}
            <NumberTicker value={item.value} start={start} />
            <span className="text-[#9fb4ff]">{item.suffix}</span>
            {item.unit && (
              <span className="ml-2 text-[0.4em] font-medium text-[#E1E3E9]">
                {item.unit}
              </span>
            )}
          </div>

          <p
            className={`font-body leading-relaxed text-[#8A90A2] ${
              item.hero
                ? "mt-3 max-w-[360px] text-[15px]"
                : "mt-2.5 text-[13.5px]"
            }`}
          >
            {item.blurb}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsPartners() {
  const reduce = useReducedMotion();
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.3 });
  const gridRef = useRef(null);
  const started = useInView(gridRef, { once: true, amount: 0.25 });

  return (
    <section className="container-page relative py-16 md:py-24">
      {/* Ambient section glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.22] blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(51,98,255,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {/* Heading */}
        <motion.div
          ref={headRef}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-11 max-w-2xl md:mb-14"
        >
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-[#8FA9FF]">
            The numbers
          </span>
          <h2
            className="font-display mt-3 text-white"
            style={{
              fontSize: "clamp(30px, 4vw, 46px)",
              lineHeight: 1.1,
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

        {/* Bento grid */}
        <motion.div
          ref={gridRef}
          variants={gridVar}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[minmax(168px,auto)] md:grid-cols-4 md:gap-4"
        >
          <StatShell
            item={STAT_ITEMS[0]}
            start={started}
            className="min-h-[220px] sm:col-span-2 md:col-span-2 md:row-span-2 md:min-h-0"
          />
          <StatShell
            item={STAT_ITEMS[1]}
            start={started}
            className="min-h-[168px] sm:col-span-2 md:col-span-2"
          />
          <StatShell item={STAT_ITEMS[2]} start={started} className="min-h-[168px]" />
          <StatShell item={STAT_ITEMS[3]} start={started} className="min-h-[168px]" />
        </motion.div>
      </div>
    </section>
  );
}
