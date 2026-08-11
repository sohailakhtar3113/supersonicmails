/**
 * Site-wide constants that are not page content.
 *
 * Everything here is referenced from more than one place, so it lives in one
 * file rather than being repeated — a booking URL copied into fifteen buttons
 * is fifteen chances to miss one when it changes.
 */

/**
 * The booking link behind every "audit" CTA on the site.
 *
 * Deliberately the base scheduling URL, not the date-pinned variant
 * (.../30min/2026-08-13T07:00:00+05:45) that Calendly puts in the address bar
 * while you are looking at one slot. That form hard-codes a single day, so
 * every visitor would land on 13 Aug 2026 — fine this week, wrong forever
 * after. The base link always opens on the next available availability.
 */
export const BOOKING_URL = "https://calendly.com/supersonicmails48/30min";

/**
 * Company details used by the legal pages.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * CONFIRM BEFORE PUBLISHING. These four fields are the only invented values
 * on either legal page, and a privacy policy that names the wrong legal
 * entity or an unmonitored mailbox is worse than no policy at all:
 *
 *   entity     — the registered company or sole-trader name that actually
 *                contracts with clients
 *   address    — registered business address, shown in the contact block
 *   email      — a mailbox somebody reads; data requests legally have to be
 *                answerable here
 *   jurisdiction — governs the Terms and where disputes are heard
 * ─────────────────────────────────────────────────────────────────────────
 */
export const LEGAL = {
  brand: "Supersonic Mails",
  entity: "Supersonic Mails",
  address: null,
  email: "hello@supersonicmails.com",
  site: "supersonicmails.com",
  jurisdiction: "Nepal",
  // Shown as "Last updated" on both documents. Bump this whenever the wording
  // changes — the date is the only signal a reader has that a policy is live.
  updated: "12 August 2026",
};

export const SOCIALS = {
  linkedin: "https://www.linkedin.com/company/bad-retention/",
  instagram: "https://www.instagram.com/badretention/",
  // No company X/Twitter URL supplied yet; the footer hides icons without one.
  x: null,
};
