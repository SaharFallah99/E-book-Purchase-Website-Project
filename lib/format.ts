const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

export function formatNumber(value: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits,
  }).format(value);
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("fa-IR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPrice(value: number): string {
  return `${formatNumber(value)} تومان`;
}

export function formatDuration(minutes?: number | null): string {
  if (!minutes || minutes <= 0) return "—";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${formatNumber(rest)} دقیقه`;
  if (rest === 0) return `${formatNumber(hours)} ساعت`;
  return `${formatNumber(hours)} ساعت و ${formatNumber(rest)} دقیقه`;
}

export function formatShortDuration(minutes?: number | null): string {
  if (!minutes || minutes <= 0) return "—";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${formatNumber(rest)} دقیقه`;
  if (rest === 0) return `${formatNumber(hours)} ساعت`;
  return `${formatNumber(hours)}:${formatNumber(rest).padStart(2, "۰")}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${formatNumber(bytes)} بایت`;
  if (bytes < 1024 * 1024) return `${formatNumber(bytes / 1024, 1)} کیلوبایت`;
  return `${formatNumber(bytes / (1024 * 1024), 1)} مگابایت`;
}

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("");
}
