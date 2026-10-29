import Link from "next/link";
import { ArrowLeft, Headphones, Sparkles } from "lucide-react";
import { Sunflower } from "@/components/sunflower";
import { toPersianDigits } from "@/lib/format";

export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-primary text-white"
      aria-labelledby="hero-title"
    >
      <div className="hero-grain absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute -left-24 -top-28 size-[420px] rounded-full bg-[#7d8d6d]/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 right-1/4 size-[380px] rounded-full bg-[#42513a]/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[540px] max-w-7xl items-center px-4 py-16 sm:min-h-[560px] lg:px-6">
        <Sunflower
          duration={6.9}
          delay={0}
          headDelay={0.4}
          headDuration={16}
          opacity={0.96}
          className="absolute -bottom-10 left-[-4%] z-0 w-36 opacity-70 sm:bottom-0 sm:left-2 sm:w-52 sm:opacity-90 lg:left-8 lg:w-64"
        />
        <Sunflower
          duration={5.8}
          delay={1.2}
          headDelay={1.8}
          headDuration={13}
          opacity={0.88}
          className="absolute bottom-8 left-[18%] z-0 hidden w-28 sm:block sm:w-36 lg:left-52 lg:w-44"
        />
        <Sunflower
          duration={7.6}
          delay={0.6}
          headDelay={2.3}
          headDuration={17}
          opacity={0.55}
          className="absolute -bottom-16 right-[-6%] z-0 hidden w-32 md:block md:w-40 lg:right-0 lg:w-48"
        />

        <div className="relative z-20 mr-auto max-w-2xl md:ml-[38%] lg:ml-[42%]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-white/90 backdrop-blur">
            <Sparkles className="size-3.5 text-[#f5d47a]" />
            کتاب‌فروشی فارسی، با حال‌وهوای تازه
          </div>

          <h1
            id="hero-title"
            className="text-balance text-4xl font-extrabold leading-[1.25] tracking-tight sm:text-5xl lg:text-7xl"
          >
            هر کتاب،
            <br />
            <span className="text-[#f5d47a]">یک جهان تازه</span>
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-8 text-white/80 sm:text-base">
            روایت‌هایی برای خواندن و شنیدن؛ از رمان‌های تازه تا صداهایی که
            همراهت می‌شوند. کتاب بعدی‌ات را پیدا کن و همین‌جا، در مرورگر، شروع
            کن.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#bestsellers"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-extrabold text-primary shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#fdfbf5]"
            >
              کشف کنید
              <ArrowLeft className="size-4" />
            </Link>
            <Link
              href="/audiobooks"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <Headphones className="size-4" />
              شنیدن کتاب صوتی
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-3 border-t border-white/15 pt-6">
            <div>
              <dt className="text-[10px] text-white/60">کتاب منتخب</dt>
              <dd className="mt-1 text-lg font-extrabold">
                {toPersianDigits(60)}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] text-white/60">دسته‌بندی</dt>
              <dd className="mt-1 text-lg font-extrabold">
                {toPersianDigits(10)}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] text-white/60">کتاب صوتی</dt>
              <dd className="mt-1 text-lg font-extrabold">
                {toPersianDigits(24)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
