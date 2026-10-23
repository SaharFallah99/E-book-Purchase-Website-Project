import {
  BookOpen,
  Brain,
  Feather,
  HeartPulse,
  Landmark,
  Lightbulb,
  Palette,
  Smile,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  BookOpen,
  Feather,
  Brain,
  Landmark,
  Smile,
  Lightbulb,
  HeartPulse,
  Users,
  Palette,
  UserRound,
};

const tones = {
  green: "bg-primary/10 text-primary",
  coral: "bg-coral/10 text-coral",
  gold: "bg-[#f5d47a]/30 text-[#9a6a12]",
  brown: "bg-coffee/10 text-coffee",
} as const;

export function CategoryIcon({
  name,
  tone = "green",
  className,
}: {
  name: string;
  tone?: keyof typeof tones;
  className?: string;
}) {
  const Icon = icons[name] ?? BookOpen;
  return (
    <span
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full",
        tones[tone],
        className,
      )}
    >
      <Icon className="size-5" strokeWidth={1.8} />
    </span>
  );
}
