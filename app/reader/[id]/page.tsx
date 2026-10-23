import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReaderView } from "@/components/reader-view";
import { books, getBookById } from "@/lib/data";

type ReaderPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return books.map((book) => ({ id: String(book.id) }));
}

export async function generateMetadata({
  params,
}: ReaderPageProps): Promise<Metadata> {
  const { id } = await params;
  const book = getBookById(id);
  return {
    title: book ? `خواندن ${book.title}` : "ریدر",
  };
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { id } = await params;
  const book = getBookById(id);
  if (!book) notFound();
  return <ReaderView book={book} />;
}
