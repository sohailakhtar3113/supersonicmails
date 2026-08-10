"use client";
import { motion } from "motion/react";
import { ASSET } from "./data";
import { Reveal } from "./motion";
import { ApplyButton, TrustRow } from "./ui";

import LogoBrand from "./LogoBrand";

export default function Footer() {
  const socials = [
    { icon: ASSET.linkedin, label: "LinkedIn" },
    { icon: ASSET.x, label: "X" },
    { icon: ASSET.instagram, label: "Instagram" },
  ];
  return (
    <footer className="relative overflow-hidden pt-16">
      <img src={ASSET.footerGrid} alt="" aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full w-full object-cover opacity-30" />
      <Reveal className="container-page relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <div className="flex items-center justify-between gap-4 sm:justify-start sm:gap-6">
              <LogoBrand />
              <ApplyButton className="!py-2 sm:!py-2.5 md:!py-3 !px-3.5 sm:!px-4 md:!px-5 !text-[12.5px] sm:!text-[14px] md:!text-[16px]" />
            </div>
            <div className="mt-6">
              <TrustRow />
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-10 md:items-end">
            <nav className="flex flex-wrap gap-8">
              {["Case Studies", "Reviews", "Process"].map((l) => (
                <a key={l} href="#" className="font-display text-[18px] font-medium text-[#A7ADBE] transition-colors hover:text-white">{l}</a>
              ))}
            </nav>
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a key={s.label} href="#" aria-label={s.label} whileHover={{ scale: 1.08, y: -2 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "rgba(19,24,57,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <img src={s.icon} alt="" className="h-[22px] w-[22px]" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 py-8">
          <div className="flex flex-col items-center justify-between gap-4 text-[15px] text-[#A7ADBE] md:flex-row">
            <p>© 2026 Supersonic Mails. All rights reserved</p>
            <div className="flex gap-8">
              <a href="#" className="font-display transition-colors hover:text-white">Privacy Policy</a>
              <a href="#" className="font-display transition-colors hover:text-white">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
