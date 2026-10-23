import type { Plan, PlanId } from "@/lib/types";

export const plans: Plan[] = [
  {
    id: "basic",
    name: "پایه",
    price: 99000,
    period: "ماهانه",
    badge: "شروع آرام",
    description: "برای کسی که می‌خواهد هر ماه چند کتاب خوب بخواند.",
    features: [
      "دسترسی به کتاب‌های اشتراکی",
      "مطالعه در مرورگر",
      "۳ کتاب در هر ماه",
      "پشتیبانی از حالت شب ریدر",
    ],
  },
  {
    id: "pro",
    name: "پیشرفته",
    price: 169000,
    period: "ماهانه",
    badge: "انتخاب بیشتر خواننده‌ها",
    description: "دسترسی کامل به ایبوک‌ها و کتاب‌های صوتی، بدون محدودیت.",
    features: [
      "همه‌ی کتاب‌های اشتراکی",
      "ایبوک و کتاب صوتی",
      "کتابخانه‌ی نامحدود",
      "پخش نمونه‌ی صوتی",
      "پشتیبانی سریع",
    ],
    highlight: true,
  },
  {
    id: "annual",
    name: "سالانه",
    price: 1490000,
    period: "سالانه",
    badge: "۲ ماه هدیه",
    description: "همان امکانات پیشرفته، با پرداخت یک‌باره و صرفه‌ی بیشتر.",
    features: [
      "همه‌ی امکانات پلن پیشرفته",
      "۱۲ ماه دسترسی پیوسته",
      "۲ ماه رایگان نسبت به پرداخت ماهانه",
      "دسترسی به آرشیو پادکست‌ها",
      "پشتیبانی ویژه",
    ],
  },
];

export function getPlan(id: string | null): Plan | undefined {
  return plans.find((plan) => plan.id === id);
}

export function planDurationDays(id: PlanId): number {
  return id === "annual" ? 365 : 30;
}
