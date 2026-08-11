import LegalPage from "@/components/LegalPage";
import { PRIVACY } from "@/components/legalContent";
import { LEGAL } from "@/components/site";

export const metadata = {
  title: `Privacy Policy | ${LEGAL.brand}`,
  description:
    "What Supersonic Mails collects when you read the site, apply for an audit or work with us — what we never do with it, and how to have it deleted.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={PRIVACY} />;
}
