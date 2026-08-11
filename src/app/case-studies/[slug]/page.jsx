import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseGallery from "@/components/CaseGallery";
import ShortsShowcase from "@/components/ShortsShowcase";
import TrustReviews from "@/components/TrustReviews";
import { ApplyButton, TrustRow } from "@/components/ui";
import { CASE_STUDIES, getCaseStudy } from "@/components/caseStudiesData";

// Prerender every study at build time — the set is known and static.
export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

// `params` is a Promise in this version of Next and must be awaited.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title} | Supersonic Mails`,
    description: study.desc,
    openGraph: {
      title: study.title,
      description: study.desc,
      images: [study.img],
    },
  };
}

function ArrowItem({ children }) {
  return (
    <li className="flex gap-3.5">
      <span
        aria-hidden
        className="mt-[3px] shrink-0 font-display text-[16px] font-semibold text-[#3362FF]"
      >
        &rarr;
      </span>
      <span className="font-rethink text-[16px] leading-[1.7] text-[#B4BBCB] md:text-[17px]">
        {children}
      </span>
    </li>
  );
}

function Block({ block }) {
  if (block.h2)
    return (
      <h2
        className="mt-6 text-[24px] font-semibold leading-[1.2] text-white md:text-[30px]"
        style={{ fontFamily: "'Clash Display', Georgia, serif" }}
      >
        {block.h2}
      </h2>
    );

  if (block.bullets)
    return (
      <ul className="flex flex-col gap-2.5 pl-1">
        {block.bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <span aria-hidden className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#3362FF]" />
            <span className="font-rethink text-[16px] leading-[1.7] text-[#A7ADBE] md:text-[17px]">
              {b}
            </span>
          </li>
        ))}
      </ul>
    );

  // Numbered audit findings. Each is a claim plus its reasoning, so the claim
  // is promoted to a heading — flowing them as paragraphs buries the five
  // things the section exists to say.
  if (block.findings)
    return (
      <ol className="flex flex-col gap-3.5">
        {block.findings.map((f, i) => (
          <li
            key={f.title}
            className="flex gap-4 rounded-[18px] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(16,22,48,0.5),rgba(7,10,28,0.4))] p-5 md:gap-5 md:p-6"
          >
            <span
              aria-hidden
              className="mt-[2px] grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#3362FF]/35 bg-[#3362FF]/12 font-display text-[12.5px] font-semibold text-[#9fb4ff]"
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="font-display text-[16px] font-semibold leading-[1.4] text-white md:text-[18px]">
                {f.title}
              </p>
              <p className="mt-2.5 font-rethink text-[15.5px] leading-[1.7] text-[#A7ADBE] md:text-[16.5px]">
                {f.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    );

  // A sequence, not a list — the copy's whole point is that dropping out of any
  // one stage breaks the next, so the nodes are joined by a continuous rail.
  if (block.stages)
    return (
      <ol className="flex flex-col">
        {block.stages.map((s, i) => (
          <li key={s.label} className="grid grid-cols-[auto_1fr] gap-x-4 md:gap-x-5">
            <div aria-hidden className="flex flex-col items-center">
              <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full border border-[#3362FF]/45 bg-[#3362FF]/12">
                <span className="h-[7px] w-[7px] rounded-full bg-[#3362FF] shadow-[0_0_10px_2px_rgba(51,98,255,0.6)]" />
              </span>
              {/* Skipped on the last node so the rail stops at Stage 4 rather
                  than trailing into the paragraph that follows. */}
              {i < block.stages.length - 1 && (
                <span className="mt-1.5 w-px flex-1 bg-[linear-gradient(180deg,rgba(51,98,255,0.55),rgba(51,98,255,0.1))]" />
              )}
            </div>
            {/* Bottom padding is what spaces the steps, and it has to sit on
                the content column so the rail keeps stretching through the
                gap. Dropped on the last step, which has no rail to fill. */}
            <div className={i < block.stages.length - 1 ? "min-w-0 pb-7" : "min-w-0"}>
              <p className="font-display text-[16px] font-semibold leading-[1.4] text-white md:text-[18px]">
                <span className="text-[#7FA0FF]">{s.label}</span>
                {/* Real spaces, not margin: a margin looks right but copies
                    and reads aloud as "Stage 1—Certainty". */}
                <span className="text-[#5C6480]">{" — "}</span>
                {s.title}
              </p>
              <p className="mt-2.5 font-rethink text-[15.5px] leading-[1.7] text-[#A7ADBE] md:text-[16.5px]">
                {s.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    );

  if (block.callout)
    return (
      <p className="rounded-[18px] border-l-2 border-[#3362FF] bg-[linear-gradient(90deg,rgba(51,98,255,0.14),rgba(51,98,255,0.02))] py-5 pl-6 pr-6 font-display text-[17px] font-medium leading-[1.5] text-white md:text-[20px]">
        {block.callout}
      </p>
    );

  if (block.img)
    return (
      <figure className="my-2">
        <div className="overflow-hidden rounded-[16px] border border-white/[0.10] bg-[#0B1024] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)]">
          <img src={block.img.src} alt={block.img.alt} loading="lazy" className="w-full" />
        </div>
        {block.img.caption && (
          <figcaption className="mt-3 text-center font-rethink text-[13px] text-[#7B8299]">
            {block.img.caption}
          </figcaption>
        )}
      </figure>
    );

  if (block.gallery)
    return <CaseGallery title={block.gallery.title} images={block.gallery.images} />;

  if (block.profile)
    return (
      <div className="flex flex-col gap-6 rounded-[20px] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(16,22,48,0.5),rgba(7,10,28,0.4))] p-6 md:flex-row md:p-7">
        <img
          src={block.profile.photo}
          alt={block.profile.name}
          loading="lazy"
          className="h-28 w-28 shrink-0 rounded-[16px] object-cover md:h-32 md:w-32"
        />
        <div>
          <p className="font-rethink text-[16px] leading-[1.7] text-[#A7ADBE] md:text-[17px]">
            {block.profile.text}
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {block.profile.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 py-1.5 font-display text-[12.5px] font-medium text-[#A7ADBE] transition hover:border-[#3362FF]/45 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3362FF]"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    );

  if (block.lead)
    return (
      <p className="font-rethink text-[18px] leading-[1.65] text-[#D5DAE6] md:text-[20px]">
        {block.lead}
      </p>
    );

  if (block.p)
    return (
      <p className="font-rethink text-[16px] leading-[1.75] text-[#A7ADBE] md:text-[17px]">
        {block.p}
      </p>
    );

  if (block.arrows)
    return (
      <ul className="flex flex-col gap-3.5 rounded-[18px] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(16,22,48,0.5),rgba(7,10,28,0.4))] p-6 md:p-7">
        {block.arrows.map((a) => (
          <ArrowItem key={a}>{a}</ArrowItem>
        ))}
      </ul>
    );

  if (block.note)
    return (
      <p className="font-rethink text-[14.5px] italic leading-[1.6] text-[#7B8299]">
        {block.note}
      </p>
    );

  if (block.cta)
    return (
      <div className="rounded-[20px] border border-[#3362FF]/25 bg-[linear-gradient(180deg,rgba(24,38,92,0.55),rgba(9,13,34,0.5))] p-7 md:p-8">
        <p className="font-display text-[17px] font-medium leading-[1.5] text-white md:text-[19px]">
          {block.cta.blurb}
        </p>
        <a
          href={block.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#3362FF] px-6 py-3 font-display text-[15px] font-semibold text-white shadow-[0_14px_36px_-12px_rgba(51,98,255,0.9)] transition hover:bg-[#4a75ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:text-[16px]"
        >
          {block.cta.label}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    );

  return null;
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        {/* Bottom padding is smaller than it looks: ShortsShowcase adds its
            own pt below this, so the old pb-16/24 stacked into a gap. */}
        <article className="container-page relative pb-10 pt-[132px] md:pb-14 md:pt-[168px]">
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-24 h-[440px] w-[880px] -translate-x-1/2 rounded-full opacity-[0.22] blur-[130px]"
            style={{
              background: "radial-gradient(circle, rgba(51,98,255,0.4) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-[820px]">
            <Link
              href="/#case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-4 py-2 font-display text-[13px] font-medium text-[#A7ADBE] transition hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3362FF]"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              All case studies
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#3362FF]/35 bg-[#3362FF]/12 px-3.5 py-1.5 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-[#9fb4ff]">
                {study.metric}
              </span>
              <span className="font-rethink text-[13.5px] text-[#7B8299]">
                {study.metricLabel}
              </span>
            </div>

            <h1
              className="mt-5 text-[30px] font-semibold leading-[1.14] text-white md:text-[46px]"
              style={{ fontFamily: "'Clash Display', Georgia, serif" }}
            >
              {study.title}
            </h1>

            {/* Proof */}
            <div className="mt-10 overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#0B1024] shadow-[0_30px_80px_-34px_rgba(0,0,0,0.9)]">
              <img
                src={study.img}
                alt={study.alt}
                width={986}
                height={556}
                className="w-full"
              />
            </div>

            {/* Body */}
            <div className="mt-12 flex flex-col gap-6 md:mt-14 md:gap-7">
              {study.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>

            {!study.published && (
              <p className="mt-10 rounded-[16px] border border-white/[0.08] bg-white/[0.03] px-6 py-5 font-rethink text-[14.5px] leading-[1.6] text-[#8A90A2]">
                In the meantime, the numbers above are pulled straight from the
                client&rsquo;s own dashboard.
              </p>
            )}

          </div>
        </article>

        {/* The same proof stack the homepage closes with. Someone who has just
            read a full breakdown is the most persuadable reader on the site,
            and until now the page went straight from the last paragraph to the
            ask with nothing corroborating it.

            Both sections are full-bleed, so they sit outside the article —
            nesting them in its 820px column would crush the video cards and
            double up the horizontal padding. Their built-in CTA and trust row
            are switched off so the page still ends on exactly one ask. */}
        <ShortsShowcase showCta={false} />
        <TrustReviews showTrustRow={false} />

        <section className="container-page pt-6 pb-16 md:pt-12 md:pb-24">
          <div className="mx-auto flex max-w-[820px] flex-col items-center gap-6 text-center">
            <h2
              className="text-[24px] font-semibold leading-[1.2] text-white md:text-[32px]"
              style={{ fontFamily: "'Clash Display', Georgia, serif" }}
            >
              Ready to Scale Your Brand?
            </h2>
            <ApplyButton label="Get A Free Audit" />
            <TrustRow />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
