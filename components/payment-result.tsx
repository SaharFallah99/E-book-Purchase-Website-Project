"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { useStore } from "@/components/store-provider";
import { buttonVariants } from "@/components/ui/button";
import type { PlanId } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PaymentResult({
  status,
  type,
  id,
  tx,
}: {
  status: string;
  type: string;
  id: string;
  tx: string;
}) {
  const { ready, purchaseBook, activatePlan, hasPurchased, plan, hasActivePlan } =
    useStore();
  const didApply = useRef(false);
  const success = status === "success";
  const applied =
    type === "book"
      ? hasPurchased(Number(id))
      : type === "plan"
        ? plan === id && hasActivePlan
        : false;

  useEffect(() => {
    if (!ready || !success || didApply.current) return;
    if (type !== "book" && type !== "plan") return;
    const guardKey = `ketabsara:payment:${tx}:${type}:${id}`;
    try {
      if (window.sessionStorage.getItem(guardKey) === "1") {
        didApply.current = true;
        return;
      }
    } catch {
      // Ignore storage errors; purchase and plan activation are idempotent.
    }

    if (type === "book") {
      const bookId = Number(id);
      if (Number.isFinite(bookId)) purchaseBook(bookId);
    } else {
      const planId = id as PlanId;
      if (["basic", "pro", "annual"].includes(planId)) activatePlan(planId);
    }

    try {
      window.sessionStorage.setItem(guardKey, "1");
    } catch {
      // Ignore storage errors; purchases are still idempotent in memory.
    }
    didApply.current = true;
  }, [ready, success, type, id, tx, purchaseBook, activatePlan]);

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-white p-8 text-center shadow-[0_30px_80px_-50px_rgba(56,33,16,.55)]">
      <span
        className={cn(
          "mx-auto grid size-20 place-items-center rounded-full",
          success ? "bg-primary/10 text-primary" : "bg-[#fff0eb] text-coral",
        )}
      >
        {success ? (
          <CheckCircle2 className="size-10" strokeWidth={1.7} />
        ) : (
          <XCircle className="size-10" strokeWidth={1.7} />
        )}
      </span>

      <h1 className="mt-5 text-2xl font-extrabold text-coffee">
        {success ? "پرداخت موفق" : "پرداخت ناموفق"}
      </h1>
      <p className="mt-2 text-xs leading-6 text-muted-foreground">
        {success
          ? type === "plan"
            ? "اشتراک شما فعال شد."
            : "کتاب به کتابخانه‌ی شما اضافه شد."
          : "تراکنش انجام نشد و مبلغی کسر نشده است."}
      </p>

      {success && !applied && (
        <p className="mt-3 text-[10px] text-muted-foreground">در حال ثبت نتیجه…</p>
      )}

      <div className="mt-7 flex flex-col gap-2">
        <Link
          href={success ? "/library" : "/"}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "h-11 w-full rounded-xl text-sm font-extrabold",
          )}
        >
          {success ? "رفتن به کتابخانه" : "بازگشت به فروشگاه"}
        </Link>
        {!success && type && id && (
          <Link
            href={`/payment?type=${type}&id=${id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 w-full rounded-xl text-sm font-extrabold",
            )}
          >
            تلاش دوباره
          </Link>
        )}
      </div>
    </div>
  );
}
