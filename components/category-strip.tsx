import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CategoryIcon } from "@/components/category-icon";
import { categories, getCategoryCounts } from "@/lib/data";
import { toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CategoryStrip({ className }: { className?: string }) {
  const counts = getCategoryCounts();

  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5", className)}>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categories/${category.slug}`}
          className="group flex min-h-28 flex-col justify-between rounded-2xl border border-border bg-white p-4 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_35px_-30px_rgba(56,33,16,.5)]"
        >
          <div className="flex items-start justify-between gap-2">
            <CategoryIcon name={category.icon} tone={category.tone} className="size-10" />
            <ArrowLeft className="size-4 text-muted-foreground/40 transition group-hover:-translate-x-1 group-hover:text-primary" />
          </div>
          <div className="mt-3">
            <h3 className="text-sm font-extrabold text-coffee">{category.title}</h3>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {toPersianDigits(counts[category.slug] ?? 0)} کتاب
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
