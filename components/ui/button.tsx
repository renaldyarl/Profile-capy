import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

const variants = {
  primary:
    "border-transparent bg-terracotta-deep text-on-terracotta hover:bg-terracotta-press",
  ghost:
    "border-line-strong bg-transparent text-ink hover:border-terracotta-deep hover:text-terracotta-deep",
  /** For dark (ink) backgrounds. */
  light: "border-transparent bg-peach text-ink hover:bg-surface-raised",
};

type ButtonProps = {
  href?: string;
  variant?: keyof typeof variants;
  size?: "md" | "sm";
  icon?: IconName;
  className?: string;
  /** Only for the `<button>` form, i.e. without `href`. */
  onClick?: () => void;
  children: ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  icon,
  className,
  onClick,
  children,
}: ButtonProps) {
  const classes = cn(
    "box-border inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 text-base leading-[1.2] font-extrabold transition-colors duration-200 motion-reduce:transition-none",
    size === "sm" ? "min-h-11 px-[22px]" : "min-h-[52px] px-7",
    variants[variant],
    className,
  );
  const content = (
    <>
      {icon && <Icon name={icon} size={20} color="currentColor" />}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
