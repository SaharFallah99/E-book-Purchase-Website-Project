"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function BookCover({
  src,
  fallbackSrc,
  title,
  className,
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 220px",
  priority = false,
}: {
  src: string;
  fallbackSrc?: string;
  title: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-[3/4] overflow-hidden rounded-xl bg-cream",
        className,
      )}
    >
      {failed ? (
        <div className="flex h-full w-full items-end bg-gradient-to-br from-[#d98017] via-primary to-[#382110] p-3">
          <p className="line-clamp-4 text-xs font-extrabold leading-5 text-white">
            {title}
          </p>
        </div>
      ) : (
        <Image
          src={current}
          alt={`جلد کتاب ${title}`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          onError={() => {
            if (fallbackSrc && current !== fallbackSrc) {
              setCurrent(fallbackSrc);
              return;
            }
            setFailed(true);
          }}
        />
      )}
    </div>
  );
}
