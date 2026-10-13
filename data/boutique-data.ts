export interface ProductItem {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  category: "Sarees" | "Lehengas" | "Designer Suits" | "Bridal Wear" | "Handlooms" | "Accessories" | "Dresses" | "Kurtis & Suits" | "Bed Linens" | "Blankets & Quilts" | "Home Decor" | "Gift Sets";
  image: string;
  tag?: string;
  description?: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: "Festive" | "Bridal" | "Handloom" | "Contemporary";
  image: string;
  aspect: "tall" | "wide" | "square";
}

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/collections" },
  { name: "Dresses", href: "/collections?category=Dresses" },
  { name: "Bed & Bath", href: "/collections?category=Bed+Linens" },
  { name: "Custom Orders", href: "/custom-design" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const HERO_ARCHED_CATEGORIES = [
  {
    id: "sarees",
    name: "SAREES",
    subtitle: "Timeless Elegance",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Sarees",
  },
  {
    id: "dresses",
    name: "DRESSES",
    subtitle: "Everyday to Extraordinary",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Dresses",
  },
  {
    id: "lehengas",
    name: "LEHENGAS",
    subtitle: "For Your Special Days",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Lehengas",
  },
  {
    id: "kurtis",
    name: "KURTIS & SUITS",
    subtitle: "Grace in Every Thread",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Designer+Suits",
  },
  {
    id: "bed-linens",
    name: "BED LINENS",
    subtitle: "Comfort Redefined",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Bed+Linens",
  },
  {
    id: "blankets-quilts",
    name: "BLANKETS & QUILTS",
    subtitle: "Warmth for Every Season",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Blankets+%26+Quilts",
  },
];

export const SHOP_BY_CATEGORY_ITEMS = [
  {
    id: "sarees",
    name: "Sarees",
    subtitle: "Timeless Elegance",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Sarees",
  },
  {
    id: "lehengas",
    name: "Lehengas",
    subtitle: "For Your Big Days",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Lehengas",
  },
  {
    id: "dresses",
    name: "Dresses",
    subtitle: "Modern & Ethnic",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Dresses",
  },
  {
    id: "kurtis",
    name: "Kurtis & Suits",
    subtitle: "Everyday Grace",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Designer+Suits",
  },
  {
    id: "bed-covers",
    name: "Bed Covers",
    subtitle: "Dream in Style",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Bed+Linens",
  },
  {
    id: "blankets-quilts",
    name: "Blankets & Quilts",
    subtitle: "Warmth Redefined",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Blankets+%26+Quilts",
  },
  {
    id: "cushion-covers",
    name: "Pillow & Cushion Covers",
    subtitle: "Little Details, Big Change",
    image: "https://images.unsplash.com/photo-1584100936733-146603a165df?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Accessories",
  },
  {
    id: "home-decor",
    name: "Home Decor",
    subtitle: "Style Your Space",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Home+Decor",
  },
];

export const HOME_PILLARS = [
  {
    icon: "Sparkles",
    title: "PREMIUM FABRICS",
    subtitle: "Curated with care",
  },
  {
    icon: "Flower2",
    title: "EXQUISITE DESIGNS",
    subtitle: "For every occasion",
  },
  {
    icon: "Scissors",
    title: "CUSTOM CREATIONS",
    subtitle: "Made just for you",
  },
  {
    icon: "Globe",
    title: "WORLDWIDE SHIPPING",
    subtitle: "Bringing elegance to you",
  },
];

export const HOME_CATEGORIES = [
  {
    id: "sarees",
    name: "Sarees",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Sarees",
  },
  {
    id: "lehengas",
    name: "Lehengas",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Lehengas",
  },
  {
    id: "suits",
    name: "Designer Suits",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Designer+Suits",
  },
  {
    id: "bridal",
    name: "Bridal Wear",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Bridal+Wear",
  },
  {
    id: "handlooms",
    name: "Handlooms",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Handlooms",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    href: "/collections?category=Accessories",
  },
];

export const ABOUT_PILLARS = [
  {
    icon: "Flower2",
    title: "OUR HERITAGE",
    subtitle: "Rooted in tradition",
  },
  {
    icon: "Scissors",
    title: "OUR CRAFTSMANSHIP",
    subtitle: "Attention to detail",
  },
  {
    icon: "Users",
    title: "OUR PEOPLE",
    subtitle: "A passionate team",
  },
  {
    icon: "HeartHandshake",
    title: "OUR PROMISE",
    subtitle: "Elegance always",
  },
];

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: "prod-1",
    name: "Rose Blush Saree",
    price: "₹ 12,500",
    priceNum: 12500,
    category: "Sarees",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    description: "Pure organza drape in delicate rose blush with hand-embroidered floral motifs and scalloped border.",
  },
  {
    id: "prod-2",
    name: "Emerald Grace",
    price: "₹ 14,000",
    priceNum: 14000,
    category: "Sarees",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    description: "Rich emerald silk weave with antique gold zari jaal pattern and regal contrast pallu.",
  },
  {
    id: "prod-3",
    name: "Ivory Dream",
    price: "₹ 15,200",
    priceNum: 15200,
    category: "Designer Suits",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
    description: "Ivory raw silk ensemble adorned with resham work, pearl detailing and sheer dupatta.",
  },
  {
    id: "prod-4",
    name: "Royal Maroon",
    price: "₹ 16,900",
    priceNum: 16900,
    category: "Bridal Wear",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    description: "Opulent velvet and brocade lehenga set in deep maroon embellished with heavy zardozi handcraft.",
  },
  {
    id: "prod-5",
    name: "Pastel Elegance",
    price: "₹ 11,800",
    priceNum: 11800,
    category: "Handlooms",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    description: "Powder blue handwoven chanderi saree highlighted with delicate silver thread work.",
  },
  {
    id: "prod-6",
    name: "Midnight Bloom",
    price: "₹ 15,600",
    priceNum: 15600,
    category: "Lehengas",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    description: "Midnight dark silhouette featuring floral sequins and crystal accents on georgette canvas.",
  },
  {
    id: "prod-7",
    name: "Sunset Drape",
    price: "₹ 12,900",
    priceNum: 12900,
    category: "Sarees",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800",
    description: "Warm coral and sunset ombre tones woven on banarasi tissue silk with glistening zari border.",
  },
  {
    id: "prod-8",
    name: "Peach Petal",
    price: "₹ 13,500",
    priceNum: 13500,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    description: "Pastel peach tailored outfit with hand-appliqué floral lace and handcrafted potli bag.",
  },
];

