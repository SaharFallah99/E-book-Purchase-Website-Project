import Image from "next/image";
import { cn } from "@/lib/utils";

export function BookCover({
  src,
  title,
  className,
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 220px",
  priority = false,
}: {
  src: string;
  title: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[3/4] overflow-hidden rounded-xl bg-cream",
        className,
      )}
    >
      <Image
        src={src}
        alt={`جلد کتاب ${title}`}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}
