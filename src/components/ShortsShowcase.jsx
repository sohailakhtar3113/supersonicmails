"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Reveal, Stagger, revealSm } from "./motion";
import { ApplyButton } from "./ui";

/**
 * Vertical YouTube Shorts showcase.
 * Uses a lightweight facade (poster + play button) and only mounts the
 * YouTube iframe on click — keeps the page fast while looking premium.
 * `oardefault.jpg` is YouTube's original-aspect (9:16) Shorts thumbnail.
 */
const SHORTS = [
  { id: "KSNO8TMGMiw", label: "Real Results" },
  { id: "CvoYysQ73oc", label: "Behind the Scenes" },
];

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" fill="#06070B" aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.52.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

function ShortCard({ id, label }) {
  const [playing, setPlaying] = useState(false);
  const poster = `https://i.ytimg.com/vi/${id}/oardefault.jpg`;

  return (
    <motion.div
      variants={revealSm}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative w-full max-w-[290px] sm:max-w-[300px]"
    >
      {/* Gradient border + ambient blue glow */}
      <div className="relative rounded-[28px] bg-gradient-to-b from-white/20 via-white/5 to-transparent p-[1.5px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] transition-shadow duration-300 group-hover:shadow-[0_28px_70px_-24px_rgba(51,98,255,0.55)]">
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[27px] bg-black">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
              title={label}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${label}`}
              className="absolute inset-0 h-full w-full cursor-pointer"
            >
              <img
                src={poster}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />

              {/* Cinematic top/bottom gradients */}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

              {/* Shorts badge */}
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#FF0033" aria-hidden>
                  <path d="M14.6 2.6 6.9 6.9a4.4 4.4 0 0 0-1.7 6l.3.5a4.4 4.4 0 0 0 5.9 1.6l-.7.4a3.6 3.6 0 0 0 3.6 6.2l7.7-4.3a4.4 4.4 0 0 0 1.7-6l-.3-.5a4.4 4.4 0 0 0-5.9-1.6l.7-.4A3.6 3.6 0 0 0 14.6 2.6Zm-4 5.9 5.6 3.2-5.6 3.2Z" />
                </svg>
                Shorts
              </span>

              {/* Play button with pulsing ring */}
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-white/25 opacity-70 blur-md transition group-hover:opacity-100" />
                <span className="absolute inset-0 animate-ping rounded-full bg-white/20 [animation-duration:2.4s]" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110">
                  <PlayGlyph />
                </span>
              </span>

              {/* Label */}
              <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-4 pb-4 text-left">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3362FF] shadow-[0_0_8px_#3362FF]" />
                <span className="font-display text-[14px] font-medium text-white/95">
                  {label}
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ShortsShowcase() {
  return (
    <section className="relative w-full overflow-hidden bg-[#06070B] py-20 md:py-28">
      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(51,98,255,0.35) 0%, rgba(51,98,255,0.08) 55%, transparent 80%)",
        }}
      />

      <div className="container-page relative z-10">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <p className="font-display text-[13px] font-semibold uppercase tracking-[0.22em] text-[#7FA0FF]">
            Real brand owners
          </p>
          <h2
            className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[44px]"
            style={{ fontFamily: "'Clash Display', Georgia, serif" }}
          >
            Hear From Our Fastest Scaling Brand Owners
          </h2>
        </Reveal>

        <Stagger className="mt-12 flex flex-wrap items-start justify-center gap-6 md:mt-16 md:gap-10">
          {SHORTS.map((s) => (
            <ShortCard key={s.id} id={s.id} label={s.label} />
          ))}
        </Stagger>

        <Reveal variants={revealSm} className="mt-12 flex justify-center md:mt-14">
          <ApplyButton label="Apply for Free Audit" />
        </Reveal>
      </div>
    </section>
  );
}
