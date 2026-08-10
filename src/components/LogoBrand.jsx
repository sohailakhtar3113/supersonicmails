"use client";
import Image from "next/image";

/**
 * Brand lockup.
 *
 * Previously this was composed in markup — an icon image plus the wordmark and
 * tagline set in CSS — which meant letter-spacing, the divider rule and the
 * icon's own tint all had to be re-tuned at every breakpoint to stay aligned.
 * It is now the single supplied artwork, so the lockup is pixel-identical to
 * the design at every size.
 *
 * The PNG is white-on-transparent, so it is rendered with no filter or tint of
 * any kind — whatever sits behind it shows through cleanly.
 *
 * `sizes` is pinned to the real rendered widths (~110-170px). Without it Next
 * assumes full viewport width and ships a needlessly large candidate for a
 * logo that is never wider than a business card.
 */
const SRC = "/designs/header.png";
const NATURAL_W = 1703;
const NATURAL_H = 574;

export default function LogoBrand({
  className = "",
  size = "normal",
  // Kept for the Navbar call site. The wordmark is baked into the artwork now,
  // so rather than hiding text this simply renders the lockup a step smaller
  // where horizontal room is tightest.
  hideTextOnMobile = false,
  preload = false,
}) {
  // The artwork is a ~3:1 lockup containing the icon, wordmark AND tagline, so
  // it needs far more height than the old bare icon did: the wordmark is only
  // about a quarter of the image's height, and the tagline less again. Sized
  // off the smallest legible tagline rather than off the icon.
  const height =
    size === "sm"
      ? "h-10 sm:h-15"
      : hideTextOnMobile
        // h-11 on phones: at h-12 the lockup was 142px wide and left only 6px
        // between it and the CTA on a 390px screen.
        ? "h-11 sm:h-40 md:h-20"
        // Footer: 44/52/60px -> roughly 131/154/178px wide. Kept a step under
        // the navbar lockup so the footer reads as a sign-off, not a masthead.
        : "h-11 sm:h-13 md:h-15";

  return (
    <div className={`flex shrink-0 select-none items-center ${className}`}>
      <Image
        src={SRC}
        alt="Supersonic Mails — previously Bad Retention"
        width={NATURAL_W}
        height={NATURAL_H}
        preload={preload}
        sizes="(max-width: 640px) 180px, 260px"
        draggable={false}
        className={`${height} w-auto object-contain`}
      />
    </div>
  );
}
