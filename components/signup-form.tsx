"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, UserPlus } from "lucide-react";
import { useStore } from "@/components/store-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const { signup } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("نام را کامل وارد کنید.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("یک ایمیل معتبر وارد کنید.");
      return;
    }
    if (password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }
    if (password !== confirm) {
      setError("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }
    setError("");
    signup(name.trim(), email);
    router.push("/");
  }

  return (
    <Card
      {...props}
      className="border-border shadow-[0_30px_80px_-50px_rgba(56,33,16,.6)]"
    >
      <CardHeader className="pb-2 text-center">
        <span className="mx-auto mb-2 grid size-11 place-items-center rounded-full bg-cream text-primary">
          <UserPlus className="size-5" />
        </span>
        <CardTitle className="text-2xl font-extrabold text-coffee">
          ساخت حساب نمایشی
        </CardTitle>
        <CardDescription className="text-xs leading-6">
          اطلاعات فقط در localStorage همین مرورگر ذخیره می‌شود و به هیچ سروری
          فرستاده نمی‌شود.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">نام و نام خانوادگی</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="مثلاً سارا محمدی"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-11"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="signup-email">ایمیل</FieldLabel>
              <Input
                id="signup-email"
                type="email"
                dir="ltr"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 text-left"
                required
              />
              <FieldDescription>
                برای دمو از هر ایمیل معتبری می‌توانی استفاده کنی.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="signup-password">رمز عبور</FieldLabel>
              <Input
                id="signup-password"
                type="password"
                placeholder="حداقل ۶ کاراکتر"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">تکرار رمز عبور</FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                placeholder="رمز را دوباره وارد کنید"
                autoComplete="new-password"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                className="h-11"
                required
              />
            </Field>

            {error && (
              <p className="rounded-lg bg-[#fff0eb] px-3 py-2 text-[11px] font-semibold text-coral">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="h-11 w-full rounded-xl text-sm font-extrabold">
              ساخت حساب
              <ArrowLeft className="size-4" />
            </Button>

            <div className="relative py-1 text-center">
              <span className="relative z-10 bg-card px-3 text-[10px] text-muted-foreground">
                یا
              </span>
              <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
            </div>

            <Button
              variant="outline"
              type="button"
              onClick={() => {
                signup("مهمان کتاب‌سرا", "guest@ketabsara.ir");
                router.push("/");
              }}
              className="h-11 w-full rounded-xl text-xs font-bold"
            >
              <Sparkles className="size-4 text-primary" />
              ادامه به‌عنوان مهمان
            </Button>

            <FieldDescription className="text-center text-[11px]">
              قبلاً ثبت‌نام کرده‌ای؟{" "}
              <Link href="/login" className="font-bold text-primary hover:underline">
                وارد شو
              </Link>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
