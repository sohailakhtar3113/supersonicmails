"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LogoBrand from "./LogoBrand";
import { ApplyButton } from "./ui";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    /**
     * A sentinel + IntersectionObserver rather than a scroll listener.
     *
     * Even a passive scroll handler runs JS on essentially every frame of
     * every scroll — the exact per-frame work that shows up as jank on
     * low-end phones. This observer fires twice in total: once when you
     * cross the threshold going down, once coming back up.
     *
     * The sentinel is absolutely positioned against the initial containing
     * block, so it sits 56px down the *document* and scrolls with the page,
     * unlike anything inside this fixed header.
     */
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:56px;left:0;width:1px;height:1px;pointer-events:none;";
    document.body.appendChild(sentinel);

    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(sentinel);

    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-4 sm:px-6"
    >
      <nav className="container-page relative flex items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
        {/*
          The glass is a separate layer that is *unmounted* at the top of the
          page, not merely transparent. An opacity-0 element still carries its
          backdrop-filter cost, so hiding it would leave a full-strength blur
          running behind the hero for every visitor. Mounting it on demand
          means zero blur work until it is actually wanted — and the fade rides
          on opacity, which composites on the GPU, instead of transitioning
          backdrop-filter itself, which is one of the most expensive properties
          to animate.
        */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="nav-glass"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-full"
              style={{
                // Modest 14px radius: blur cost scales with the radius, and
                // past ~16px there is no visual gain to pay for.
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                // Opaque enough to still read as a bar where backdrop-filter
                // is unsupported or disabled for battery saving.
                background:
                  "linear-gradient(180deg, rgba(18,29,72,0.80) 0%, rgba(7,11,32,0.74) 100%)",
                border: "1px solid rgba(96,134,255,0.20)",
                boxShadow:
                  "0 12px 40px -14px rgba(0,0,0,0.75), 0 0 34px -18px rgba(51,98,255,0.75), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Logo — relative so it paints above the absolutely-placed glass */}
        <a href="#" className="relative z-10 shrink-0">
          <LogoBrand hideTextOnMobile />
        </a>

        {/* Right CTA Button */}
        <div className="relative z-10">
          <ApplyButton className="!py-2 sm:!py-3 !px-3.5 sm:!px-5 !text-[13px] sm:!text-[16px]" />
        </div>
      </nav>
    </motion.header>
  );
}
