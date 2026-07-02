"use client";
import { motion } from "motion/react";
import { ASSET } from "./data";
import { ApplyButton, Badge } from "./ui";
import { container, heroItem } from "./motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[150px] pb-[80px]">
      {/* Horizon arc / starfield */}
      <img
        src={ASSET.heroArc}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 w-[1440px] max-w-none -translate-x-1/2 select-none"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px]"
        style={{ background: "radial-gradient(60% 50% at 50% 18%, rgba(51,98,255,0.18) 0%, rgba(0,2,15,0) 70%)" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-page relative z-10 flex flex-col items-center text-center"
      >
        <motion.div variants={heroItem}>
          <Badge dot>FOR DTC BRANDS DOING $200K+/MONTH</Badge>
        </motion.div>

        <motion.h1
          variants={heroItem}
          className="font-hero mt-8 text-white"
          style={{ fontSize: "clamp(42px, 7.2vw, 70px)", lineHeight: 1.06, letterSpacing: "-0.01em" }}
        >
          Scale Your Profits,
          <br />
          Not Just Revenue
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="font-body mt-6 max-w-[560px] text-[18px] font-medium text-[#A7ADBE]"
        >
          Add 25–40% more revenue from existing customers without spending more on ads
        </motion.p>

        <motion.div variants={heroItem} className="mt-9">
          <ApplyButton />
        </motion.div>

        <motion.div variants={heroItem} className="mt-8 flex justify-center">
          <img src={ASSET.trust} alt="Trusted by 105+ brands" className="h-[54px] w-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}
