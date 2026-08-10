"use client";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";

/**
 * Shared full-screen image viewer.
 *
 * Used by the design wall (tall email designs) and the case studies (wide
 * dashboard screenshots), which is why the panel width is a prop — the
 * behaviour is identical, only the aspect differs.
 *
 * Render inside an <AnimatePresence> and mount conditionally so the exit
 * animation can play.
 */
export default function Lightbox({ src, alt, onClose, maxWidth = 480 }) {
  const closeRef = useRef(null);

  useEffect(() => {
    // Park focus on the close control, and lock the page behind the overlay
    // so wheel/touch scrolling does not leak through to the document.
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Image preview"}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth }}
        className="relative max-h-[90vh] w-full overflow-hidden rounded-[20px] border border-white/12 bg-[#0B0F22] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)]"
      >
        <div className="no-scrollbar max-h-[90vh] overflow-y-auto overscroll-contain">
          <img src={src} alt={alt} className="w-full" draggable={false} />
        </div>
      </motion.div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3362FF] md:right-7 md:top-7"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}
