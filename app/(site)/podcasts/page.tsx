import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PodcastExplorer } from "@/components/podcast-explorer";
import { podcasts } from "@/lib/data";
import { toPersianDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "پادکست‌ها",
  description: "پادکست‌های نمایشی کتاب‌سرا درباره‌ی کتاب، قصه و فلسفه.",
};

type PodcastPageProps = {
  searchParams: Promise<{ p?: string | string[] }>;
};

export default async function PodcastsPage({ searchParams }: PodcastPageProps) {
  const params = await searchParams;
  const initialId = typeof params.p === "string" ? params.p : undefined;

  return (
    <div>
      <PageHero
        eyebrow="برای گوش‌ها"
        title="پادکست‌های کتاب‌سرا"
        description={`${toPersianDigits(podcasts.length)} پادکست نمونه درباره‌ی کتاب، قصه، فلسفه و نوشتن. یک قسمت را انتخاب کن و با پلیر نمایشی بشنو.`}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <PodcastExplorer podcasts={podcasts} initialId={initialId} />
      </div>
    </div>
  );
}
