import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandTrust from "@/components/BrandTrust";
import TrustedPartners from "@/components/TrustedPartners";
import StatsPartners from "@/components/StatsPartners";
import Vsl from "@/components/Vsl";
import ShortsShowcase from "@/components/ShortsShowcase";
import TrustReviews from "@/components/TrustReviews";
import Reviews from "@/components/Reviews";
import Comparison from "@/components/Comparison";
import DesignShowcase from "@/components/DesignShowcase";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* Hero — preheadline, headline, guarantee subtext, CTA, 5★ reviews */}
        <Hero />
        {/* Social proof — brands that trust us */}
        <BrandTrust />
        {/* Our Trusted Partners — Shopify · Klaviyo · Omnisend */}
        <TrustedPartners />
        <DesignShowcase />
        {/* Engineered For 8-Figure Brands (stats) */}
        <StatsPartners />
        {/* See How We Can Help (VSL) */}
        {/* <Vsl /> */}
        {/* Hear From Our Fastest Scaling Brand Owners (2 shorts) + CTA */}
        <ShortsShowcase />
        {/* Verified Trustpilot review screenshots */}
        <TrustReviews />
        {/* Trustpilot reviews */}
        {/* <Reviews /> */}
        {/* Other Agencies vs Supersonic Mails */}
        <Comparison />
        {/* Our 8-Fig Scaling Framework */}
        <Process />
        {/* Case Studies — The Results Speak For Themselves */}
        {/* <CaseStudies /> */}
        {/* Designs printing 7 figs/year — the design wall (before FAQs) */}

        {/* <Faq /> */}
        {/* <FinalCta /> */}
      </main>
      <Footer />
    </>
  );
}
