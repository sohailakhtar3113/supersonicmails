import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsPartners from "@/components/StatsPartners";
import Vsl from "@/components/Vsl";
import Testimonials from "@/components/Testimonials";
import Reviews from "@/components/Reviews";
import GrowthCta from "@/components/GrowthCta";
import Comparison from "@/components/Comparison";
import Campaigns from "@/components/Campaigns";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import Guarantee from "@/components/Guarantee";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <StatsPartners />
        <Vsl />
        <Testimonials />
        <Reviews />
        <GrowthCta />
        <Comparison />
        <Campaigns />
        <Process />
        <CaseStudies />
        <Guarantee />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
