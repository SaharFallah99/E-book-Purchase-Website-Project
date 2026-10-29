"use client";

import Link from "next/link";
import { BookOpen, CalendarDays, Crown, Library, Sparkles } from "lucide-react";
import { BookCard } from "@/components/book-card";
import { useStore } from "@/components/store-provider";
import { buttonVariants } from "@/components/ui/button";
import { getPlan } from "@/lib/plans";
import { formatNumber, toPersianDigits } from "@/lib/format";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";

function faDate(value: string | null): string {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(value));
  } catch {
    return "—";
  }
}

export function LibraryView({ books }: { books: Book[] }) {
  const {
    purchases,
    ready,
    user,
    plan,
    planExpiresAt,
    hasActivePlan,
  } = useStore();
  const purchasedBooks = books.filter((book) => purchases.includes(book.id));
  const activePlan = plan ? getPlan(plan) : undefined;

  if (!ready) {
    return (
      <div className="space-y-4">
        <div className="h-28 animate-pulse rounded-3xl bg-cream" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-80 animate-pulse rounded-2xl bg-cream" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
              <Library className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">کتاب‌های کتابخانه</p>
              <p className="mt-0.5 text-xl font-extrabold text-coffee">
                {toPersianDigits(purchasedBooks.length)} کتاب
              </p>
            </div>
          </div>
          <p className="mt-4 text-[11px] leading-6 text-muted-foreground">
            {user
              ? `${user.name} عزیز، کتاب‌های خریداری‌شده و رایگان در این مرورگر ذخیره شده‌اند.`
              : purchasedBooks.length > 0
                ? "کتاب‌های خریداری‌شده و رایگان در این مرورگر ذخیره شده‌اند."
                : "در این مرورگر خرید یا دریافت رایگانی ثبت نشده است."}
          </p>
        </div>

        <div
          className={cn(
            "rounded-3xl p-5",
            hasActivePlan ? "bg-primary text-white" : "border border-border bg-cream",
          )}
        >
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-11 place-items-center rounded-full",
                hasActivePlan ? "bg-white/15 text-[#f5d47a]" : "bg-white text-primary",
              )}
            >
              <Crown className="size-5" />
            </span>
            <div>
              <p className={cn("text-xs", hasActivePlan ? "text-white/65" : "text-muted-foreground")}>
                وضعیت اشتراک
              </p>
              <p className="mt-0.5 text-base font-extrabold">
                {hasActivePlan && activePlan
                  ? `پلن ${activePlan.name} فعال است`
                  : "اشتراک فعالی نداری"}
              </p>
            </div>
          </div>
          {hasActivePlan ? (
            <p className="mt-4 flex items-center gap-1.5 text-[10px] text-white/70">
              <CalendarDays className="size-3.5" />
              اعتبار تا {faDate(planExpiresAt)}
            </p>
          ) : (
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-[10px] leading-5 text-muted-foreground">
                با اشتراک، بدون خرید جداگانه به کتاب‌های بیشتری دسترسی داری.
              </p>
              <Link
                href="/subscription"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "shrink-0 rounded-lg text-[10px] font-bold",
                )}
              >
                دیدن پلن‌ها
              </Link>
            </div>
          )}
        </div>
      </div>

      {purchasedBooks.length > 0 ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-coffee">قفسه‌ی من</h2>
            <span className="text-[10px] text-muted-foreground">
              {formatNumber(purchasedBooks.length)} کتاب
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {purchasedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-3xl border border-dashed border-border bg-cream/60 px-6 py-14 text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-white text-primary shadow-sm">
            <BookOpen className="size-7" strokeWidth={1.6} />
          </span>
          <h2 className="mt-5 text-xl font-extrabold text-coffee">
            قفسه‌ات هنوز خالی است
          </h2>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            اولین کتاب را بخر یا یک کتاب رایگان انتخاب کن. بعد از پرداخت موفق
            یا دریافت رایگان، کتاب همین‌جا و در دسترس ریدر ظاهر می‌شود.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-11 rounded-xl px-5 text-sm font-bold",
              )}
            >
              <Sparkles className="size-4" />
              انتخاب کتاب
            </Link>
            <Link
              href="/categories"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-xl px-5 text-sm font-bold",
              )}
            >
              دسته‌بندی‌ها
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