export const LOOKBOOK_GALLERY: LookbookItem[] = [
  {
    id: "look-1",
    title: "Blush Bride",
    category: "Bridal",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    aspect: "tall",
  },
  {
    id: "look-2",
    title: "Golden Aura",
    category: "Festive",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    aspect: "tall",
  },
  {
    id: "look-3",
    title: "Emerald Elegance",
    category: "Handloom",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
    aspect: "tall",
  },
  {
    id: "look-4",
    title: "Royal Plum",
    category: "Bridal",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    aspect: "tall",
  },
  {
    id: "look-5",
    title: "Warm Teracotta",
    category: "Festive",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    aspect: "tall",
  },
  {
    id: "look-6",
    title: "Rose Grace",
    category: "Contemporary",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800",
    aspect: "tall",
  },
  {
    id: "look-7",
    title: "Artisan Hands",
    category: "Handloom",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800",
    aspect: "tall",
  },
  {
    id: "look-8",
    title: "Regal Heritage",
    category: "Contemporary",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    aspect: "tall",
  },
];

export const CUSTOM_PROCESS_STEPS = [
  {
    step: "1",
    title: "SHARE YOUR IDEAS",
    description: "Tell us your style, occasion and preferences.",
    icon: "Sparkles",
  },
  {
    step: "2",
    title: "DESIGN A PLAN",
    description: "Our team creates a personalized design for you.",
    icon: "PencilRuler",
  },
  {
    step: "3",
    title: "CRAFTED WITH CARE",
    description: "Skilled artisans bring your design to life.",
    icon: "Scissors",
  },
  {
    step: "4",
    title: "YOUR PERFECT OUTFIT",
    description: "Cherish a one-of-a-kind creation, made just for you.",
    icon: "HeartHandshake",
  },
];

export const CONTACT_INFO = {
  studio: "Banjara Hills, Hyderabad 500033",
  phone: "+91 98765 43210",
  email: "hello@rosepetal.in",
  hours: "Mon – Sat, 11 AM – 7 PM",
};
