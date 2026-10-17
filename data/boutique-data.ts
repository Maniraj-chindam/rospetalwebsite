export interface ProductItem {
  id: string;
  name: string;
  price: string;
  // Set these only after the boutique confirms the sellable SKU, price and stock.
  sku?: string;
  pricePaise?: number;
  variants?: { size: string; stock: number }[];
  verifiedForSale?: boolean;
  category: "Sarees" | "Lehengas" | "Dresses" | "Designer Suits";
  image: string;
  description: string;
  colour: string;
  fabric: string;
  sizing: string;
  care: string;
  delivery: string;
}

export const BOUTIQUE_PHONE = {
  display: "+91 91823 18862",
  href: "tel:+919182318862",
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/collections" },
  { name: "Custom Design", href: "/custom-design" },
  { name: "Lookbook", href: "/lookbook" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
export const HEADER_NAV_LINKS = NAV_LINKS;

export const HERO_ARCHED_CATEGORIES = [
  { id: "sarees", name: "SAREES", subtitle: "Colour & drape", image: "/thridha-handloom-01.webp", href: "/collections?category=Sarees" },
  { id: "dresses", name: "DRESSES", subtitle: "Everyday to occasion", image: "/libas-dress-01.jpg", href: "/collections?category=Dresses" },
  { id: "lehengas", name: "LEHENGAS", subtitle: "Celebration style", image: "/lehengas-new-photo.jpg", href: "/collections?category=Lehengas" },
  { id: "kurtis", name: "KURTIS", subtitle: "Printed favourites", image: "/short-kurti-new-photo.webp", href: "/collections?category=Designer+Suits" },
];

const detailsToConfirm = {
  fabric: "Please confirm the fabric with the boutique.",
  sizing: "Sizing and alteration options are confirmed on enquiry.",
  care: "Care guidance is supplied with the confirmed piece.",
  delivery: "Availability and delivery timing are confirmed on enquiry.",
};

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: "black-printed-short-kurti",
    name: "Black Printed Short Kurti",
    price: "Price on request",
    category: "Designer Suits",
    image: "/short-kurti-new-photo.webp",
    colour: "Black",
    description: "Black short kurti with a white all-over print, shown with light trousers.",
    ...detailsToConfirm,
  },
  {
    id: "plum-evening-gown",
    name: "Plum Evening Gown",
    price: "Price on request",
    category: "Dresses",
    image: "/dress_1.jpg",
    colour: "Plum",
    description: "Full-length plum gown with a fitted embellished bodice and flowing skirt.",
    ...detailsToConfirm,
  },
  {
    id: "green-purple-border-saree",
    name: "Green Saree with Purple Border",
    price: "Price on request",
    category: "Sarees",
    image: "/thridha-handloom-01.webp",
    colour: "Green",
    description: "Pale green drape with a purple and gold patterned border.",
    ...detailsToConfirm,
  },
  {
    id: "red-celebration-lehenga",
    name: "Red Celebration Lehenga",
    price: "Price on request",
    category: "Lehengas",
    image: "/lehengas-new-photo.jpg",
    colour: "Red",
    description: "Deep red lehenga and blouse with a full skirt, styled for a celebration.",
    ...detailsToConfirm,
  },
  {
    id: "pink-contrast-border-saree",
    name: "Pink Saree with Contrast Border",
    price: "Price on request",
    category: "Sarees",
    image: "/thridha-handloom-02.webp",
    colour: "Pink",
    description: "Soft pink drape with a vivid pink and gold patterned border.",
    ...detailsToConfirm,
  },
  {
    id: "plum-gold-border-saree",
    name: "Plum Saree with Gold Border",
    price: "Price on request",
    category: "Sarees",
    image: "/thridha-handloom-03.webp",
    colour: "Plum",
    description: "Deep plum drape with a wide gold patterned border.",
    ...detailsToConfirm,
  },
  {
    id: "magenta-floral-midi-dress",
    name: "Magenta Floral Midi Dress",
    price: "Price on request",
    category: "Dresses",
    image: "/libas-dress-03.jpg",
    colour: "Magenta",
    description: "Magenta floral midi dress with long sleeves and a button-front bodice.",
    ...detailsToConfirm,
  },
  {
    id: "pink-floral-ruffle-dress",
    name: "Pink Floral Ruffle Dress",
    price: "Price on request",
    category: "Dresses",
    image: "/libas-dress-04.jpg",
    colour: "Pink",
    description: "Pink floral dress with shoulder ruffles and a tiered hem.",
    ...detailsToConfirm,
  },
  {
    id: "red-gold-border-saree",
    name: "Red Saree with Gold Border",
    price: "Price on request",
    category: "Sarees",
    image: "/thridha-handloom-04.webp",
    colour: "Red",
    description: "Rich red drape with gold motifs and a broad patterned border.",
    ...detailsToConfirm,
  },
  {
    id: "coral-floral-maxi-dress",
    name: "Coral Floral Maxi Dress",
    price: "Price on request",
    category: "Dresses",
    image: "/libas-dress-01.jpg",
    colour: "Coral",
    description: "Long coral floral dress with a gathered waist and long sleeves.",
    ...detailsToConfirm,
  },
  {
    id: "blue-gold-border-saree",
    name: "Blue Saree with Gold Border",
    price: "Price on request",
    category: "Sarees",
    image: "/thridha-handloom-05.webp",
    colour: "Blue",
    description: "Deep blue drape paired with a gold patterned border.",
    ...detailsToConfirm,
  },
  {
    id: "orange-abstract-print-dress",
    name: "Orange Abstract Print Dress",
    price: "Price on request",
    category: "Dresses",
    image: "/libas-dress-02.jpg",
    colour: "Orange",
    description: "Orange and coral abstract print dress with long sleeves and a flowing skirt.",
    ...detailsToConfirm,
  },
];


export const NEW_ARRIVALS_PRODUCTS = [
  "red-celebration-lehenga",
  "green-purple-border-saree",
  "black-printed-short-kurti",
  "plum-evening-gown",
].map((id) => {
  const item = PRODUCTS_CATALOG.find((product) => product.id === id)!;
  return { ...item, imagePosition: "object-center", href: `/collections?q=${encodeURIComponent(item.name)}` };
});
