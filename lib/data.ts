import booksJson from "@/data/books.json";
import categoriesJson from "@/data/categories.json";
import homeJson from "@/data/home.json";
import reviewsJson from "@/data/reviews.json";
import similarJson from "@/data/similar.json";
import podcastsJson from "@/data/podcasts.json";
import type {
  Book,
  Category,
  HomeData,
  Podcast,
  Review,
  SimilarBook,
} from "@/lib/types";

export const books = booksJson as unknown as Book[];
export const categories = categoriesJson as unknown as Category[];
export const homeData = homeJson as unknown as HomeData;
export const podcasts = podcastsJson as unknown as Podcast[];

const reviews = reviewsJson as unknown as Record<string, Review[]>;
const similar = similarJson as unknown as Record<string, SimilarBook[]>;

const booksById = new Map(books.map((book) => [book.id, book]));

export function getBookById(id: string | number): Book | undefined {
  return booksById.get(Number(id));
}

export function getBooksByIds(ids: number[]): Book[] {
  return ids
    .map((id) => booksById.get(id))
    .filter((book): book is Book => Boolean(book));
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getBooksByCategory(slug: string): Book[] {
  return books
    .filter((book) => book.categories.includes(slug))
    .sort((a, b) => b.ratingsCount - a.ratingsCount);
}

export function getCategoryCounts(): Record<string, number> {
  return Object.fromEntries(
    categories.map((category) => [
      category.slug,
      books.filter((book) => book.categories.includes(category.slug)).length,
    ]),
  );
}

export function getReviews(bookId: string | number): Review[] {
  return reviews[String(bookId)] ?? [];
}

export function getSimilarBooks(bookId: string | number): SimilarBook[] {
  return similar[String(bookId)] ?? [];
}

export function getAudioBooks(): Book[] {
  return books
    .filter((book) => book.format === "audiobook")
    .sort((a, b) => b.ratingsCount - a.ratingsCount);
}

export function getFreeBooks(): Book[] {
  return books
    .filter((book) => book.free || book.finalPrice === 0)
    .sort((a, b) => b.ratingsCount - a.ratingsCount);
}

export function getTopBooks(limit = 10): Book[] {
  return [...books]
    .sort((a, b) => b.ratingsCount - a.ratingsCount)
    .slice(0, limit);
}

export function getPodcastById(id: string): Podcast | undefined {
  return podcasts.find((podcast) => podcast.id === id);
}

function normalizeForSearch(value: string): string {
  return value
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/[\u200c\u200f\u200e]/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchBooks(query: string): Book[] {
  const normalized = normalizeForSearch(query);
  if (!normalized) return [];
  const words = normalized.split(" ").filter(Boolean);

  return books
    .map((book) => {
      const haystack = normalizeForSearch(
        [
          book.title,
          ...book.authors,
          ...book.translators,
          ...book.narrators,
          book.publisher,
          ...book.rawCategories,
          book.summary,
        ].join(" "),
      );
      const title = normalizeForSearch(book.title);
      const author = normalizeForSearch(book.authors.join(" "));
      let score = 0;
      for (const word of words) {
        if (title.includes(word)) score += 5;
        if (author.includes(word)) score += 3;
        if (haystack.includes(word)) score += 1;
      }
      if (title === normalized) score += 10;
      return { book, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.book.ratingsCount - a.book.ratingsCount)
    .map((item) => item.book);
}

export function getHomeBooks() {
  return {
    bestsellers: getBooksByIds(homeData.bestsellers),
    newReleases: getBooksByIds(homeData.newReleases),
    freeBooks: getBooksByIds(homeData.freeBooks),
    audiobooks: getBooksByIds(homeData.audiobooks),
    rankings: getBooksByIds(homeData.rankings),
  };
}
