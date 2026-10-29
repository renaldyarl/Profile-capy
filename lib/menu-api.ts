import type { MenuCategory, MenuItem } from "@/lib/menu";

// The menu comes from the POS app's public endpoint and is fetched in the
// browser: the site is a static export with no server at runtime.

/** One item as the POS app sends it. */
export type MenuApiItem = {
  id: number;
  name: string;
  description: string | null;
  /** Whole rupiah, e.g. 22000. */
  price: number;
  /** Not shown yet: the menu boards have no photos. */
  imageUrl: string | null;
  /** Any of "Andalan", "Baru", "Musiman", "Tanpa kafein". */
  labels: string[];
  /** [], ["Panas"], ["Dingin"] or ["Panas", "Dingin"]. */
  temperatures: string[];
};

/** Categories and their items arrive in display order. */
export type MenuApiCategory = {
  name: string;
  items: MenuApiItem[];
};

export type MenuApiResponse = {
  categories: MenuApiCategory[];
};

/** Inlined at build time, so changing it means rebuilding the site. */
export const MENU_API_URL =
  process.env.NEXT_PUBLIC_MENU_API_URL || "https://app.pojokcapy.com/api/public/menu";

const TIMEOUT_MS = 8000;

const FEATURED_LABEL = "Andalan";

/** Ids the Menu page already uses for its own sections. */
const RESERVED_IDS = ["top", "andalan", "tambahan", "bingung-pilih"];

const rupiah = new Intl.NumberFormat("id-ID");

/** Every field of `T`, not yet checked. */
type Unchecked<T> = { [K in keyof T]?: unknown };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry) => typeof entry === "string") : [];
}

/** "Manual brew" becomes "manual-brew", matching the board anchors. */
export function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function toMenuItem(value: unknown): MenuItem | null {
  if (!isRecord(value)) return null;
  const item = value as Unchecked<MenuApiItem>;
  if (!isNonEmptyString(item.name)) return null;
  if (typeof item.price !== "number" || !Number.isFinite(item.price)) return null;

  const labels = strings(item.labels);
  const temperatures = strings(item.temperatures);
  return {
    name: item.name,
    description: isNonEmptyString(item.description) ? item.description : undefined,
    price: `Rp${rupiah.format(item.price)}`,
    options: temperatures.length > 0 ? temperatures.join(" / ") : undefined,
    featured: labels.includes(FEATURED_LABEL),
    labels: labels.filter((label) => label !== FEATURED_LABEL),
  };
}

/**
 * Checks the response shape without trusting it, so a bad payload never
 * crashes the page: items without a name or price and categories without
 * items are dropped. Throws only when there is no category list at all.
 */
export function parseMenu(data: unknown): MenuCategory[] {
  const categories = isRecord(data) ? (data as Unchecked<MenuApiResponse>).categories : undefined;
  if (!Array.isArray(categories)) {
    throw new Error("Menu API response has no categories list");
  }

  const usedIds = new Set(RESERVED_IDS);
  const result: MenuCategory[] = [];
  for (const value of categories) {
    if (!isRecord(value)) continue;
    const category = value as Unchecked<MenuApiCategory>;
    if (!isNonEmptyString(category.name) || !Array.isArray(category.items)) continue;
    const items = category.items
      .map(toMenuItem)
      .filter((item): item is MenuItem => item !== null);
    if (items.length === 0) continue;

    // Keep anchors unique, e.g. if the POS app ever gets a "Tambahan" category.
    const base = slugify(category.name) || "kategori";
    let id = base;
    for (let n = 2; usedIds.has(id); n++) id = `${base}-${n}`;
    usedIds.add(id);

    result.push({ id, name: category.name, items });
  }
  return result;
}

/** Loads the menu, giving up after 8 seconds or when `signal` aborts. */
export async function fetchMenu(signal?: AbortSignal): Promise<MenuCategory[]> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  const timer = setTimeout(abort, TIMEOUT_MS);
  if (signal?.aborted) abort();
  signal?.addEventListener("abort", abort);

  try {
    // The browser cache follows the server's Cache-Control (max-age=60).
    const response = await fetch(MENU_API_URL, {
      method: "GET",
      credentials: "omit",
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Menu API responded with ${response.status}`);
    }
    return parseMenu(await response.json());
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }
}
