/**
 * Single source of truth for case studies.
 *
 * Consumed by the homepage grid (client) and by the /case-studies/[slug]
 * detail pages (server), so it must stay free of "use client" and of any
 * component imports.
 *
 * `body` is a small block list rather than raw HTML so the detail page can
 * style each kind consistently and nothing untrusted is ever injected.
 *   { h2 }      section heading
 *   { p }       paragraph
 *   { lead }    opening paragraph, set larger
 *   { arrows }  the "→" bullet list
 *   { bullets } plain bullet list
 *   { findings } numbered diagnostic cards, [{ title, text }]
 *   { stages }  connected sequence rail, [{ label, title, text }]
 *   { callout } emphasised result line
 *   { img }     { src, alt, caption }
 *   { gallery } { title, images: [{ src, alt }] }
 *   { profile } { name, text, photo, links: [{ label, href }] }
 *   { note }    muted aside
 *   { cta }     { blurb, label, href }
 */
import { BOOKING_URL as CAL } from "./site";

export const CS_DIR = "/casestudies";

export const CASE_STUDIES = [
  {
    slug: "quotrell-800k-in-162-days",
    img: `${CS_DIR}/quotrell-800k.jpg`,
    alt: "Klaviyo conversion summary showing €806,533.18 in attributed conversions, split €441,680.18 campaigns and €364,853.00 flows",
    // Card
    title: "How Quotrell Generated an extra €800k in 162 Days From Email Alone",
    desc: "A 100X return most brands would call impossible. We call it a random quarter results. Here's the ROI-first system behind the number.",
    // Detail page
    metric: "€806,533",
    metricLabel: "Attributed in 162 days",
    published: true,
    body: [
      {
        lead: "Quotrell came to us with something most brands would kill for and almost nobody uses properly: an 80k list of genuinely loyal buyers.",
      },
      { p: "And they were blasting the whole thing. Every email, to every person, every time." },
      {
        p: "That's the fastest way to burn a good list. Your engaged buyers get lumped in with people who haven't opened since 2023, inbox providers notice, and slowly your emails stop getting seen by the ones who actually want them.",
      },
      { p: "So we rebuilt it:" },
      {
        arrows: [
          "Hyper targeted segments instead of full list blasts. Open rates went up immediately.",
          "9-10 flows live, 50+ emails deep. Running 24/7 whether anyone's at the laptop or not.",
          "6 step launch sequences for product drops.",
          "3-4 campaigns a week, every week.",
        ],
      },
      {
        p: "The part I didn't expect: they kept printing straight through the post Black Friday window, when most brands go quiet and wait for January.",
      },
      { p: "€806,533 in 162 days. Around $1M. Not one euro of ad spend attached to it." },
      {
        cta: {
          label: "Get a FREE Audit",
          href: CAL,
          blurb: "Want us to install the ROI-First systems in your brand?",
        },
      },
      { note: "(Limited to 3 brands only before this quarter ends)" },
    ],
  },
  {
    slug: "314k-in-42-days",
    img: `${CS_DIR}/brand-314k.jpg`,
    alt: "Business performance summary showing €998,511.92 total revenue and €314,060.12 attributed revenue, 31.45% of total",
    title: "How We Generated €314,060.12 for One Brand in Just 42 Days",
    desc: "No new traffic. No bigger ad budget. Just a retention system most agencies don't know how to build.",
    metric: "€314,060",
    metricLabel: "Attributed in 42 days",
    published: true,
    body: [
      { h2: "Why you should listen to me?" },
      {
        profile: {
          photo: `${CS_DIR}/case2/bio.jpg`,
          name: "Sameer",
          text: "Hey, I'm Sameer. My Clients call me Sam haha. I'm the founder and CEO of Bad Retention. We're building Nepal's first premium Retention Marketing agency for 8-9 figure Ecom stores in the beauty, health, supplement and fashion niche. My agency has generated over $800k in attributed email revenue in the past 90 days for our partner brands.",
          links: [
            { label: "Instagram", href: "https://www.instagram.com/_sameerakhtar_22/" },
            { label: "Twitter", href: "https://x.com/EcomSameer" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/sameer-akhtar-388259300/" },
          ],
        },
      },

      { h2: "Case background" },
      {
        p: "This is a 8 figure brand. They have over 100k email list, they were looking for someone who can get the most out of that list and we eventually met them at the right time.",
      },
      {
        p: "Tbh they were doing 100K EVERY DAY in Black friday. Their Top of the funnel was dialed in. They were doing decent sending emails internally but they knew they can do alot better, And we came in.",
      },
      {
        p: "Generally the sales starts to get low post black friday. They were also blasting email to the whole list which is 100k people every time they hit send which was a bad practice.",
      },
      {
        p: "It was getting hard for them to perform good post black friday. Their design was generic and bad deliverability. And WE CAME IN",
      },
      {
        img: {
          src: `${CS_DIR}/case2/summary.jpg`,
          alt: "Business performance summary: €998,511.92 total revenue, €314,060.12 attributed (31.45%), campaigns €173,108.60 and flows €140,951.52",
          caption: "Dec 18, 2025 to Jan 30, 2026",
        },
      },

      { h2: "Here's what we did!!!" },

      { h2: "1. Deliverability" },
      {
        p: "Focuses on deliverability. After the bump of black friday emails, emails generally get ignored. So we built a segment that excludes all the people:",
      },
      {
        bullets: [
          "who have never opened our emails",
          "All emails which have bounced",
          "Never engaged with our store in a long time",
        ],
      },
      { p: "Highest open rates and the second highest revenue per campaign from this email" },
      { callout: "Took the open rates from 40% to 65%. More opens = more revenue." },
      {
        img: {
          src: `${CS_DIR}/case2/deliverability.jpg`,
          alt: "Klaviyo campaign table showing open rates between 47% and 65% with revenue per campaign",
        },
      },

      { h2: "2. Campaign performance" },
      {
        p: "Campaigns were sent very strategically. It includes promo email such as upto 50% off on best sellers. We were using bunch of different angles. Also New drops targeting various angles that their audience were reasonating with the message. Targeted and relevant messge always prints.",
      },
      {
        p: "Highest revenue from a single email is €20k and it's from New year. A great way to start the New year. Umahhhhhh",
      },
      {
        img: {
          src: `${CS_DIR}/case2/campaign-1.jpg`,
          alt: "Klaviyo campaign row for Jan 1, 2026 showing 54.90% open rate and €20,087.85 revenue",
        },
      },
      { p: "Typical campaign performances" },
      {
        img: {
          src: `${CS_DIR}/case2/campaign-2.jpg`,
          alt: "Klaviyo campaign performance rows showing open rates and revenue per send",
        },
      },

      { h2: "3. Flows performance" },
      {
        callout:
          "Adding €30K every single month on autopilot from flows which they've completely been missing previously. I bet these €30K would be an extra 100K in Black Friday.",
      },
      { p: "Overall flows performance" },
      {
        img: {
          src: `${CS_DIR}/case2/flows.jpg`,
          alt: "Klaviyo top performing flows: Welcome Series €83,112.75, Abandoned Cart €19,278.75, Abandoned Checkout €9,793.31 and more, all live",
        },
      },
      { p: "I love greens, I bet you love it too" },
    ],
  },
  {
    slug: "marroomi-out-of-spam",
    img: `${CS_DIR}/marroomi-deliverability.jpg`,
    alt: "Domain reputation chart climbing from low to high across October 2025",
    title:
      "How We Took This Brand's Email Out Of Spam And Into The Inbox In Less Than 30 Days",
    desc: "Their emails weren't just underperforming. They were invisible. Here's how we fixed deliverability first, for higher open rates and higher revenue.",
    metric: "Low to High",
    metricLabel: "Domain reputation in under 30 days",
    published: true,
    body: [
      {
        note: "Note: Before we start, you should know that taking a brand's email out of spam is the hardest thing to do. It's not easy. It requires a lot of time and a lot of effort. We literally took this brand's email out of spam in less than 30 days (You can see the Google postmaster report here)",
      },
      {
        img: {
          src: `${CS_DIR}/case3/postmaster.jpg`,
          alt: "Google Postmaster Tools domain reputation climbing from Low to High between 4 and 31 October 2025",
          caption: "Google Postmaster Tools, last 30 days",
        },
      },

      { h2: "Case background" },
      {
        p: "We met with this brand in late November. But we actually started working with them in early October. If you see the timeline we started working on spam issues from 4th october. It's 31 october, the day we got out of spam and we saw 78% open rate.",
      },

      { h2: "Here's the exact thing we did from start to finish" },
      {
        arrows: [
          "DNS records were already setup, so no issues there",
          "We tested where our emails are landing with the help of Glockapps (hell lotta workkkk)",
          "we noticed a 80% of this brand emails were landing into spam, we also noticed a spike in spam complaint rate",
          "The next we do is turned off all the non essentials flows, we keep welcome, abandoned carts, checkouts, thankyou email",
          "Made the first welcome email fully text based",
          "We made the following segment (if someone can or cannot receive email marketing, can receive email because person subscribed) and started by sending to 10 days engaged segment) FREE MONEY COZ NO ADS SPENDS, NOTHING HAHA",
          "Before sending the campaign we also analysed which ISP are getting low open rates",
          "we noticed yahoo, some gmails and aol were causing all the issues.",
          "The next step we did was we remove the yahoos and aol from the 10 days engaged segment and made the segment more tighter for yahoo and aol (separately)",
          "10 days engaged for gmail and 7 days engaged for yahoo and aol",
          "Here's the imp part: we started sending plain text emails (pure value, educational) without expecting rev",
          "we started sending 2 campaigns a week fully plain text",
          "When we started seeing 40%+ open rate, we moved the 15 days engaged for gmail and 8 days for yahoo and aol",
          "we again saw 45%+ open rate, we moved 30 days for gmail and 15 for yahoo and aol.",
          "Now even with the graphic emails campaigns are getting around 50% + open rate, placed order has been increased.",
        ],
      },
      {
        callout:
          "Welcome email open rates went from 33% to 59% so does the placed order rate even with the graphic emails.",
      },
    ],
  },
  {
    slug: "marroomi-50-percent-retention",
    img: `${CS_DIR}/marroomi-retention.jpg`,
    alt: "Returning customer rate chart averaging 50.76% between March 25 and April 24, 2026",
    title: "How We Took Marroomi's Returning Customer Rate To 50%",
    desc: "Not half of a segment. Half of everyone who buys. Here's the post-purchase system behind the number.",
    metric: "50.76%",
    metricLabel: "Returning customer rate",
    published: true,
    body: [
      { lead: "Half of Marroomi's customers now come back and buy again." },
      {
        p: "Not half of the people who saw an email. Not half of a segment. Half of everyone who buys.",
      },
      {
        p: "That number didn't come from writing better subject lines. It came from rebuilding what happens to a customer in the days and weeks after they hand over money — the part almost every brand treats as a shipping notification and nothing else.",
      },

      { h2: "The situation" },
      {
        p: "Marroomi had the hard part solved. Product people liked. Traffic that converted. A real business.",
      },
      {
        p: "What they had underneath it was the same thing almost every 7-figure brand has: a front end doing all the work and a back end doing almost none.",
      },
      { p: "The pattern looked like this:" },
      {
        bullets: [
          "Customers bought once and disappeared",
          "Every month started near zero and had to be rebuilt with ad spend",
          "Refunds and chargebacks were quietly eating margin nobody had time to investigate",
          "The post-purchase experience was a confirmation email, a tracking link, and silence",
        ],
      },
      {
        p: "Nothing here was broken in an obvious way. That's exactly why it goes unfixed for years. There's no alarm that goes off when a customer decides not to come back. They just don't.",
      },
      {
        p: "The cost of that is invisible on the dashboard and enormous on the P&L. Every non-returning customer means paying full acquisition price for the next one. Forever.",
      },

      { h2: "What we found in the audit" },
      {
        p: "Before touching anything, we went through the account the same way we go through every account — same checks, same order.",
      },
      { p: "What surfaced:" },
      {
        findings: [
          {
            title: "The post-purchase window was dead air.",
            text: "The highest-trust moment a brand ever gets with a customer is the gap between “I paid” and “it arrived.” Marroomi was using it for logistics only. No expectation setting, no usage guidance, no reason to be excited.",
          },
          {
            title: "Shipping expectations weren't being managed.",
            text: "Customers weren't told clearly enough when the product would land or what would happen along the way. Silence during a wait doesn't read as neutral — it reads as something went wrong.",
          },
          {
            title: "Refunds and chargebacks were a communication problem, not a product problem.",
            text: "A meaningful share of disputes trace back to the same root: the customer didn't know what to expect, didn't hear from the brand, got anxious, and went to their bank instead of to support. That's fixable with sequencing, not with policy.",
          },
          {
            title: "Nobody was being taught how to use the product properly.",
            text: "This is the one most brands never connect to churn. A customer who uses the product wrong never gets the result, and a customer who never gets the result never reorders. That looks like a retention problem. It's an onboarding problem.",
          },
          {
            title: "Everyone was getting the same message.",
            text: "No meaningful separation between buyers and non-buyers, first-time and repeat, engaged and dormant. One list, one message, one result — a slow decline in engagement that drags deliverability down with it.",
          },
        ],
      },

      { h2: "The mechanism: the Post-Purchase Habit Loop" },
      { p: "Repeat purchase isn't a persuasion problem. It's a habit problem." },
      {
        p: "Nobody reorders because an email convinced them to. They reorder because the product became part of their routine — and the brand stayed present while that routine formed.",
      },
      {
        p: "So the goal isn't “send more emails to past customers.” The goal is to get the customer through four stages without dropping out at any of them:",
      },
      {
        stages: [
          {
            label: "Stage 1",
            title: "Certainty",
            text: "From the moment they pay until the box lands, they know exactly what's happening. Anxiety is what produces refund requests and chargebacks. Certainty removes it.",
          },
          {
            label: "Stage 2",
            title: "Correct usage",
            text: "They know how to use the product, how much, how often, and what to expect week by week. This is where most churn is silently created and where it's cheapest to prevent.",
          },
          {
            label: "Stage 3",
            title: "Felt result",
            text: "They stay consistent long enough to actually notice a difference. Most customers quit before the product has had a chance to work, then conclude it didn't.",
          },
          {
            label: "Stage 4",
            title: "Reorder becomes automatic",
            text: "They're reminded before they run out, not after. The reorder is one tap, at the right moment, from a brand they now trust.",
          },
        ],
      },
      {
        p: "Break any stage and the customer leaks out. Hold all four and you get a returning customer rate that stops looking normal.",
      },
      {
        p: "That's the loop we built for Marroomi. We also took other necessary steps such sending consistent campaigns to the right customer at the right time, high-personalised segmentations, so on & so forth.",
      },

      { h2: "The results" },
      { callout: "50% returning customer rate." },
      {
        p: "Half of all customers come back. For context, a typical DTC brand sits far below this, which is why so many of them are permanently dependent on paid acquisition to stand still.",
      },
      { p: "Supporting outcomes:" },
      {
        bullets: ["Chargebacks reduced", "Refund rate reduced", "27% Email revenue"],
      },

      { h2: "Who this applies to" },
      { p: "If you're running a 7 or 8 figure store and:" },
      {
        bullets: [
          "Customers buy once and vanish",
          "Every month starts from zero and gets rebuilt with ad spend",
          "Chargebacks and refunds are eating margin you've stopped investigating",
          "Your post-purchase experience is a tracking link and silence",
          "Email is a small fraction of revenue and you know it should be bigger",
        ],
      },
      {
        p: "…then you have the same gap Marroomi had. And the gap is where the money is.",
      },
      {
        cta: {
          label: "Learn More",
          href: CAL,
          blurb:
            "We're taking on 3 more brands before this Quarter, to give them a full deep dive FREE Audit custom to their brand. If you're interested in learning more, tap the learn more button below. We'll see you on the other side.",
        },
      },
    ],
  },
];

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
