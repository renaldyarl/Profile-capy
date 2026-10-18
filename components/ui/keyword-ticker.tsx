import { cn } from "@/lib/cn";

const DEFAULT_WORDS = [
  "Slowliving",
  "Comfy",
  "Chill",
  "Warm",
  "Komunal",
  "Social",
  "Santai",
  "Tenang",
  "Nongkrong",
  "Melipir",
  "Rehat",
  "Jeda",
  "Canda",
  "Singgah",
  "Kasual",
  "Sederhana",
  "Autentik",
  "Teras",
  "Sudut",
  "Pojok",
];

type KeywordTickerProps = {
  words?: string[];
  className?: string;
};

export function KeywordTicker({
  words = DEFAULT_WORDS,
  className,
}: KeywordTickerProps) {
  // The track holds the words twice and scrolls by half its width, so the loop is seamless.
  const track = [...words, ...words];

  return (
    <div
      className={cn("relative overflow-hidden bg-terracotta py-[18px]", className)}
    >
      <p className="sr-only">Kata kunci: {words.join(", ")}.</p>
      <div
        className="flex w-max animate-ticker motion-reduce:animate-none"
        aria-hidden="true"
      >
        {track.map((word, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-7 pr-7 font-display text-[26px] leading-[1.2] font-semibold whitespace-nowrap text-on-terracotta"
          >
            {word}
            <span className="inline-block size-2 rounded-full bg-peach" />
          </span>
        ))}
      </div>
    </div>
  );
}
