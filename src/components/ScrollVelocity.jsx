"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

/**
 * ScrollVelocity — ported from Magic UI (magicui.design/docs/components/scroll-based-velocity)
 * to plain JS. A row (or rows) of repeating content that auto-scrolls, then
 * speeds up and flips direction based on the page's scroll velocity.
 * `children` can be any node, so we can scroll the full branding lockup.
 */

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function ParallaxRow({ children, baseVelocity = 5, className = "" }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    const calc = () => {
      if (containerRef.current && itemRef.current) {
        const cw = containerRef.current.offsetWidth;
        const tw = itemRef.current.offsetWidth;
        if (tw > 0) setRepetitions(Math.ceil(cw / tw) + 2);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    // Re-measure once webfonts have settled (item width depends on the font).
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(calc);
    }
    return () => window.removeEventListener("resize", calc);
  }, [children]);

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={containerRef} className="w-full overflow-hidden whitespace-nowrap">
      <motion.div className="inline-flex flex-nowrap" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? itemRef : null}
            className={`flex shrink-0 items-center ${className}`}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ScrollVelocity({
  children,
  defaultVelocity = 5,
  numRows = 1,
  className = "",
}) {
  return (
    <>
      {Array.from({ length: numRows }).map((_, i) => (
        <ParallaxRow
          key={i}
          baseVelocity={defaultVelocity * (i % 2 === 0 ? 1 : -1)}
          className={className}
        >
          {children}
        </ParallaxRow>
      ))}
    </>
  );
}
