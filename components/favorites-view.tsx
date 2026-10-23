"use client";

import Link from "next/link";
import { Heart, Search } from "lucide-react";
import { BookCard } from "@/components/book-card";
import { useStore } from "@/components/store-provider";
import { buttonVariants } from "@/components/ui/button";
import type { Book } from "@/lib/types";
import { toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

export function FavoritesView({ books }: { books: Book[] }) {
  const { favorites, ready } = useStore();
  const favoriteBooks = books.filter((book) => favorites.includes(book.id));

  if (!ready) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-80 animate-pulse rounded-2xl bg-cream" />
        ))}
      </div>
    );
  }

  if (favoriteBooks.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-border bg-cream/60 px-6 py-14 text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-white text-coral shadow-sm">
          <Heart className="size-7" strokeWidth={1.6} />
        </span>
        <h2 className="mt-5 text-xl font-extrabold text-coffee">
          هنوز قلبی نشان نکرده‌ای
        </h2>
        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          روی آیکون قلب هر کتاب بزن تا اینجا نگه داشته شود. علاقه‌مندی‌ها در
          همین مرورگر ذخیره می‌شوند.
        </p>
        <Link
          href="/categories"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "mt-6 h-11 rounded-xl px-5 text-sm font-bold",
          )}
        >
          <Search className="size-4" />
          پیدا کردن کتاب
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mb-5 text-xs font-semibold text-muted-foreground">
        {toPersianDigits(favoriteBooks.length)} کتاب در علاقه‌مندی‌ها
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {favoriteBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}
