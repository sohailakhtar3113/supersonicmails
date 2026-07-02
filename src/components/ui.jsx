"use client";
import { ASSET } from "./data";
import { motion } from "motion/react";

export function ApplyButton({ label = "Apply for an Audit", className = "" }) {
  return (
    <motion.a
      href="#"
      className={`btn-primary ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {label}
      <img src={ASSET.arrow} alt="" width={18} height={18} className="translate-y-[1px]" />
    </motion.a>
  );
}

export function Badge({ children, dot = false, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] text-[#A7ADBE] ${className}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(6px)",
      }}
    >
      {dot && <span className="h-2.5 w-2.5 rounded-full bg-[#37E17B] shadow-[0_0_8px_2px_rgba(55,225,123,0.6)]" />}
      <span className="tracking-wide">{children}</span>
    </span>
  );
}

export function TrustRow({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src={ASSET.trust} alt="Trusted by 105+ brands" className="h-[54px] w-auto" />
    </div>
  );
}

// Heading with an italic serif accent segment.
export function AccentHeading({ before, accent, after = "", className = "" }) {
  return (
    <h2 className={`font-display text-white ${className}`}>
      {before}
      {accent && <span className="serif-i">{accent}</span>}
      {after}
    </h2>
  );
}
