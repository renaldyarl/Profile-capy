import { cn } from "@/lib/cn";
import type { MenuItem } from "@/lib/menu";

/** Small tilted round stamp that marks a signature item. */
function FeaturedStamp() {
  return (
    <span className="-my-3 inline-grid size-[52px] flex-none -rotate-12 place-items-center self-center rounded-full border-[1.5px] border-terracotta-deep text-[10px] font-extrabold text-terracotta-deep">
      andalan
    </span>
  );
}

/** One line of a menu board: name, dotted leader, price, then details. */
export function MenuRow({
  item,
  showStamp = false,
  className,
}: {
  item: MenuItem;
  showStamp?: boolean;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "-mx-3 rounded-sm px-3 py-3 transition-colors duration-200 hover:bg-surface-alt motion-reduce:transition-none",
        className,
      )}
    >
      <div className="flex items-baseline gap-2">
        <span className="min-w-0 text-lg leading-snug font-extrabold text-ink">
          {item.name}
        </span>
        {showStamp && item.featured && <FeaturedStamp />}
        <span
          aria-hidden="true"
          className="min-w-6 flex-1 border-b-2 border-dotted border-line-strong"
        />
        <span className="text-lg font-extrabold whitespace-nowrap text-ink tabular-nums">
          {item.price}
        </span>
      </div>
      {item.description && (
        <p className="mt-0.5 text-[15px] leading-normal text-ink-muted">
          {item.description}
        </p>
      )}
      {item.options && (
        <p className="mt-1 text-[13px] font-bold text-terracotta-deep">
          {item.options}
        </p>
      )}
    </li>
  );
}
