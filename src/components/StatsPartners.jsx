"use client";
import { motion } from "motion/react";
import { ASSET, STATS, PARTNERS } from "./data";
import { container, reveal, revealSm, Reveal } from "./motion";
import { AccentHeading } from "./ui";

function StatCard({ value, label }) {
  return (
    <motion.div
      variants={revealSm}
      className="relative flex flex-col items-center justify-center overflow-hidden rounded-[20px] px-6 py-10 text-center"
      style={{ border: "1px solid rgba(255,255,255,0.07)", background: "linear-gradient(180deg, rgba(20,28,60,0.35) 0%, rgba(6,9,26,0.25) 100%)", minHeight: 195 }}
    >
      <img src={ASSET.statCardBg} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70" />
      <span className="absolute left-1/2 top-0 h-[3px] w-24 -translate-x-1/2 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #3362FF, transparent)" }} />
      <div className="relative z-10">
        <div className="font-display text-white" style={{ fontSize: "clamp(40px,5vw,56px)", fontWeight: 500, lineHeight: 1 }}>{value}</div>
        <div className="font-body mt-3 text-[18px] font-medium text-[#A7ADBE]">{label}</div>
      </div>
    </motion.div>
  );
}

export default function StatsPartners() {
  const logos = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <section className="container-page relative py-14 md:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Stats grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {STATS.map((s) => <StatCard key={s.label} {...s} />)}
        </motion.div>

        {/* Heading + partners */}
        <div>
          <Reveal>
            <AccentHeading
              before="Where Retention Becomes "
              accent="Real Revenue"
              className="text-[34px] leading-[1.15] tracking-[-0.02em] md:text-[43px] md:leading-[52px]"
            />
          </Reveal>
          <Reveal className="mt-8 flex items-center gap-4" variants={revealSm}>
            <span className="font-body whitespace-nowrap text-[18px] font-medium text-[#E1E3E9]">Our Trusted Partners:</span>
            <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.18), transparent)" }} />
          </Reveal>
          <div className="marquee-mask mt-6 overflow-hidden" style={{ "--dur": "26s" }}>
            <div className="marquee-track marquee-left items-center gap-14">
              {logos.map((src, i) => (
                <img key={i} src={src} alt="Partner" className="h-10 w-auto shrink-0 opacity-90" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
