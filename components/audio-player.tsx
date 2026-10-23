"use client";

import { useEffect, useRef, useState } from "react";
import { Headphones, Pause, Play, Volume2 } from "lucide-react";
import { formatDuration, toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

function timeLabel(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "۰:۰۰";
  const mins = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${toPersianDigits(mins)}:${toPersianDigits(String(rest).padStart(2, "0"))}`;
}

export function AudioPlayer({
  title,
  durationMin,
  src = "/audio/sample.wav",
  className,
  tone = "light",
}: {
  title: string;
  durationMin?: number | null;
  src?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnded = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0;
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        dark
          ? "border-white/15 bg-white/10 text-white backdrop-blur"
          : "border-border bg-white text-coffee shadow-[0_20px_45px_-40px_rgba(56,33,16,.6)]",
        className,
      )}
    >
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "توقف نمونه‌ی صوتی" : "پخش نمونه‌ی صوتی"}
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-full transition active:scale-95",
            dark ? "bg-[#f5d47a] text-coffee" : "bg-primary text-white hover:bg-primary/90",
          )}
        >
          {playing ? (
            <Pause className="size-5 fill-current" />
          ) : (
            <Play className="mr-0.5 size-5 fill-current" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Headphones className={cn("size-3.5", dark ? "text-[#f5d47a]" : "text-primary")} />
            <p className="truncate text-xs font-extrabold">{title}</p>
          </div>
          <p className={cn("mt-1 text-[10px]", dark ? "text-white/60" : "text-muted-foreground")}>
            پیش‌نمایش نمایشی {durationMin ? `• نسخه‌ی کامل ${formatDuration(durationMin)}` : ""}
          </p>
        </div>

        <Volume2 className={cn("hidden size-4 sm:block", dark ? "text-white/50" : "text-muted-foreground")} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className={cn("w-8 text-[9px] tabular-nums", dark ? "text-white/60" : "text-muted-foreground")}>
          {timeLabel(current)}
        </span>
        <div className="relative flex-1">
          <div
            className={cn(
              "absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full",
              dark ? "bg-white/15" : "bg-cream",
            )}
          >
            <div
              className={cn("h-full rounded-full", dark ? "bg-[#f5d47a]" : "bg-primary")}
              style={{ width: `${progress}%` }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={duration || 1}
            step={0.1}
            value={current}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="جای پخش نمونه‌ی صوتی"
            className="relative z-10 h-4 w-full cursor-pointer opacity-0"
          />
        </div>
        <span className={cn("w-8 text-left text-[9px] tabular-nums", dark ? "text-white/60" : "text-muted-foreground")}>
          {timeLabel(duration)}
        </span>
      </div>
    </div>
  );
}
