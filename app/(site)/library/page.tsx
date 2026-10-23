import type { Metadata } from "next";
import { LibraryView } from "@/components/library-view";
import { PageHero } from "@/components/page-hero";
import { books } from "@/lib/data";

export const metadata: Metadata = {
  title: "کتابخانه‌ی من",
  description: "کتاب‌های خریداری‌شده و وضعیت اشتراک شما.",
};

export default function LibraryPage() {
  return (
    <div>
      <PageHero
        eyebrow="مالِ خودت"
        title="کتابخانه‌ی من"
        description="کتاب‌هایی که خریده‌ای یا رایگان دریافت کرده‌ای، همراه با وضعیت اشتراک. همه‌ی اطلاعات به‌صورت محلی در مرورگر نگهداری می‌شود."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <LibraryView books={books} />
      </div>
    </div>
  );
}
