import type { City } from "@/lib/domain/types";

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

export const targetCities: TargetCity[] = [
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
];
