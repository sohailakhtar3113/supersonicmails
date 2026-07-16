"use client";

// Clean, premium hero backdrop.
// A single symmetric top-center blue glow over a deep-navy vertical gradient,
// plus a faint static grid for texture. Everything is centered at 50% so the
// background reads evenly across the width — no patchy blue/black blotches,
// no twinkling dots, no drifting orbs.
export default function HeroFx() {
  return (
    <div className="hero-fx" aria-hidden>
      {/* Base navy gradient + even top-center blue glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 62% at 50% -8%, rgba(51,98,255,0.30) 0%, rgba(51,98,255,0.10) 34%, rgba(0,2,15,0) 66%), linear-gradient(180deg, #0A1030 0%, #070C20 44%, #00020F 100%)",
        }}
      />

      {/* Faint premium grid, softly masked so it only whispers near the top */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,150,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,255,0.045) 1px, transparent 1px)",
          backgroundSize: "62px 62px",
          maskImage:
            "radial-gradient(72% 60% at 50% 0%, #000 0%, rgba(0,0,0,0.35) 46%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(72% 60% at 50% 0%, #000 0%, rgba(0,0,0,0.35) 46%, transparent 78%)",
        }}
      />

      {/* Soft bottom fade into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-[240px]"
        style={{ background: "linear-gradient(180deg, transparent, #00020F)" }}
      />
    </div>
  );
}
