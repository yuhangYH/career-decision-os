import { PageHeader } from "@/components/app/page-header";
import { CvPortfolio } from "@/components/career-studio/cv-portfolio";
import { candidateEvidence, cvNarratives } from "@/lib/seed/candidate";

export default function CvPage() {
  return (
    <>
      <PageHeader eyebrow="CV STUDIO · 一套证据，四种叙事" title="每一条主张都能回到同一个事实库" description={`已验证 ${candidateEvidence.length} 组证据。不同版本只调整顺序和语言，不创造新事实。`} />
      <CvPortfolio variants={cvNarratives} />
    </>
  );
}
