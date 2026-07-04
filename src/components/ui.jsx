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
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="translate-y-[1px] transition-colors duration-300"
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
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] text-[#A7ADBE] ${className}`}
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

const TRUST_AVATARS = [
  "/assets/2q7ubrEzfT3uRSFujLeumQfRlU.png",
  "/assets/1eIR9llHqEtPs0OG0aUzb2766MY.png",
  "/assets/Lt7KvrrtPM45JOWkF2nhTYQs0c.png",
  "/assets/p62fCeZedMHdQ5WzI0fgM8CAfA.png",
  "/assets/o1zHnx7WrHXWpPUMcpOETln1Ubg.png",
];

export function TrustRow({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center">
        {TRUST_AVATARS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-8 w-8 rounded-full border-2 border-[#00020F] object-cover"
            style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: TRUST_AVATARS.length - i }}
          />
        ))}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[13px] tracking-wide text-[#F5B301]">★★★★★</span>
        <span className="font-body text-[13px] font-medium text-[#DDE1EC]">Trusted by 35+ Brands</span>
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
