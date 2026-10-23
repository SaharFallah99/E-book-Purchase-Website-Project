"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { Brand } from "@/components/brand";
import { useStore } from "@/components/store-provider";
import { Sunflower } from "@/components/sunflower";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { login } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("یک ایمیل معتبر وارد کنید.");
      return;
    }
    if (password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }
    setError("");
    login(email, password);
    router.push("/");
    router.refresh();
  }

  function quickLogin() {
    login("demo@ketabsara.ir", "demo123");
    router.push("/");
    router.refresh();
  }

  return (
    <div className={cn("flex flex-col gap-5", className)} {...props}>
      <Card className="overflow-hidden border-border p-0 shadow-[0_30px_80px_-50px_rgba(56,33,16,.6)]">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-9">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="grid size-11 place-items-center rounded-full bg-cream text-primary">
                  <LockKeyhole className="size-5" />
                </span>
                <h1 className="text-2xl font-extrabold text-coffee">
                  خوش برگشتی
                </h1>
                <p className="text-balance text-xs leading-6 text-muted-foreground">
                  وارد حساب نمایشی کتاب‌سرا شو و از همان‌جایی که بودی ادامه بده.
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">ایمیل</FieldLabel>
                <div className="relative">
                  <Mail className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    dir="ltr"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-11 ps-9 text-left"
                    required
                  />
                </div>
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">رمز عبور</FieldLabel>
                  <span className="mr-auto text-[10px] text-muted-foreground">
                    حداقل ۶ کاراکتر
                  </span>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-11"
                  required
                />
              </Field>

              {error && (
                <p className="rounded-lg bg-[#fff0eb] px-3 py-2 text-[11px] font-semibold text-coral">
                  {error}
                </p>
              )}

              <Field>
                <Button type="submit" size="lg" className="h-11 w-full rounded-xl text-sm font-extrabold">
                  ورود به حساب
                  <ArrowLeft className="size-4" />
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                یا سریع‌تر وارد شو
              </FieldSeparator>

              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={quickLogin}
                  className="h-11 w-full rounded-xl border-border text-xs font-bold"
                >
                  <Sparkles className="size-4 text-primary" />
                  ورود سریع با حساب نمایشی
                </Button>
              </Field>

              <FieldDescription className="text-center text-[11px]">
                <span className="mb-1 block text-muted-foreground">
                  برای دمو می‌توانی هر ایمیل و رمز ۶ رقمی وارد کنی.
                </span>
                حساب نداری؟{" "}
                <Link href="/signup" className="font-bold text-primary hover:underline">
                  ثبت‌نام کن
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden overflow-hidden bg-primary p-8 text-white md:flex md:flex-col md:justify-between">
            <div className="hero-grain absolute inset-0 opacity-60" aria-hidden="true" />
            <Sunflower
              duration={7}
              delay={0.4}
              headDelay={1}
              opacity={0.4}
              className="absolute -bottom-16 -left-8 w-52"
            />
            <Sunflower
              duration={5.8}
              delay={1.5}
              headDelay={2}
              opacity={0.3}
              className="absolute -right-10 top-0 w-40"
            />
            <div className="relative z-10">
              <Brand onDark compact />
              <blockquote className="mt-16 text-2xl font-extrabold leading-[1.8]">
                «کتاب، آرام‌ترین راه برای بلندتر دیدن است.»
              </blockquote>
              <p className="mt-4 text-xs leading-6 text-white/60">
                یک حساب نمایشی بساز، کتاب‌هایت را نگه دار و در مرورگر بخوان.
                اطلاعات فقط روی همین دستگاه می‌ماند.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-[10px] text-white/50">
              <span className="size-1.5 rounded-full bg-[#f5d47a]" />
              ورود امن نمایشی · بدون سرور و دیتابیس
            </div>
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center text-[10px] leading-6">
        با ورود، تراکنش‌های نمایشی و علاقه‌مندی‌های این مرورگر در دسترس تو
        قرار می‌گیرد.{" "}
        <span className="text-primary">بدون ارسال اطلاعات به سرور.</span>
      </FieldDescription>
    </div>
  );
}
