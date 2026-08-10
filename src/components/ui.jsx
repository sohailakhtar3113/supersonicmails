"use client";
import { motion } from "motion/react";

export function ApplyButton({ label = "Claim a Free Audit", className = "" }) {
  return (
    <>
      {/* SVG Gooey Filter for liquid blob hover effect */}
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
              result="goo"
            />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>

      <motion.a
        href="#"
        className={`blob-btn ${className}`}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
          <span>{label}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[1.1em] w-[1.1em] shrink-0 transition-colors duration-300"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
        <span className="blob-btn__inner">
          <span className="blob-btn__blobs">
            <span className="blob-btn__blob" />
            <span className="blob-btn__blob" />
            <span className="blob-btn__blob" />
            <span className="blob-btn__blob" />
          </span>
        </span>
      </motion.a>
    </>
  );
}

export function Badge({ children, dot = false, className = "" }) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] sm:px-4 sm:py-2 sm:text-[15px] text-[#A7ADBE] ${className}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(6px)",
      }}
    >
      {dot && <span className="h-2.5 w-2.5 rounded-full bg-[#37E17B] shadow-[0_0_8px_2px_rgba(55,225,123,0.6)]" />}
      <span className="tracking-wide">{children}</span>
    </span>
  );
}

/**
 * Client brand marks, not faces.
 *
 * The stacked-avatar pattern does not require photographs — it reads as "a set
 * of people/companies vouch for this", and swapping headshots for the client's
 * own marks turns decorative portraits into actual evidence. It also sidesteps
 * publishing anyone's likeness.
 *
 * Only these three of the thirteen brand logos survive a 38px circle. Nine are
 * wide wordmarks (up to 6.7:1) that reduce to unreadable smears, and Zenpilo is
 * dropped despite fitting because its heart-and-pulse mark is near-identical to
 * Avonwell's — side by side in a stack they look like a duplicate, which reads
 * as a bug rather than a roster.
 *
 * `plain` marks the one logo that ships as its own white disc; the rest are
 * white-on-transparent and need a dark chip behind them.
 */
const TRUST_MARKS = [
  { src: "/brands/himalayan-co.png", name: "The Himalayan Co.", plain: true },
  { src: "/brands/high-rider.png", name: "High Rider" },
  { src: "/brands/avonwell.png", name: "Avonwell" },
];

function StarRow({ className = "" }) {
  // Inline SVG rather than the ★ character, which renders at a different
  // weight and baseline in every font and turns into an emoji on some phones.
  return (
    <span className={`flex items-center gap-[3px] ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="#F5B301">
          <path d="M12 2.6l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.8l1.2-6.6L2.5 9.6l6.6-.9L12 2.6z" />
        </svg>
      ))}
    </span>
  );
}

export function TrustRow({ className = "" }) {
  return (
    <div className={`group flex items-center gap-3.5 ${className}`}>
      <div className="flex items-center">
        {TRUST_MARKS.map((m, i) => (
          <span
            key={m.src}
            title={m.name}
            style={{
              marginLeft: i === 0 ? 0 : "-12px",
              zIndex: TRUST_MARKS.length - i,
              transitionDelay: `${i * 45}ms`,
            }}
            className={`relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full ring-2 ring-[#00020F] transition-transform duration-300 ease-out group-hover:-translate-y-[3px] ${
              m.plain
                ? "bg-white"
                : "border border-white/[0.14] bg-[linear-gradient(180deg,#18224C,#0A0E22)]"
            }`}
          >
            <img
              src={m.src}
              alt={m.name}
              loading="lazy"
              draggable={false}
              // max-* rather than a fixed width: these marks range from 1.0:1
              // to 1.5:1, so constraining one axis lets the other overflow the
              // circle and get clipped by overflow-hidden.
              className={
                m.plain
                  ? "h-full w-full object-cover"
                  : "max-h-[52%] max-w-[62%] object-contain [filter:brightness(0)_invert(1)]"
              }
            />
          </span>
        ))}

        {/* Counter chip closes the set, so three marks read as a sample of a
            roster rather than as the whole client list. */}
        {/* Sits above the marks, not below: at z-0 the overlap swallowed the
            "+" and it read as "·42". */}
        <span
          style={{
            marginLeft: "-12px",
            zIndex: TRUST_MARKS.length + 1,
            transitionDelay: "135ms",
          }}
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#3362FF]/35 bg-[#12224F] font-display text-[11.5px] font-semibold text-[#AEC4FF] ring-2 ring-[#00020F] transition-transform duration-300 ease-out group-hover:-translate-y-[3px]"
        >
          +42
        </span>
      </div>

      <div className="flex flex-col gap-1 leading-none">
        <StarRow />
        <span className="font-body text-[13px] font-medium text-[#DDE1EC]">
          Trusted by 45+ Brands
        </span>
      </div>
    </div>
  );
}

// Heading with an italic serif accent segment.
export function AccentHeading({ before, accent, after = "", className = "" }) {
  return (
    <h2 className={`font-display text-white ${className}`}>
      {before}
      {accent && <span className="serif-i">{accent}</span>}
      {after}
    </h2>
  );
}
