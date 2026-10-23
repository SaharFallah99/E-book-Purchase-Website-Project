"use client";

import { Heart } from "lucide-react";
import { useStore } from "@/components/store-provider";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  bookId,
  className,
  showLabel = false,
  size = "md",
}: {
  bookId: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const { isFavorite, toggleFavorite, ready } = useStore();
  const active = ready && isFavorite(bookId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(bookId)}
      aria-pressed={active}
      aria-label={active ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      title={active ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/95 text-coffee shadow-sm transition hover:border-coral/50 hover:bg-[#fff3ef] active:scale-95",
        size === "sm" && "size-8",
        size === "md" && "size-9",
        size === "lg" && "size-11",
        showLabel && "h-11 w-auto px-4 text-sm font-semibold",
        active && "border-coral/40 bg-[#fff0eb] text-coral",
        className,
      )}
    >
      <Heart
        className={cn(
          size === "sm" && "size-4",
          size === "md" && "size-[18px]",
          size === "lg" && "size-5",
          active && "fill-current",
        )}
        strokeWidth={1.9}
      />
      {showLabel && <span>{active ? "در علاقه‌مندی‌ها" : "علاقه‌مندی"}</span>}
    </button>
  );
}
