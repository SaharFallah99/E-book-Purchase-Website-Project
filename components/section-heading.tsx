import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "مشاهده همه",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div>
        {eyebrow && (
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-primary">
            <span className="h-px w-6 bg-primary/50" />
            {eyebrow}
          </div>
        )}
        <h2 className="text-2xl font-extrabold tracking-tight text-coffee sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-bold text-primary transition hover:text-primary/75 sm:self-auto"
        >
          {linkLabel}
          <ArrowLeft className="size-4" />
        </Link>
      )}
    </div>
  );
}
