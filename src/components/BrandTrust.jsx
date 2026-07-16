"use client";
import React from "react";
import { motion } from "motion/react";
import Meteors from "./Meteors";

/**
 * Brand logos live in /public/brands as tightly-cropped PNGs.
 * `h` is the optically-normalized render height (px) so wordmarks and
 * stacked/badge marks read at the same visual weight in the marquee.
 * `invert` forces a mark to pure white; the Himalayan badge keeps its
 * own artwork (it ships on a white disc, so we leave it untouched).
 */
const ROW_ONE = [
  { slug: "xaman", name: "Xaman", h: 28, invert: true },
  { slug: "nutrify", name: "Nutrify", h: 38, invert: true },
  { slug: "vexaminer", name: "vexaMiner", h: 30, invert: true },
  { slug: "quotrell", name: "Quotrell", h: 30, invert: true },
  { slug: "pur-shilajit", name: "Pür Shilajit", h: 58, invert: true },
  { slug: "zenpilo", name: "Zenpilo", h: 60, invert: true },
  { slug: "delicious", name: "Delicious", h: 32, invert: true },
];

const ROW_TWO = [
  { slug: "himalayan-co", name: "The Himalayan Co.", h: 60, invert: false },
  { slug: "cesira", name: "Cesira", h: 28, invert: true },
  { slug: "high-rider", name: "High Rider", h: 64, invert: true },
  { slug: "soulfull", name: "soulfull", h: 42, invert: true },
  { slug: "avonwell", name: "Avonwell", h: 60, invert: true },
  { slug: "calmnest", name: "calmnest", h: 32, invert: true },
];

function LogoItem({ logo }) {
  return (
    <div className="group/logo flex shrink-0 items-center justify-center px-8 sm:px-12 md:px-16">
      <img
        src={`/brands/${logo.slug}.png`}
        alt={logo.name}
        draggable={false}
        loading="lazy"
        style={{ height: logo.h }}
        className={`w-auto object-contain opacity-70 transition duration-300 ease-out will-change-transform group-hover/logo:opacity-100 group-hover/logo:scale-[1.07] ${
          logo.invert ? "[filter:brightness(0)_invert(1)]" : ""
        }`}
      />
    </div>
  );
}

function LogoRow({ logos, direction = "left", duration = "42s" }) {
  // Track is rendered twice; CSS translates by -50% for a seamless loop.
  const loop = [...logos, ...logos];
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className={`marquee-track ${
          direction === "left" ? "marquee-left" : "marquee-right"
        } items-center py-2`}
        style={{ "--dur": duration }}
      >
        {loop.map((logo, i) => (
          <LogoItem key={`${logo.slug}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

export default function BrandTrust() {
  return (
    <section className="relative w-full overflow-hidden bg-[#06070B] py-20 md:py-28 text-white select-none border-b border-[#3362FF]/50 shadow-[0_10px_30px_rgba(51,98,255,0.15)]">
      {/* Meteor Shower Background (Magic UI) */}
      <Meteors number={26} />

      {/* Radial Soft Background Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(51,98,255,0.3) 0%, rgba(51,98,255,0.1) 50%, transparent 80%)",
        }}
      />

      {/* Glowing Bottom Blue Accent Line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#3362FF] to-transparent opacity-90" />

      <div className="container-page relative z-10 mx-auto px-4 text-center">
        {/* Section Heading */}
        <h2
          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold text-white tracking-normal leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          The World’s Top Brands{" "}
          <span className="relative inline-block mx-1 sm:mx-1.5 rounded-[4px] px-3 py-0.5 align-baseline">
            {/* Highlight sweep — fills left→right when scrolled into view */}
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="absolute inset-0 origin-left rounded-[4px] bg-gradient-to-r from-[#1A4FFF] via-[#3362FF] to-[#5B82FF] shadow-[0_0_22px_rgba(51,98,255,0.55),inset_0_1px_0_rgba(255,255,255,0.25)]"
            />
            <span className="relative z-10 text-white">Trust</span>
          </span>{" "}
          Supersonic Mails
        </h2>
      </div>

      {/* Brand Logos Marquee (full-bleed for a premium edge-to-edge ticker) */}
      <div className="relative z-10 mt-14 sm:mt-16 flex flex-col gap-6 md:gap-8">
        <LogoRow logos={ROW_ONE} direction="left" duration="46s" />
        <LogoRow logos={ROW_TWO} direction="right" duration="40s" />
      </div>
    </section>
  );
}
