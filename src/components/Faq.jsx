"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ASSET, FAQ } from "./data";
import { Reveal, revealSm, container } from "./motion";

function Item({ q, a, open, onClick }) {
  return (
    <motion.div
      variants={revealSm}
      className="overflow-hidden rounded-[16px]"
      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(8,11,28,0.55)" }}
    >
      <button onClick={onClick} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="font-display text-[17px] font-medium text-white md:text-[19px]">{q}</span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <motion.img src={ASSET.plus} alt="" className="h-4 w-4" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
          >
            <p className="font-body px-6 pb-6 text-[16px] leading-[1.55] text-[#A7ADBE]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="container-page relative py-16 md:py-24">
      <img src={ASSET.headingGlow} alt="" aria-hidden className="pointer-events-none absolute left-1/2 top-6 w-[600px] max-w-none -translate-x-1/2 opacity-50" />
      <Reveal className="relative z-10 mb-10 text-center">
        <h2 className="font-display text-[30px] leading-[1.15] text-white md:text-[42px] md:leading-[50px]" style={{ letterSpacing: "-0.42px" }}>
          Frequently Asked <span className="serif-i">Questions</span>
        </h2>
      </Reveal>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto flex max-w-[720px] flex-col gap-4"
      >
        {FAQ.map((f, i) => (
          <Item key={i} {...f} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
        ))}
      </motion.div>
    </section>
  );
}
