"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Heart,
  Library,
  LogOut,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { useStore } from "@/components/store-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/categories", label: "دسته‌بندی‌ها" },
  { href: "/audiobooks", label: "کتاب صوتی" },
  { href: "/podcasts", label: "پادکست" },
  { href: "/subscription", label: "اشتراک" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, favorites, logout, ready } = useStore();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobile() {
    setMobileOpen(false);
  }

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (value.length > 0) {
      router.push(`/search?q=${encodeURIComponent(value)}`);
      setMobileOpen(false);
    }
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-header/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex h-[72px] items-center gap-3">
          <div onClick={closeMobile} className="shrink-0">
            <Brand />
          </div>

          <nav className="mr-5 hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-semibold transition",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-coffee/75 hover:bg-cream hover:text-coffee",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form
            onSubmit={submitSearch}
            className="relative mr-auto hidden w-full max-w-sm md:block"
            role="search"
          >
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="جست‌وجوی کتاب، نویسنده یا موضوع..."
              aria-label="جست‌وجو در کتاب‌سرا"
              className="h-10 rounded-xl border-border bg-white ps-9 text-sm shadow-none"
            />
          </form>

          <div className="mr-auto flex items-center gap-1.5 md:mr-0">
            <Link
              href="/favorites"
              className="relative grid size-10 place-items-center rounded-xl text-coffee transition hover:bg-cream"
              aria-label="علاقه‌مندی‌ها"
              title="علاقه‌مندی‌ها"
            >
              <Heart className="size-5" strokeWidth={1.8} />
              {ready && favorites.length > 0 && (
                <span className="absolute -left-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-coral px-1 text-[9px] font-bold leading-4 text-white">
                  {toPersianDigits(favorites.length)}
                </span>
              )}
            </Link>

            <Link
              href="/library"
              className="hidden size-10 place-items-center rounded-xl text-coffee transition hover:bg-cream sm:grid"
              aria-label="کتابخانه‌ی من"
              title="کتابخانه‌ی من"
            >
              <Library className="size-5" strokeWidth={1.8} />
            </Link>

            {ready && user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  href="/library"
                  className="inline-flex h-10 max-w-36 items-center gap-2 rounded-xl border border-border bg-white px-3 text-xs font-bold text-coffee"
                >
                  <UserRound className="size-4 text-primary" />
                  <span className="truncate">{user.name}</span>
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  aria-label="خروج از حساب"
                  title="خروج از حساب"
                  className="size-10 text-muted-foreground"
                >
                  <LogOut className="size-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "h-10 rounded-xl px-4 text-sm font-bold text-coffee",
                  )}
                >
                  ورود
                </Link>
                <Link
                  href="/signup"
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "h-10 rounded-xl px-4 text-sm font-bold shadow-sm",
                  )}
                >
                  ثبت‌نام
                </Link>
              </div>
            )}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10 lg:hidden"
              aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        <form
          onSubmit={submitSearch}
          className="relative pb-3 md:hidden"
          role="search"
        >
          <Search className="pointer-events-none absolute start-3 top-[18px] size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جست‌وجوی کتاب، نویسنده یا موضوع..."
            aria-label="جست‌وجو در کتاب‌سرا"
            className="h-10 rounded-xl bg-white ps-9 text-sm"
          />
        </form>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-header px-4 pb-5 pt-3 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="ناوبری موبایل">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm font-bold",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-coffee hover:bg-cream",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/library"
              onClick={closeMobile}
              className="rounded-xl px-3 py-2.5 text-sm font-bold text-coffee hover:bg-cream"
            >
              کتابخانه‌ی من
            </Link>
          </nav>
          <div className="mt-3 border-t border-border pt-3">
            {ready && user ? (
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-bold text-coffee">
                  <UserRound className="size-4 text-primary" />
                  {user.name}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logout();
                    closeMobile();
                  }}
                  className="gap-1.5"
                >
                  <LogOut className="size-3.5" />
                  خروج
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-10 rounded-xl",
                  )}
                >
                  ورود
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMobile}
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "h-10 rounded-xl",
                  )}
                >
                  ثبت‌نام
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
