"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  LockKeyhole,
  Minus,
  Moon,
  Plus,
  ShoppingBag,
  Sun,
} from "lucide-react";
import { BookCover } from "@/components/book-cover";
import { FavoriteButton } from "@/components/favorite-button";
import { useStore } from "@/components/store-provider";
import { buttonVariants } from "@/components/ui/button";
import { readerChapters } from "@/lib/reader-content";
import { formatPrice } from "@/lib/format";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";

const fontSizes = [16, 18, 20, 22, 24];

export function ReaderView({ book }: { book: Book }) {
  const { canRead, ready, hasActivePlan } = useStore();
  const [night, setNight] = useState(false);
  const [fontIndex, setFontIndex] = useState(1);
  const accessible = canRead({ id: book.id, free: book.free });

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#fbf8f2]">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-cream" />
      </div>
    );
  }

  if (!accessible) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf8f2] px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-border bg-white p-6 text-center shadow-[0_30px_80px_-50px_rgba(56,33,16,.55)]">
          <div className="mx-auto w-32">
            <BookCover src={book.cover} title={book.title} className="rounded-xl" sizes="128px" />
          </div>
          <span className="mx-auto mt-5 grid size-11 place-items-center rounded-full bg-cream text-primary">
            <LockKeyhole className="size-5" />
          </span>
          <h1 className="mt-3 text-xl font-extrabold text-coffee">{book.title}</h1>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            برای خواندن این کتاب، آن را بخر یا اشتراک فعال کتاب‌سرا را داشته
            باش. دسترسی شما فقط در همین مرورگر ذخیره می‌شود.
          </p>

          <div className="mt-5 flex flex-col gap-2">
            <Link
              href={`/payment?type=book&id=${book.id}`}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-11 rounded-xl text-sm font-extrabold",
              )}
            >
              <ShoppingBag className="size-4" />
              خرید کتاب · {formatPrice(book.finalPrice)}
            </Link>
            <Link
              href="/subscription"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-xl text-sm font-bold",
              )}
            >
              <BookOpen className="size-4" />
              {hasActivePlan ? "مشاهده اشتراک" : "فعال‌سازی اشتراک"}
            </Link>
            <FavoriteButton bookId={book.id} showLabel className="w-full" />
          </div>

          <Link
            href={`/book/${book.id}`}
            className="mt-5 inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground hover:text-primary"
          >
            <ArrowRight className="size-3.5" />
            بازگشت به صفحه‌ی کتاب
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen transition-colors",
        night ? "bg-[#211b17] text-[#efe8da]" : "bg-[#fbf8f2] text-coffee",
      )}
    >
      <header
        className={cn(
          "sticky top-0 z-40 border-b backdrop-blur-xl",
          night
            ? "border-white/10 bg-[#211b17]/90"
            : "border-border bg-[#fbf8f2]/90",
        )}
      >
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-3 py-3 sm:px-6">
          <Link
            href={`/book/${book.id}`}
            aria-label="بازگشت به کتاب"
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-xl transition",
              night ? "hover:bg-white/10" : "hover:bg-cream",
            )}
          >
            <ArrowRight className="size-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-extrabold">{book.title}</p>
            <p className={cn("text-[9px]", night ? "text-white/45" : "text-muted-foreground")}>
              متن نمونه‌ی نمایشی · {book.authors.join("، ")}
            </p>
          </div>

          <div
            className={cn(
              "flex items-center rounded-xl border p-0.5",
              night ? "border-white/10" : "border-border bg-white",
            )}
          >
            <button
              type="button"
              onClick={() => setFontIndex((index) => Math.max(0, index - 1))}
              disabled={fontIndex === 0}
              aria-label="کوچک‌کردن قلم"
              className="grid size-8 place-items-center rounded-lg disabled:opacity-30"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-[10px] font-bold">A</span>
            <button
              type="button"
              onClick={() =>
                setFontIndex((index) => Math.min(fontSizes.length - 1, index + 1))
              }
              disabled={fontIndex === fontSizes.length - 1}
              aria-label="بزرگ‌کردن قلم"
              className="grid size-8 place-items-center rounded-lg disabled:opacity-30"
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setNight((value) => !value)}
            aria-label={night ? "حالت روز" : "حالت شب"}
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-xl transition",
              night ? "bg-white/10 text-[#f5d47a]" : "bg-cream text-primary",
            )}
          >
            {night ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-8 border-b pb-6" style={{ borderColor: night ? "rgba(255,255,255,.12)" : "#e9e3d9" }}>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold",
              night ? "bg-white/10 text-[#f5d47a]" : "bg-primary/10 text-primary",
            )}
          >
            <BookOpen className="size-3" />
            نسخه‌ی نمایشی ریدر
          </span>
          <h1 className="mt-4 text-2xl font-extrabold leading-relaxed sm:text-3xl">
            {book.title}
          </h1>
          <p className={cn("mt-2 text-xs", night ? "text-white/50" : "text-muted-foreground")}>
            متن زیر نمونه‌ای مستقل و در حوزه‌ی عمومی است؛ متن اصلی کتاب نیست.
          </p>
        </div>

        <article
          className="reader-content space-y-10 leading-[2.1]"
          style={{ fontSize: `${fontSizes[fontIndex]}px` }}
        >
          {readerChapters.map((chapter, chapterIndex) => (
            <section key={chapter.title}>
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-extrabold",
                    night ? "bg-white/10 text-[#f5d47a]" : "bg-primary/10 text-primary",
                  )}
                >
                  {new Intl.NumberFormat("fa-IR").format(chapterIndex + 1)}
                </span>
                <h2 className="text-lg font-extrabold sm:text-xl">{chapter.title}</h2>
              </div>
              <div className="space-y-5">
                {chapter.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 30)}
                    className={night ? "text-[#e7dece]" : "text-[#4a3c31]"}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>

        <div
          className={cn(
            "mt-12 rounded-2xl border p-4 text-center text-[10px] leading-6",
            night ? "border-white/10 text-white/45" : "border-border bg-white text-muted-foreground",
          )}
        >
          این متن برای نمایش قابلیت‌های ریدر است. برای خواندن متن کامل، در یک
          فروشگاه واقعی باید نسخه‌ی رسمی کتاب را تهیه کنی.
        </div>
      </main>
    </div>
  );
}
