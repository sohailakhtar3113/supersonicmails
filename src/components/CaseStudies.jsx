"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { CASE_STUDIES } from "./caseStudiesData";
import { Reveal, revealSm, container } from "./motion";
import { ApplyButton, Badge } from "./ui";

/**
 * Case studies grid.
 *
 * Each card is a link to its own route (/case-studies/[slug]) rather than a
 * lightbox — these are read, shared and linked to, all of which a modal
 * cannot do. The card content and the detail page both read from
 * caseStudiesData.js so a headline can never drift between the two.
 *
 * Deliberately no platform badges ("Verified in Klaviyo" etc.). They would add
 * real credibility, but attributing a screenshot to the wrong tool on a page
 * whose whole job is proof is a worse trade than leaving it off.
 */
function ArrowGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CaseCard({ item, index }) {
  return (
    <motion.article variants={revealSm} className="h-full">
      <Link
        href={`/case-studies/${item.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(14,20,46,0.62),rgba(7,10,28,0.55))] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#3362FF]/35 hover:shadow-[0_34px_70px_-30px_rgba(51,98,255,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3362FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#00020F]"
      >
        <div className="relative aspect-[986/556] w-full overflow-hidden bg-[#0B1024]">
          <img
            src={item.img}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.045] motion-reduce:transition-none"
          />

          {/* Scrim so the chips stay legible over the bright dashboards */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(4,6,15,0.45) 0%, transparent 35%, transparent 60%, rgba(4,6,15,0.8) 100%)",
            }}
          />

          {/* Editorial index */}
          <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 font-display text-[11px] font-semibold tracking-[0.14em] text-white backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="pointer-events-none absolute bottom-4 right-4 flex translate-y-2 items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition-all duration-[400ms] group-hover:translate-y-0 group-hover:opacity-100">
            Read case study
            <ArrowGlyph className="h-3 w-3" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h3
            className="text-[19px] uppercase font-semibold  text-white md:text-[21px]"
            style={{ fontFamily: "'Clash Display', Georgia, serif" }}
          >
            {item.title}
          </h3>
          <p className="font-rethink mt-3 text-[14.5px] leading-[1.6] text-[#9AA2B6] md:text-[15px]">
            {item.desc}
          </p>

          <span className="mt-5 inline-flex items-center gap-1.5 font-display text-[13.5px] font-semibold text-[#9fb4ff] transition-colors duration-300 group-hover:text-white">
            Read the full breakdown
            <ArrowGlyph className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="container-page relative scroll-mt-28 py-16 md:py-24">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-12 h-[420px] w-[860px] -translate-x-1/2 rounded-full opacity-[0.22] blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(51,98,255,0.4) 0%, transparent 70%)",
        }}
      />

      <Reveal className="relative z-10 mb-12 flex flex-col items-center text-center md:mb-16">
        <Badge className="mb-6">Case Studies</Badge>
        <h2
          className="text-[22px] font-semibold leading-[1.2] text-white sm:text-[32px] md:text-[46px]"
          style={{ fontFamily: "'Clash Display', Georgia, serif" }}
        >
          The Results Speak For Themselves
        </h2>
      </Reveal>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 mx-auto grid max-w-[1080px] grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-7"
      >
        {CASE_STUDIES.map((c, i) => (
          <CaseCard key={c.slug} item={c} index={i} />
        ))}
      </motion.div>

      <Reveal className="relative z-10 mt-12 flex justify-center md:mt-14">
        <ApplyButton label="Get Results Like These" />
      </Reveal>
    </section>
  );
}
