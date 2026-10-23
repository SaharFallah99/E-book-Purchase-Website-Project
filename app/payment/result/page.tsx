import type { Metadata } from "next";
import { Brand } from "@/components/brand";
import { PaymentResult } from "@/components/payment-result";

export const metadata: Metadata = {
  title: "نتیجه‌ی پرداخت",
  description: "نتیجه‌ی پرداخت نمایشی کتاب‌سرا.",
};

type ResultPageProps = {
  searchParams: Promise<{
    status?: string | string[];
    type?: string | string[];
    id?: string | string[];
    tx?: string | string[];
  }>;
};

export default async function PaymentResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const value = (key: string) =>
    typeof params[key as keyof typeof params] === "string"
      ? (params[key as keyof typeof params] as string)
      : "";

  const status = value("status");
  const type = value("type");
  const id = value("id");
  const tx = value("tx") || "no-tx";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-header px-4 py-10">
      <div className="mb-8">
        <Brand />
      </div>
      <PaymentResult status={status} type={type} id={id} tx={tx} />
      <p className="mt-8 text-[9px] text-muted-foreground">
        کتاب‌سرا · نسخه‌ی نمایشی · بدون تراکنش واقعی
      </p>
    </div>
  );
}
