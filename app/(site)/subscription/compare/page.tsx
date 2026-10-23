import type { Metadata } from "next";
import Link from "next/link";
import { Check, Crown, X } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { plans } from "@/lib/plans";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "مقایسه‌ی پلن‌ها",
  description: "جدول مقایسه‌ی امکانات پلن‌های پایه، پیشرفته و سالانه‌ی کتاب‌سرا.",
};

type Value = boolean | string;

const rows: { label: string; values: [Value, Value, Value] }[] = [
  { label: "دسترسی به کتاب‌های اشتراکی", values: [true, true, true] },
  { label: "کتاب الکترونیکی", values: [true, true, true] },
  { label: "کتاب صوتی", values: [false, true, true] },
  { label: "تعداد کتاب در ماه", values: ["۳ کتاب", "نامحدود", "نامحدود"] },
  { label: "ریدر در مرورگر", values: [true, true, true] },
  { label: "حالت روز و شب ریدر", values: [true, true, true] },
  { label: "آرشیو پادکست", values: [false, true, true] },
  { label: "کتابخانه‌ی شخصی", values: [true, true, true] },
  { label: "پشتیبانی", values: ["عادی", "سریع", "ویژه"] },
  { label: "تخفیف پرداخت سالانه", values: [false, false, "۲ ماه هدیه"] },
];

export default function ComparePlansPage() {
  return (
    <div>
      <PageHero
        eyebrow="انتخاب آگاهانه"
        title="کدام پلن برای من مناسب است؟"
        description="امکانات سه پلن را کنار هم ببین. همه‌ی پرداخت‌ها نمایشی هستند و هیچ مبلغ واقعی از حساب کسر نمی‌شود."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="overflow-x-auto rounded-3xl border border-border bg-white">
          <table className="w-full min-w-[760px] border-collapse text-right">
            <caption className="sr-only">مقایسه‌ی پلن‌های اشتراک کتاب‌سرا</caption>
            <thead>
              <tr className="border-b border-border bg-header">
                <th className="w-[36%] px-5 py-5 text-xs font-extrabold text-muted-foreground">
                  امکانات
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className={cn(
                      "px-4 py-5 text-center",
                      plan.highlight && "bg-primary/5",
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {plan.highlight && (
                        <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-[#f5d47a] px-2 py-0.5 text-[9px] font-extrabold text-coffee">
                          <Crown className="size-2.5" />
                          پیشنهاد ما
                        </span>
                      )}
                      <span className="text-base font-extrabold text-coffee">
                        {plan.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatNumber(plan.price)} تومان / {plan.period}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={row.label}
                  className={cn(
                    "border-b border-border last:border-0",
                    rowIndex % 2 === 1 && "bg-cream/35",
                  )}
                >
                  <td className="px-5 py-4 text-xs font-semibold text-coffee">
                    {row.label}
                  </td>
                  {row.values.map((value, index) => (
                    <td
                      key={`${row.label}-${index}`}
                      className={cn(
                        "px-4 py-4 text-center text-xs",
                        plans[index].highlight && "bg-primary/[0.035]",
                      )}
                    >
                      {typeof value === "boolean" ? (
                        value ? (
                          <span className="mx-auto grid size-6 place-items-center rounded-full bg-primary/10 text-primary">
                            <Check className="size-3.5" strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="mx-auto grid size-6 place-items-center rounded-full bg-cream text-muted-foreground">
                            <X className="size-3.5" />
                          </span>
                        )
                      ) : (
                        <span className="font-bold text-coffee">{value}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="px-5 py-5" />
                {plans.map((plan) => (
                  <td
                    key={`cta-${plan.id}`}
                    className={cn(
                      "px-4 py-5 text-center",
                      plan.highlight && "bg-primary/[0.035]",
                    )}
                  >
                    <Link
                      href={`/payment?type=plan&id=${plan.id}`}
                      className={cn(
                        buttonVariants({
                          variant: plan.highlight ? "default" : "outline",
                          size: "lg",
                        }),
                        "h-10 rounded-xl px-4 text-xs font-extrabold",
                      )}
                    >
                      انتخاب {plan.name}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-[10px] text-muted-foreground">
          همه‌ی پلن‌ها بعد از پرداخت موفق و به‌صورت محلی در مرورگر فعال می‌شوند.
        </p>
      </div>
    </div>
  );
}
