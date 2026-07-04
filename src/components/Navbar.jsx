"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import LogoBrand from "./LogoBrand";
import { ApplyButton } from "./ui";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
        className="container-page flex items-center justify-between rounded-[28px] py-2.5 px-4 sm:px-6 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(6,9,26,0.72)" : "rgba(10,14,34,0.38)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Logo */}
        <a href="#" className="shrink-0">
          <LogoBrand />
        </a>

        {/* Right CTA Button */}
        <div>
          <ApplyButton className="!py-2.5 sm:!py-3 !px-4 sm:!px-5 !text-[15px] sm:!text-[16px]" />
        </div>
      </nav>
    </motion.header>
  );
}
