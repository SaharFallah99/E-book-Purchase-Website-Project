import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarDays,
  Clock3,
  Hash,
  Headphones,
  Languages,
  Mic2,
  Sparkles,
  Star,
  ThumbsUp,
  Users,
} from "lucide-react";
import { AudioPlayer } from "@/components/audio-player";
import { BookActions } from "@/components/book-actions";
import { BookCard } from "@/components/book-card";
import { BookCover } from "@/components/book-cover";
import { RatingStars } from "@/components/rating-stars";
import {
  books,
  getBookById,
  getReviews,
  getSimilarBooks,
} from "@/lib/data";
import {
  formatCompactNumber,
  formatDuration,
  formatNumber,
  formatPrice,
  initials,
  toPersianDigits,
} from "@/lib/format";
import { cn } from "@/lib/utils";

type BookPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return books.map((book) => ({ id: String(book.id) }));
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { id } = await params;
  const book = getBookById(id);
  if (!book) return { title: "کتاب پیدا نشد" };
  return {
    title: book.title,
    description: book.summary || `جزئیات ${book.title} در کتاب‌سرا`,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = getBookById(id);
  if (!book) notFound();

  const reviews = getReviews(book.id);
  const similar = getSimilarBooks(book.id);
  const isAudio = book.format === "audiobook";
  const breakdown = book.ratingBreakdown ?? {};
  const totalRatings =
    Object.values(breakdown).reduce((sum, value) => sum + Number(value || 0), 0) ||
    book.ratingsCount;

  const meta = [
    {
      icon: Building2,
      label: "ناشر",
      value: book.publisher,
    },
    {
      icon: Users,
      label: "نویسنده",
      value: book.authors.join("، ") || "نامشخص",
    },
    {
      icon: Languages,
      label: "مترجم",
      value: book.translators.join("، ") || "—",
    },
    {
      icon: isAudio ? Mic2 : BookOpen,
      label: isAudio ? "گوینده" : "تعداد صفحه",
      value: isAudio
        ? book.narrators.join("، ") || "—"
        : book.pages
          ? `${formatNumber(book.pages)} صفحه`
          : "—",
    },
    {
      icon: isAudio ? Clock3 : CalendarDays,
      label: isAudio ? "مدت زمان" : "تاریخ انتشار",
      value: isAudio ? formatDuration(book.durationMin) : book.publishedFa || "—",
    },
    {
      icon: Hash,
      label: "شابک",
      value: book.isbn || "—",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground" aria-label="مسیر صفحه">
        <Link href="/" className="transition hover:text-primary">
          خانه
        </Link>
        <span>/</span>
        <Link
          href={`/categories/${book.category}`}
          className="transition hover:text-primary"
        >
          {book.rawCategories[0] || "کتاب‌ها"}
        </Link>
        <span>/</span>
        <span className="line-clamp-1 text-coffee">{book.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div>
          <div className="mx-auto max-w-[280px] lg:mx-0 lg:max-w-none">
            <BookCover
              src={book.cover}
              title={book.title}
              priority
              sizes="(max-width: 1024px) 280px, 300px"
              className="rounded-2xl shadow-[0_25px_60px_-35px_rgba(56,33,16,.65)]"
            />
          </div>

          {isAudio && (
            <AudioPlayer
              title={book.title}
              durationMin={book.durationMin}
              className="mt-4"
            />
          )}

          <div className="mt-4 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-cream px-2 py-3">
              <Star className="mx-auto size-4 fill-[#f5d47a] text-[#d98017]" />
              <p className="mt-1 text-sm font-extrabold text-coffee">
                {formatNumber(book.rating || 0, 1)}
              </p>
              <p className="text-[9px] text-muted-foreground">
                {formatCompactNumber(book.ratingsCount)} امتیاز
              </p>
            </div>
            <div className="rounded-xl bg-cream px-2 py-3">
              <Users className="mx-auto size-4 text-primary" />
              <p className="mt-1 text-sm font-extrabold text-coffee">
                {formatCompactNumber(book.ratingsCount)}
              </p>
              <p className="text-[9px] text-muted-foreground">خواننده</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-extrabold text-primary">
              {isAudio ? "کتاب صوتی" : "کتاب الکترونیکی"}
            </span>
            {book.free && (
              <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-extrabold text-white">
                رایگان
              </span>
            )}
            {book.discountPercent > 0 && (
              <span className="rounded-full bg-coral/10 px-3 py-1 text-[10px] font-extrabold text-coral">
                {toPersianDigits(book.discountPercent)}٪ تخفیف
              </span>
            )}
            {book.inSubscription && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#f5d47a]/25 px-3 py-1 text-[10px] font-extrabold text-[#8a5c0e]">
                <BadgeCheck className="size-3" />
                در اشتراک کتاب‌سرا
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-[1.4] tracking-tight text-coffee sm:text-4xl">
            {book.title}
          </h1>

          <p className="mt-2 text-sm font-semibold text-muted-foreground">
            {book.authors.length > 0 ? book.authors.join("، ") : "نویسنده نامشخص"}
            {book.translators.length > 0 && (
              <span className="font-normal"> · ترجمه‌ی {book.translators.join("، ")}</span>
            )}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <RatingStars rating={book.rating} count={book.ratingsCount} size="md" reviewsLabel="امتیاز" />
            {book.reviewsCount > 0 && (
              <span className="text-[11px] text-muted-foreground">
                {formatCompactNumber(book.reviewsCount)} نظر ثبت‌شده
              </span>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_280px]">
            <div className="rounded-2xl border border-border bg-white p-4">
              <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                {meta.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-2.5">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-cream text-primary">
                        <Icon className="size-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                        <p className="mt-0.5 line-clamp-2 text-xs font-bold leading-5 text-coffee">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
                {book.rawCategories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-cream px-2.5 py-1 text-[10px] font-semibold text-coffee/75"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <aside className="flex flex-col rounded-2xl border border-border bg-white p-4 shadow-[0_20px_45px_-38px_rgba(56,33,16,.5)]">
              <div className="rounded-xl bg-cream p-4">
                {book.discountPercent > 0 && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">قیمت پیش از تخفیف</span>
                    <span className="text-muted-foreground line-through">
                      {formatPrice(book.price)}
                    </span>
                  </div>
                )}
                <div className="mt-1 flex items-baseline justify-between gap-2">
                  <span className="text-[11px] font-bold text-muted-foreground">
                    قیمت نهایی
                  </span>
                  <span className={cn("text-xl font-extrabold", book.free ? "text-primary" : "text-coffee")}>
                    {book.free ? "رایگان" : formatPrice(book.finalPrice)}
                  </span>
                </div>
                {isAudio && (
                  <p className="mt-2 flex items-center gap-1 border-t border-border pt-2 text-[10px] text-muted-foreground">
                    <Headphones className="size-3 text-primary" />
                    شامل نسخه‌ی صوتی نمایشی
                  </p>
                )}
              </div>
              <div className="mt-4">
                <BookActions book={book} />
              </div>
            </aside>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" />
              دسترسی در مرورگر
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="size-3.5 text-primary" />
              افزودن به کتابخانه پس از پرداخت
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
        <article className="rounded-3xl border border-border bg-white p-5 sm:p-7">
          <h2 className="text-xl font-extrabold text-coffee">درباره‌ی این کتاب</h2>
          <div className="mt-4 whitespace-pre-line text-sm leading-8 text-muted-foreground">
            {book.description || "توضیحی برای این کتاب ثبت نشده است."}
          </div>
          <p className="mt-5 border-t border-border pt-4 text-[10px] text-muted-foreground">
            توضیحات و مشخصات از داده‌های عمومی طاقچه گرفته شده و فقط برای نمایش
            در این نمونه است.
          </p>
        </article>

        <aside className="h-fit rounded-3xl border border-border bg-cream/70 p-5">
          <h2 className="text-sm font-extrabold text-coffee">امتیاز خواننده‌ها</h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-coffee">
                {formatNumber(book.rating || 0, 1)}
              </p>
              <RatingStars rating={book.rating} showValue={false} size="sm" className="mt-1 justify-center" />
              <p className="mt-1 text-[9px] text-muted-foreground">
                از {formatCompactNumber(totalRatings)} امتیاز
              </p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const value = Number(breakdown[String(star)] ?? 0);
                const percent = totalRatings > 0 ? (value / totalRatings) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-1.5">
                    <span className="w-2 text-[9px] text-muted-foreground">
                      {toPersianDigits(star)}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-[#e2b84f]"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-7 text-left text-[8px] text-muted-foreground">
                      {toPersianDigits(Math.round(percent))}٪
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-5 rounded-xl bg-white p-3 text-[10px] leading-5 text-muted-foreground">
            <Star className="mb-1 size-3.5 fill-[#f5d47a] text-[#d98017]" />
            امتیازها از داده‌ی نظرات طاقچه محاسبه شده‌اند و ممکن است با امتیاز
            لحظه‌ای سایت اصلی متفاوت باشند.
          </div>
        </aside>
      </div>

      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold text-primary">
              <span className="h-px w-6 bg-primary/50" />
              از نگاه خواننده‌ها
            </div>
            <h2 className="text-2xl font-extrabold text-coffee">نظرات کاربران</h2>
          </div>
          <span className="text-[10px] text-muted-foreground">
            {toPersianDigits(reviews.length)} نظر منتخب
          </span>
        </div>

        {reviews.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-border bg-white p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-xs font-extrabold text-primary">
                    {initials(review.user)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-extrabold text-coffee">
                      {review.user}
                    </p>
                    <p className="mt-0.5 text-[9px] text-muted-foreground">
                      {review.date || "تاریخ نامشخص"}
                    </p>
                  </div>
                  <RatingStars rating={review.rating} showValue={false} size="sm" />
                </div>
                <p className="mt-3 whitespace-pre-line text-xs leading-6 text-muted-foreground">
                  {review.text}
                </p>
                <div className="mt-3 flex items-center gap-3 border-t border-border pt-3 text-[9px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <ThumbsUp className="size-3" />
                    {formatCompactNumber(review.likes)} پسند
                  </span>
                  <span>{formatCompactNumber(review.replies)} پاسخ</span>
                  <span className="mr-auto rounded-full bg-cream px-2 py-0.5">
                    نظر کاربر طاقچه
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-cream/50 px-6 py-10 text-center text-xs text-muted-foreground">
            هنوز نظر منتخبی برای این کتاب ثبت نشده است.
          </div>
        )}
      </section>

      {similar.length > 0 && (
        <section className="mt-12 border-t border-border pt-10">
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold text-primary">
              <span className="h-px w-6 bg-primary/50" />
              بعدی را امتحان کن
            </div>
            <h2 className="text-2xl font-extrabold text-coffee">کتاب‌های مشابه</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {similar.slice(0, 4).map((item) => (
              <BookCard key={item.id} book={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
