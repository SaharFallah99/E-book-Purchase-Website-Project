import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { PaymentGateway } from "@/components/payment-gateway";
import { getBookById } from "@/lib/data";
import { getPlan } from "@/lib/plans";

export const metadata: Metadata = {
  title: "درگاه پرداخت نمایشی",
  description: "پرداخت نمایشی کتاب‌سرا.",
};

type PaymentPageProps = {
  searchParams: Promise<{
    type?: string | string[];
    id?: string | string[];
  }>;
};

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : "";
  const id = typeof params.id === "string" ? params.id : "";

  const book = type === "book" ? getBookById(id) : undefined;
  const plan = type === "plan" ? getPlan(id) : undefined;

  if (!book && !plan) {
    return (
      <div className="grid min-h-screen place-items-center bg-header px-4">
        <div className="max-w-sm rounded-3xl border border-border bg-white p-8 text-center">
          <p className="text-lg font-extrabold text-coffee">سفارشی پیدا نشد</p>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            لینک پرداخت معتبر نیست یا کتاب/پلن انتخاب‌شده وجود ندارد.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex h-10 items-center rounded-xl bg-primary px-5 text-xs font-bold text-white"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  const title = book ? book.title : plan!.name;
  const subtitle = book
    ? `${book.authors.join("، ") || "نویسنده نامشخص"} · ${book.format === "audiobook" ? "کتاب صوتی" : "کتاب الکترونیکی"}`
    : `اشتراک ${plan!.period} · ${plan!.features[0]}`;
  const amount = book ? book.finalPrice : plan!.price;

  return (
    <div className="flex min-h-screen flex-col items-center bg-header px-4 py-8 sm:justify-center sm:py-12">
      <div className="mb-8">
        <Brand />
      </div>
      <PaymentGateway
        type={book ? "book" : "plan"}
        id={book ? String(book.id) : plan!.id}
        title={title}
        subtitle={subtitle}
        amount={amount}
      />
      <p className="mt-8 text-[9px] text-muted-foreground">
        کتاب‌سرا · نسخه‌ی نمایشی · بدون تراکنش واقعی
      </p>
    </div>
  );
}
