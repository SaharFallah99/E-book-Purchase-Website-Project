import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type SunflowerProps = {
  className?: string;
  duration?: number;
  delay?: number;
  headDelay?: number;
  headDuration?: number;
  opacity?: number;
};

type SunflowerStyle = CSSProperties & {
  "--sway-duration"?: string;
  "--sway-delay"?: string;
  "--head-delay"?: string;
  "--head-duration"?: string;
};

const backPetals = Array.from({ length: 16 }, (_, index) => index);
const frontPetals = Array.from({ length: 14 }, (_, index) => index);
const seeds = Array.from({ length: 30 }, (_, index) => {
  const angle = index * 2.399963;
  const radius = 3 + ((index * 7.3) % 17);
  return {
    cx: 50 + Math.cos(angle) * radius,
    cy: 55 + Math.sin(angle) * radius,
    r: index % 4 === 0 ? 1.05 : 0.75,
  };
});

export function Sunflower({
  className,
  duration = 6.5,
  delay = 0,
  headDelay = 0,
  headDuration = 15,
  opacity = 1,
}: SunflowerProps) {
  const style: SunflowerStyle = {
    "--sway-duration": `${duration}s`,
    "--sway-delay": `${delay}s`,
    "--head-delay": `${headDelay}s`,
    "--head-duration": `${headDuration}s`,
    opacity,
  };

  return (
    <svg
      viewBox="0 0 100 190"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "sunflower-sway pointer-events-none select-none",
        className,
      )}
      style={style}
    >
      <g fill="none" stroke="#382110" strokeLinecap="round">
        <path
          d="M50 77c-2 28 2 58 1 106"
          stroke="#8e9d7c"
          strokeWidth="4"
        />
        <path
          d="M51 118c-10-8-20-9-28-5 8 10 18 13 28 9"
          fill="#a8b697"
          stroke="#617054"
          strokeWidth="1.4"
        />
        <path
          d="M52 143c12-9 23-9 31-4-8 12-20 15-31 8"
          fill="#9cac89"
          stroke="#617054"
          strokeWidth="1.4"
        />
        <path
          d="M45 120c-5 4-9 8-13 12M60 147c5-4 9-6 14-8"
          stroke="#617054"
          strokeWidth="0.8"
          opacity="0.7"
        />
      </g>

      <g className="sunflower-head">
        {backPetals.map((index) => (
          <ellipse
            key={`back-${index}`}
            cx="50"
            cy="25"
            rx="8"
            ry="20"
            transform={`rotate(${index * 22.5} 50 55)`}
            fill={index % 2 === 0 ? "#e8b348" : "#d98017"}
            stroke="#382110"
            strokeWidth="1.25"
          />
        ))}
        {frontPetals.map((index) => (
          <ellipse
            key={`front-${index}`}
            cx="50"
            cy="28.5"
            rx="5.8"
            ry="15.5"
            transform={`rotate(${index * (360 / 14) + 12} 50 55)`}
            fill={index % 3 === 0 ? "#e77100" : "#f5d47a"}
            stroke="#382110"
            strokeWidth="0.9"
          />
        ))}
        <circle
          cx="50"
          cy="55"
          r="21"
          fill="#b95b10"
          stroke="#382110"
          strokeWidth="2.2"
        />
        <circle cx="50" cy="55" r="14.5" fill="#d07115" opacity="0.55" />
        {seeds.map((seed, index) => (
          <circle
            key={`seed-${index}`}
            cx={seed.cx}
            cy={seed.cy}
            r={seed.r}
            fill="#382110"
            opacity="0.86"
          />
        ))}
      </g>
    </svg>
  );
}

export function SunflowerMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
    >
      <g>
        {Array.from({ length: 12 }, (_, index) => (
          <ellipse
            key={index}
            cx="24"
            cy="12"
            rx="4.6"
            ry="9.4"
            transform={`rotate(${index * 30} 24 24)`}
            fill={index % 2 === 0 ? "#f5d47a" : "#d98017"}
            stroke="#382110"
            strokeWidth="0.8"
          />
        ))}
        <circle cx="24" cy="24" r="9.2" fill="#b95b10" stroke="#382110" strokeWidth="1.4" />
        <circle cx="24" cy="24" r="5.7" fill="#d07115" opacity="0.55" />
        {Array.from({ length: 14 }, (_, index) => {
          const angle = index * 2.399963;
          const radius = 1.2 + ((index * 3.1) % 6.4);
          return (
            <circle
              key={`mark-${index}`}
              cx={24 + Math.cos(angle) * radius}
              cy={24 + Math.sin(angle) * radius}
              r="0.65"
              fill="#382110"
            />
          );
        })}
      </g>
    </svg>
  );
}
