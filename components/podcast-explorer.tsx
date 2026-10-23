"use client";

import { useState } from "react";
import { Clock3, Mic2, Play, Radio, Sparkles } from "lucide-react";
import { AudioPlayer } from "@/components/audio-player";
import type { Podcast } from "@/lib/types";
import { formatDuration, toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PodcastExplorer({
  podcasts,
  initialId,
}: {
  podcasts: Podcast[];
  initialId?: string;
}) {
  const initial =
    podcasts.find((podcast) => podcast.id === initialId) ?? podcasts[0];
  const [selectedId, setSelectedId] = useState(initial?.id ?? "");
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const selected =
    podcasts.find((podcast) => podcast.id === selectedId) ?? podcasts[0];
  const episode = selected?.episodeList[episodeIndex] ?? selected?.episodeList[0];

  if (!selected) return null;

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="flex flex-col gap-2">
          {podcasts.map((podcast) => (
            <button
              key={podcast.id}
              type="button"
              onClick={() => {
                setSelectedId(podcast.id);
                setEpisodeIndex(0);
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border p-3 text-right transition",
                podcast.id === selected.id
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-white hover:bg-cream/70",
              )}
            >
              <span
                className="grid size-14 shrink-0 place-items-center rounded-xl text-white"
                style={{ backgroundColor: podcast.color }}
              >
                <Mic2 className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-extrabold text-coffee">
                  {podcast.title}
                </span>
                <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">
                  {podcast.host} · {toPersianDigits(podcast.episodes)} قسمت
                </span>
              </span>
              <Play
                className={cn(
                  "size-4 shrink-0",
                  podcast.id === selected.id ? "fill-primary text-primary" : "text-muted-foreground",
                )}
              />
            </button>
          ))}
        </div>

        <div
          className="relative overflow-hidden rounded-3xl p-6 text-white sm:p-8"
          style={{ backgroundColor: selected.color }}
        >
          <div className="absolute -left-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold">
              <Radio className="size-3" />
              پادکست نمایشی
            </span>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">{selected.title}</h2>
            <p className="mt-1 text-xs text-white/65">با {selected.host}</p>
            <p className="mt-4 max-w-xl text-xs leading-6 text-white/75">
              {selected.description}
            </p>

            <div className="mt-6">
              <AudioPlayer
                title={episode ? `${selected.title} · ${episode.title}` : selected.title}
                durationMin={episode?.durationMin ?? selected.durationMin}
                tone="dark"
              />
            </div>

            <div className="mt-6">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-extrabold">
                <Sparkles className="size-3.5 text-[#f5d47a]" />
                قسمت‌های این پادکست
              </h3>
              <div className="space-y-2">
                {selected.episodeList.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setEpisodeIndex(index)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-right text-[11px] transition",
                      index === episodeIndex
                        ? "border-white/30 bg-white/15 font-bold"
                        : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Play className="size-3 fill-current" />
                      {item.title}
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-[9px] text-white/55">
                      <Clock3 className="size-3" />
                      {formatDuration(item.durationMin)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-border bg-cream/50 px-5 py-4 text-[10px] leading-6 text-muted-foreground">
        پادکست‌ها و قسمت‌های این صفحه داده‌ی نمونه و ساختگی هستند. پخش‌کننده
        فقط یک فایل صوتی نمایشی پخش می‌کند و محتوای واقعی پادکست نیست.
      </div>
    </div>
  );
}
