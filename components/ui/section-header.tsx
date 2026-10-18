import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-sm leading-[1.4] font-extrabold tracking-[0.18em] text-terracotta-deep uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "start",
  as: Heading = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading className="font-display text-[clamp(34px,4.2vw,54px)] leading-[1.08] font-semibold text-ink">
        {title}
      </Heading>
      {lede && (
        <p className="max-w-[52ch] text-lg leading-[1.65] text-ink-muted">
          {lede}
        </p>
      )}
    </div>
  );
}
