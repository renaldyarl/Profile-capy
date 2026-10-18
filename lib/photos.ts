// Every photo slot on the site. Drop a file in `public/photos/` and set `src`
// (e.g. "/photos/kios.jpg"); until then the slot shows its caption.
type Photo = {
  src?: string;
  alt: string;
  caption: string;
};

export const photos = {
  kiosk: {
    alt: "Kios Pojok Capy dilihat dari seberang jalan, sore hari",
    caption: "nanti: kios dari seberang jalan, sore hari",
  },
} satisfies Record<string, Photo>;
