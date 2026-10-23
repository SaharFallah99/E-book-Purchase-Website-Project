import { Star } from "lucide-react";
import { formatCompactNumber, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

type RatingStarsProps = {
  rating: number;
  count?: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  reviewsLabel?: string;
};

const sizes = {
  sm: { star: 13, gap: 1 },
  md: { star: 16, gap: 2 },
  lg: { star: 20, gap: 2 },
} as const;

export function RatingStars({
  rating,
  count,
  showValue = true,
  size = "sm",
  className,
  reviewsLabel = "امتیاز",
}: RatingStarsProps) {
  const safeRating = Math.max(0, Math.min(5, rating || 0));
  const percentage = (safeRating / 5) * 100;
  const config = sizes[size];
  const width = config.star * 5 + config.gap * 4;

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      <span
        className="relative inline-flex shrink-0"
        style={{ width, height: config.star }}
        dir="ltr"
        aria-label={`${formatNumber(safeRating, 1)} از ۵ ستاره`}
      >
        <span
          className="flex text-[#ded6c9]"
          style={{ gap: config.gap }}
          aria-hidden="true"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={`empty-${index}`}
              style={{ width: config.star, height: config.star }}
              strokeWidth={1.5}
            />
          ))}
        </span>
        <span
          className="absolute inset-y-0 left-0 overflow-hidden text-sunflower"
          style={{ width: `${percentage}%` }}
          aria-hidden="true"
        >
          <span className="flex" style={{ gap: config.gap }}>
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={`filled-${index}`}
                style={{ width: config.star, height: config.star }}
                fill="currentColor"
                strokeWidth={1.2}
              />
            ))}
          </span>
        </span>
      </span>
      {showValue && safeRating > 0 && (
        <span className="text-xs font-semibold text-coffee/80">
          {formatNumber(safeRating, 1)}
        </span>
      )}
      {typeof count === "number" && count > 0 && (
        <span className="text-[11px] text-muted-foreground">
          ({formatCompactNumber(count)} {reviewsLabel})
        </span>
      )}
    </div>
  );
}
