"use client";
import { motion } from "motion/react";
import { ApplyButton, Badge, TrustRow } from "./ui";
import { EASE_OUT } from "./motion";
import HeroFx from "./HeroFx";
import Image from "next/image";
import LogoBrand from "./LogoBrand";

const line1 = ["Make", "More", "Profits"];
const line2 = ["Without", "Running", "More", "Ads"];

const wordC = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.15 } },
};
const word = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE_OUT } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[150px] pb-0">
      <HeroFx />

      <div className="container-page relative z-10">
        {/* ── Split layout: text left, image right ── */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">

          {/* Left side — text content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left min-w-0">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_OUT }}>
              <Badge dot>FOR ECOM BRANDS SCALING PAST $100K/MONTH</Badge>
            </motion.div>

            <motion.h1
              variants={wordC}
              initial="hidden"
              animate="show"
              className="font-hero mt-8 text-white w-full"
              style={{ fontSize: "clamp(34px, 4.8vw, 68px)", lineHeight: 1.08, letterSpacing: "-0.01em" }}
            >
              <span className="block whitespace-nowrap">
                {line1.map((w, i) => (
                  <motion.span
                    key={i}
                    variants={word}
                    className={`inline-block ${w === "Profits" ? "grad-shine" : ""}`}
                    style={{ marginRight: "0.22em" }}
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
              <span className="block">
                {line2.map((w, i) => (
                  <motion.span
                    key={i}
                    variants={word}
                    className={`inline-block ${w === "Ads" ? "serif-hero-i" : ""} ${w === "More" || w === "Ads" ? "text-[#9fb4ff]" : ""}`}
                    style={{ marginRight: "0.22em" }}
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.55 }}
              className="font-body mt-7 max-w-[540px] text-[17px] font-medium leading-[1.7] text-[#A7ADBE]"
            >
              Turn browse abandoners into{" "}
              <span className="font-semibold text-white">loyal repeat buyers</span> and extract{" "}
              <span className="font-semibold text-[#9fb4ff]">20–45% new monthly revenue</span> — through a newly
              discovered, ROI-first retention framework.
            </motion.p>

            <motion.div
              variants={item}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.7 }}
              className="mt-9"
            >
              <ApplyButton />
            </motion.div>

            <motion.div
              variants={item}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.82 }}
              className="mt-8"
            >
              <TrustRow />
            </motion.div>
          </div>

          {/* Right side — image enlarged and gap reduced */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
            className="flex-shrink-0 w-full max-w-[450px] lg:max-w-[490px] xl:max-w-[530px]"
          >
            <Image
              src="/assets/rightlogo.png"
              alt="Supersonic Mails — Email Marketing Examples"
              width={1080}
              height={1080}
              priority
              className="w-full h-auto object-contain drop-shadow-[0_20px_60px_rgba(51,98,255,0.3)]"
            />
          </motion.div>

        </div>
      </div>

      {/* ── Infinite Left-Scrolling Logo Banner (Blue lines top & bottom) ── */}
      <div className="relative z-10 mt-16 sm:mt-24 w-full border-y border-[#3362FF]/50 bg-[#06091a]/80 py-6 overflow-hidden shadow-[0_0_30px_rgba(51,98,255,0.15)]">
        {/* Glowing Top Blue Accent Line */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#3362FF] to-transparent opacity-90" />

        <div className="marquee-mask w-full overflow-hidden" style={{ "--dur": "28s" }}>
          <div className="marquee-track marquee-left items-center">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="shrink-0 mx-10 sm:mx-14 py-1">
                <LogoBrand size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Glowing Bottom Blue Accent Line */}
        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#3362FF] to-transparent opacity-90" />
      </div>
    </section>
  );
}
