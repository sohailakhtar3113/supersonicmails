"use client";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { STAGES } from "./data";
import { Reveal } from "./motion";
import { ApplyButton, Badge, TrustRow } from "./ui";

/**
 * The framework as a pinned "orbit" sequence.
 *
 * A tall runway (h-[360vh]) wraps a `sticky top-0 h-screen` stage. While the
 * runway passes through the viewport the visuals stay locked to the screen, so
 * the section reads as frozen while you scroll — then releases naturally once
 * the runway ends. This is scroll-*linked*, never scroll-*jacked*: the page
 * never calls preventDefault, so trackpads, keyboards, screen readers and
 * find-in-page all keep working. Hijacking the wheel would break every one.
 *
 * Scroll progress 0→1 is split into three beats. On each beat a stage card
 * flies in from off-screen right and lands on the deck, pushing its
 * predecessors back in Z; meanwhile a glowing arc travels one full lap of the
 * orbit, reaching each numbered node just before that node's card arrives.
 */

const COUNT = STAGES.length;
const LAND = 0.18; // how far into a beat the card finishes arriving

/**
 * Orbit nodes as % of the ring box, running clockwise: upper-left,
 * upper-right, lower-right.
 *
 * Bottom-centre is deliberately avoided even though it is the geometrically
 * even third — the card deck sits dead centre and swallows anything there.
 * Nodes therefore live on the left and right arcs, and each lights when its
 * card lands rather than when the arc sweeps past it; over a whole lap that
 * desync is invisible, and it keeps the marker meaningful.
 */
const NODES = [
  { left: 9.5, top: 27.9, at: 0.12 },
  { left: 90.5, top: 27.9, at: 0.45 },
  { left: 90.5, top: 72.1, at: 0.79 },
];

