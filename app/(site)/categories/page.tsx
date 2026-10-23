import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Headphones, Sparkles } from "lucide-react";
import { CategoryIcon } from "@/components/category-icon";
import { books, categories, getCategoryCounts, getAudioBooks, getFreeBooks } from "@/lib/data";
import { toPersianDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "دسته‌بندی موضوعی",
  description: "همه‌ی دسته‌های کتاب الکترونیکی و صوتی کتاب‌سرا.",
};

export default function CategoriesPage() {
  const counts = getCategoryCounts();
  const total = books.length;
  const audioCount = getAudioBooks().length;
  const freeCount = getFreeBooks().length;

  return (
    <div>
      <section className="border-b border-border bg-cream/70">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-16">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold text-primary">
              <span className="h-px w-6 bg-primary/50" />
              کتاب‌سرا
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-coffee sm:text-4xl">
              کتاب را از دریچه‌ی دلخواهت پیدا کن
            </h1>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              ده دسته‌ی موضوعی، از داستان و شعر تا فلسفه و کودک. هر دسته را باز
              کن، بین ایبوک و صوتی فیلتر بزن و با قیمت دلخواهت انتخاب کن.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-2xl border border-border bg-white px-4 py-3">
              <p className="text-[10px] text-muted-foreground">کتاب در قفسه</p>
              <p className="mt-1 text-xl font-extrabold text-coffee">
                {toPersianDigits(total)}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white px-4 py-3">
              <p className="text-[10px] text-muted-foreground">کتاب صوتی</p>
              <p className="mt-1 text-xl font-extrabold text-coffee">
                {toPersianDigits(audioCount)}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white px-4 py-3">
              <p className="text-[10px] text-muted-foreground">کتاب رایگان</p>
              <p className="mt-1 text-xl font-extrabold text-coffee">
                {toPersianDigits(freeCount)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_25px_50px_-38px_rgba(56,33,16,.55)]"
            >
              <div className="flex items-start justify-between">
                <CategoryIcon
                  name={category.icon}
                  tone={category.tone}
                  className="size-12 transition group-hover:scale-105"
                />
                <span className="rounded-full bg-cream px-2.5 py-1 text-[10px] font-bold text-muted-foreground">
                  {toPersianDigits(counts[category.slug] ?? 0)} کتاب
                </span>
              </div>
              <h2 className="mt-5 text-lg font-extrabold text-coffee">
                {category.title}
              </h2>
              <p className="mt-2 flex-1 text-xs leading-6 text-muted-foreground">
                {category.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  {category.slug === "biography" ? (
                    <Sparkles className="size-3" />
                  ) : category.slug === "kids" ? (
                    <BookOpen className="size-3" />
                  ) : (
                    <Headphones className="size-3" />
                  )}
                  ایبوک و صوتی
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-primary">
                  ورود به دسته
                  <ArrowLeft className="size-3.5 transition group-hover:-translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-primary px-6 py-6 text-white sm:flex-row">
          <div>
            <h2 className="text-lg font-extrabold">دنبال کتاب صوتی هستی؟</h2>
            <p className="mt-1 text-xs text-white/65">
              همه‌ی کتاب‌های صوتی را یک‌جا ببین و پیش‌نمایش هر کدام را بشنو.
            </p>
          </div>
          <Link
            href="/audiobooks"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-white px-5 text-xs font-extrabold text-primary"
          >
            <Headphones className="size-4" />
            کتاب‌های صوتی
          </Link>
        </div>
      </div>
    </div>
  );
}
