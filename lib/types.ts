export type BookFormat = "ebook" | "audiobook";

export type Book = {
  id: number;
  title: string;
  format: BookFormat;
  cover: string;
  remoteCover?: string;
  price: number;
  finalPrice: number;
  discountPercent: number;
  free: boolean;
  rating: number;
  ratingsCount: number;
  reviewsCount: number;
  authors: string[];
  translators: string[];
  narrators: string[];
  publisher: string;
  pages: number | null;
  durationMin: number | null;
  inSubscription: boolean;
  isbn: string;
  publishedFa: string;
  description: string;
  summary: string;
  categories: string[];
  category: string;
  rawCategories: string[];
  ratingBreakdown: Record<string, number>;
  url: string;
};

export type SimilarBook = Pick<
  Book,
  | "id"
  | "title"
  | "format"
  | "cover"
  | "remoteCover"
  | "price"
  | "finalPrice"
  | "discountPercent"
  | "free"
  | "rating"
  | "ratingsCount"
  | "authors"
  | "pages"
  | "durationMin"
  | "inSubscription"
>;

export type Review = {
  id: number;
  user: string;
  date: string;
  rating: number;
  text: string;
  likes: number;
  replies: number;
};

export type Category = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  tone: "green" | "coral" | "gold" | "brown";
};

export type HomeData = {
  bestsellers: number[];
  newReleases: number[];
  freeBooks: number[];
  audiobooks: number[];
  rankings: number[];
};

export type PodcastEpisode = {
  title: string;
  durationMin: number;
};

export type Podcast = {
  id: string;
  title: string;
  host: string;
  description: string;
  episodes: number;
  durationMin: number;
  color: string;
  episodeList: PodcastEpisode[];
};

export type PlanId = "basic" | "pro" | "annual";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  period: string;
  badge?: string;
  description: string;
  features: string[];
  highlight?: boolean;
};
