"use client";
import { useMemo } from "react";

// Ambient hero background: drifting aurora orbs, a deterministic starfield,
// and two supersonic comet streaks. Pure CSS animation — no globe.
export default function HeroFx() {
  const stars = useMemo(() => {
    let seed = 7;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: 46 }, () => ({
      left: `${(rnd() * 100).toFixed(2)}%`,
      top: `${(rnd() * 78).toFixed(2)}%`,
      size: `${(rnd() * 1.8 + 0.8).toFixed(2)}px`,
      o: (rnd() * 0.5 + 0.3).toFixed(2),
      tw: `${(rnd() * 3 + 2.2).toFixed(2)}s`,
      delay: `${(rnd() * 4).toFixed(2)}s`,
    }));
  }, []);

  return (
    <div className="hero-fx" aria-hidden>
      <span className="aurora-orb orb-1" />
      <span className="aurora-orb orb-2" />
      <span className="aurora-orb orb-3" />

      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            "--o": s.o,
            "--tw": s.tw,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* soft top vignette so content stays readable */}
      <div
        className="absolute inset-x-0 top-0 h-[620px]"
        style={{ background: "radial-gradient(60% 50% at 50% 16%, rgba(51,98,255,0.16) 0%, rgba(0,2,15,0) 72%)" }}
      />
    </div>
  );
}
