"use client";
import { useCallback, useState } from "react";
import { AnimatePresence } from "motion/react";
import Lightbox from "./Lightbox";

/**
 * Proof gallery for the case-study pages.
 *
 * CSS multi-column masonry rather than a fixed grid: these are raw dashboard
 * captures whose aspect ratios run from 1.5:1 to 3.65:1, so a uniform tile
 * would either crop the numbers (object-cover) or strand a tile in dead space
 * (object-contain). Columns let each shot keep its natural shape and simply
 * flow, which reads deliberate instead of ragged.
 *
 * `break-inside-avoid` is what stops a column from slicing a card in half.
 */
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

export default function CaseGallery({ title, images }) {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section className="mt-4">
      <h2
        className="mb-6 text-[22px] font-semibold text-white md:text-[26px]"
        style={{ fontFamily: "'Clash Display', Georgia, serif" }}
      >
        {title}
      </h2>

      <div className="columns-1 gap-4 sm:columns-2">
        {images.map((im) => (
          <button
            key={im.src}
            type="button"
            onClick={() => setActive(im)}
            aria-label="View this result full size"
            className="group mb-4 block w-full break-inside-avoid cursor-pointer overflow-hidden rounded-[14px] border border-white/[0.09] bg-[#0B1024] transition-all duration-400 hover:-translate-y-1 hover:border-[#3362FF]/40 hover:shadow-[0_22px_50px_-26px_rgba(51,98,255,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3362FF]"
          >
            <span className="relative block">
              <img
                src={im.src}
                alt={im.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="block w-full"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(4,6,15,0.55))",
                }}
              />
              <span className="pointer-events-none absolute bottom-3 right-3 flex translate-y-1.5 items-center gap-1.5 rounded-full border border-white/15 bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ExpandGlyph className="h-3 w-3" />
                Enlarge
              </span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <Lightbox
            src={active.src}
            alt={active.alt}
            onClose={close}
            maxWidth={1100}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
