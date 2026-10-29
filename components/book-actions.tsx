"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, ShoppingBag, Sparkles } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { useStore } from "@/components/store-provider";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";

export function BookActions({ book }: { book: Book }) {
  const { canRead, purchaseBook, ready, hasActivePlan, hasPurchased } = useStore();
  const router = useRouter();
  const accessible = canRead({ id: book.id, free: book.free });
  const owned = hasPurchased(book.id);

  function getFreeBook() {
    purchaseBook(book.id);
    router.push(`/reader/${book.id}`);
  }

  return (
    <div className="space-y-3">
      {book.free && !owned ? (
        <button
          type="button"
          onClick={getFreeBook}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "h-12 w-full rounded-xl text-sm font-extrabold shadow-sm",
          )}
        >
          <Sparkles className="size-4.5" />
          افزودن رایگان به کتابخانه
        </button>
      ) : accessible ? (
        <Link
          href={`/reader/${book.id}`}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "h-12 w-full rounded-xl text-sm font-extrabold shadow-sm",
          )}
        >
          <BookOpen className="size-4.5" />
          {hasActivePlan && !owned ? "مطالعه با اشتراک" : "ادامه‌ی مطالعه"}
        </Link>
      ) : (
        <Link
          href={`/payment?type=book&id=${book.id}`}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "h-12 w-full rounded-xl text-sm font-extrabold shadow-sm",
          )}
        >
          <ShoppingBag className="size-4.5" />
          خرید و مطالعه · {formatPrice(book.finalPrice)}
        </Link>
      )}

      <FavoriteButton bookId={book.id} showLabel className="w-full" />

      {!ready ? (
        <p className="text-center text-[10px] text-muted-foreground">در حال خواندن وضعیت شما…</p>
      ) : accessible ? (
        <p className="flex items-center justify-center gap-1 text-center text-[10px] text-primary">
          <Sparkles className="size-3" />
          دسترسی شما به این کتاب فعال است
        </p>
      ) : (
        <p className="text-center text-[10px] leading-5 text-muted-foreground">
          پرداخت در این نسخه نمایشی است و اطلاعات کارت واقعی دریافت نمی‌شود.
        </p>
      )}
    </div>
  );
}
