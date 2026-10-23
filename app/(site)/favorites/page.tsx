import type { Metadata } from "next";
import { FavoritesView } from "@/components/favorites-view";
import { PageHero } from "@/components/page-hero";
import { books } from "@/lib/data";

export const metadata: Metadata = {
  title: "علاقه‌مندی‌ها",
  description: "کتاب‌هایی که در کتاب‌سرا ذخیره کرده‌اید.",
};

export default function FavoritesPage() {
  return (
    <div>
      <PageHero
        eyebrow="قفسه‌ی شخصی"
        title="علاقه‌مندی‌های من"
        description="کتاب‌هایی که خواستی برای بعد نگهشان داری. همه‌چیز در همین مرورگر ذخیره می‌شود."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <FavoritesView books={books} />
      </div>
    </div>
  );
}
