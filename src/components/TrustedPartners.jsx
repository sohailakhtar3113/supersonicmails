"use client";
import { PARTNERS } from "./data";
import { Reveal, Stagger, revealSm } from "./motion";

/**
 * Slim "Our Trusted Partners" band — the tech stack we build on
 * (Shopify · Klaviyo · Omnisend). Sits just above the stats section.
 * Logos render as clean monochrome-white marks for a premium, uniform read.
 */
export default function TrustedPartners() {
  return (
    <section className="container-page relative py-10 md:py-14">
      <Reveal className="text-center">
        <p className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-[#8FA9FF]">
          Our Trusted Partners
        </p>
      </Reveal>

      <Stagger className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-16 md:mt-9 md:gap-x-20">
        {PARTNERS.map((src, i) => (
          <Reveal
            key={i}
            variants={revealSm}
            className="flex items-center justify-center"
          >
            <img
              src={src}
              alt="Partner logo"
              loading="lazy"
              draggable={false}
              className="h-6 w-auto object-contain opacity-60 grayscale transition duration-300 ease-out hover:opacity-100 hover:grayscale-0 sm:h-7 md:h-8 [filter:brightness(0)_invert(1)] hover:[filter:none]"
            />
          </Reveal>
        ))}
      </Stagger>
    </section>
  );
}
