"use client";
import { Reveal, revealSm, Stagger } from "./motion";
import { Badge } from "./ui";

export default function GrowthCta() {
  return (
    <section className="container-page py-14 md:py-20">
      <Reveal
        className="relative overflow-hidden rounded-[28px] px-6 py-16 text-center md:px-16 md:py-20"
        style={{ border: "1px solid rgba(255,255,255,0.07)", background: "radial-gradient(80% 120% at 50% 0%, rgba(51,98,255,0.14) 0%, rgba(6,9,26,0.5) 55%, rgba(0,2,15,0.6) 100%)" }}
      >
        <Stagger className="mx-auto flex max-w-[820px] flex-col items-center" amount={0.3}>
          <Reveal variants={revealSm}><Badge>If you&apos;re doing $200K+ per month</Badge></Reveal>
          <Reveal variants={revealSm}>
            <h2 className="font-display mt-7 text-[30px] font-medium leading-[1.2] text-white md:text-[40px] md:leading-[48px]" style={{ letterSpacing: "-0.4px" }}>
              Your Biggest Growth Lever Isn&apos;t More Ad Spend.
            </h2>
          </Reveal>
          <Reveal variants={revealSm}>
            <p className="font-body mt-7 text-[18px] font-medium leading-[1.6] text-[#A7ADBE]">
              It&apos;s the customers you&apos;ve already paid to acquire. Most brands leave 25-40% of revenue untapped in their existing customer base.
            </p>
          </Reveal>
          <Reveal variants={revealSm}>
            <p className="font-body mt-6 text-[18px] font-medium leading-[1.6] text-[#A7ADBE]">
              We&apos;ve helped 35+ brands generate 7-figures in backend revenue by fixing what happens after the first purchase. Customer value compounds. LTV climbs. LTV:CAC improves. Without a single extra dollar on ads.
            </p>
          </Reveal>
        </Stagger>
      </Reveal>
    </section>
  );
}
