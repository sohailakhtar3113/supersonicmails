import { LEGAL } from "./site";

/**
 * Copy for /privacy-policy and /terms.
 *
 * Written for this agency rather than adapted from a generic template, which
 * is why both documents carry sections most agency policies do not:
 *
 *   · Privacy — a "Your customers' data" section. A retention agency logs into
 *     a client's Klaviyo and Shopify and works inside lists of other people's
 *     buyers. That is the single largest privacy exposure in this business and
 *     boilerplate never mentions it.
 *   · Terms — a deliverability section. Inbox placement is decided by mailbox
 *     providers, not by us, and this site sells getting out of spam. Promising
 *     an outcome we do not control is the obvious way to get into a dispute.
 *
 * Block shapes, rendered by LegalPage:
 *   { p }        paragraph
 *   { bullets }  plain list
 *   { note }     muted aside
 *   { contact }  the address / email block
 */

const shortVersion = (items) => ({ summary: items });

export const PRIVACY = {
  slug: "privacy-policy",
  eyebrow: "Privacy Policy",
  title: "How We Handle Your Information",
  intro:
    "What we collect when you read this site, apply for an audit, or work with us — why we hold it, who else touches it, and how to get it back or get it deleted.",
  sections: [
    shortVersion([
      "We collect what you type into our forms, plus the ordinary technical data any website receives.",
      "We do not sell your information, and we do not buy or email purchased lists.",
      "Filling in a form gets you a reply about that enquiry — it does not silently add you to a marketing list.",
      "If you become a client, your customers' data stays yours. We work inside your tools and take nothing with us when we leave.",
      "You can ask us what we hold, correct it, or have it deleted. One email does it.",
    ]),
    {
      h2: "Who this covers",
      blocks: [
        {
          p: `${LEGAL.brand} is a retention marketing agency. We build and run email, SMS and lifecycle systems for ecommerce brands. This policy covers ${LEGAL.site}, the forms and booking links on it, and the email we send you as a result of them.`,
        },
        {
          p: "It does not cover the platforms we operate on your behalf once you are a client. Those — your ESP, your store, your helpdesk — are governed by your own agreements with those vendors, and by the client agreement between us.",
        },
      ],
    },
    {
      h2: "What we collect, and when",
      blocks: [
        {
          p: "Rather than list every field we could theoretically hold, here is what actually happens at each point you might touch us.",
        },
        {
          h3: "When you are only reading",
          p: "Our host receives what every web server receives: your IP address, your browser and device type, the pages you opened, and the page that referred you. This is how the site gets delivered and how we notice something is broken.",
        },
        {
          p: "This site does not run advertising or profiling cookies. If we later add a measurement tool, we will name it here before it goes live rather than after.",
        },
        {
          h3: "When you apply for an audit or book a call",
          p: "You give us your name, your email address, your brand or store URL, and whatever context you choose to add about your business — list size, current revenue, what is not working. Booking a call also creates a record with our scheduling provider, including the time you picked and any answers you gave on the booking form.",
        },
        {
          p: "We ask for revenue and list size because an audit is worthless without them. You are not obliged to give us either, and we will still reply.",
        },
        {
          h3: "When you email or message us",
          p: "We keep the correspondence, because that is what an email account is. Anything you volunteer inside it — screenshots, exports, account access — we hold under the same terms as the rest of this policy.",
        },
      ],
    },
    {
      h2: "What we do with it",
      blocks: [
        {
          bullets: [
            "Reply to you, and prepare the audit or proposal you asked for.",
            "Deliver and support the work, if you become a client.",
            "Keep the business records and invoices we are required to keep.",
            "Understand which pages and case studies are actually read, so we write more of what helps.",
            "Send you follow-ups about the specific thing you enquired about.",
          ],
        },
        {
          p: "If you opt in to hear from us more broadly, we will send occasional retention teardowns and results. That is a separate choice from filling in an enquiry form, and every one of those emails carries a one-click unsubscribe that we honour immediately.",
        },
      ],
    },
    {
      h2: "What we do not do",
      blocks: [
        {
          p: "Stating this positively is more useful than burying it in a clause:",
        },
        {
          bullets: [
            "We do not sell, rent or trade your personal information. Not for money, and not for anything else of value.",
            "We do not buy email lists, scrape addresses, or send cold email to people who never asked to hear from us.",
            "We do not add you to a marketing list because you filled in an enquiry form.",
            "We do not use one client's customer data to find or pitch another client.",
            "We do not publish a client's numbers, screenshots or name as a case study without asking them first.",
          ],
        },
      ],
    },
    {
      h2: "Your customers' data",
      blocks: [
        {
          note: "This section is the one that matters most if you hire us, and it is the one most agency policies leave out entirely.",
        },
        {
          p: "Running retention for you means working inside your customer list. We segment it, write to it, and read the reporting that comes back. Those records are your customers' personal data, and none of it becomes ours.",
        },
        {
          bullets: [
            "You stay the controller of that data. We act on your instructions, as a processor.",
            "We work inside your platforms under our own named seats — not shared logins — so every action is attributable to a person.",
            "We do not export your list, copy it to our own systems, or retain it after an engagement ends beyond what is needed to hand over cleanly.",
            "When we offboard, our access is revoked. If you would rather revoke it yourself on day one, tell us and we will confirm once it is done.",
            "If you need a formal data processing agreement to satisfy your own obligations, ask and we will sign one.",
          ],
        },
      ],
    },
    {
      h2: "Who else handles it",
      blocks: [
        {
          p: "We are a small team and we use other people's software. Your information passes through the categories of provider below, each of which is bound by its own contract with us and none of which is permitted to use your data for its own purposes:",
        },
        {
          bullets: [
            "Website hosting and content delivery.",
            "Email and calendar, for correspondence.",
            "Call scheduling, for booking links.",
            "Email and SMS sending platforms, when you are a client and we send on your behalf from your account.",
            "Accounting and invoicing, for anyone we bill.",
          ],
        },
        {
          p: "Beyond those, we disclose information only where the law requires it, or where we genuinely need to in order to establish or defend a legal claim.",
        },
      ],
    },
    {
      h2: "Where it is held",
      blocks: [
        {
          p: "We work internationally, and our providers operate servers in several countries — most commonly the United States and the European Union. If you are somewhere with rules about moving personal data across borders, assume your information will be processed outside your own country and that we rely on our providers' standard contractual protections to do it.",
        },
      ],
    },
    {
      h2: "How long we keep it",
      blocks: [
        {
          bullets: [
            "Enquiries that never turned into anything: deleted within about two years of the last contact.",
            "Client records, contracts and invoices: kept for as long as tax and accounting rules require, and no longer.",
            "Marketing subscribers: kept until you unsubscribe, then suppressed rather than deleted, so that an unsubscribe cannot be undone by a later import.",
          ],
        },
      ],
    },
    {
      h2: "Your rights",
      blocks: [
        {
          p: "Depending on where you live you may have a formal right to some or all of the following. We would rather just honour them for everybody than argue about which regime applies to you:",
        },
        {
          bullets: [
            "Ask what we hold about you, and get a copy.",
            "Have anything wrong corrected.",
            "Have it deleted, where we are not required to keep it.",
            "Tell us to stop using it for marketing — always, immediately, no reason needed.",
            "Object to a particular use, or ask us to restrict it while we look into a complaint.",
            "Complain to your local data protection regulator if we get it wrong.",
          ],
        },
        {
          p: `Email ${LEGAL.email} and say what you want. We do not require a form, and we aim to resolve requests within 30 days.`,
        },
      ],
    },
    {
      h2: "Security, honestly stated",
      blocks: [
        {
          p: "We use access controls, two-factor authentication on the systems that hold client data, encrypted connections, and the principle that nobody gets an account they do not need. We review who has access to what when someone joins or leaves.",
        },
        {
          p: "What we will not tell you is that this is unbreakable. No transmission over the internet and no stored record is completely secure, and any policy claiming otherwise is overselling. If a breach ever affects your information, we will tell you and the relevant regulator promptly rather than quietly.",
        },
      ],
    },
    {
      h2: "Children",
      blocks: [
        {
          p: "This is a business-to-business service. It is not directed at children, and we do not knowingly collect information from anyone under 16. If you believe a child has sent us information, tell us and we will remove it.",
        },
      ],
    },
    {
      h2: "Links to other sites",
      blocks: [
        {
          p: "Our case studies link out to client stores, platform documentation and social profiles. Once you follow one of those links you are on someone else's site under someone else's policy. We are not responsible for what they collect.",
        },
      ],
    },
    {
      h2: "Changes",
      blocks: [
        {
          p: "When this policy changes, the date at the top of the page changes with it. If a change materially affects how we use information you have already given us, we will tell the people it affects directly rather than relying on you to re-read this page.",
        },
      ],
    },
    {
      h2: "Contact",
      blocks: [
        {
          p: "Questions about this policy, or about anything we hold on you:",
        },
        { contact: true },
      ],
    },
  ],
};

