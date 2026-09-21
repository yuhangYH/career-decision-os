import type {
  CompanyOffice,
  CompanyOfficeEvidence,
} from "@/lib/domain/types";

const CHECKED_AT = "2026-09-21";

function officeSet(
  companyId: string,
  cityIds: string[],
  officialUrl: string,
  evidence: CompanyOfficeEvidence,
): CompanyOffice[] {
  return cityIds.map((cityId) => ({
    id: `${companyId}-${cityId}`,
    companyId,
    cityId,
    label: evidence === "confirmed_office" ? "Confirmed office" : "Official careers market",
    officialUrl,
    evidence,
    checkedAt: CHECKED_AT,
  }));
}

export const companyOffices: CompanyOffice[] = [
  ...officeSet("google-global", ["singapore", "hong-kong", "beijing", "shanghai", "london", "dublin", "amsterdam", "berlin", "munich", "paris", "zurich", "stockholm"], "https://www.google.com/about/careers/applications/locations/", "confirmed_office"),
  ...officeSet("microsoft-global", ["singapore", "hong-kong", "beijing", "shanghai", "shenzhen", "london", "dublin", "amsterdam", "berlin", "munich", "paris", "zurich", "stockholm"], "https://jobs.careers.microsoft.com/global/en/search", "careers_market"),
  ...officeSet("amazon-global", ["singapore", "hong-kong", "beijing", "shanghai", "shenzhen", "london", "dublin", "berlin", "munich", "paris", "zurich", "stockholm"], "https://www.amazon.jobs/en/search", "careers_market"),
  ...officeSet("meta-global", ["singapore", "london", "dublin", "paris"], "https://www.metacareers.com/jobs/", "careers_market"),
  ...officeSet("apple-global", ["singapore", "hong-kong", "beijing", "shanghai", "shenzhen", "london", "dublin", "munich", "paris", "zurich"], "https://jobs.apple.com/en-us/search", "careers_market"),
  ...officeSet("nvidia-global", ["singapore", "beijing", "shanghai", "shenzhen", "london", "munich", "paris", "zurich"], "https://jobs.nvidia.com/", "careers_market"),
  ...officeSet("bytedance", ["singapore", "hong-kong", "beijing", "shanghai", "shenzhen", "london", "dublin", "berlin", "paris"], "https://joinbytedance.com/search", "careers_market"),
  ...officeSet("tencent", ["hong-kong", "beijing", "shanghai", "guangzhou", "shenzhen"], "https://recruiting.tencent.com/", "careers_market"),
  ...officeSet("alibaba", ["singapore", "hong-kong", "beijing", "shanghai", "guangzhou", "shenzhen", "hangzhou", "london"], "https://home.alibabagroup.com/en-US/careers", "careers_market"),
  ...officeSet("huawei", ["singapore", "hong-kong", "beijing", "shanghai", "guangzhou", "shenzhen", "hangzhou", "london", "dublin", "amsterdam", "berlin", "munich", "paris", "zurich", "stockholm"], "https://career.huawei.com/", "careers_market"),
  ...officeSet("baidu", ["beijing", "shanghai", "shenzhen"], "https://talent.baidu.com/jobs/list", "careers_market"),
  ...officeSet("meituan", ["beijing", "shanghai", "guangzhou", "shenzhen"], "https://zhaopin.meituan.com/web/position", "careers_market"),
  ...officeSet("jd-com", ["beijing", "shanghai", "shenzhen"], "https://zhaopin.jd.com/", "careers_market"),
  ...officeSet("xiaomi", ["beijing", "shanghai", "shenzhen"], "https://hr.xiaomi.com/", "careers_market"),
];
