"use client";
import { PARTNERS } from "./data";
import { Reveal, Stagger, revealSm } from "./motion";

/**
 * Slim "Our Trusted Partners" band — the tech stack we build on
 * (Shopify · Klaviyo · Omnisend). Sits just above the stats section.
 * Logos render as clean monochrome-white marks for a premium, uniform read,
 * at full brightness with no hover state — these are credibility marks, not
 * controls, so dimming them until moused over only weakened the proof.
 */
export default function TrustedPartners() {
  return (
    <section className="container-page relative pt-8 pb-5 md:py-14">
      <Reveal className="text-center">
        <p className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-[#8FA9FF]">
          Our Trusted Partners
        </p>
      </Reveal>

      <Stagger className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-16 md:mt-9 md:gap-x-20">
        {PARTNERS.map((p) => (
          <Reveal
            key={p.src}
            variants={revealSm}
            className="flex items-center justify-center"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              draggable={false}
              className={`h-6 w-auto object-contain sm:h-7 md:h-8 ${
                p.mono ? "[filter:brightness(0)_invert(1)]" : ""
              }`}
            />
          </Reveal>
        ))}
      </Stagger>
    </section>
  );
}
