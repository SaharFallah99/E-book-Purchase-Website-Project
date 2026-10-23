import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock3, Headphones, Mic2, Sparkles } from "lucide-react";
import { AudioPlayer } from "@/components/audio-player";
import { BookCard } from "@/components/book-card";
import { getAudioBooks } from "@/lib/data";
import { formatDuration, toPersianDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "کتاب‌های صوتی",
  description: "کتاب‌های صوتی فارسی با پیش‌نمایش نمایشی و پلیر ساده در مرورگر.",
};

export default function AudiobooksPage() {
  const audioBooks = getAudioBooks();
  const featured = audioBooks[0];
  const totalMinutes = audioBooks.reduce(
    (sum, book) => sum + (book.durationMin ?? 0),
    0,
  );

  return (
    <div>
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="hero-grain absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr_420px] lg:items-center lg:px-6 lg:py-16">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#f5d47a]">
              <Headphones className="size-4" />
              گوش دادن، در هر جای روز
            </div>
            <h1 className="text-3xl font-extrabold leading-[1.4] sm:text-5xl">
              کتاب‌های صوتی
              <br />
              <span className="text-[#f5d47a]">برای چشم‌های خسته</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">
              از رمان و خاطره تا روان‌شناسی و تاریخ؛ نسخه‌ی صوتی کتاب‌ها را با
              پیش‌نمایش کوتاه بشنو. پلیر این نسخه نمایشی است و فایل صوتی واقعی
              کتاب‌ها را پخش نمی‌کند.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-[11px] text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <Mic2 className="size-3.5 text-[#f5d47a]" />
                {toPersianDigits(audioBooks.length)} کتاب صوتی
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-3.5 text-[#f5d47a]" />
                بیش از {toPersianDigits(Math.round(totalMinutes / 60))} ساعت صدا
              </span>
            </div>
            <Link
              href="#audio-list"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-extrabold text-primary transition hover:-translate-y-0.5"
            >
              دیدن همه‌ی کتاب‌ها
              <ArrowLeft className="size-4" />
            </Link>
          </div>

          <div>
            {featured && (
              <AudioPlayer
                title={featured.title}
                durationMin={featured.durationMin}
                tone="dark"
                className="shadow-2xl shadow-black/20"
              />
            )}
            <p className="mt-3 text-center text-[10px] text-white/45">
              پیش‌نمایش {formatDuration(featured?.durationMin)} کتاب «{featured?.title}»
            </p>
          </div>
        </div>
      </section>

      <div id="audio-list" className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold text-primary">
              <span className="h-px w-6 bg-primary/50" />
              آرشیو صوتی
            </div>
            <h2 className="text-2xl font-extrabold text-coffee">همه‌ی کتاب‌های صوتی</h2>
          </div>
          <p className="text-[10px] text-muted-foreground">
            {toPersianDigits(audioBooks.length)} عنوان · مرتب‌شده بر اساس محبوبیت
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {audioBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-cream px-6 py-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-white text-primary">
              <Sparkles className="size-5" />
            </span>
            <div>
              <h2 className="text-sm font-extrabold text-coffee">اشتراک صوتی هم داری؟</h2>
              <p className="mt-1 text-[10px] text-muted-foreground">
                با پلن پیشرفته، همه‌ی کتاب‌های صوتی اشتراکی در دسترس تو هستند.
              </p>
            </div>
          </div>
          <Link
            href="/subscription"
            className="h-10 shrink-0 rounded-xl bg-primary px-5 text-xs font-bold leading-10 text-white"
          >
            دیدن پلن‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}
