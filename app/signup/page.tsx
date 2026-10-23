import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "ثبت‌نام",
  description: "ساخت حساب نمایشی در کتاب‌سرا.",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-header px-4 py-8">
      <div className="mb-6">
        <Brand />
      </div>
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
      <Link
        href="/"
        className="mt-6 text-[10px] font-bold text-muted-foreground transition hover:text-primary"
      >
        بازگشت به فروشگاه
      </Link>
    </div>
  );
}
