// Bracketed values are placeholders from the design; replace them with the real menu.

/** Turn on at opening. Until then /menu shows a "Coming soon" note instead of the boards. */
export const menuPublished = false;

export type MenuItem = {
  name: string;
  description?: string;
  price: string;
  options?: string;
  /** Marks a signature item; it gets the "andalan" stamp on the Menu page. */
  featured?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

function placeholderItems(options?: string): MenuItem[] {
  return Array.from({ length: 5 }, () => ({
    name: "[Nama menu]",
    description: "[Deskripsi singkat]",
    price: "[Rp__]",
    options,
  }));
}

export const featuredItems: MenuItem[] = [
  {
    name: "Capybara's",
    description: "Kopi susu creamy yang lembut di tiap tegukan. Santai, kayak kapibara.",
    price: "Rp22.000",
    featured: true,
  },
  {
    name: "Sour American Capy",
    description: "Americano dengan sentuhan lemon. Asam segarnya bikin melek lagi.",
    price: "Rp18.000",
    featured: true,
  },
  {
    name: "Marie Capy",
    description: "Biskuit marie dan susu full cream. Rasa jajan masa kecil dalam satu gelas.",
    price: "Rp20.000",
    featured: true,
  },
];

export const menuCategories: MenuCategory[] = [
  { id: "andalan", name: "Andalan", items: featuredItems },
  { id: "kopi", name: "Kopi", items: placeholderItems("[Panas / Dingin]") },
  { id: "non-kopi", name: "Non-kopi", items: placeholderItems("[Panas / Dingin]") },
  { id: "manual-brew", name: "Manual brew", items: placeholderItems() },
  { id: "camilan", name: "Camilan", items: placeholderItems() },
];

export const addOns: MenuItem[] = Array.from({ length: 4 }, () => ({
  name: "[Nama tambahan]",
  price: "[+Rp__]",
}));

export const recommendations = [
  { mood: "Nggak suka pahit", menu: "[MENU]" },
  { mood: "Mau kopi yang kuat", menu: "[MENU]" },
  { mood: "Lagi nggak minum kafein", menu: "[MENU]" },
];
