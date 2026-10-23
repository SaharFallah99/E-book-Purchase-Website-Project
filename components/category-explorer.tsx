"use client";

import { useMemo, useState } from "react";
import { BookOpen, Headphones, LayoutGrid, RotateCcw, SlidersHorizontal } from "lucide-react";
import { BookCard } from "@/components/book-card";
import { Input } from "@/components/ui/input";
import { formatNumber, formatPrice, toPersianDigits } from "@/lib/format";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";

type FormatFilter = "all" | "ebook" | "audiobook";
type SortOption = "popular" | "rating" | "cheapest" | "expensive" | "newest";

const sortLabels: Record<SortOption, string> = {
  popular: "محبوب‌ترین",
  rating: "بیشترین امتیاز",
  cheapest: "ارزان‌ترین",
  expensive: "گران‌ترین",
  newest: "تازه‌ترین",
};

export function CategoryExplorer({
  books,
  categoryTitle,
}: {
  books: Book[];
  categoryTitle: string;
}) {
  const bounds = useMemo(() => {
    const prices = books.map((book) => book.finalPrice);
    const min = Math.min(0, ...prices);
    const max = Math.max(100000, ...prices);
    return { min, max };
  }, [books]);

  const [format, setFormat] = useState<FormatFilter>("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [minPrice, setMinPrice] = useState(bounds.min);
  const [maxPrice, setMaxPrice] = useState(bounds.max);
  const [sort, setSort] = useState<SortOption>("popular");

  const filtered = useMemo(() => {
    const result = books.filter((book) => {
      if (format !== "all" && book.format !== format) return false;
      if (freeOnly && !book.free) return false;
      if (!freeOnly) {
        if (book.finalPrice < minPrice || book.finalPrice > maxPrice) return false;
      }
      return true;
    });

    return result.sort((a, b) => {
      switch (sort) {
        case "rating":
          return b.rating - a.rating || b.ratingsCount - a.ratingsCount;
        case "cheapest":
          return a.finalPrice - b.finalPrice;
        case "expensive":
          return b.finalPrice - a.finalPrice;
        case "newest":
          return (b.publishedFa || "").localeCompare(a.publishedFa || "", "fa");
        case "popular":
        default:
          return b.ratingsCount - a.ratingsCount;
      }
    });
  }, [books, format, freeOnly, minPrice, maxPrice, sort]);

  function reset() {
    setFormat("all");
    setFreeOnly(false);
    setMinPrice(bounds.min);
    setMaxPrice(bounds.max);
    setSort("popular");
  }

  const dirty =
    format !== "all" ||
    freeOnly ||
    minPrice !== bounds.min ||
    maxPrice !== bounds.max ||
    sort !== "popular";

  return (
    <div>
      <div className="mb-6 rounded-2xl border border-border bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-coffee">
            <SlidersHorizontal className="size-4 text-primary" />
            فیلتر و مرتب‌سازی
          </div>
          {dirty && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-bold text-muted-foreground transition hover:bg-cream hover:text-coffee"
            >
              <RotateCcw className="size-3" />
              پاک‌کردن فیلترها
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="mb-2 text-[11px] font-bold text-muted-foreground">قالب کتاب</p>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all" as const, label: "همه", icon: LayoutGrid },
                { id: "ebook" as const, label: "ایبوک", icon: BookOpen },
                { id: "audiobook" as const, label: "صوتی", icon: Headphones },
              ].map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormat(option.id)}
                    className={cn(
                      "inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-bold transition",
                      format === option.id
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-white text-coffee hover:bg-cream",
                    )}
                  >
                    <Icon className="size-3.5" />
                    {option.label}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setFreeOnly((value) => !value)}
                className={cn(
                  "h-9 rounded-xl border px-3 text-xs font-bold transition",
                  freeOnly
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-white text-coffee hover:bg-cream",
                )}
              >
                فقط رایگان
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold text-muted-foreground">
              بازه‌ی قیمت (تومان)
            </p>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                inputMode="numeric"
                value={minPrice}
                min={bounds.min}
                max={maxPrice}
                onChange={(event) => setMinPrice(Number(event.target.value))}
                aria-label="حداقل قیمت"
                className="h-9 text-xs"
                disabled={freeOnly}
              />
              <span className="text-muted-foreground">تا</span>
              <Input
                type="number"
                inputMode="numeric"
                value={maxPrice}
                min={minPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                aria-label="حداکثر قیمت"
                className="h-9 text-xs"
                disabled={freeOnly}
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[
                { label: "زیر ۵۰ هزار", min: 0, max: 50000 },
                { label: "۵۰ تا ۱۵۰ هزار", min: 50000, max: 150000 },
                { label: "بیش از ۱۵۰ هزار", min: 150000, max: bounds.max },
              ].map((range) => (
                <button
                  key={range.label}
                  type="button"
                  onClick={() => {
                    setFreeOnly(false);
                    setMinPrice(range.min);
                    setMaxPrice(range.max);
                  }}
                  className={cn(
                    "rounded-lg px-2 py-1 text-[10px] font-semibold transition",
                    !freeOnly && minPrice === range.min && maxPrice === range.max
                      ? "bg-primary/10 text-primary"
                      : "bg-cream text-muted-foreground hover:text-coffee",
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold text-muted-foreground">مرتب‌سازی</p>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              aria-label="مرتب‌سازی کتاب‌ها"
              className="h-9 w-full rounded-lg border border-input bg-white px-2.5 text-xs font-semibold text-coffee outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              {Object.entries(sortLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-[10px] text-muted-foreground">
              بازه‌ی انتخاب‌شده: {formatPrice(minPrice)} تا {formatPrice(maxPrice)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-muted-foreground">
          {toPersianDigits(filtered.length)} کتاب در «{categoryTitle}»
        </p>
        <p className="text-[10px] text-muted-foreground">
          نمایش {toPersianDigits(books.length)} کتاب این دسته
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-cream/60 px-6 py-14 text-center">
          <p className="text-sm font-extrabold text-coffee">کتابی با این فیلترها پیدا نشد.</p>
          <p className="mt-2 text-xs text-muted-foreground">
            بازه‌ی قیمت یا قالب را تغییر بده و دوباره امتحان کن.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white"
          >
            بازگرداندن فیلترها
          </button>
        </div>
      )}

      <p className="mt-5 text-center text-[10px] text-muted-foreground">
        قیمت‌ها به تومان و بر اساس داده‌ی نمونه‌ی طاقچه هستند. {formatNumber(books.length)} کتاب بررسی شد.
      </p>
    </div>
  );
}
