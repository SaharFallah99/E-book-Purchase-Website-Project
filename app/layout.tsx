import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/store-provider";

export const metadata: Metadata = {
  title: {
    default: "کتاب‌سرا | فروشگاه کتاب الکترونیکی و صوتی فارسی",
    template: "%s | کتاب‌سرا",
  },
  description:
    "کتاب‌سرا، فروشگاه نمایشی کتاب الکترونیکی و صوتی فارسی؛ خواندن، شنیدن و پیدا کردن کتاب بعدی.",
  applicationName: "کتاب‌سرا",
  keywords: [
    "کتاب الکترونیکی",
    "کتاب صوتی",
    "کتاب فارسی",
    "فروشگاه کتاب",
    "کتاب‌سرا",
  ],
};

export const viewport: Viewport = {
  themeColor: "#617054",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
