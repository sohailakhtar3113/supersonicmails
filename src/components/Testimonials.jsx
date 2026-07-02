"use client";
import { motion } from "motion/react";
import { ASSET, VIDEO_TESTIMONIALS } from "./data";
import { Reveal, revealSm, container } from "./motion";
import { Badge } from "./ui";

function PlayBtn() {
  return (
    <div className="absolute left-1/2 top-1/2 flex h-[52px] w-[74px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[12px] bg-black/70 transition group-hover:bg-[#ff0000]">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
    </div>
  );
}

function Card({ t }) {
  return (
    <motion.div
      variants={revealSm}
      whileHover={{ y: -5 }}
      className="overflow-hidden rounded-[18px]"
      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,14,34,0.4)" }}
    >
      <div className="group relative aspect-video w-full overflow-hidden bg-black">
        <img src={t.thumb} alt="" className="h-full w-full object-cover" />
        <PlayBtn />
      </div>
      <div className="p-6">
        <p className="font-display text-[20px] leading-[1.25] text-[#A7ADBE] md:text-[22px]" style={{ letterSpacing: "-0.22px" }}>{t.quote}</p>
        <h3 className="font-display mt-4 text-[22px] font-medium text-white md:text-[24px]">{t.name}</h3>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="container-page relative py-16 md:py-24">
      <img src={ASSET.headingGlow} alt="" aria-hidden className="pointer-events-none absolute left-1/2 top-4 w-[717px] max-w-none -translate-x-1/2 opacity-70" />
      <Reveal className="relative z-10 mb-12 flex flex-col items-center text-center">
        <Badge className="mb-6">Proof</Badge>
        <h2 className="font-display text-[32px] leading-[1.15] text-white md:text-[42px] md:leading-[50px]" style={{ letterSpacing: "-0.42px" }}>
          Hear From The Brands <br /><span className="serif-i">We&apos;ve Scaled</span>
        </h2>
      </Reveal>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto grid max-w-[1080px] grid-cols-1 gap-6 md:grid-cols-2"
      >
        {VIDEO_TESTIMONIALS.map((t, i) => (
          <div key={i} className={i === VIDEO_TESTIMONIALS.length - 1 ? "md:col-span-2 md:mx-auto md:w-1/2" : ""}>
            <Card t={t} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
