import type { Metadata } from "next";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { BookCard } from "@/components/book-card";
import { PageHero } from "@/components/page-hero";
import { getTopBooks, searchBooks } from "@/lib/data";
import { toPersianDigits } from "@/lib/format";

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  return {
    title: query ? `جست‌وجو برای «${query}»` : "جست‌وجو",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const results = query ? searchBooks(query) : [];
  const suggestions = getTopBooks(8);

  return (
    <div>
      <PageHero
        eyebrow="پیدا کردن کتاب"
        title={query ? `نتایج جست‌وجو برای «${query}»` : "دنبال چه کتابی هستی؟"}
        description={
          query
            ? `${toPersianDigits(results.length)} کتاب با این عبارت پیدا شد.`
            : "عنوان کتاب، نام نویسنده یا موضوع را جست‌وجو کن."
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <form
          action="/search"
          method="get"
          className="mb-8 flex max-w-2xl items-center gap-2 rounded-2xl border border-border bg-white p-2 shadow-sm"
          role="search"
        >
          <Search className="mr-2 size-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="مثلاً: کتابخانه نیمه شب، مت هیگ، روان‌شناسی..."
            aria-label="عبارت جست‌وجو"
            className="h-10 min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground/70"
          />
          <button
            type="submit"
            className="h-10 shrink-0 rounded-xl bg-primary px-5 text-xs font-bold text-white transition hover:bg-primary/90"
          >
            جست‌وجو
          </button>
        </form>

        {query && results.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border bg-cream/60 px-6 py-14 text-center">
            <p className="text-lg font-extrabold text-coffee">
              چیزی با این عبارت پیدا نشد.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              املای عبارت را بررسی کن یا نام نویسنده را جداگانه جست‌وجو کن.
            </p>
            <Link
              href="/categories"
              className="mt-5 inline-flex h-10 items-center rounded-xl bg-primary px-5 text-xs font-bold text-white"
            >
              گشتن در دسته‌بندی‌ها
            </Link>
          </div>
        )}

        {!query && (
          <>
            <div className="mb-4 flex items-center gap-2 text-sm font-extrabold text-coffee">
              <Sparkles className="size-4 text-primary" />
              پیشنهادهای پرطرفدار
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {suggestions.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
