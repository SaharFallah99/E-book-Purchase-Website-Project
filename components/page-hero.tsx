import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-border bg-cream/70", className)}>
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-12">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            {eyebrow && (
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-primary">
                <span className="h-px w-6 bg-primary/50" />
                {eyebrow}
              </div>
            )}
            <h1 className="text-3xl font-extrabold tracking-tight text-coffee sm:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {children && <div className="shrink-0">{children}</div>}
        </div>
      </div>
    </section>
  );
}
