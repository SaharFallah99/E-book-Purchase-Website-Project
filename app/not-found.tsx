import Link from "next/link";
import { BookX } from "lucide-react";
import { Brand } from "@/components/brand";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-header px-4 text-center">
      <Brand />
      <span className="mt-10 grid size-20 place-items-center rounded-full bg-cream text-primary">
        <BookX className="size-9" strokeWidth={1.6} />
      </span>
      <h1 className="mt-5 text-2xl font-extrabold text-coffee">این صفحه پیدا نشد</h1>
      <p className="mt-2 max-w-sm text-xs leading-6 text-muted-foreground">
        ممکن است کتاب یا دسته‌بندی حذف شده باشد. به قفسه برگرد و دوباره جست‌وجو
        کن.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-6 text-xs font-bold text-white"
      >
        بازگشت به خانه
      </Link>
    </div>
  );
}
