import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "ورود",
  description: "ورود به حساب نمایشی کتاب‌سرا.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-header px-4 py-8">
      <div className="mb-6">
        <Brand />
      </div>
      <div className="w-full max-w-4xl">
        <LoginForm />
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
