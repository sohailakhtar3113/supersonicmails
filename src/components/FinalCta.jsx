"use client";
import { motion } from "motion/react";
import { ASSET, FINAL_CHECKS } from "./data";
import { Reveal, revealSm, Stagger } from "./motion";
import { ApplyButton } from "./ui";

export default function FinalCta() {
  return (
    <section className="container-page py-14 md:py-20">
      <Reveal
        className="relative overflow-hidden rounded-[28px] px-6 py-20 text-center md:px-16 md:py-24"
        style={{ border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(8,11,28,0.7), rgba(0,2,15,0.9))" }}
      >
        <img src={ASSET.streakL} alt="" aria-hidden className="pointer-events-none absolute left-0 top-0 h-full w-[46%] object-cover object-left-top opacity-80" />
        <img src={ASSET.streakR} alt="" aria-hidden className="pointer-events-none absolute right-0 top-0 h-full w-[46%] object-cover object-right-top opacity-80" />

        <Stagger className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center" amount={0.3}>
          <Reveal variants={revealSm}>
            <h2 className="font-display text-[30px] font-medium leading-[1.2] text-white md:text-[42px] md:leading-[50px]" style={{ letterSpacing: "-0.42px" }}>
              Your Brand Is Probably Sitting On <span className="serif-i">25–40% More Revenue</span> Right Now
            </h2>
          </Reveal>
          <Reveal variants={revealSm}>
            <p className="font-body mt-5 text-[18px] font-medium text-[#A7ADBE]">Let&apos;s go find and unlock it</p>
          </Reveal>

          <Reveal variants={revealSm} className="mt-9 flex w-full max-w-[440px] flex-col gap-3">
            {FINAL_CHECKS.map((c) => (
              <div key={c} className="flex items-center gap-3 rounded-full px-5 py-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <img src={ASSET.greenTick} alt="" className="h-5 w-5 shrink-0" />
                <span className="font-display text-[16px] font-medium text-white">{c}</span>
              </div>
            ))}
          </Reveal>

          <Reveal variants={revealSm} className="mt-9 flex flex-col items-center gap-6">
            <ApplyButton />
            <img src={ASSET.trust} alt="Trusted by 105+ brands" className="h-[54px] w-auto" />
          </Reveal>
        </Stagger>
      </Reveal>
    </section>
  );
}
