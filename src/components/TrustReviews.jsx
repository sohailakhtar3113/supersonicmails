"use client";
import { motion } from "motion/react";
import { Reveal, Stagger, revealSm } from "./motion";
import { TrustRow } from "./ui";

/**
 * Verified Trustpilot proof section.
 * Displays two REAL review screenshots (white-bg captures) inside clean
 * floating frames on the dark section, anchored by a Trustpilot-style
 * aggregate rating bar so the screenshots read as authentic third-party proof.
 * Sits right after ShortsShowcase; keeps brand blue (#3362FF) + #06070B bg.
 */
// Shared frame ratio so both cards render at exactly the same size.
// Images use object-contain, so each screenshot is centered with invisible
// white padding inside the white card — no cropping, equal heights.
const CARD_RATIO = "779 / 429";

const REVIEWS = [
  {
    src: "/assets/firsttrust.png",
    alt: "Trustpilot 5-star review from Omar Bilal: multiple great experiences with Sameer, very knowledgeable email marketing specialist for e-commerce brands.",
    author: "Omar Bilal",
  },
  {
    src: "/assets/secondtrust.png",
    alt: "Trustpilot 5-star review from Chris: great and friendly guy, works independently, best email service in the space.",
    author: "Chris",
  },
];

/** Classic Trustpilot rating — 5 green tiles, each with a white star. */
function TrustpilotStars({ className = "", size = 30 }) {
  return (
    <div className={`flex gap-[3px] ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="grid place-items-center rounded-[3px] bg-[#00B67A]"
          style={{ width: size, height: size }}
        >
          <svg viewBox="0 0 24 24" width={size * 0.7} height={size * 0.7} fill="#fff">
            <path d="M12 2.5l2.9 6.26 6.85.62-5.17 4.55 1.55 6.7L12 17.7l-6.13 3.53 1.55-6.7L2.25 9.98l6.85-.62L12 2.5z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** Trustpilot glyph — single star + wordmark, for the source badge. */
function TrustpilotMark({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <svg viewBox="0 0 24 24" width="14" height="14" fill="#00B67A" aria-hidden>
        <path d="M12 2l2.9 6.26 6.85.62-5.17 4.55 1.55 6.7L12 17.7l-6.13 3.53 1.55-6.7L2.25 8.88l6.85-.62L12 2z" />
      </svg>
      <span className="font-display text-[12.5px] font-semibold tracking-tight text-white">
        Trustpilot
      </span>
    </span>
  );
}

function ReviewFrame({ src, alt, author }) {
  return (
    <motion.figure
      variants={revealSm}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative w-full max-w-[500px]"
    >
      {/* Gradient hairline border + ambient blue glow on hover */}
      <div className="relative rounded-[22px] bg-gradient-to-b from-white/25 via-white/5 to-transparent p-[1.5px] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.85)] transition-shadow duration-300 group-hover:shadow-[0_28px_70px_-24px_rgba(51,98,255,0.55)]">
        <div className="overflow-hidden rounded-[21px] bg-white">
          {/* Top bar: source + verified pill */}
          <div className="flex items-center justify-between border-b border-black/5 bg-[#FAFBFC] px-4 py-2.5">
            <TrustpilotMark />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00B67A]/10 px-2.5 py-1 text-[11px] font-semibold text-[#0a7a54]">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#0a7a54" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Verified
            </span>
          </div>

          {/* The actual review screenshot */}
          <div className="px-3 pb-3 pt-2" style={{ aspectRatio: CARD_RATIO }}>
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="h-full w-full rounded-md object-contain"
            />
          </div>
        </div>
      </div>

      <figcaption className="sr-only">Review from {author}</figcaption>
    </motion.figure>
  );
}

export default function TrustReviews() {
  return (
    <section className="relative w-full overflow-hidden bg-[#06070B] py-20 md:py-28">
      {/* Ambient radial glow — matches ShortsShowcase */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(51,98,255,0.35) 0%, rgba(51,98,255,0.08) 55%, transparent 80%)",
        }}
      />

      <div className="container-page relative z-10">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7FA0FF]">
            Verified on Trustpilot
          </p>
          <h2
            className="mt-2.5 font-serif text-2xl font-semibold leading-tight text-white sm:text-[28px] md:text-[32px]"
            style={{ fontFamily: "'Clash Display', Georgia, serif" }}
          >
            Don&rsquo;t Just Take Our Word For It
          </h2>
          <p className="mt-3 font-rethink text-[14px] leading-relaxed text-[#A7ADBE] md:text-[15px]">
            Unprompted, five-star reviews from the founders we work with, pulled
            straight from our Trustpilot profile.
          </p>

          {/* Aggregate rating bar — compact */}
          <div className="mt-6 inline-flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 backdrop-blur-md sm:flex-row sm:gap-4">
            <TrustpilotStars size={22} />
            <div className="flex flex-col items-center gap-0.5 sm:items-start">
              <span className="font-display text-[13px] font-semibold text-white">
                <span className="text-[#00B67A]">Excellent</span>
                <span className="text-white/40"> · </span>
                Rated 4.9 / 5
              </span>
              <span className="font-rethink text-[12px] text-[#A7ADBE]">
                Based on 35+ verified reviews
              </span>
            </div>
          </div>

          {/* Trusted-by avatars — sits between the rating bar and the reviews */}
          <div className="mt-6 flex justify-center">
            <TrustRow />
          </div>
        </Reveal>

        <Stagger className="mt-10 flex flex-wrap items-start justify-center gap-6 md:mt-12 md:gap-8">
          {REVIEWS.map((r) => (
            <ReviewFrame key={r.src} {...r} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
