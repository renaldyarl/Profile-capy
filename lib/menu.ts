// Drinks and snacks come from the POS app (see lib/menu-api.ts). Only the
// add-ons and recommendations live here. Bracketed values are placeholders
// from the design; replace them with the real menu.

export type MenuItem = {
  name: string;
  description?: string;
  price: string;
  options?: string;
  /** Marks a signature item; it gets the "andalan" stamp on the Menu page. */
  featured?: boolean;
  /** Other labels from the POS app, e.g. "Baru" or "Tanpa kafein". */
  labels?: string[];
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export const addOns: MenuItem[] = Array.from({ length: 4 }, () => ({
  name: "[Nama tambahan]",
  price: "[+Rp__]",
}));

export const recommendations = [
  { mood: "Nggak suka pahit", menu: "[MENU]" },
  { mood: "Mau kopi yang kuat", menu: "[MENU]" },
  { mood: "Lagi nggak minum kafein", menu: "[MENU]" },
];
