"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "./motion";
import { ApplyButton } from "./ui";

/**
 * The design wall.
 *
 * Previously each card was a scroll container with a visible blue scrollbar —
 * a browser affordance sitting on top of portfolio work, which reads cheap and
 * put a hard blue rule down the edge of every design.
 *
 * Now nothing scrolls in place. Hovering a card slowly pans the full email
 * from top to bottom, and clicking opens a lightbox where the design can be
 * studied at size. The pan is a pure CSS translate — no scrollbar, no JS per
 * card, and it works on any image height because a percentage translate
 * resolves against the element's *own* height: translateY(-100% + frame)
 * lands exactly at the bottom of the artwork regardless of how tall it is.
 */
const D = "/designs";

const ROW_ONE = [
  `${D}/first.jpg`,
  `${D}/eight.jpg`,
  `${D}/second.jpg`,
  `${D}/email5.png`,
  `${D}/third.jpg`,
  `${D}/seventh.jpg`,
  `${D}/fourthhhh.jpg`,
  `${D}/thirteen.png`,
  `${D}/fifth.jpg`,
  `${D}/b.jpg`,
];

const ROW_TWO = [
  `${D}/sixth.jpg`,
  `${D}/nine.jpg`,
  `${D}/a.png`,
  `${D}/ten.jpg`,
  `${D}/fourteen.jpg`,
  `${D}/twelve.jpg`,
  `${D}/email14.png`,
  `${D}/fifteen.jpg`,
  `${D}/secondtest.png`,
  `${D}/c.jpg`,
];

const FRAME_H = 460; // px — card viewport height, matched by the pan calc

function ExpandGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 3h6v6" />
      <path d="M9 21H3v-6" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
    </svg>
  );
}

function DesignCard({ src, onOpen }) {
  return (
    <div className="group/card shrink-0 px-3 md:px-3.5">
      <button
        type="button"
        onClick={() => onOpen(src)}
        aria-label="Open this email design full size"
        className="relative block cursor-pointer rounded-[20px] p-[1px] text-left transition-transform duration-500 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3362FF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#06070B] group-hover/card:-translate-y-1.5"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 38%, rgba(255,255,255,0.02))",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[19px] bg-[#0B0F22] shadow-[0_18px_44px_-20px_rgba(0,0,0,0.85)] transition-shadow duration-500 group-hover/card:shadow-[0_34px_70px_-24px_rgba(51,98,255,0.6)]"
          // --frame carries the height into the pan calc below. The utility
          // has to stay a literal string for Tailwind's scanner to emit it,
          // so the number travels as a custom property rather than as string
          // interpolation — one source of truth, still statically analysable.
          style={{ height: FRAME_H, width: 268, "--frame": `${FRAME_H}px` }}
        >
          {/* The artwork. Parked at the top; pans to its own bottom on hover. */}
          <img
            src={src}
            alt="Email campaign design by Supersonic Mails"
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-x-0 top-0 w-full transition-transform duration-[900ms] ease-out group-hover/card:translate-y-[calc(-100%+var(--frame))] group-hover/card:duration-[7000ms] group-hover/card:ease-linear motion-reduce:transition-none"
          />

          {/* Bottom scrim so the expand chip stays legible over light designs */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(4,6,15,0.85))",
            }}
          />

          {/* Affordance — replaces the old scrollbar as the "there's more" cue */}
          <span className="pointer-events-none absolute bottom-3.5 left-1/2 z-10 flex -translate-x-1/2 translate-y-2 items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition-all duration-[400ms] group-hover/card:translate-y-0 group-hover/card:opacity-100">
            <ExpandGlyph className="h-3 w-3" />
            View full design
          </span>
        </div>
      </button>
    </div>
  );
}

function DesignRow({ items, dur, onOpen }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden">
      <div className="marquee-track marquee-left py-3" style={{ "--dur": dur }}>
        {loop.map((src, i) => (
          <DesignCard key={`${src}-${i}`} src={src} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}

function Lightbox({ src, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    // Park focus on the close control and lock the page behind the overlay.
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Email design preview"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/82 p-4 backdrop-blur-md md:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-[480px] overflow-hidden rounded-[20px] border border-white/12 bg-[#0B0F22] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)]"
      >
        <div className="no-scrollbar max-h-[90vh] overflow-y-auto overscroll-contain">
          <img
            src={src}
            alt="Email campaign design by Supersonic Mails, full size"
            className="w-full"
            draggable={false}
          />
        </div>
      </motion.div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3362FF] md:right-7 md:top-7"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}

export default function DesignShowcase() {
  const [active, setActive] = useState(null);
  const open = useCallback((src) => setActive(src), []);
  const close = useCallback(() => setActive(null), []);

  return (
    <section className="relative w-full overflow-hidden bg-[#06070B] py-20 md:py-28">
      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(51,98,255,0.35) 0%, rgba(51,98,255,0.08) 55%, transparent 80%)",
        }}
      />

      <Reveal className="container-page relative z-10 mb-12 text-center md:mb-16">
        <p className="font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FA0FF]">
          Our design work
        </p>
        <h2
          className="mx-auto mt-3 max-w-[880px] text-[30px] font-semibold leading-[1.15] text-white md:text-[44px]"
          style={{ fontFamily: "'Clash Display', Georgia, serif" }}
        >
          Designs That&rsquo;ve Been Printing An Extra{" "}
          <span className="serif-i text-[#9fb4ff]">7 Figs/Year</span> For Our
          Partner Brands
        </h2>
      </Reveal>

      <div className="relative z-10 flex flex-col gap-5 md:gap-7">
        <DesignRow items={ROW_ONE} dur="140s" onOpen={open} />
        <DesignRow items={ROW_TWO} dur="165s" onOpen={open} />
      </div>

      <Reveal className="container-page relative z-10 mt-12 flex justify-center md:mt-14">
        <ApplyButton label="Get Designs Like These" />
      </Reveal>

      <AnimatePresence>
        {active && <Lightbox src={active} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
