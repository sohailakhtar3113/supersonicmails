"use client";
import { motion } from "motion/react";
import { ASSET } from "./data";
import { Reveal, revealSm } from "./motion";
import { ApplyButton } from "./ui";

export default function Vsl() {
  return (
    <section className="container-page py-14 md:py-20">
      <Reveal className="mb-8 text-center">
        <p className="font-rethink text-[22px] font-medium text-white md:text-[24px]">See How We Can Help Your Brand</p>
      </Reveal>

      <Reveal variants={revealSm} className="mx-auto max-w-[920px]">
        <div
          className="group relative aspect-[16/9] w-full overflow-hidden rounded-[20px]"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <img src={ASSET.vslPoster} alt="Profit First" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,2,15,0.1), rgba(0,2,15,0.35))" }} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-5 py-3 shadow-lg"
          >
            <img src={ASSET.playIcon} alt="" className="h-5 w-5" />
            <span className="font-display text-[18px] font-medium text-[#000529]">Play Video</span>
          </motion.button>
        </div>
      </Reveal>

      <Reveal variants={revealSm} className="mt-10 flex flex-col items-center gap-6">
        <ApplyButton />
        <img src={ASSET.trust} alt="Trusted by 105+ brands" className="h-[54px] w-auto" />
      </Reveal>
    </section>
  );
}
