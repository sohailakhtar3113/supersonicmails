"use client";
import { motion } from "motion/react";
import { ASSET, COMPARE } from "./data";
import { Reveal, revealSm, container } from "./motion";
import { Badge } from "./ui";

export default function Comparison() {
  return (
    <section className="container-page relative py-16 md:py-24">
      <img src={ASSET.headingGlow} alt="" aria-hidden className="pointer-events-none absolute left-1/2 top-8 w-[717px] max-w-none -translate-x-1/2 opacity-60" />

      <Reveal className="relative z-10 mb-10 flex flex-col items-center text-center">
        <Badge className="mb-6">Comparison</Badge>
        <h2 className="font-display text-[32px] leading-[1.15] text-white md:text-[42px] md:leading-[50px]" style={{ letterSpacing: "-0.42px" }}>
          Choosing <span className="serif-i">Mach33</span> Over Others
        </h2>
      </Reveal>

      {/* Column headers */}
      <div className="relative z-10 mx-auto grid max-w-[1120px] grid-cols-2 items-center">
        <div className="pl-2 text-[22px] font-semibold text-white md:pl-6 md:text-[30px]">Other Agencies</div>
        <div className="flex items-center justify-end gap-3 pr-2 md:pr-6">
          <img src={ASSET.logoMark} alt="Mach33" className="h-8 w-auto md:h-9" />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <img src={ASSET.versus} alt="" className="absolute inset-0 h-full w-full" />
          <span className="font-display text-[15px] font-semibold text-white">V/S</span>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 mx-auto mt-5 flex max-w-[1120px] flex-col gap-4"
      >
        {COMPARE.map(([left, right], i) => (
          <motion.div key={i} variants={revealSm} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Other agencies */}
            <div
              className="flex items-center gap-3 rounded-[14px] px-5 py-4"
              style={{ border: "1px solid rgba(255,255,255,0.05)", backgroundColor: "rgba(9,12,28,0.6)", backgroundImage: `url(${ASSET.hatch})`, backgroundSize: "cover" }}
            >
              <img src={ASSET.cross} alt="" className="h-6 w-6 shrink-0" />
              <span className="font-display text-[17px] text-[#A7ADBE] md:text-[18px]">{left}</span>
            </div>
            {/* Mach33 */}
            <div
              className="flex items-center gap-3 rounded-[14px] px-5 py-4"
              style={{ border: "1px solid rgba(51,98,255,0.25)", background: "linear-gradient(90deg, rgba(51,98,255,0.14), rgba(51,98,255,0.04))" }}
            >
              <img src={ASSET.check} alt="" className="h-6 w-6 shrink-0" />
              <span className="font-display text-[17px] font-medium text-white md:text-[18px]">{right}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
