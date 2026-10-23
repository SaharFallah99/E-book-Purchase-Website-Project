import Link from "next/link";
import { SunflowerMark } from "@/components/sunflower";
import { cn } from "@/lib/utils";

export function Brand({
  className,
  onDark = false,
  compact = false,
}: {
  className?: string;
  onDark?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="کتاب‌سرا، صفحه‌ی اصلی"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-full shadow-sm",
          onDark ? "bg-white/10 ring-1 ring-white/25" : "bg-cream ring-1 ring-border",
        )}
      >
        <SunflowerMark className="size-7" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "text-xl font-extrabold tracking-tight",
              onDark ? "text-white" : "text-coffee",
            )}
          >
            کتاب‌سرا
          </span>
          <span
            className={cn(
              "mt-1 text-[10px] font-medium tracking-wide",
              onDark ? "text-white/65" : "text-muted-foreground",
            )}
          >
            خواندن، شنیدن، ماندن
          </span>
        </span>
      )}
    </Link>
  );
}
