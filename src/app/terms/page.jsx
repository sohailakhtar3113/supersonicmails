import LegalPage from "@/components/LegalPage";
import { TERMS } from "@/components/legalContent";
import { LEGAL } from "@/components/site";

export const metadata = {
  title: `Terms & Conditions | ${LEGAL.brand}`,
  description:
    "The terms behind supersonicmails.com — what applying for an audit does and does not commit you to, and what our published case study results do and do not promise.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage doc={TERMS} />;
}
