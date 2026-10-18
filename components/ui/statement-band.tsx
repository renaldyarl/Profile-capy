import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import logoMarkCream from "@/public/brand/logo-mark-cream.png";

type StatementBandProps = {
  title: ReactNode;
  className?: string;
};

/**
 * Terracotta band with one large left-aligned line. The cream logo mark sits
 * large and cropped off the right edge as decoration.
 */
export function StatementBand({ title, className }: StatementBandProps) {
  return (
    <section className={cn("relative overflow-hidden bg-terracotta", className)}>
      <div className="page-container relative z-1 pt-[clamp(72px,10vw,136px)] pb-[180px] sm:pb-[clamp(72px,10vw,136px)]">
        <h2 className="reveal max-w-[15ch] font-display text-[clamp(40px,5.6vw,76px)] leading-[1.04] font-semibold text-on-terracotta sm:max-w-[13ch] lg:max-w-[17ch]">
          {title}
        </h2>
      </div>
      <Image
        src={logoMarkCream}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 w-[220px] translate-x-[30%] translate-y-[30%] sm:top-1/2 sm:bottom-auto sm:w-[clamp(320px,36vw,480px)] sm:translate-x-[32%] sm:-translate-y-1/2"
      />
    </section>
  );
}
