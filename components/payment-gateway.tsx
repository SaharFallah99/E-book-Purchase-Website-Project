"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CreditCard, LockKeyhole, ShieldCheck } from "lucide-react";
import { formatPrice, toPersianDigits } from "@/lib/format";

export function PaymentGateway({
  type,
  id,
  title,
  subtitle,
  amount,
}: {
  type: "book" | "plan";
  id: string;
  title: string;
  subtitle: string;
  amount: number;
}) {
  const router = useRouter();

  function finish(status: "success" | "failed") {
    const params = new URLSearchParams({
      status,
      type,
      id,
      tx: `${Date.now()}`,
    });
    router.push(`/payment/result?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-lg">
      <div className="mb-5 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5d47a]/25 px-3 py-1 text-[10px] font-extrabold text-[#8a5c0e]">
          <LockKeyhole className="size-3" />
          درگاه پرداخت نمایشی
        </span>
        <h1 className="mt-3 text-2xl font-extrabold text-coffee">پرداخت امن</h1>
        <p className="mt-1 text-[11px] text-muted-foreground">
          این صفحه شبیه‌سازی است؛ هیچ اطلاعات کارت واقعی دریافت نمی‌شود.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-[0_30px_80px_-45px_rgba(56,33,16,.55)]">
        <div className="flex items-center justify-between bg-primary px-5 py-4 text-white">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full bg-white/15">
              <CreditCard className="size-4" />
            </span>
            <div>
              <p className="text-xs font-extrabold">کتاب‌سرا</p>
              <p className="text-[9px] text-white/60">درگاه نمایشی</p>
            </div>
          </div>
          <ShieldCheck className="size-5 text-[#f5d47a]" />
        </div>

        <div className="p-5">
          <div className="rounded-2xl bg-cream p-4">
            <p className="text-[10px] text-muted-foreground">
              {type === "book" ? "کتاب انتخابی" : "پلن اشتراک"}
            </p>
            <h2 className="mt-1 text-sm font-extrabold text-coffee">{title}</h2>
            <p className="mt-1 text-[10px] text-muted-foreground">{subtitle}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="text-[11px] font-semibold text-muted-foreground">
                مبلغ قابل پرداخت
              </span>
              <span className="text-lg font-extrabold text-coffee">
                {formatPrice(amount)}
              </span>
            </div>
          </div>

          <div className="mt-4 grid gap-2 text-[10px] text-muted-foreground">
            <div className="flex items-center justify-between rounded-lg bg-header px-3 py-2">
              <span>شماره تراکنش نمایشی</span>
              <span className="font-mono" dir="ltr">
                {toPersianDigits("DEMO-1405-0421")}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-header px-3 py-2">
              <span>وضعیت</span>
              <span className="font-bold text-primary">آماده‌ی پرداخت</span>
            </div>
          </div>

          <div className="mt-5 grid gap-2.5">
            <button
              type="button"
              onClick={() => finish("success")}
              className="h-12 w-full rounded-xl bg-primary text-sm font-extrabold text-white transition hover:bg-primary/90 active:scale-[0.99]"
            >
              پرداخت موفق
            </button>
            <button
              type="button"
              onClick={() => finish("failed")}
              className="h-12 w-full rounded-xl border border-coral/40 bg-[#fff3ef] text-sm font-extrabold text-coral transition hover:bg-[#ffe9e2] active:scale-[0.99]"
            >
              پرداخت ناموفق
            </button>
          </div>

          <p className="mt-4 text-center text-[9px] leading-5 text-muted-foreground">
            با انتخاب هر گزینه، فقط وضعیت همان تراکنش در localStorage ثبت
            می‌شود.
          </p>
        </div>
      </div>

      <Link
        href={type === "book" ? `/book/${id}` : "/subscription"}
        className="mx-auto mt-5 flex w-fit items-center gap-1 text-[11px] font-bold text-muted-foreground transition hover:text-primary"
      >
        <ArrowRight className="size-3.5" />
        بازگشت بدون پرداخت
      </Link>
    </div>
  );
}
