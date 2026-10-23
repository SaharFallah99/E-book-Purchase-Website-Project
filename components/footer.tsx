import Link from "next/link";
import { Camera, Mail, Send } from "lucide-react";
import { Brand } from "@/components/brand";
import { categories } from "@/lib/data";
import { toPersianDigits } from "@/lib/format";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-header">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Brand />
            <p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
              کتاب‌سرا یک فروشگاه نمایشی برای خواندن و شنیدن کتاب‌های فارسی است.
              کتاب بعدی‌ات را پیدا کن، در علاقه‌مندی‌ها نگه دار و در مرورگر
              بخوان.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full border border-border bg-white text-primary">
                <Camera className="size-4" />
              </span>
              <span className="grid size-9 place-items-center rounded-full border border-border bg-white text-primary">
                <Send className="size-4" />
              </span>
              <span className="grid size-9 place-items-center rounded-full border border-border bg-white text-primary">
                <Mail className="size-4" />
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold text-coffee">دسته‌بندی‌ها</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="transition hover:text-primary"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold text-coffee">دسترسی سریع</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/audiobooks" className="transition hover:text-primary">
                  کتاب‌های صوتی
                </Link>
              </li>
              <li>
                <Link href="/podcasts" className="transition hover:text-primary">
                  پادکست‌ها
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="transition hover:text-primary">
                  پلن‌های اشتراک
                </Link>
              </li>
              <li>
                <Link href="/subscription/compare" className="transition hover:text-primary">
                  مقایسه‌ی پلن‌ها
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="transition hover:text-primary">
                  علاقه‌مندی‌ها
                </Link>
              </li>
              <li>
                <Link href="/library" className="transition hover:text-primary">
                  کتابخانه‌ی من
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold text-coffee">خبرنامه‌ی کتاب‌سرا</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              هر هفته یک پیشنهاد خواندنی و یک کتاب صوتی تازه.
            </p>
            <form className="mt-4 flex gap-2" aria-label="عضویت در خبرنامه">
              <input
                type="email"
                placeholder="ایمیل شما"
                aria-label="ایمیل برای خبرنامه"
                className="h-10 min-w-0 flex-1 rounded-xl border border-input bg-white px-3 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              <button
                type="button"
                className="h-10 shrink-0 rounded-xl bg-primary px-4 text-xs font-bold text-white transition hover:bg-primary/90"
              >
                عضویت
              </button>
            </form>
            <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
              داده‌های این دمو از طاقچه گرفته شده و برای فروش واقعی نیست.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center text-[11px] text-muted-foreground sm:flex-row sm:text-right">
          <p>
            © {toPersianDigits(1405)} کتاب‌سرا. این پروژه یک نمونهٔ نمایشی است.
          </p>
          <p className="flex items-center gap-1.5">
            ساخته‌شده با احترام برای کتاب‌خوان‌های فارسی
          </p>
        </div>
      </div>
    </footer>
  );
}