export const TERMS = {
  slug: "terms",
  eyebrow: "Terms & Conditions",
  title: "The Terms Behind This Site",
  intro:
    "What you agree to by using this site or applying for an audit, what our published results do and do not promise, and where a signed client agreement takes over from this page.",
  sections: [
    shortVersion([
      "Use the site lawfully and do not scrape it.",
      "Applying for an audit is not a contract, and it does not oblige either of us to anything.",
      "Our case study numbers are real and verified in-platform — and they are history, not a forecast for your brand.",
      "If you hire us, your signed agreement wins wherever it disagrees with this page.",
      "Inbox placement is decided by mailbox providers. We can influence it. We cannot guarantee it.",
    ]),
    {
      h2: "Agreeing to this",
      blocks: [
        {
          p: `Using ${LEGAL.site}, submitting a form, booking a call or applying for an audit means you accept these terms. If any part of them is unacceptable to you, the answer is to stop using the site — there is no version of this where you use it and the terms do not apply.`,
        },
        {
          p: "If you are agreeing on behalf of a company, you are confirming you are allowed to bind that company.",
        },
      ],
    },
    {
      h2: "Who you are dealing with",
      blocks: [
        {
          p: `${LEGAL.brand} is a retention marketing agency working with ecommerce brands on email, SMS and lifecycle revenue. Our contact and registered details are at the bottom of this page.`,
        },
      ],
    },
    {
      h2: "What this page governs, and what it does not",
      blocks: [
        {
          p: "This page governs the website and any general dealings before you become a client. It is not your service contract.",
        },
        {
          p: "If you engage us, the scope, fees, timelines, deliverables, ownership and termination terms live in a separate signed agreement, proposal or statement of work. Where that document and this page disagree, that document wins. Nothing here quietly overrides something you negotiated.",
        },
      ],
    },
    {
      h2: "Using the site",
      blocks: [
        { p: "Ordinary rules, briefly. Do not:" },
        {
          bullets: [
            "Use the site for anything unlawful, or in any way that interferes with it working for other people.",
            "Attempt to access parts of it you were not given access to.",
            "Scrape, crawl or bulk-copy the content, designs or case studies without written permission.",
            "Submit information you know to be false, or someone else's details as your own.",
            "Republish our material as your own work.",
          ],
        },
        {
          p: "We can restrict or block access if we reasonably believe any of the above is happening.",
        },
      ],
    },
    {
      h2: "Applying for an audit",
      blocks: [
        {
          p: "The audit is free and it is genuinely an audit — we look at your account and tell you what we find. That said, be clear about what an application is:",
        },
        {
          bullets: [
            "It does not create a client relationship, and it is not an offer we are bound to accept.",
            "We may decline. We turn down brands that are not a fit more often than we take them.",
            "Anything we tell you in an audit is our opinion based on limited access and limited time. Acting on it is your decision.",
            "You confirm the information you give us is accurate, and that you are entitled to grant any account access you grant us.",
          ],
        },
        {
          p: "By applying you agree we may contact you about that application using the details you provided.",
        },
      ],
    },
    {
      h2: "About the numbers on this site",
      blocks: [
        {
          note: "This section is deliberately blunt, because every figure we publish is a real client's and we would rather be trusted than impressive.",
        },
        {
          p: "The revenue figures, open rates, returning-customer rates and screenshots in our case studies are real, taken from the client's own platform reporting for the period stated, and published with that client's permission.",
        },
        {
          p: "They are also historic, specific to that brand, and no indication of what your brand will do. What a retention system produces depends on things we do not control and cannot fix from the outside: your product and pricing, margin, traffic quality and source, list size and how it was built, sender history, offer, creative, seasonality and the state of your store.",
        },
        {
          p: "So: we make no guarantee of any revenue figure, growth rate, open rate, retention rate or return on spend. Anyone in this industry who does is selling you something. Where a specific, measurable commitment is made to you, it will appear in your signed agreement — never in a marketing claim on a web page.",
        },
      ],
    },
    {
      h2: "Deliverability",
      blocks: [
        {
          p: "Some of our work is getting brands out of the spam folder and back into the inbox. It is worth being precise about who decides that.",
        },
        {
          p: "Mailbox providers — Gmail, Yahoo, Outlook, Apple and the rest — decide where your mail lands, using signals and thresholds they do not publish and change without notice. We influence those signals: authentication, list hygiene, sending patterns, segmentation, content and engagement. We do not control the outcome, and nobody can.",
        },
        {
          p: "Recovering a damaged sending reputation also takes time and usually requires sending less before you can send more. Where we recommend pausing sends, suppressing segments or reducing volume, following that advice is your choice — and declining it materially changes what is achievable.",
        },
      ],
    },
    {
      h2: "Becoming a client",
      blocks: [
        {
          bullets: [
            "Fees, billing dates, currency and scope are set out in your agreement or invoice.",
            "Retainers are billed in advance unless we have agreed otherwise in writing.",
            "If an invoice goes unpaid past its due date, we may pause work until it is settled. We will tell you before we do.",
            "Work outside the agreed scope is quoted and approved before it starts, not billed as a surprise afterwards.",
            "You are responsible for your own platform subscriptions and sending costs.",
          ],
        },
      ],
    },
    {
      h2: "Who owns what",
      blocks: [
        {
          p: "The site itself — its copy, design, structure, our frameworks and the way we present them — belongs to us. You may not copy or republish it without written permission.",
        },
        {
          p: "Work we produce for a client is dealt with in that client's agreement. As a general position: once you have paid for it, the campaigns, flows, templates and copy we build for your brand are yours to keep and keep using. What stays ours is the underlying method — the frameworks, checklists and internal tooling we bring to every engagement and would still own if we had never met.",
        },
        {
          p: "Anything you give us — brand assets, product imagery, copy, data — remains yours. You confirm you have the right to hand it over, and you allow us to use it for the purpose of doing your work.",
        },
      ],
    },
    {
      h2: "Using your results as a case study",
      blocks: [
        {
          p: "We ask before we publish. Every case study on this site went up with the client's agreement, and a client can ask us to anonymise or remove theirs at any point — some of the brands we work with prefer not to be named at all, which is why one of our studies is not.",
        },
      ],
    },
    {
      h2: "Third-party platforms",
      blocks: [
        {
          p: "Our work runs on other companies' software — Shopify, Klaviyo, Omnisend and similar. Your use of those tools is governed by their terms, not ours.",
        },
        {
          p: "We are not responsible for their outages, pricing changes, feature removals, policy decisions, account suspensions or data loss. If one of them breaks or changes the rules mid-engagement, we will work around it — but we cannot be liable for it.",
        },
      ],
    },
    {
      h2: "Privacy",
      blocks: [
        {
          p: "How we handle personal information is set out in our Privacy Policy, which forms part of these terms.",
          link: { href: "/privacy-policy", label: "Read the Privacy Policy" },
        },
      ],
    },
    {
      h2: "The site is provided as it is",
      blocks: [
        {
          p: "We publish this site in good faith and keep it accurate, but we provide it “as is” and “as available”. We do not warrant that it will be uninterrupted, error-free, secure, or that the information on it is complete or current at the moment you read it.",
        },
        {
          p: "Nothing on this site is legal, tax, accounting or financial advice.",
        },
      ],
    },
    {
      h2: "Limits on liability",
      blocks: [
        {
          p: "To the fullest extent the law allows, we are not liable for indirect or consequential loss, lost profits, lost revenue, lost data, or loss of anticipated savings arising from your use of this site or reliance on anything published on it.",
        },
        {
          p: "Where liability cannot be excluded, it is limited to the amount you have actually paid us in the three months before the claim arose — or, if you are not a client, to a nominal sum.",
        },
        {
          p: "None of this attempts to exclude liability for fraud, or for anything that cannot lawfully be excluded.",
        },
      ],
    },
    {
      h2: "Ending access",
      blocks: [
        {
          p: "We may suspend or withdraw access to the site where these terms are being breached, where the site is being misused, or where continuing to provide it creates a legal or security risk. The sections that ought to survive that — ownership, liability, governing law — do.",
        },
      ],
    },
    {
      h2: "Governing law",
      blocks: [
        {
          p: `These terms are governed by the laws of ${LEGAL.jurisdiction}, and the courts of ${LEGAL.jurisdiction} have jurisdiction over any dispute arising from them. Where you deal with us as a consumer in your own country, this does not remove protections you have under your local law that cannot be contracted out of.`,
        },
      ],
    },
    {
      h2: "Changes",
      blocks: [
        {
          p: "We may update these terms. The revised version is posted here with a new date at the top, and continuing to use the site after that means you accept it. Terms already agreed inside a signed client contract do not change because this page did.",
        },
      ],
    },
    {
      h2: "Contact",
      blocks: [
        { p: "Questions about these terms:" },
        { contact: true },
      ],
    },
  ],
};
