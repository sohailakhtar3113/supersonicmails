"use client";
import { motion } from "motion/react";
import { STAGES } from "./data";
import { Reveal, revealSm } from "./motion";
import { ApplyButton, Badge, TrustRow } from "./ui";

function StageBadge({ n }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] text-white" style={{ background: "rgba(19,24,57,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <span className="h-2 w-2 rounded-full bg-white/70" />
      STAGE {n}
    </span>
  );
}

export default function Process() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Sticky left */}
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <Reveal>
            <Badge dot className="mb-6">OUR FRAMEWORK</Badge>
            <h2 className="font-display text-[34px] leading-[1.15] text-white md:text-[42px] md:leading-[50px]" style={{ letterSpacing: "-0.42px" }}>
              Our <span className="serif-i">8-Fig Scaling</span> Framework
            </h2>
            <div className="mt-8 flex flex-col items-start gap-6">
              <ApplyButton />
              <TrustRow />
            </div>
          </Reveal>
        </div>

        {/* Timeline right */}
        <div className="relative">
          <span className="absolute left-4 top-2 bottom-2 w-px bg-white/10 md:left-6" aria-hidden />
          <div className="flex flex-col gap-8">
            {STAGES.map((s) => (
              <Reveal key={s.n} variants={revealSm} className="relative pl-14 md:pl-20">
                <div className="pointer-events-none absolute -left-1 -top-3 font-poppins text-[64px] leading-none text-white/10 md:text-[80px]">{s.n}</div>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="rounded-[18px] p-6 md:p-8"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(16,22,48,0.4), rgba(6,9,26,0.35))" }}
                >
                  <StageBadge n={s.n} />
                  <h3 className="font-display mt-5 text-[22px] font-medium text-white md:text-[24px]">{s.title}</h3>
                  <p className="font-body mt-2 text-[16px] text-[#A7ADBE]">{s.lead}</p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {s.items.map((it) => {
                      const [lead, ...rest] = it.split(":");
                      const detail = rest.join(":").trim();
                      return (
                        <li key={it} className="font-body flex gap-3 text-[16px] text-[#A7ADBE]">
                          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#3362FF]" />
                          <span>
                            {detail ? (
                              <>
                                <span className="font-medium text-white">{lead}:</span>{" "}
                                {detail}
                              </>
                            ) : (
                              it
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
