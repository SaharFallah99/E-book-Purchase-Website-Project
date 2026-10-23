"use client";

import Link from "next/link";
import { Headphones, Sparkles } from "lucide-react";
import { BookCover } from "@/components/book-cover";
import { FavoriteButton } from "@/components/favorite-button";
import { RatingStars } from "@/components/rating-stars";
import { formatPrice, formatShortDuration } from "@/lib/format";
import type { Book, SimilarBook } from "@/lib/types";
import { cn } from "@/lib/utils";

type BookCardProps = {
  book: Book | SimilarBook;
  className?: string;
  showSummary?: boolean;
};

export function BookCard({
  book,
  className,
  showSummary = true,
}: BookCardProps) {
  const isAudio = book.format === "audiobook";
  const summary = "summary" in book ? book.summary : "";
  const discount =
    book.discountPercent > 0 && book.price > book.finalPrice
      ? book.discountPercent
      : 0;

  return (
    <article
      className={cn(
        "card-hover group flex h-full flex-col rounded-2xl border border-border bg-card p-3",
        className,
      )}
    >
      <div className="relative">
        <Link
          href={`/book/${book.id}`}
          className="block overflow-hidden rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          aria-label={`جزئیات ${book.title}`}
        >
          <BookCover src={book.cover} title={book.title} />
        </Link>

        <div className="pointer-events-none absolute right-2 top-2 flex flex-col items-end gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-coffee shadow-sm backdrop-blur">
            {isAudio ? (
              <Headphones className="size-3 text-primary" />
            ) : (
              <Sparkles className="size-3 text-primary" />
            )}
            {isAudio ? "صوتی" : "ایبوک"}
          </span>
          {discount > 0 && (
            <span className="rounded-full bg-coral px-2 py-1 text-[10px] font-extrabold text-white shadow-sm">
              {new Intl.NumberFormat("fa-IR").format(discount)}٪ تخفیف
            </span>
          )}
          {book.free && (
            <span className="rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-white shadow-sm">
              رایگان
            </span>
          )}
        </div>

        <FavoriteButton
          bookId={book.id}
          size="sm"
          className="absolute left-2 top-2 border-white/60 bg-white/90 backdrop-blur"
        />
      </div>

      <div className="flex flex-1 flex-col px-0.5 pb-1 pt-3">
        <Link
          href={`/book/${book.id}`}
          className="line-clamp-2 min-h-[2.9rem] text-[15px] font-extrabold leading-6 text-coffee outline-none transition hover:text-primary focus-visible:text-primary"
        >
          {book.title}
        </Link>

        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
          {book.authors.length > 0 ? book.authors.join("، ") : "نویسنده نامشخص"}
        </p>

        <div className="mt-2">
          <RatingStars
            rating={book.rating}
            count={book.ratingsCount}
            reviewsLabel="نظر"
          />
        </div>

        {showSummary && summary && (
          <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-muted-foreground/90">
            {summary}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="flex flex-col">
            {discount > 0 && (
              <span className="text-[11px] text-muted-foreground line-through decoration-coral/60">
                {formatPrice(book.price)}
              </span>
            )}
            <span
              className={cn(
                "text-sm font-extrabold",
                book.free ? "text-primary" : "text-coffee",
              )}
            >
              {book.free ? "رایگان" : formatPrice(book.finalPrice)}
            </span>
          </div>
          {isAudio && book.durationMin ? (
            <span className="rounded-lg bg-cream px-2 py-1 text-[10px] font-semibold text-primary">
              {formatShortDuration(book.durationMin)}
            </span>
          ) : book.pages ? (
            <span className="rounded-lg bg-cream px-2 py-1 text-[10px] font-semibold text-primary">
              {new Intl.NumberFormat("fa-IR").format(book.pages)} صفحه
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
