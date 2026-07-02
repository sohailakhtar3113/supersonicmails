"use client";
import { ASSET, REVIEWS, REVIEWS2 } from "./data";
import { Reveal, revealSm } from "./motion";

function ReviewCard({ r }) {
  return (
    <div
      className="relative flex w-[340px] shrink-0 flex-col overflow-hidden rounded-[18px] p-6 md:w-[380px]"
      style={{ border: "1px solid rgba(255,255,255,0.07)", background: "linear-gradient(180deg, rgba(16,22,48,0.5), rgba(6,9,26,0.4))" }}
    >
      <img src={ASSET.reviewCardBg} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="relative z-10 flex h-full flex-col">
        <span className="font-serif mb-2 text-[52px] leading-none text-white/25" style={{ fontFamily: "Georgia, serif" }}>&rdquo;</span>
        {r.title && <p className="font-display mb-1 text-[16px] font-semibold text-white">{r.title}</p>}
        <p className="font-display text-[16px] leading-[1.35] text-white/90">{r.body}</p>
        <div className="mt-5 flex items-center gap-3">
          <img src={r.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
          <div>
            <p className="font-display text-[14px] font-medium text-white">{r.name}</p>
            <p className="font-display text-[14px] text-[#A7ADBE]">{r.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ items, dir, dur }) {
  const list = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden" style={{ "--dur": dur }}>
      <div className={`marquee-track ${dir === "right" ? "marquee-right" : "marquee-left"} gap-6`}>
        {list.map((r, i) => <ReviewCard key={i} r={r} />)}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <img src={ASSET.beamL} alt="" aria-hidden className="pointer-events-none absolute left-0 top-8 w-[520px] max-w-none opacity-80" />
      <img src={ASSET.beamR} alt="" aria-hidden className="pointer-events-none absolute right-0 top-8 w-[520px] max-w-none opacity-80" />

      <Reveal className="container-page relative z-10 mb-14 text-center">
        <h2 className="font-display text-[36px] leading-[1.1] text-white md:text-[50px] md:leading-[60px]" style={{ letterSpacing: "-0.5px" }}>
          What Brands Are <span className="serif-i">Saying</span>
        </h2>
        <p className="font-body mt-3 text-[18px] font-medium text-[#A7ADBE]">Rated 4.9/5 on Trustpilot</p>
      </Reveal>

      <Reveal variants={revealSm} className="flex flex-col gap-6">
        <Row items={REVIEWS} dir="left" dur="55s" />
        <Row items={REVIEWS2} dir="right" dur="65s" />
      </Reveal>
    </section>
  );
}
