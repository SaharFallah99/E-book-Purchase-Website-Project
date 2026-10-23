import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpenCheck,
  CreditCard,
  Mic2,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AudioPlayer } from "@/components/audio-player";
import { BookCard } from "@/components/book-card";
import { BookCover } from "@/components/book-cover";
import { CategoryStrip } from "@/components/category-strip";
import { Hero } from "@/components/hero";
import { RatingStars } from "@/components/rating-stars";
import { SectionHeading } from "@/components/section-heading";
import { SubscriptionPlans } from "@/components/subscription-plans";
import { SunflowerMark } from "@/components/sunflower";
import { buttonVariants } from "@/components/ui/button";
import { getHomeBooks, podcasts } from "@/lib/data";
import { formatCompactNumber, toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { bestsellers, newReleases, freeBooks, audiobooks, rankings } =
    getHomeBooks();
  const featuredAudio = audiobooks[0];

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="relative z-30 -mt-7 grid gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-[0_18px_45px_-35px_rgba(56,33,16,.6)] sm:grid-cols-3">
          {[
            {
              icon: BookOpenCheck,
              title: "دسترسی در مرورگر",
              text: "بدون نصب برنامه، همین‌جا بخوان",
            },
            {
              icon: ShieldCheck,
              title: "پرداخت نمایشی",
              text: "بدون اطلاعات بانکی واقعی",
            },
            {
              icon: CreditCard,
              title: "خرید یا اشتراک",
              text: "هرطور که راحت‌ترید",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3 bg-header px-4 py-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-extrabold text-coffee">{item.title}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <section className="pt-14" id="categories">
          <SectionHeading
            eyebrow="از کجا شروع کنیم؟"
            title="دسته‌بندی موضوعی"
            description="از رمان و شعر تا روان‌شناسی و کودک؛ دنیای کتاب را از زاویه‌ی دلخواه خودت ببین."
            href="/categories"
            linkLabel="همه‌ی دسته‌ها"
          />
          <CategoryStrip />
        </section>

        <section className="pt-16" id="bestsellers">
          <SectionHeading
            eyebrow="انتخاب خواننده‌ها"
            title="پرفروش‌ترین‌ها"
            description="کتاب‌هایی که این روزها بیشتر از همه خوانده و شنیده می‌شوند."
            href="/categories/novel"
            linkLabel="بیشتر بخوانید"
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {bestsellers.slice(0, 8).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-coffee px-6 py-8 text-white sm:px-10">
            <div className="absolute -left-12 -top-10 opacity-20">
              <SunflowerMark className="size-48" />
            </div>
            <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-[#f5d47a]">
                  <Sparkles className="size-3" />
                  اشتراک کتاب‌سرا
                </span>
                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  خواندن، وقتی بهتر است که محدود نباشد.
                </h2>
                <p className="mt-2 text-xs leading-6 text-white/65 sm:text-sm">
                  با یک اشتراک، به ایبوک‌ها و کتاب‌های صوتی دسترسی داشته باش و
                  بدون خرید جداگانه، کتاب بعدی را شروع کن.
                </p>
              </div>
              <Link
                href="/subscription"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "h-11 shrink-0 rounded-full bg-[#f5d47a] px-6 text-sm font-extrabold text-coffee hover:bg-[#f8df93]",
                )}
              >
                دیدن پلن‌ها
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="pt-16">
          <SectionHeading
            eyebrow="تازه رسیده‌ها"
            title="تازه‌های کتاب‌سرا"
            description="کتاب‌هایی که به‌تازگی به قفسه اضافه شده‌اند؛ وقت یک شروع تازه."
            href="/categories"
            linkLabel="همه‌ی کتاب‌ها"
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {newReleases.slice(0, 8).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-cream px-4 py-8 sm:px-7">
          <SectionHeading
            eyebrow="بدون هزینه"
            title="کتاب‌های رایگان"
            description="چند کتاب و کتاب صوتی برای شروع، بدون پرداخت هیچ هزینه‌ای."
            href="/categories/kids"
            linkLabel="دیدن کتاب‌های رایگان"
            className="px-1"
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {freeBooks.slice(0, 4).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        <section className="pt-16">
          <SectionHeading
            eyebrow="گوش دادن"
            title="کتاب‌های صوتی پرطرفدار"
            description="صدای کتاب را همراه خودت ببر؛ با پیش‌نمایش کوتاه و پلیر ساده‌ی نمایشی."
            href="/audiobooks"
            linkLabel="همه‌ی کتاب‌های صوتی"
          />
          {featuredAudio && (
            <AudioPlayer
              title={featuredAudio.title}
              durationMin={featuredAudio.durationMin}
              className="mb-4"
            />
          )}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {audiobooks.slice(0, 8).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 pt-16 lg:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-3xl border border-border bg-white p-5 sm:p-7">
            <SectionHeading
              eyebrow="رتبه‌بندی کتاب‌سرا"
              title="۱۰ کتاب برتر این هفته"
              className="mb-4"
            />
            <ol className="divide-y divide-border">
              {rankings.map((book, index) => (
                <li key={book.id} className="flex items-center gap-3 py-3">
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-extrabold",
                      index === 0
                        ? "bg-[#f5d47a] text-coffee"
                        : index < 3
                          ? "bg-primary/10 text-primary"
                          : "bg-cream text-muted-foreground",
                    )}
                  >
                    {toPersianDigits(index + 1)}
                  </span>
                  <Link
                    href={`/book/${book.id}`}
                    className="shrink-0 transition hover:opacity-85"
                    aria-label={book.title}
                  >
                    <BookCover
                      src={book.cover}
                      title={book.title}
                      className="w-9 rounded-md"
                      sizes="36px"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/book/${book.id}`}
                      className="line-clamp-1 text-xs font-extrabold text-coffee transition hover:text-primary"
                    >
                      {book.title}
                    </Link>
                    <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">
                      {book.authors.join("، ") || "نویسنده نامشخص"}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <RatingStars rating={book.rating} showValue size="sm" />
                  </div>
                  <span className="w-8 text-left text-[10px] font-bold text-primary">
                    {formatCompactNumber(book.ratingsCount)}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col justify-between overflow-hidden rounded-3xl bg-primary p-6 text-white">
            <div>
              <div className="flex items-center gap-2 text-[#f5d47a]">
                <Quote className="size-7" />
                <span className="text-[11px] font-bold">یک جمله برای امروز</span>
              </div>
              <blockquote className="mt-5 text-2xl font-extrabold leading-[1.7]">
                «کتاب، تنها جایی است که می‌توانی همزمان در چند زندگی نفس بکشی.»
              </blockquote>
              <p className="mt-4 text-xs leading-6 text-white/60">
                این جمله بخشی از متن نمایشی کتاب‌سراست؛ برای یادآوری این‌که همیشه
                یک صفحه‌ی تازه برای شروع هست.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <Link
                href="/categories/novel"
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-xs font-extrabold text-primary"
              >
                رمان‌ها را ببین
                <ArrowLeft className="size-3.5" />
              </Link>
              <Link
                href="/favorites"
                className="inline-flex h-10 items-center rounded-full border border-white/25 px-4 text-xs font-bold text-white hover:bg-white/10"
              >
                علاقه‌مندی‌های من
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-2 border-t border-white/15 pt-4 text-[10px] text-white/55">
              <BadgeCheck className="size-3.5 text-[#f5d47a]" />
              ذخیره‌ی محلی، بدون نیاز به حساب واقعی
            </div>
          </div>
        </section>

        <section className="pt-16" id="subscription">
          <SectionHeading
            eyebrow="اشتراک"
            title="یک پلن برای هر شکل از خواندن"
            description="پایه، پیشرفته یا سالانه؛ هر کدام با امکانات متفاوت. پرداخت کاملاً نمایشی است."
            href="/subscription/compare"
            linkLabel="مقایسه‌ی کامل"
          />
          <SubscriptionPlans />
        </section>

        <section className="pt-16">
          <SectionHeading
            eyebrow="برای شنیدن"
            title="پادکست‌های کتاب‌سرا"
            description="گفت‌وگو، قصه و فلسفه؛ چند پادکست نمونه برای وقتی که چشم‌ها استراحت می‌خواهند."
            href="/podcasts"
            linkLabel="ورود به پادکست‌ها"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {podcasts.map((podcast) => (
              <Link
                key={podcast.id}
                href={`/podcasts?p=${podcast.id}`}
                className="group relative overflow-hidden rounded-2xl p-5 text-white transition hover:-translate-y-1"
                style={{ backgroundColor: podcast.color }}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/15 px-2 py-1 text-[9px] font-bold">
                    {toPersianDigits(podcast.episodes)} قسمت
                  </span>
                  <span className="grid size-8 place-items-center rounded-full bg-white/15 transition group-hover:bg-white/25">
                    <Play className="mr-0.5 size-3.5 fill-current" />
                  </span>
                </div>
                <Mic2 className="mt-7 size-6 text-white/60" />
                <h3 className="mt-2 text-lg font-extrabold">{podcast.title}</h3>
                <p className="mt-1 line-clamp-2 min-h-9 text-[10px] leading-5 text-white/65">
                  {podcast.description}
                </p>
                <p className="mt-4 text-[10px] font-bold text-white/80">
                  با {podcast.host}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