function OrbitNode({ p, node, label, reduce }) {
  const lit = useTransform(p, [node.at - 0.03, node.at + 0.05], [0, 1]);
  const body = useTransform(lit, (v) => 0.42 + v * 0.58);

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.left}%`, top: `${node.top}%` }}
    >
      <motion.div
        style={{ opacity: reduce ? 1 : body }}
        className="relative grid h-10 w-10 place-items-center rounded-full border border-white/[0.12] bg-[#080C1E] md:h-14 md:w-14"
      >
        <motion.span
          aria-hidden
          style={{ opacity: reduce ? 1 : lit }}
          className="absolute inset-0 rounded-full ring-2 ring-inset ring-[#3362FF]/70 shadow-[0_0_0_5px_rgba(51,98,255,0.10),0_0_26px_rgba(51,98,255,0.65)]"
        />
        <span
          className="relative text-[13px] font-semibold text-white md:text-[16px]"
          style={{ fontFamily: "'Clash Display', Georgia, serif" }}
        >
          {label}
        </span>
      </motion.div>
    </div>
  );
}

/**
 * The ring. Drawn as a <path> of two arcs rather than <ellipse> because
 * pathLength — which normalises the dash pattern to 0..1 so the glow can be a
 * clean fraction of the lap — is only dependable on <path>.
 *
 * preserveAspectRatio="none" lets the ring restretch from a wide oval on
 * desktop to a tall one on mobile from a single path; vector-effect keeps the
 * stroke a true width through that non-uniform scale.
 */
const RING = "M 32 280 a 468 248 0 1 1 936 0 a 468 248 0 1 1 -936 0";

function Orbit({ p, reduce }) {
  const dash = useTransform(p, [0, 1], [0, -1]);

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <div className="relative aspect-[1000/1320] w-[92vw] max-w-[1160px] sm:aspect-[1000/900] md:aspect-[1000/560]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 560"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="orbit-beam" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3362FF" />
              <stop offset="55%" stopColor="#8FA9FF" />
              <stop offset="100%" stopColor="#AEC4FF" />
            </linearGradient>
          </defs>

          {/* Unlit track */}
          <path
            d={RING}
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />

          {/* Bloom + the travelling glow itself */}
          <motion.path
            d={RING}
            pathLength="1"
            strokeDasharray="0.15 0.85"
            style={{ strokeDashoffset: reduce ? 0 : dash }}
            stroke="#3362FF"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.3"
            vectorEffect="non-scaling-stroke"
            className="[filter:blur(6px)]"
          />
          <motion.path
            d={RING}
            pathLength="1"
            strokeDasharray="0.15 0.85"
            style={{ strokeDashoffset: reduce ? 0 : dash }}
            stroke="url(#orbit-beam)"
            strokeWidth="2.4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="[filter:drop-shadow(0_0_8px_rgba(51,98,255,0.95))]"
          />
        </svg>

        {STAGES.map((s, i) => (
          <OrbitNode key={s.n} p={p} node={NODES[i]} label={s.n} reduce={reduce} />
        ))}
      </div>
    </div>
  );
}

function StageCard({ stage, i, p, reduce }) {
  // Beat boundaries for this card, plus the landing points of the two cards
  // that follow it — those drive how far back it recedes in the deck.
  const a = i / COUNT;
  const b = a + LAND;
  const c = (i + 1) / COUNT + LAND;
  const d = (i + 2) / COUNT + LAND;

  const x = useTransform(p, [a, b], ["100vw", "0vw"]);
  const rotate = useTransform(p, [a, b], [9, 0]);
  const scale = useTransform(p, [a, b, c, d], [0.84, 1, 0.93, 0.86]);
  const y = useTransform(p, [b, c, d], [0, -24, -48]);
  // Opacity only covers the arrival. Once landed a card stays fully opaque
  // forever: fading a receded card makes it translucent, and the card *behind*
  // it reads straight through — the exact mush this deck has to avoid.
  const opacity = useTransform(p, [a, a + 0.05, b], [0, 1, 1]);
  // Depth is sold by a dim layer *inside* the card instead, which darkens it
  // without ever making it see-through.
  const dim = useTransform(p, [b, c, d], [0, 0.5, 0.72]);

  // Reduced motion: no flight, no deck — a plain crossfade between stages.
  const fade = useTransform(p, [a, a + 0.02, c - 0.04, c], [0, 1, 1, 0]);

  return (
    <motion.div
      style={
        reduce
          ? { opacity: fade }
          : // Scale from the top edge, so the -y offset is the only thing
            // moving the card's top. With centre-origin scaling the two fight
            // each other and the peek collapses.
            { x, y, rotate, scale, opacity, transformOrigin: "top center" }
      }
      className="col-start-1 row-start-1 w-full"
    >
      {/* Opaque on purpose: a translucent card lets the one beneath read
          straight through it and the deck turns to mush. */}
      <div className="relative h-full overflow-hidden rounded-[24px] border border-white/[0.10] bg-[linear-gradient(180deg,#141B3B_0%,#080B1E_100%)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(51,98,255,0.10)]">
        {/* Grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(120,150,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,255,0.055) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(120% 110% at 0% 0%, #000 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(120% 110% at 0% 0%, #000 0%, transparent 70%)",
          }}
        />
        {/* Corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full blur-[64px]"
          style={{
            background: "radial-gradient(circle, rgba(51,98,255,0.42), transparent 70%)",
          }}
        />
        {/* Depth dimmer — sits above the card's own content, below the card
            in front of it. Keeps the surface opaque while it recedes. */}
        {!reduce && (
          <motion.div
            aria-hidden
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 z-20 bg-[#04060F]"
          />
        )}

        {/* Centred, because every card is sized to the tallest stage — left
            top-aligned, the four-bullet stages trail dead space. */}
        <div className="relative flex h-full flex-col justify-center p-6 md:p-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8FA9FF] md:text-[11.5px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3362FF] shadow-[0_0_7px_#3362FF]" />
            Stage {stage.n}
          </span>

          <h3
            className="mt-4 text-[22px] font-semibold leading-[1.15] text-white md:mt-5 md:text-[28px]"
            style={{ fontFamily: "'Clash Display', Georgia, serif" }}
          >
            {stage.title}
          </h3>
          <p className="font-rethink mt-2 text-[14px] leading-[1.55] text-[#9AA2B6] md:text-[16px]">
            {stage.lead}
          </p>

          <ul className="mt-4 flex flex-col gap-2.5 md:mt-6 md:gap-3">
            {stage.items.map((it) => {
              const [lead, ...rest] = it.split(":");
              const detail = rest.join(":").trim();
              return (
                <li key={it} className="flex gap-2.5 md:gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-[4px] h-3 w-3 shrink-0 text-[#3362FF] md:mt-[5px] md:h-3.5 md:w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                  <span className="font-rethink text-[13px] leading-[1.5] text-[#9AA2B6] md:text-[15.5px]">
                    {detail ? (
                      <>
                        <span className="font-display font-semibold text-white">
                          {lead}:
                        </span>{" "}
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
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const reduce = useReducedMotion();
  const runwayRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });
  // Light spring so the deck settles rather than tracking the wheel 1:1.
  const p = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 34,
    restDelta: 0.0005,
  });

  return (
    <section className="relative">
      <div ref={runwayRef} className="relative h-[360vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <Orbit p={p} reduce={reduce} />

          {/* Generous gap: receded cards lift upward, and a tight gap lets
              them collide with the heading. */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-9 px-5 pb-8 pt-24 md:gap-14 md:pt-28">
            <div className="shrink-0 text-center">
              <Badge dot className="mb-4 md:mb-5">
                OUR FRAMEWORK
              </Badge>
              <h2
                className="text-[26px] font-semibold leading-[1.12] text-white md:text-[42px]"
                style={{ fontFamily: "'Clash Display', Georgia, serif" }}
              >
                Our 8-Fig Scaling Framework
              </h2>
            </div>

            {/* All cards share one grid cell, so they stack as a deck. Default
                `stretch` sizes every card to the tallest (stage 02, six
                bullets) — without that, a taller card underneath pokes out
                below the one in front and its copy shows. Equal heights mean
                the only thing that peeks is the deliberate upward lift. */}
            <div className="relative grid w-full max-w-[380px] sm:max-w-[520px] md:max-w-[560px]">
              {STAGES.map((s, i) => (
                <StageCard key={s.n} stage={s} i={i} p={p} reduce={reduce} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Released — normal flow resumes */}
      <div className="container-page">
        <Reveal className="flex flex-col items-center gap-6 pb-4 pt-2 md:pt-6">
          <ApplyButton />
          <TrustRow />
        </Reveal>
      </div>
    </section>
  );
}
