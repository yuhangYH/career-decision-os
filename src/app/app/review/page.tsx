import { PageHeader } from "@/components/app/page-header";
import { WeeklyReview } from "@/components/career-studio/weekly-review";
import { getCareerRepository } from "@/lib/repository";

export default async function ReviewPage() {
  const review = await (await getCareerRepository()).getWeeklyReview();
  return <><PageHeader eyebrow={`WEEKLY REVIEW · ${review.weekStart}`} title="复盘行动，也复盘判断" description="记录结果、转化率、经验与假设变化；下周只保留最能提高 Offer 概率的行动。" /><WeeklyReview review={review} /></>;
}
