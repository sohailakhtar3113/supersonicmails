"use client";
import { motion } from "motion/react";
import { ASSET, CASES } from "./data";
import { Reveal, revealSm, container } from "./motion";
import { ApplyButton, Badge, TrustRow } from "./ui";

export default function CaseStudies() {
  return (
    <section className="container-page relative py-16 md:py-24">
      <img src={ASSET.headingGlow} alt="" aria-hidden className="pointer-events-none absolute left-1/2 top-6 w-[717px] max-w-none -translate-x-1/2 opacity-60" />

      <Reveal className="relative z-10 mb-12 flex flex-col items-center text-center">
        <Badge className="mb-6">Case Studies</Badge>
        <h2 className="font-display text-[34px] leading-[1.1] text-white md:text-[50px] md:leading-[55px]" style={{ letterSpacing: "-0.5px" }}>
          The Results Speak <br /><span className="serif-i">For Themselves</span>
        </h2>
      </Reveal>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto grid max-w-[1120px] grid-cols-1 gap-6 md:grid-cols-2"
      >
        {CASES.map((c, i) => (
          <motion.a
            key={i}
            href="#"
            variants={revealSm}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-[20px]"
            style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,14,34,0.4)" }}
          >
            <div className="aspect-[16/9] w-full overflow-hidden">
              <img src={c.img} alt={c.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <div className="p-6 md:p-7">
              <h3 className="font-body text-[20px] font-bold leading-[1.4] text-white">{c.title}</h3>
              <p className="font-body mt-2 text-[16px] leading-[1.5] text-[#A7ADBE]">{c.desc}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <Reveal variants={revealSm} className="mt-12 flex flex-col items-center gap-6">
        <ApplyButton label="View All Case Studies" />
        <TrustRow />
      </Reveal>
    </section>
  );
}
