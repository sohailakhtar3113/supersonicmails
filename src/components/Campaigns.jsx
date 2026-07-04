"use client";
import { useRef, useState } from "react";
import { ASSET, CAMPAIGNS } from "./data";
import { Reveal } from "./motion";

export default function Campaigns() {
  const ref = useRef(null);
  const [page, setPage] = useState(0);

  const scrollBy = (dir) => {
    const el = ref.current;
    if (!el) return;
    const amt = Math.round(el.clientWidth * 0.8) * dir;
    el.scrollBy({ left: amt, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const p = el.scrollLeft / (el.scrollWidth - el.clientWidth || 1);
    setPage(Math.round(p * 2)); // 3 dot states
  };

  return (
    <section className="relative py-16 md:py-24">
      <Reveal className="container-page mb-12 text-center">
        <h2 className="font-display text-[32px] leading-[1.15] text-white md:text-[50px] md:leading-[60px]" style={{ letterSpacing: "-0.5px" }}>
          A Look Inside The Campaigns<br />
          <span className="serif-i">Driving 7-Figure Revenue</span>
        </h2>
      </Reveal>

      <div className="relative">
        <div
          ref={ref}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 md:px-[max(24px,calc((100vw-1200px)/2))]"
        >
          {CAMPAIGNS.map((src, i) => (
            <div
              key={i}
              className="relative h-[440px] w-[248px] shrink-0 snap-start overflow-hidden rounded-[20px]"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <img src={src} alt="" className="h-full w-full object-cover object-top" />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button onClick={() => scrollBy(-1)} aria-label="Prev" className="absolute -left-1 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#131839]/80 md:flex">
          <img src={ASSET.arrow} alt="" className="h-5 w-5 rotate-180" />
        </button>
        <button onClick={() => scrollBy(1)} aria-label="Next" className="absolute -right-1 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#131839]/80 md:flex">
          <img src={ASSET.arrow} alt="" className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-2">
        {[0, 1, 2].map((d) => (
          <span key={d} className={`h-2.5 w-2.5 rounded-full transition-colors ${page === d ? "bg-white" : "bg-white/25"}`} />
        ))}
      </div>
    </section>
  );
}
