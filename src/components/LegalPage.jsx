import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ApplyButton } from "./ui";
import { LEGAL } from "./site";

/**
 * Shared shell for /privacy-policy and /terms.
 *
 * Legal pages are read in two completely different modes: skimmed for one
 * clause by someone who already knows what they are looking for, or read top
 * to bottom once by someone deciding whether to trust us. The layout serves
 * both — a "short version" panel and a sticky contents rail for the skimmer,
 * full prose for everyone else.
 *
 * A server component: nothing here is interactive, so none of it needs to ship
 * as JavaScript. Navbar and Footer bring their own "use client".
 */

/** Stable id from a heading, for the contents rail and deep links. */
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ContactBlock() {
  return (
    <div className="rounded-[18px] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(16,22,48,0.5),rgba(7,10,28,0.4))] p-6 md:p-7">
      <p className="font-display text-[16px] font-semibold text-white">
        {LEGAL.entity}
      </p>
      {LEGAL.address && (
        <p className="mt-2 whitespace-pre-line font-rethink text-[15.5px] leading-[1.7] text-[#A7ADBE]">
          {LEGAL.address}
        </p>
      )}
      <dl className="mt-4 flex flex-col gap-1.5 font-rethink text-[15.5px] text-[#A7ADBE]">
        <div className="flex gap-2">
          <dt className="text-[#7B8299]">Email</dt>
          <dd>
            <a
              href={`mailto:${LEGAL.email}`}
              className="text-[#9fb4ff] underline-offset-4 transition hover:text-white hover:underline"
            >
              {LEGAL.email}
            </a>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-[#7B8299]">Web</dt>
          <dd>
            <Link
              href="/"
              className="text-[#9fb4ff] underline-offset-4 transition hover:text-white hover:underline"
            >
              {LEGAL.site}
            </Link>
          </dd>
        </div>
      </dl>
    </div>
  );
}

function Block({ block }) {
  if (block.h3)
    return (
      <>
        <h3 className="mt-7 font-display text-[17px] font-semibold text-white md:text-[19px]">
          {block.h3}
        </h3>
        <p className="mt-3 font-rethink text-[16px] leading-[1.75] text-[#A7ADBE] md:text-[16.5px]">
          {block.p}
        </p>
      </>
    );

  if (block.bullets)
    return (
      <ul className="flex flex-col gap-3">
        {block.bullets.map((b) => (
          <li key={b} className="flex gap-3.5">
            <span
              aria-hidden
              className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#3362FF]"
            />
            <span className="font-rethink text-[16px] leading-[1.75] text-[#A7ADBE] md:text-[16.5px]">
              {b}
            </span>
          </li>
        ))}
      </ul>
    );

  if (block.note)
    return (
      <p className="rounded-[16px] border-l-2 border-[#3362FF] bg-[linear-gradient(90deg,rgba(51,98,255,0.13),rgba(51,98,255,0.02))] py-4 pl-5 pr-5 font-rethink text-[15.5px] italic leading-[1.65] text-[#C6CDDD] md:text-[16px]">
        {block.note}
      </p>
    );

  if (block.contact) return <ContactBlock />;

  if (block.p)
    return (
      <p className="font-rethink text-[16px] leading-[1.75] text-[#A7ADBE] md:text-[16.5px]">
        {block.p}
        {block.link && (
          <>
            {" "}
            <Link
              href={block.link.href}
              className="text-[#9fb4ff] underline-offset-4 transition hover:text-white hover:underline"
            >
              {block.link.label}
            </Link>
            .
          </>
        )}
      </p>
    );

  return null;
}

export default function LegalPage({ doc }) {
  // The summary panel is a section in the data but is not a numbered heading,
  // so it is split out here rather than being special-cased twice below.
  const summary = doc.sections.find((s) => s.summary)?.summary;
  const sections = doc.sections.filter((s) => s.h2);

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <header className="container-page relative pt-[124px] md:pt-[164px]">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[860px] -translate-x-1/2 rounded-full opacity-[0.22] blur-[130px]"
            style={{
              background:
                "radial-gradient(circle, rgba(51,98,255,0.4) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-[820px]">
            <p className="font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FA0FF]">
              {doc.eyebrow}
            </p>
            <h1
              className="mt-3 text-[30px] font-semibold leading-[1.14] text-white md:text-[46px]"
              style={{ fontFamily: "'Clash Display', Georgia, serif" }}
            >
              {doc.title}
            </h1>
            <p className="mt-5 max-w-[680px] font-rethink text-[17px] leading-[1.65] text-[#B4BBCB] md:text-[18px]">
              {doc.intro}
            </p>
            <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-3.5 py-1.5 font-display text-[12.5px] font-medium text-[#A7ADBE]">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[#37E17B] shadow-[0_0_8px_2px_rgba(55,225,123,0.5)]"
              />
              Last updated {LEGAL.updated}
            </p>
          </div>
        </header>

        <div className="container-page relative pb-16 pt-12 md:pb-24 md:pt-14">
          {/* Two columns from lg up: prose, then a contents rail that follows.
              Below lg the rail would push the document a full screen down, so
              it is dropped rather than stacked. */}
          <div className="mx-auto flex max-w-[1120px] flex-col-reverse gap-12 lg:flex-row lg:items-start lg:gap-16">
            <article className="min-w-0 flex-1 lg:max-w-[720px]">
              {summary && (
                <section className="mb-14 rounded-[22px] border border-[#3362FF]/25 bg-[linear-gradient(180deg,rgba(24,38,92,0.42),rgba(9,13,34,0.4))] p-6 md:p-8">
                  <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-[#9fb4ff]">
                    The short version
                  </h2>
                  <ul className="mt-5 flex flex-col gap-3.5">
                    {summary.map((s) => (
                      <li key={s} className="flex gap-3.5">
                        <svg
                          viewBox="0 0 24 24"
                          className="mt-[3px] h-[17px] w-[17px] shrink-0"
                          fill="none"
                          stroke="#7FA0FF"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="font-rethink text-[15.5px] leading-[1.65] text-[#C6CDDD] md:text-[16px]">
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 font-rethink text-[13.5px] leading-[1.6] text-[#7B8299]">
                    A summary, not a substitute — the full text below is what
                    actually applies.
                  </p>
                </section>
              )}

              <div className="flex flex-col gap-14">
                {sections.map((s, i) => (
                  <section
                    key={s.h2}
                    id={slugify(s.h2)}
                    className="scroll-mt-28"
                  >
                    <h2
                      className="flex items-baseline gap-3 text-[22px] font-semibold leading-[1.2] text-white md:text-[27px]"
                      style={{ fontFamily: "'Clash Display', Georgia, serif" }}
                    >
                      <span
                        aria-hidden
                        className="font-display text-[13px] font-semibold tracking-[0.12em] text-[#3362FF]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.h2}
                    </h2>
                    <div className="mt-5 flex flex-col gap-5">
                      {s.blocks.map((b, j) => (
                        <Block key={j} block={b} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-16 flex flex-col items-center gap-6 rounded-[22px] border border-white/[0.08] bg-white/[0.02] px-6 py-10 text-center">
                <h2
                  className="text-[22px] font-semibold leading-[1.2] text-white md:text-[28px]"
                  style={{ fontFamily: "'Clash Display', Georgia, serif" }}
                >
                  Still want that audit?
                </h2>
                <p className="max-w-[440px] font-rethink text-[15.5px] leading-[1.65] text-[#A7ADBE]">
                  Thirty minutes, your account, and a straight answer about
                  what your backend is leaving on the table.
                </p>
                <ApplyButton label="Get A Free Audit" />
              </div>
            </article>

            {/* Contents rail */}
            <nav
              aria-label="On this page"
              className="hidden w-[236px] shrink-0 lg:block lg:sticky lg:top-28"
            >
              <p className="font-display text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#7B8299]">
                On this page
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 border-l border-white/[0.09] pl-4">
                {sections.map((s) => (
                  <li key={s.h2}>
                    <a
                      href={`#${slugify(s.h2)}`}
                      className="block font-rethink text-[13.5px] leading-[1.5] text-[#8A90A2] transition-colors hover:text-white"
                    >
                      {s.h2}
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                href={doc.slug === "terms" ? "/privacy-policy" : "/terms"}
                className="mt-7 inline-flex items-center gap-2 font-display text-[13px] font-medium text-[#9fb4ff] transition-colors hover:text-white"
              >
                {doc.slug === "terms" ? "Privacy Policy" : "Terms & Conditions"}
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
