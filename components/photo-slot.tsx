import Image from "next/image";
import { cn } from "@/lib/cn";

type PhotoSlotProps = {
  src?: string;
  alt: string;
  /** What the photo will show; displayed while `src` is empty. */
  caption: string;
  /** CSS aspect ratio, e.g. "21/9" or "4/5". */
  ratio: string;
  sizes?: string;
  className?: string;
};

/** A photo, or a solid block that holds the photo's place until it exists. */
export function PhotoSlot({
  src,
  alt,
  caption,
  ratio,
  sizes = "100vw",
  className,
}: PhotoSlotProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-sm bg-surface-alt", className)}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <p className="absolute bottom-3 left-4 pr-4 font-hand text-base leading-snug text-ink-muted sm:bottom-4 sm:left-5 sm:text-lg">
          {caption}
        </p>
      )}
    </div>
  );
}
