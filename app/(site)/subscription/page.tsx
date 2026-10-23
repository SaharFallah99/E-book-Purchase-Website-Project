import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SubscriptionPlans } from "@/components/subscription-plans";
import { buttonVariants } from "@/components/ui/button";
import { formatNumber, toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "پلن‌های اشتراک",
  description: "مقایسه و انتخاب پلن‌های اشتراک کتاب‌سرا؛ پایه، پیشرفته و سالانه.",
};

const faqs = [
  {
    q: "پرداخت در این سایت واقعی است؟",
    a: "نه. این پروژه یک دمو است و درگاه پرداخت فقط دو گزینه‌ی موفق و ناموفق دارد. هیچ اطلاعات بانکی دریافت یا ذخیره نمی‌شود.",
  },
  {
    q: "بعد از اشتراک، کتاب‌ها کجا ذخیره می‌شوند؟",
    a: "همه‌چیز در localStorage همین مرورگر ذخیره می‌شود. اگر حافظه‌ی مرورگر را پاک کنی، وضعیت اشتراک و خریدها هم پاک می‌شوند.",
  },
  {
    q: "تفاوت پلن پایه و پیشرفته چیست؟",
    a: "پایه برای شروع است و دسترسی محدودتری دارد. پیشرفته کتاب‌های صوتی، کتابخانه‌ی نامحدود و امکانات بیشتری ارائه می‌دهد.",
  },
  {
    q: "آیا می‌توانم متن کامل کتاب‌ها را بخوانم؟",
    a: "در این نمونه، ریدر فقط متن نمایشی و متون حوزه‌ی عمومی را نشان می‌دهد. متن واقعی کتاب‌ها در دمو قرار داده نشده است.",
  },
];

export default function SubscriptionPage() {
  return (
    <div>
      <PageHero
        eyebrow="اشتراک کتاب‌سرا"
        title="یک اشتراک، چند جهان تازه"
        description="هر ماه کتاب بخوان و بشنو، بدون خرید جداگانه. پلن مناسب خودت را انتخاب کن؛ تغییر یا لغو هم در این دمو فقط یک کلیک است."
      >
        <Link
          href="/subscription/compare"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-10 rounded-xl border-border bg-white text-xs font-bold",
          )}
        >
          مقایسه‌ی کامل پلن‌ها
          <ArrowLeft className="size-3.5" />
        </Link>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mb-6 flex flex-wrap items-center gap-4 text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary" />
            پرداخت کاملاً نمایشی
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BadgeCheck className="size-3.5 text-primary" />
            فعال‌سازی فوری بعد از پرداخت موفق
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-primary" />
            قابل لغو با پاک‌کردن داده‌های مرورگر
          </span>
        </div>

        <SubscriptionPlans />

        <section className="mt-12 rounded-3xl border border-border bg-white p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-extrabold text-coffee">سؤال‌های پرتکرار</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                چیزهایی که شاید قبل از انتخاب پلن بخواهی بدانی.
              </p>
            </div>
            <span className="text-[10px] text-muted-foreground">
              پلن سالانه: {formatNumber(1490000)} تومان
            </span>
          </div>
          <div className="mt-5 divide-y divide-border">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-extrabold text-coffee">
                  {faq.q}
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-cream text-primary transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 max-w-2xl text-[11px] leading-6 text-muted-foreground">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-8 rounded-2xl bg-cream px-5 py-5 text-center">
          <p className="text-xs font-bold text-coffee">
            سه پلن، یک هدف: کتاب بعدی را شروع کنی.
          </p>
          <p className="mt-1 text-[10px] text-muted-foreground">
            پرداخت موفق، اشتراک را برای {toPersianDigits(30)} یا {toPersianDigits(365)} روز فعال می‌کند.
          </p>
        </div>
      </div>
    </div>
  );
}
