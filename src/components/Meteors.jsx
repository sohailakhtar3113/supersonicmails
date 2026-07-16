"use client";
import React, { useEffect, useState } from "react";

/**
 * Meteors — adapted from Magic UI (https://magicui.design/docs/components/meteors)
 * Ported to JS and tinted to the brand blue (#3362FF). Relies on the
 * `animate-meteor` utility + `meteor` keyframes defined in globals.css.
 * Render inside a `relative overflow-hidden` container.
 */
export default function Meteors({
  number = 24,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className = "",
}) {
  const [meteorStyles, setMeteorStyles] = useState([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s",
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          style={{ ...style }}
          className={`animate-meteor pointer-events-none absolute size-0.5 rotate-(--angle) rounded-full bg-[#8AA3FF] shadow-[0_0_0_1px_rgba(51,98,255,0.15)] ${className}`}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-[#3362FF] to-transparent" />
        </span>
      ))}
    </>
  );
}
