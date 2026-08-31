import type { City } from "@/lib/domain/types";
import { getEligibleCities } from "@/lib/markets/eligibility";

export interface TargetCity extends City {
  workLanguage: "English-compatible";
  taxNote: string;
  workLanguageNote: string;
  accessRisk: string;
  roleThemes: string[];
}

function city(
  id: string,
  name: string,
  nameZh: string,
  country: string,
  countryZh: string,
  region: TargetCity["region"],
  scores: [number, number, number, number, number, number],
  details: Pick<TargetCity, "taxNote" | "workLanguageNote" | "accessRisk" | "roleThemes">,
): TargetCity {
  const [compensation, roleDensity, englishUsability, access, personalAdvantage, careerCapital] = scores;
  return {
    id, name, nameZh, country, countryZh, region, compensation, roleDensity,
    englishUsability, access, personalAdvantage, careerCapital,
    workLanguage: "English-compatible",
    notes: [details.workLanguageNote, details.accessRisk],
    ...details,
  };
}

const gccDetails = (accessRisk: string, roleThemes: string[]) => ({
  taxNote: "No personal income tax; verify total package and allowances.",
  workLanguageNote: "English is widely used in international and technology teams.",
  accessRisk,
  roleThemes,
});

export const evaluatedCities: TargetCity[] = [
  city("abu-dhabi", "Abu Dhabi", "阿布扎比", "United Arab Emirates", "阿联酋", "gcc", [94, 88, 97, 94, 98, 96], gccDetails("Strong local position; verify employer sponsorship.", ["Sovereign AI", "Applied science", "Financial ML"])),
  city("dubai", "Dubai", "迪拜", "United Arab Emirates", "阿联酋", "gcc", [90, 95, 98, 93, 94, 92], gccDetails("Broad sponsorship market with high competition.", ["AI engineering", "Product", "Consulting"])),
  city("riyadh", "Riyadh", "利雅得", "Saudi Arabia", "沙特阿拉伯", "gcc", [93, 94, 88, 82, 69, 94], gccDetails("Fast-growing market; verify relocation and Saudization constraints.", ["National AI", "Consulting", "GenAI"])),
  city("doha", "Doha", "多哈", "Qatar", "卡塔尔", "gcc", [86, 70, 93, 84, 76, 82], gccDetails("Smaller market; sponsorship must be checked role by role.", ["Research AI", "Energy", "Aviation analytics"])),
  city("kuwait-city", "Kuwait City", "科威特城", "Kuwait", "科威特", "gcc", [82, 58, 88, 70, 58, 68], gccDetails("Limited role volume; prioritize official telecom and finance roles.", ["Telecom AI", "Banking analytics", "Digital government"])),
  city("manama", "Manama", "麦纳麦", "Bahrain", "巴林", "gcc", [76, 62, 92, 76, 63, 72], gccDetails("English-friendly but compact market; verify visa and package.", ["Fintech", "Telecom data", "Consulting"])),
  city("tel-aviv", "Tel Aviv", "特拉维夫", "Israel", "以色列", "israel", [88, 99, 86, 36, 40, 98], { taxNote: "Progressive income tax; compare net compensation.", workLanguageNote: "Many global technology teams operate in English; Hebrew varies by role.", accessRisk: "Work authorization and geopolitical risk require early verification.", roleThemes: ["Applied ML", "GenAI", "Cyber AI"] }),
  city("herzliya", "Herzliya", "荷兹利亚", "Israel", "以色列", "israel", [90, 94, 88, 35, 38, 96], { taxNote: "Progressive income tax.", workLanguageNote: "English common in multinational R&D.", accessRisk: "High work-authorization uncertainty.", roleThemes: ["Apple ML", "Microsoft R&D", "Product AI"] }),
  city("haifa", "Haifa", "海法", "Israel", "以色列", "israel", [85, 90, 84, 34, 36, 94], { taxNote: "Progressive income tax.", workLanguageNote: "English is common in multinational engineering research.", accessRisk: "Verify work permit before investing in tailoring.", roleThemes: ["Computer vision", "Hardware ML", "Research"] }),
  city("jerusalem", "Jerusalem", "耶路撒冷", "Israel", "以色列", "israel", [78, 72, 78, 32, 35, 85], { taxNote: "Progressive income tax.", workLanguageNote: "English-compatible research roles exist; Hebrew may be required.", accessRisk: "Work authorization and language must be verified.", roleThemes: ["Academic AI", "Healthcare", "Public-sector tech"] }),
  city("raanana-petah-tikva", "Ra’anana / Petah Tikva", "拉阿纳纳 / 佩塔提克瓦", "Israel", "以色列", "israel", [84, 84, 84, 34, 36, 91], { taxNote: "Progressive income tax.", workLanguageNote: "Multinational R&D often works in English.", accessRisk: "High work-authorization uncertainty.", roleThemes: ["Enterprise AI", "Cloud ML", "Telecom"] }),
  city("beer-sheva", "Be’er Sheva", "贝尔谢巴", "Israel", "以色列", "israel", [72, 66, 76, 32, 35, 82], { taxNote: "Progressive income tax.", workLanguageNote: "English-compatible university and cyber roles exist.", accessRisk: "Smaller market and work permit uncertainty.", roleThemes: ["Cyber AI", "Research", "Autonomy"] }),
  city("sydney", "Sydney", "悉尼", "Australia", "澳大利亚", "australia", [90, 96, 100, 58, 50, 96], { taxNote: "Progressive tax; compare superannuation-inclusive packages.", workLanguageNote: "English is the default work language.", accessRisk: "Visa sponsorship is role-dependent; defence roles may require citizenship.", roleThemes: ["Quant ML", "AI product", "Applied science"] }),
  city("melbourne", "Melbourne", "墨尔本", "Australia", "澳大利亚", "australia", [84, 91, 100, 59, 49, 92], { taxNote: "Progressive tax plus superannuation.", workLanguageNote: "English is the default work language.", accessRisk: "Visa sponsorship must be verified.", roleThemes: ["Data science", "Research AI", "Product"] }),
  city("canberra", "Canberra", "堪培拉", "Australia", "澳大利亚", "australia", [88, 75, 100, 28, 42, 88], { taxNote: "Progressive tax plus superannuation.", workLanguageNote: "English is the default work language.", accessRisk: "Many government and defence roles require citizenship and clearance.", roleThemes: ["Defence AI", "Public sector analytics", "Consulting"] }),
  city("brisbane", "Brisbane", "布里斯班", "Australia", "澳大利亚", "australia", [78, 77, 100, 60, 48, 82], { taxNote: "Progressive tax plus superannuation.", workLanguageNote: "English is the default work language.", accessRisk: "Fewer sponsor-ready AI roles than Sydney or Melbourne.", roleThemes: ["Mining AI", "Health data", "Cloud"] }),
  city("perth", "Perth", "珀斯", "Australia", "澳大利亚", "australia", [84, 68, 100, 55, 45, 80], { taxNote: "Progressive tax plus superannuation.", workLanguageNote: "English is the default work language.", accessRisk: "Market is concentrated in resources and industrial AI.", roleThemes: ["Mining analytics", "Industrial AI", "Optimization"] }),
  city("adelaide", "Adelaide", "阿德莱德", "Australia", "澳大利亚", "australia", [74, 64, 100, 37, 43, 78], { taxNote: "Progressive tax plus superannuation.", workLanguageNote: "English is the default work language.", accessRisk: "Defence concentration creates citizenship constraints.", roleThemes: ["Defence AI", "Computer vision", "Research"] }),
  city("auckland", "Auckland", "奥克兰", "New Zealand", "新西兰", "new_zealand", [73, 78, 100, 61, 47, 82], { taxNote: "Progressive income tax; compare KiwiSaver and living costs.", workLanguageNote: "English is the default work language.", accessRisk: "Smaller sponsorship pool; verify accredited-employer pathway.", roleThemes: ["Data science", "Aviation AI", "SaaS"] }),
  city("wellington", "Wellington", "惠灵顿", "New Zealand", "新西兰", "new_zealand", [70, 72, 100, 48, 44, 80], { taxNote: "Progressive income tax.", workLanguageNote: "English is the default work language.", accessRisk: "Government roles may carry residence or citizenship requirements.", roleThemes: ["Public data", "Consulting", "Research"] }),
  city("christchurch", "Christchurch", "基督城", "New Zealand", "新西兰", "new_zealand", [66, 58, 100, 56, 42, 72], { taxNote: "Progressive income tax.", workLanguageNote: "English is the default work language.", accessRisk: "Low role volume; treat as selective expansion market.", roleThemes: ["Geospatial AI", "Agritech", "Engineering"] }),
  city("johannesburg", "Johannesburg", "约翰内斯堡", "South Africa", "南非", "south_africa", [64, 84, 98, 65, 46, 82], { taxNote: "Progressive income tax; benchmark in ZAR and global purchasing power.", workLanguageNote: "English is the principal corporate work language.", accessRisk: "Verify visa eligibility, security and commute expectations.", roleThemes: ["Financial ML", "Enterprise AI", "Consulting"] }),
  city("sandton-midrand", "Sandton / Midrand", "桑顿 / 米德兰", "South Africa", "南非", "south_africa", [68, 86, 98, 65, 47, 84], { taxNote: "Progressive income tax.", workLanguageNote: "English is standard across corporate and telecom teams.", accessRisk: "Visa, location and security require practical due diligence.", roleThemes: ["Telecom GenAI", "Banking data", "Product"] }),
  city("cape-town", "Cape Town", "开普敦", "South Africa", "南非", "south_africa", [62, 82, 98, 63, 44, 86], { taxNote: "Progressive income tax.", workLanguageNote: "English is standard in technology teams.", accessRisk: "International roles are attractive but sponsor volume varies.", roleThemes: ["Cloud AI", "SaaS", "Amazon"] }),
  city("pretoria", "Pretoria", "比勒陀利亚", "South Africa", "南非", "south_africa", [58, 62, 96, 58, 42, 72], { taxNote: "Progressive income tax.", workLanguageNote: "English-compatible research and public roles exist.", accessRisk: "Government-adjacent access rules vary.", roleThemes: ["Research", "Public analytics", "Defence"] }),
  city("stellenbosch", "Stellenbosch", "斯泰伦博斯", "South Africa", "南非", "south_africa", [57, 58, 96, 59, 42, 77], { taxNote: "Progressive income tax.", workLanguageNote: "English is common in university and startup teams.", accessRisk: "Small market; prioritize specific research and startup fits.", roleThemes: ["Academic AI", "Agritech", "Fintech"] }),
  city("singapore", "Singapore", "新加坡", "Singapore", "新加坡", "southeast_asia", [92, 96, 100, 78, 70, 98], { taxNote: "Progressive income tax; compare base pay, bonus, equity and housing costs.", workLanguageNote: "English is the principal professional language across multinational technology teams.", accessRisk: "Employment Pass eligibility and employer sponsorship must be checked for each role.", roleThemes: ["Applied AI", "Regional AI product", "Quant ML"] }),
  city("hong-kong", "Hong Kong", "香港", "Hong Kong SAR", "中国香港", "greater_china", [92, 88, 96, 76, 66, 96], { taxNote: "Territorial salaries tax is comparatively low; verify housing-adjusted net package.", workLanguageNote: "English is widely used in finance and multinational technology teams; Cantonese or Mandarin varies by role.", accessRisk: "Verify employer sponsorship and role-specific Chinese-language expectations.", roleThemes: ["Financial ML", "AI product", "Cloud AI"] }),
  city("macau", "Macau", "澳门", "Macau SAR", "中国澳门", "greater_china", [78, 48, 72, 68, 50, 66], { taxNote: "Professional tax is comparatively low; compare the complete package and housing.", workLanguageNote: "English-compatible roles exist in hospitality and international operations, but Chinese or Portuguese can be required.", accessRisk: "Small AI role volume keeps Macau in the research queue below the active threshold.", roleThemes: ["Hospitality analytics", "Risk", "Digital operations"] }),
  city("beijing", "Beijing", "北京", "China", "中国", "greater_china", [86, 98, 66, 68, 62, 97], { taxNote: "Progressive individual income tax; compare cash, bonus, equity and social benefits.", workLanguageNote: "English-first work is concentrated in global and research teams; Mandarin is common elsewhere.", accessRisk: "Verify work permit eligibility and the actual team language before tailoring.", roleThemes: ["Frontier AI research", "LLM engineering", "AI strategy"] }),
  city("shanghai", "Shanghai", "上海", "China", "中国", "greater_china", [90, 98, 76, 72, 68, 98], { taxNote: "Progressive individual income tax; compare international and local package structures.", workLanguageNote: "Multinational R&D, product and finance teams often support English; Mandarin expands the market.", accessRisk: "Employer sponsorship and language requirements remain role-specific.", roleThemes: ["Applied science", "Financial ML", "Global AI product"] }),
  city("guangzhou", "Guangzhou", "广州", "China", "中国", "greater_china", [78, 82, 62, 70, 60, 82], { taxNote: "Progressive individual income tax; compare total rewards and housing costs.", workLanguageNote: "English-compatible roles are selective; Mandarin is normally important outside multinational teams.", accessRisk: "Use official role evidence to confirm English working and work-permit support.", roleThemes: ["E-commerce AI", "Mobility data", "Industrial AI"] }),
  city("shenzhen", "Shenzhen", "深圳", "China", "中国", "greater_china", [90, 98, 70, 70, 66, 98], { taxNote: "Progressive individual income tax; equity and bonus can materially affect total rewards.", workLanguageNote: "English is viable in selected global R&D teams; Mandarin is common across the wider market.", accessRisk: "Verify work authorization, language and team scope before applying.", roleThemes: ["Foundation models", "Hardware AI", "Product engineering"] }),
  city("hangzhou", "Hangzhou", "杭州", "China", "中国", "greater_china", [82, 92, 60, 69, 60, 94], { taxNote: "Progressive individual income tax; compare total rewards and living costs.", workLanguageNote: "English-compatible roles cluster in global commerce and research teams; Mandarin is usually valuable.", accessRisk: "Confirm the working language and foreign-talent pathway at requisition level.", roleThemes: ["Cloud AI", "E-commerce ML", "Foundation models"] }),
  city("london", "London", "伦敦", "United Kingdom", "英国", "europe", [92, 100, 100, 65, 60, 100], { taxNote: "Progressive income tax; compare pension, bonus, equity and high housing costs.", workLanguageNote: "English is the default work language across the market.", accessRisk: "Skilled Worker sponsorship is employer and role dependent.", roleThemes: ["Frontier AI", "Quant ML", "AI product"] }),
  city("dublin", "Dublin", "都柏林", "Ireland", "爱尔兰", "europe", [84, 90, 100, 68, 58, 94], { taxNote: "Progressive income tax; benchmark equity and housing-adjusted net compensation.", workLanguageNote: "English is the default work language.", accessRisk: "Critical Skills permit eligibility and employer sponsorship must be verified.", roleThemes: ["Cloud AI", "Trust and safety ML", "AI product"] }),
  city("amsterdam", "Amsterdam", "阿姆斯特丹", "Netherlands", "荷兰", "europe", [84, 90, 98, 64, 55, 95], { taxNote: "Progressive income tax; verify current expatriate tax treatment and pension.", workLanguageNote: "English is widely used in international technology and finance teams.", accessRisk: "Highly Skilled Migrant sponsorship requires a recognized sponsor and qualifying role.", roleThemes: ["AI product", "Fintech ML", "Applied science"] }),
  city("berlin", "Berlin", "柏林", "Germany", "德国", "europe", [80, 94, 92, 64, 54, 96], { taxNote: "Progressive income tax and social contributions; compare full benefits.", workLanguageNote: "Many international technology teams work in English; German expands options.", accessRisk: "EU Blue Card or other permit feasibility depends on qualifications and salary.", roleThemes: ["GenAI engineering", "Startup AI", "Research engineering"] }),
  city("munich", "Munich", "慕尼黑", "Germany", "德国", "europe", [88, 86, 84, 62, 50, 96], { taxNote: "Progressive income tax and social contributions; housing costs are material.", workLanguageNote: "English is common in multinational R&D; German is required for some customer-facing roles.", accessRisk: "Verify Blue Card eligibility and team language early.", roleThemes: ["Industrial AI", "Autonomous systems", "Applied research"] }),
  city("paris", "Paris", "巴黎", "France", "法国", "europe", [82, 94, 70, 58, 48, 98], { taxNote: "Progressive tax and social contributions; compare profit sharing and benefits.", workLanguageNote: "English-first roles exist in global AI labs and scale-ups; French materially expands access.", accessRisk: "Confirm employer sponsorship and team language at the JD level.", roleThemes: ["AI research", "Applied science", "AI product"] }),
  city("zurich", "Zurich", "苏黎世", "Switzerland", "瑞士", "europe", [99, 88, 96, 50, 46, 100], { taxNote: "Cantonal taxation varies; compare very high living costs with the complete package.", workLanguageNote: "English is common in global technology and research teams; German expands the market.", accessRisk: "Non-EU work permits are quota-constrained and highly selective.", roleThemes: ["Research AI", "Quant ML", "Systems ML"] }),
  city("stockholm", "Stockholm", "斯德哥尔摩", "Sweden", "瑞典", "europe", [80, 86, 96, 64, 50, 94], { taxNote: "Progressive tax; compare pension, leave and other benefits.", workLanguageNote: "English is widely used in technology companies.", accessRisk: "Employer-sponsored work authorization remains role dependent.", roleThemes: ["AI product", "Fintech", "Applied ML"] }),
];

export const targetCities: TargetCity[] = getEligibleCities(evaluatedCities);
