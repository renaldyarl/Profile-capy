import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const linkClass =
  "link-underline inline-flex min-h-11 items-center font-bold text-on-ink hover:text-peach";

/**
 * Ink footer: one small info row. On Beranda it continues the ink Kunjungi
 * section, so a hairline separates the two instead of extra padding.
 */
export function SiteFooter({ page }: { page: "home" | "menu" }) {
  return (
    <footer
      className={cn(
        "bg-ink pb-[clamp(40px,5vw,64px)] text-on-ink",
        page === "menu" && "pt-12",
      )}
    >
      <div className="page-container">
        <div
          className={cn(
            "flex flex-col gap-6 text-[15px] leading-[1.6] sm:flex-row sm:items-end sm:justify-between",
            page === "home" && "border-t border-ink-muted pt-8",
          )}
        >
          <div>
            <p>{site.address}</p>
            <p>Buka {site.hours}</p>
          </div>
          <div className="flex flex-col sm:items-end">
            <div className="flex flex-wrap gap-x-8">
              <a href={site.instagramUrl} className={linkClass}>
                Instagram {site.instagramHandle}
              </a>
              {page === "home" ? (
                <Link href="/menu" className={linkClass}>
                  Menu
                </Link>
              ) : (
                <Link href="/" className={linkClass}>
                  Beranda
                </Link>
              )}
            </div>
            <p>© 2026 {site.name}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
