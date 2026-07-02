"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ASSET, NAV } from "./data";
import { ApplyButton } from "./ui";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-4 sm:px-6"
    >
      <nav
        className="container-page flex items-center justify-between rounded-[28px] py-2.5 pl-4 pr-2.5 transition-colors duration-300"
        style={{
          border: "1px solid rgba(255,255,255,0.07)",
          background: scrolled ? "rgba(6,9,26,0.72)" : "rgba(10,14,34,0.35)",
          backdropFilter: "blur(14px)",
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center shrink-0">
          <img src={ASSET.logo} alt="Mach33 — Previously 360Funnels" className="h-10 w-auto" />
        </a>

        {/* Center pill (desktop) */}
        <div
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5 lg:flex"
          style={{ background: "rgba(19,24,57,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {NAV.map((item, i) => (
            <a
              key={item}
              href="#"
              className={`font-display rounded-full px-4 py-2 text-[18px] font-medium transition-colors ${
                i === 0 ? "text-white" : "text-[#A7ADBE] hover:text-white"
              }`}
              style={i === 0 ? { background: "rgba(255,255,255,0.06)" } : {}}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="hidden lg:block">
          <ApplyButton className="!py-3 !px-5 !text-[16px]" />
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
          style={{ background: "rgba(19,24,57,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex flex-col gap-[5px]">
            <span className="block h-[2px] w-5 bg-white" />
            <span className="block h-[2px] w-5 bg-white" />
            <span className="block h-[2px] w-5 bg-white" />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="container-page mt-2 flex flex-col gap-1 rounded-2xl p-3 lg:hidden"
            style={{ background: "rgba(6,9,26,0.95)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(14px)" }}
          >
            {NAV.map((item) => (
              <a key={item} href="#" className="font-display rounded-lg px-4 py-3 text-[18px] text-[#DDE1EC] hover:bg-white/5">
                {item}
              </a>
            ))}
            <div className="p-1 pt-2">
              <ApplyButton className="w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
