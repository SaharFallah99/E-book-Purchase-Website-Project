import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CategoryExplorer } from "@/components/category-explorer";
import { CategoryIcon } from "@/components/category-icon";
import { categories, getBooksByCategory, getCategory } from "@/lib/data";
import { toPersianDigits } from "@/lib/format";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "دسته پیدا نشد" };
  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const categoryBooks = getBooksByCategory(slug);
  const otherCategories = categories.filter((item) => item.slug !== slug).slice(0, 6);

  return (
    <div>
      <section className="border-b border-border bg-cream/70">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
          <nav className="mb-5 flex items-center gap-1.5 text-[11px] text-muted-foreground" aria-label="مسیر صفحه">
            <Link href="/" className="transition hover:text-primary">
              خانه
            </Link>
            <span>/</span>
            <Link href="/categories" className="transition hover:text-primary">
              دسته‌بندی‌ها
            </Link>
            <span>/</span>
            <span className="text-coffee">{category.title}</span>
          </nav>

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="flex items-start gap-4">
              <CategoryIcon
                name={category.icon}
                tone={category.tone}
                className="size-14 sm:size-16"
              />
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-coffee sm:text-4xl">
                  {category.title}
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
                  {category.description}
                </p>
                <p className="mt-3 text-xs font-semibold text-primary">
                  {toPersianDigits(categoryBooks.length)} کتاب در این دسته
                </p>
              </div>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 self-start rounded-xl border border-border bg-white px-4 py-2 text-xs font-bold text-coffee transition hover:border-primary/30 hover:text-primary sm:self-auto"
            >
              <ArrowRight className="size-3.5" />
              همه‌ی دسته‌ها
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <CategoryExplorer books={categoryBooks} categoryTitle={category.title} />

        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-base font-extrabold text-coffee">دسته‌های دیگر</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {otherCategories.map((item) => (
              <Link
                key={item.slug}
                href={`/categories/${item.slug}`}
                className="rounded-full border border-border bg-white px-3.5 py-2 text-xs font-semibold text-coffee transition hover:border-primary/30 hover:bg-cream"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
