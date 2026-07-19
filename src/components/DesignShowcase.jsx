"use client";
import { Reveal } from "./motion";
import { ApplyButton } from "./ui";

/**
 * The design wall — the heart of the agency.
 * Two infinite right-to-left marquee rows of tall email designs.
 * Each card is a fixed 480px viewport the visitor scrolls MANUALLY —
 * mouse wheel, scrollbar drag, or touch — to explore the full design at
 * native resolution (never squished, never blurry). No auto vertical
 * scroll; hovering pauses the row so the card holds still while reading.
 */
const D = "/designs";

const ROW_ONE = [
  `${D}/first.jpg`,
  `${D}/eight.jpg`,
  `${D}/second.jpg`,
  `${D}/email5.png`,
  `${D}/third.jpg`,
  `${D}/seventh.jpg`,
  `${D}/fourthhhh.jpg`,
  `${D}/thirteen.png`,
  `${D}/fifth.jpg`,
  `${D}/b.jpg`,
];

const ROW_TWO = [
  `${D}/sixth.jpg`,
  `${D}/nine.jpg`,
  `${D}/a.png`,
  `${D}/ten.jpg`,
  `${D}/fourteen.jpg`,
  `${D}/twelve.jpg`,
  `${D}/email14.png`,
  `${D}/fifteen.jpg`,
  `${D}/secondtest.png`,
  `${D}/c.jpg`,
];

function DesignCard({ src }) {
  return (
    <div className="group/card shrink-0 px-3 md:px-3.5">
      {/* Gradient hairline border + blue glow on hover */}
      <div className="relative rounded-[20px] bg-gradient-to-b from-white/20 via-white/[0.06] to-transparent p-[1.5px] shadow-[0_18px_44px_-20px_rgba(0,0,0,0.8)] transition-shadow duration-300 hover:shadow-[0_26px_60px_-22px_rgba(51,98,255,0.55)]">
        {/* Fixed-height, user-scrollable viewport */}
        <div className="design-scroll relative h-[480px] w-[260px] rounded-[19px] bg-[#0B0F22] md:w-[280px]">
          <img
            src={src}
            alt="Email campaign design by Supersonic Mails"
            loading="lazy"
            decoding="async"
            draggable={false}
            className="w-full"
          />
        </div>

        {/* Scroll hint — appears on hover */}
        <span className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white/90 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/card:opacity-100">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3v18" />
            <path d="m6 9 6-6 6 6" />
            <path d="m6 15 6 6 6-6" />
          </svg>
          Scroll to explore
        </span>
      </div>
    </div>
  );
}

function DesignRow({ items, dur }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden">
      <div className="marquee-track marquee-left py-2" style={{ "--dur": dur }}>
        {loop.map((src, i) => (
          <DesignCard key={`${src}-${i}`} src={src} />
        ))}
      </div>
    </div>
  );
}

export default function DesignShowcase() {
  return (
    <section className="relative w-full overflow-hidden bg-[#06070B] py-20 md:py-28">
      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(51,98,255,0.35) 0%, rgba(51,98,255,0.08) 55%, transparent 80%)",
        }}
      />

      <Reveal className="container-page relative z-10 mb-12 text-center md:mb-16">
        <p className="font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FA0FF]">
          Our design work
        </p>
        <h2
          className="mx-auto mt-3 max-w-[880px] text-[30px] font-semibold leading-[1.15] text-white md:text-[44px]"
          style={{ fontFamily: "'Clash Display', Georgia, serif" }}
        >
          Designs That&rsquo;ve Been Printing An Extra{" "}
          <span className="serif-i text-[#9fb4ff]">7 Figs/Year</span> For Our
          Partner Brands
        </h2>
      </Reveal>

      {/* The design wall — full-bleed, right-to-left, pauses on hover */}
      <div className="relative z-10 flex flex-col gap-5 md:gap-7">
        <DesignRow items={ROW_ONE} dur="140s" />
        <DesignRow items={ROW_TWO} dur="165s" />
      </div>

      <Reveal className="container-page relative z-10 mt-12 flex justify-center md:mt-14">
        <ApplyButton label="Get Designs Like These" />
      </Reveal>
    </section>
  );
}
