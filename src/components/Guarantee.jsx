"use client";
import { motion } from "motion/react";
import { ASSET } from "./data";
import { Reveal, revealSm, Stagger } from "./motion";
import { ApplyButton, TrustRow } from "./ui";

export default function Guarantee() {
  return (
    <section className="container-page py-14 md:py-20">
      <Reveal
        className="relative overflow-hidden rounded-[28px] px-6 py-20 text-center md:px-16 md:py-24"
        style={{ border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(8,11,28,0.7), rgba(0,2,15,0.9))" }}
      >
        {/* corner streaks */}
        <img src={ASSET.streakL} alt="" aria-hidden className="pointer-events-none absolute left-0 top-0 h-full w-[46%] object-cover object-left-top opacity-80" />
        <img src={ASSET.streakL} alt="" aria-hidden className="pointer-events-none absolute right-0 top-0 h-full w-[46%] -scale-x-100 object-cover object-left-top opacity-80" />

        <Stagger className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center" amount={0.3}>
          {/* wings + shield */}
          <Reveal variants={revealSm} className="relative mb-6 flex items-center justify-center">
            <img src={ASSET.wingsL} alt="" aria-hidden className="pointer-events-none absolute h-[120px] w-auto opacity-30" style={{ filter: "brightness(1.4)" }} />
            <span className="relative flex h-[70px] w-[70px] items-center justify-center rounded-2xl" style={{ background: "linear-gradient(180deg,#2b4bff,#0a1a66)", boxShadow: "0 0 30px rgba(51,98,255,0.6)" }}>
              <svg width="30" height="34" viewBox="0 0 24 26" fill="none"><path d="M12 1 21 5v7c0 6-4 10-9 12-5-2-9-6-9-12V5l9-4Z" fill="#fff" opacity="0.15"/><path d="M12 1 21 5v7c0 6-4 10-9 12-5-2-9-6-9-12V5l9-4Z" stroke="#fff" strokeWidth="1.4"/><path d="m8 12 3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </Reveal>

          <Reveal variants={revealSm}>
            <h3 className="font-display text-[30px] font-bold leading-[1.2] text-white md:text-[36px]" style={{ letterSpacing: "-0.36px" }}>
              Zero Risk. Iron-Clad <span className="serif-i" style={{ fontWeight: 400 }}>Guarantee</span>
            </h3>
          </Reveal>
          <Reveal variants={revealSm}>
            <p className="font-body mt-6 text-[18px] font-medium leading-[1.5] text-[#A7ADBE]">
              If we don&apos;t grow your backend revenue within 90 days, we work for free until we do
            </p>
          </Reveal>
          <Reveal variants={revealSm}>
            <p className="font-body mt-5 text-[18px] font-medium leading-[1.5] text-[#A7ADBE]">
              We&apos;ve done this for 35+ brands. We know what works. And we&apos;re willing to put our time on the line to prove it.
            </p>
          </Reveal>
          <Reveal variants={revealSm} className="mt-9 flex flex-col items-center gap-6">
            <ApplyButton />
            <TrustRow />
          </Reveal>
        </Stagger>
      </Reveal>
    </section>
  );
}
