"use client";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Lightbox from "./Lightbox";
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

/**
 * Supplied as SVGs that each wrapped a single base64 raster — all bloat, no
 * vector benefit, and 28.9MB across the set. Extracted and re-encoded to WebP
 * at 900px (2x the widest render, which is the lightbox at 480px), taking the
 * wall to 2.4MB. Original names carried `%` and `#`, which break URLs.
 */
const ROW_ONE = [
  `${D}/welcome-email-1.webp`,
  `${D}/35-off.webp`,
  `${D}/frame-7.webp`,
  `${D}/welcome-1.webp`,
  `${D}/festival-look.webp`,
  `${D}/frame-16.webp`,
  `${D}/browse.webp`,
];

const ROW_TWO = [
  `${D}/welcome-email-3.webp`,
  `${D}/ws2.webp`,
  `${D}/pre-launch-email.webp`,
  `${D}/welcome-4.webp`,
  `${D}/frame-2.webp`,
  `${D}/image-8020.webp`,
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

export default function DesignShowcase() {
  const [active, setActive] = useState(null);
  const open = useCallback((src) => setActive(src), []);
  const close = useCallback(() => setActive(null), []);

  return (
    <section className="relative w-full overflow-hidden bg-[#06070B] pt-6 pb-12 md:pt-14 md:pb-24">
      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(51,98,255,0.35) 0%, rgba(51,98,255,0.08) 55%, transparent 80%)",
        }}
      />

      <Reveal className="container-page relative z-10 mb-7 text-center md:mb-16">
        <p className="font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FA0FF]">
          Our design work
        </p>
        <h2
          className="mx-auto mt-3 max-w-[880px] text-[22px] font-semibold leading-[1.25] text-white sm:text-[32px] md:text-[44px]"
          style={{ fontFamily: "'Clash Display', Georgia, serif" }}
        >
          Designs That&rsquo;ve Been Printing An Extra{" "}
          <span className="serif-i text-[#9fb4ff]">7 Figs/Year</span>
          <span className="hidden sm:inline"> For Our Partner Brands</span>
        </h2>
      </Reveal>

      <div className="relative z-10 flex flex-col gap-5 md:gap-7">
        {/* Duration is time-per-lap, so it had to come down twice over: the
            rows went from 10 cards to 7 and 6, which shortened the track and
            made the same 140s read ~30% slower than before. 88s/96s restores
            the old pace and adds a little on top. */}
        <DesignRow items={ROW_ONE} dur="88s" onOpen={open} />
        <DesignRow items={ROW_TWO} dur="96s" onOpen={open} />
      </div>

      <Reveal className="container-page relative z-10 mt-8 flex justify-center md:mt-14">
        <ApplyButton label="Get Designs Like These" />
      </Reveal>

      <AnimatePresence>
        {active && (
          <Lightbox
            src={active}
            alt="Email campaign design by Supersonic Mails, full size"
            onClose={close}
            maxWidth={480}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
