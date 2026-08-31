import type { Company, RoleFamily } from "@/lib/domain/types";

export interface TargetCompany extends Company {
  whyAttractive: string;
  uncertainty: string;
  contactsCount: number;
  fiveYearWillingness: number;
  compensationPotential: "high" | "medium" | "unknown";
}

const allTechnical: RoleFamily[] = ["ai_ml_engineer", "applied_scientist", "agent_genai_engineer", "data_scientist"];

function company(
  id: string,
  name: string,
  tier: Company["tier"],
  careersUrl: string,
  cityIds: string[],
  roleFamilies: RoleFamily[],
  whyAttractive: string,
  uncertainty: string,
  willingness: number,
  compensationPotential: TargetCompany["compensationPotential"] = "high",
): TargetCompany {
  return { id, name, tier, careersUrl, cityIds, roleFamilies, rationale: whyAttractive, whyAttractive, uncertainty, contactsCount: 0, fiveYearWillingness: willingness, compensationPotential };
}

export const targetCompanies: TargetCompany[] = [
  company("g42", "G42", "S", "https://careers.g42.ai/", ["abu-dhabi"], allTechnical, "Flagship Abu Dhabi AI ecosystem and high local leverage.", "Role scope varies across operating companies.", 95),
  company("inception", "Inception", "S", "https://careers.g42.ai/us/en/inception", ["abu-dhabi"], allTechnical, "Frontier applied AI and LLM product work.", "Hiring is selective and production evidence matters.", 94),
  company("core42", "Core42", "S", "https://careers.g42.ai/us/en/core42", ["abu-dhabi", "dubai"], ["ai_ml_engineer", "agent_genai_engineer", "ai_product"], "AI cloud and enterprise deployment platform.", "Some roles emphasize infrastructure depth.", 92),
  company("presight", "Presight", "S", "https://careers.presight.ai/", ["abu-dhabi"], ["data_scientist", "ai_ml_engineer", "ai_product"], "Public-company scale and data-to-impact narrative.", "Government project context varies.", 90),
  company("m42", "M42", "A", "https://careers.m42.ae/", ["abu-dhabi"], ["applied_scientist", "data_scientist", "ai_product"], "Healthcare AI with high societal impact.", "Domain experience may be preferred.", 84),
  company("aiq", "AIQ", "A", "https://careers.aiqintelligence.ae/", ["abu-dhabi"], ["ai_ml_engineer", "data_scientist", "ai_product"], "Industrial AI with direct energy impact.", "Domain-specific expectations require mapping.", 86),
  company("mbzuai", "MBZUAI", "S", "https://careers.mbzuai.ac.ae/", ["abu-dhabi"], ["applied_scientist", "agent_genai_engineer"], "World-class AI research in the target city.", "Academic hiring cycles and publication fit vary.", 93, "medium"),
  company("khalifa-university", "Khalifa University", "A", "https://www.ku.ac.ae/careers", ["abu-dhabi"], ["applied_scientist", "data_scientist"], "Existing network and research credibility.", "Faculty and postdoc pathways differ from industry.", 82, "medium"),
  company("adia", "ADIA", "S", "https://careers.adia.ae/", ["abu-dhabi"], ["quant_financial_ml", "data_scientist"], "Direct finance and time-series alignment.", "Openings are scarce and highly selective.", 97),
  company("adia-lab", "ADIA Lab", "S", "https://www.adialab.ae/careers", ["abu-dhabi"], ["applied_scientist", "quant_financial_ml"], "Research excellence with financial relevance.", "Small team and limited hiring volume.", 96),
  company("hub71", "Hub71 ecosystem", "A", "https://www.hub71.com/careers", ["abu-dhabi"], ["ai_product", "agent_genai_engineer"], "Access to emerging AI startups and product ownership.", "Company quality and compensation vary.", 77, "unknown"),
  company("space42", "Space42", "A", "https://careers.space42.ai/", ["abu-dhabi"], ["ai_ml_engineer", "applied_scientist", "ai_product"], "Geospatial AI and strategic technology.", "Security and domain constraints may apply.", 83),
  company("careem", "Careem", "A", "https://www.careem.com/en-AE/careers/", ["dubai"], ["data_scientist", "ai_ml_engineer", "ai_product"], "Strong regional product and experimentation culture.", "High competition and role location changes.", 88),
  company("emirates-group", "Emirates Group", "A", "https://www.emiratesgroupcareers.com/", ["dubai"], ["data_scientist", "ai_product", "ai_strategy"], "Large-scale aviation data and optimization.", "Some roles are transformation rather than core AI.", 78),
  company("aws-uae", "AWS UAE", "S", "https://www.amazon.jobs/en/locations/united-arab-emirates", ["dubai", "abu-dhabi"], ["ai_ml_engineer", "ai_product", "ai_strategy"], "Global cloud brand and customer AI transformation.", "Citizenship and customer-facing experience vary by role.", 91),
  company("microsoft-uae", "Microsoft UAE", "S", "https://jobs.careers.microsoft.com/global/en/search?q=AI&lc=United%20Arab%20Emirates", ["dubai", "abu-dhabi"], ["ai_ml_engineer", "ai_product", "ai_strategy"], "Global AI platform and regional enterprise reach.", "Local role volume is uneven.", 91),
  company("accenture-middle-east", "Accenture Middle East", "A", "https://www.accenture.com/ae-en/careers/jobsearch", ["dubai", "riyadh"], ["ai_strategy", "ai_product", "data_scientist"], "Large AI transformation pipeline.", "Project staffing and travel vary.", 78),
  company("pwc-middle-east", "PwC Middle East", "A", "https://www.pwc.com/m1/en/careers.html", ["dubai", "riyadh", "doha"], ["ai_strategy", "ai_product", "data_scientist"], "Regional network and strategy-to-implementation exposure.", "Role titles may overstate technical depth.", 76),
  company("bcg-x", "BCG X", "S", "https://careers.bcg.com/global/en/teams/bcg-x", ["dubai", "riyadh"], ["ai_strategy", "ai_product", "data_scientist"], "Premium strategy plus AI build work.", "Case interviews and travel intensity.", 88),
  company("quantumblack", "QuantumBlack, AI by McKinsey", "S", "https://www.mckinsey.com/careers/search-jobs", ["dubai", "riyadh"], ["ai_strategy", "data_scientist", "ai_ml_engineer"], "High-calibre analytics and transformation work.", "Regional technical openings are intermittent.", 87),
  company("1001-ai", "1001 AI", "A", "https://careers.1001.ai/", ["doha", "dubai"], allTechnical, "Current official applied ML opportunity in Doha.", "Smaller company; verify package and sponsorship.", 84),
  company("qcri", "Qatar Computing Research Institute", "A", "https://www.hbku.edu.qa/en/qcri/careers", ["doha"], ["applied_scientist", "agent_genai_engineer"], "High-quality research with applied pathways.", "Project funding and hiring cycles vary.", 84, "medium"),
  company("qatar-airways", "Qatar Airways", "A", "https://careers.qatarairways.com/global/en", ["doha"], ["data_scientist", "ai_product"], "Large operational data and optimization problems.", "Some roles are analytics rather than advanced ML.", 74),
  company("udst", "University of Doha for Science and Technology", "B", "https://careers.udst.edu.qa/", ["doha"], ["applied_scientist", "data_scientist"], "English-working applied academic environment.", "Compensation and research depth need verification.", 66, "medium"),
  company("sdaia", "SDAIA", "S", "https://careers.sdaia.gov.sa/", ["riyadh"], ["ai_strategy", "applied_scientist", "data_scientist"], "Central Saudi national AI mandate.", "Nationality restrictions may apply.", 85),
  company("humain", "HUMAIN", "S", "https://www.humain.ai/careers", ["riyadh"], ["agent_genai_engineer", "ai_ml_engineer", "ai_product"], "Large-scale emerging AI platform investment.", "Fast-changing organization and role definitions.", 89),
  company("stc", "stc", "A", "https://careers.stc.com.sa/", ["riyadh"], ["data_scientist", "ai_product", "ai_strategy"], "Regional telecom scale and digital transformation.", "Arabic and localization requirements vary.", 73),
  company("elm", "Elm", "A", "https://careers.elm.sa/", ["riyadh"], ["data_scientist", "ai_product", "ai_strategy"], "Digital government product scale.", "Nationality constraints need early verification.", 72),
  company("zain-kuwait", "Zain Kuwait", "B", "https://careers.zain.com/", ["kuwait-city"], ["data_scientist", "ai_product"], "Telecom AI and analytics in an English-compatible team.", "Low role volume.", 64),
  company("zain-bahrain", "Zain Bahrain", "B", "https://careers.zain.com/", ["manama"], ["data_scientist", "ai_product"], "Compact fintech and telecom market entry.", "Compensation and technical depth vary.", 62),
  company("apple-israel", "Apple Israel", "S", "https://jobs.apple.com/en-il/search?location=israel-ISR", ["herzliya", "haifa"], ["applied_scientist", "ai_ml_engineer"], "Elite applied ML and hardware-software research.", "Work authorization is a major constraint.", 94),
  company("microsoft-israel", "Microsoft Israel", "S", "https://jobs.careers.microsoft.com/global/en/search?lc=Israel", ["herzliya", "tel-aviv"], ["applied_scientist", "agent_genai_engineer", "ai_product"], "Frontier AI R&D and product scale.", "Work authorization and language vary.", 93),
  company("nvidia-israel", "NVIDIA Israel", "S", "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?q=Israel", ["tel-aviv", "raanana-petah-tikva", "beer-sheva"], ["applied_scientist", "ai_ml_engineer"], "Deep learning infrastructure and research.", "Hardware systems fit and access constraints.", 92),
  company("xero", "Xero", "A", "https://jobs.ashbyhq.com/xero", ["melbourne", "sydney", "auckland", "wellington"], ["applied_scientist", "data_scientist", "ai_product"], "Current applied science and mature product culture.", "Visa sponsorship varies by opening.", 85),
  company("atlassian", "Atlassian", "S", "https://www.atlassian.com/company/careers/all-jobs", ["sydney"], ["ai_ml_engineer", "data_scientist", "ai_product"], "Global product brand and distributed engineering.", "Strong competition and location policy changes.", 91),
  company("canva", "Canva", "S", "https://www.canva.com/careers/jobs/", ["sydney"], ["ai_ml_engineer", "applied_scientist", "ai_product"], "AI-native creative product at scale.", "High bar for product impact and engineering.", 92),
  company("optiver", "Optiver Sydney", "S", "https://optiver.com/working-at-optiver/career-opportunities/", ["sydney"], ["quant_financial_ml", "ai_ml_engineer"], "Top-tier quantitative research and compensation.", "Interview bar and market-making fit.", 95),
  company("air-new-zealand", "Air New Zealand", "A", "https://careers.airnewzealand.co.nz/", ["auckland"], ["data_scientist", "ai_product"], "Operational data science with visible business impact.", "Smaller market and compensation ceiling.", 73, "medium"),
  company("vodacom", "Vodacom", "A", "https://opportunities.vodafone.com/Vodacom/", ["sandton-midrand", "johannesburg"], ["agent_genai_engineer", "data_scientist", "ai_product"], "Current GenAI and agentic data-science demand.", "Compensation should be benchmarked globally.", 75, "medium"),
  company("lexisnexis", "RELX / LexisNexis", "A", "https://relx.wd3.myworkdayjobs.com/relx", ["cape-town", "johannesburg"], ["ai_ml_engineer", "agent_genai_engineer", "data_scientist"], "Global legal-tech AI and English-first work.", "Team location and remote eligibility vary.", 80),
  company("standard-bank", "Standard Bank", "A", "https://careers.standardbank.com/", ["johannesburg"], ["quant_financial_ml", "data_scientist", "ai_product"], "Large financial ML environment.", "Local compensation and visa feasibility.", 72, "medium"),
  company("absa", "Absa", "B", "https://www.absa.africa/absaafrica/careers/", ["johannesburg"], ["quant_financial_ml", "data_scientist"], "Banking analytics and risk modelling.", "Role seniority and visa support vary.", 66, "medium"),
  company("amazon-cape-town", "Amazon Cape Town", "A", "https://www.amazon.jobs/en/locations/cape-town-south-africa", ["cape-town"], ["ai_ml_engineer", "applied_scientist", "ai_product"], "Global engineering brand and cloud ecosystem.", "Open AI role volume fluctuates.", 82),
];
