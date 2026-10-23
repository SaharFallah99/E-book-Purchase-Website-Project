import Link from "next/link";
import { Check, Crown, Sparkles } from "lucide-react";
import { plans } from "@/lib/plans";
import { formatNumber } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubscriptionPlans({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-3",
        compact && "md:gap-3",
      )}
    >
      {plans.map((plan) => (
        <article
          key={plan.id}
          className={cn(
            "relative flex flex-col rounded-3xl border p-6 transition hover:-translate-y-1",
            plan.highlight
              ? "border-primary bg-primary text-white shadow-[0_25px_60px_-35px_rgba(97,112,84,.9)]"
              : "border-border bg-white text-coffee shadow-[0_20px_45px_-40px_rgba(56,33,16,.5)]",
          )}
        >
          {plan.badge && (
            <span
              className={cn(
                "absolute -top-3 right-5 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-extrabold",
                plan.highlight
                  ? "bg-[#f5d47a] text-coffee"
                  : "bg-cream text-primary",
              )}
            >
              {plan.highlight ? <Crown className="size-3" /> : <Sparkles className="size-3" />}
              {plan.badge}
            </span>
          )}

          <h3 className="text-lg font-extrabold">{plan.name}</h3>
          <p
            className={cn(
              "mt-2 min-h-12 text-xs leading-6",
              plan.highlight ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {plan.description}
          </p>

          <div className="mt-5 flex items-end gap-1.5">
            <span className="text-3xl font-extrabold tracking-tight">
              {formatNumber(plan.price)}
            </span>
            <span
              className={cn(
                "pb-1 text-[11px]",
                plan.highlight ? "text-white/65" : "text-muted-foreground",
              )}
            >
              تومان / {plan.period}
            </span>
          </div>

          <div
            className={cn(
              "my-5 h-px w-full",
              plan.highlight ? "bg-white/15" : "bg-border",
            )}
          />

          <ul className="flex-1 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-xs leading-6">
                <span
                  className={cn(
                    "mt-1 grid size-4 shrink-0 place-items-center rounded-full",
                    plan.highlight ? "bg-white/15 text-[#f5d47a]" : "bg-primary/10 text-primary",
                  )}
                >
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
                <span className={plan.highlight ? "text-white/85" : "text-coffee/80"}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href={`/payment?type=plan&id=${plan.id}`}
            className={cn(
              buttonVariants({ variant: plan.highlight ? "secondary" : "default", size: "lg" }),
              "mt-7 h-11 w-full rounded-xl text-sm font-extrabold",
              plan.highlight && "bg-white text-primary hover:bg-[#fdfbf5]",
            )}
          >
            انتخاب پلن {plan.name}
          </Link>
        </article>
      ))}
    </div>
  );
}
