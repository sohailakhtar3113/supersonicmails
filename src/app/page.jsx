import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandTrust from "@/components/BrandTrust";
import StatsPartners from "@/components/StatsPartners";
import Vsl from "@/components/Vsl";
import ShortsShowcase from "@/components/ShortsShowcase";
import Reviews from "@/components/Reviews";
import Comparison from "@/components/Comparison";
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
        {/* Trusted Partners (Shopify, Klaviyo, Omnisend) + headline stats */}
        <StatsPartners />
        {/* See How We Can Help (VSL) */}
        {/* <Vsl /> */}
        {/* Hear From Our Fastest Scaling Brand Owners (2 shorts) + CTA */}
        <ShortsShowcase />
        {/* Trustpilot reviews */}
        {/* <Reviews /> */}
        {/* Other Agencies vs Supersonic Mails */}
        <Comparison />
        {/* <Faq /> */}
        {/* <FinalCta /> */}
      </main>
      <Footer />
    </>
  );
}
