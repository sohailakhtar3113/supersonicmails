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
    // Hidden on phones: the card fills the width there, so the ring's left and
    // right arcs — which is exactly where the nodes sit — end up behind it. A
    // linear StageRail replaces it below `sm`.
    <div className="pointer-events-none absolute inset-0 hidden place-items-center sm:grid">
      <div className="relative aspect-[1000/900] w-[92vw] max-w-[1160px] md:aspect-[1000/560]">
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

/**
 * Phone stand-in for the orbit: the same three markers on a straight track,
 * with the fill driven by the same scroll progress. Keeps the "where am I in
 * the sequence" signal that the ring provides on wider screens.
 */
function StageRail({ p, reduce }) {
  const fill = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <div className="relative flex w-full max-w-[260px] items-center justify-between sm:hidden">
      <span aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/[0.12]" />
      <motion.span
        aria-hidden
        style={{ width: reduce ? "100%" : fill }}
        className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#3362FF] to-[#AEC4FF] shadow-[0_0_8px_rgba(51,98,255,0.9)]"
      />
      {STAGES.map((s, i) => (
        <RailNode key={s.n} p={p} at={NODES[i].at} label={s.n} reduce={reduce} />
      ))}
    </div>
  );
}

function RailNode({ p, at, label, reduce }) {
  const lit = useTransform(p, [at - 0.03, at + 0.05], [0, 1]);
  const body = useTransform(lit, (v) => 0.45 + v * 0.55);
  return (
    <motion.span
      style={{ opacity: reduce ? 1 : body }}
      className="relative grid h-8 w-8 place-items-center rounded-full border border-white/[0.14] bg-[#080C1E]"
    >
      <motion.span
        aria-hidden
        style={{ opacity: reduce ? 1 : lit }}
        className="absolute inset-0 rounded-full ring-2 ring-inset ring-[#3362FF]/70 shadow-[0_0_18px_rgba(51,98,255,0.6)]"
      />
      <span
        className="relative text-[11px] font-semibold text-white"
        style={{ fontFamily: "'Clash Display', Georgia, serif" }}
      >
        {label}
      </span>
    </motion.span>
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
  // Lift is capped at 28px because transforms do not reflow: a receded card
  // rides up over whatever sits above the deck. The column gap below is set
  // to exceed this, so the stack can never reach the heading.
  const y = useTransform(p, [b, c, d], [0, -14, -28]);
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
        {/* Every size below reads from a --var set once on the stage, so the
            whole card compresses together as the viewport gets shorter. */}
        <div className="relative flex h-full flex-col justify-center p-[var(--pad)]">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#8FA9FF] md:text-[11.5px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3362FF] shadow-[0_0_7px_#3362FF]" />
            Stage {stage.n}
          </span>

          <h3
            className="mt-[var(--titlemt)] text-[length:var(--title)] font-semibold leading-[1.15] text-white"
            style={{ fontFamily: "'Clash Display', Georgia, serif" }}
          >
            {stage.title}
          </h3>
          <p className="font-rethink mt-1.5 text-[length:var(--lead)] leading-[1.5] text-[#9AA2B6]">
            {stage.lead}
          </p>

          <ul className="mt-[var(--listmt)] flex flex-col gap-[var(--rowgap)]">
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
                  <span className="font-rethink text-[length:var(--item)] leading-[1.45] text-[#9AA2B6]">
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
        {/*
          Everything in this stage is sized off the *viewport height*, not a
          breakpoint. A pinned section has a hard ceiling — whatever does not
          fit in 100svh is simply cut off — and laptop viewports are short:
          1440x800 and 1280x720 are far more common than 1440x900. With fixed
          type the card ran 476px tall at every height and was clipped by 40px
          and 80px respectively.

          `svh` (not `vh`) because mobile browser chrome makes `vh` overshoot
          and would reintroduce the clipping on exactly the phones this needs
          to work on.
        */}
        <div
          className="sticky top-0 flex h-[100svh] flex-col overflow-hidden"
          style={{
            "--pad": "clamp(14px, 2.4svh, 30px)",
            "--title": "clamp(17px, 2.9svh, 28px)",
            "--titlemt": "clamp(8px, 1.6svh, 20px)",
            "--lead": "clamp(12.5px, 1.8svh, 16px)",
            "--item": "clamp(11.5px, 1.7svh, 15.5px)",
            "--rowgap": "clamp(5px, 1.05svh, 12px)",
            "--listmt": "clamp(9px, 1.9svh, 24px)",
          }}
        >
          <Orbit p={p} reduce={reduce} />

          {/* pt clears the fixed navbar, which ends at 76px on phones and
              112px from md up — hence the hard floors rather than pure svh. */}
          {/* Two different gap scales on purpose. Below `sm` the StageRail sits
              between heading and deck, so the 28px recede lift can only ever
              reach the rail — a smaller gap is safe, and vertical room is
              scarce (a 375x667 SE has none to spare). From `sm` up the rail is
              gone and the deck faces the heading directly, so the gap has to
              clear the lift outright. */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-[clamp(28px,3.6svh,44px)] px-5 pb-[clamp(14px,2svh,32px)] pt-[clamp(88px,11svh,110px)] sm:gap-[clamp(46px,5svh,60px)] md:pt-[clamp(126px,15svh,152px)]">
            <div className="shrink-0 text-center">
              <Badge dot className="mb-3 !px-3 !py-1 !text-[10.5px] sm:!text-[12.5px] md:mb-5">
                OUR FRAMEWORK
              </Badge>
              <h2
                className="text-[length:clamp(21px,3.3svh,42px)] font-semibold leading-[1.12] text-white"
                style={{ fontFamily: "'Clash Display', Georgia, serif" }}
              >
                Our 8-Fig Scaling Framework
              </h2>
            </div>

            <StageRail p={p} reduce={reduce} />

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