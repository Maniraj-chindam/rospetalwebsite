export interface ProductItem {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  image: string;
  tag?: string;
  description?: string;
  sku?: string;
  size?: string;
  color?: string;
  availableStock?: number;
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
  { name: "Lookbook", href: "/lookbook" },
  { name: "Custom Designs", href: "/custom-design" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export interface HeaderNavItem {
  name: string;
  href: string;
  menuId?: string;
  children?: Array<{ name: string; href: string; shopAllId?: string }>;
}

export interface ShopAllCategoryCard {
  id: string;
  group: "Designer Dresses" | "Handloom Collection" | "Designer Frocks" | "Lehenga Collection";
  name: string;
  image: string;
  href: string;
}

export const SHOP_ALL_CATEGORY_CARDS: ShopAllCategoryCard[] = [
  { id: "customized-designer-dresses", group: "Designer Dresses", name: "Customized Designer Dresses", image: "/libas-dress-01.jpg", href: "/collections?category=Dresses&type=Customized+Designer+Dresses" },
  { id: "embroidered-designer-dresses", group: "Designer Dresses", name: "Embroidered Designer Dresses", image: "/libas-dress-02.jpg", href: "/collections?category=Dresses&type=Embroidered+Designer+Dresses" },
  { id: "maggam-work-dresses", group: "Designer Dresses", name: "Maggam Work Dresses", image: "/libas-dress-03.jpg", href: "/collections?category=Dresses&type=Maggam+Work+Dresses" },
  { id: "a-line-designer-dresses", group: "Designer Dresses", name: "A-Line Designer Dresses", image: "/libas-dress-04.jpg", href: "/collections?category=Dresses&type=A-Line+Designer+Dresses" },
  { id: "straight-cut-designer-dresses", group: "Designer Dresses", name: "Straight-Cut Designer Dresses", image: "/libas-dress-05.jpg", href: "/collections?category=Dresses&type=Straight-Cut+Designer+Dresses" },
  { id: "designer-kurtas-kurtis", group: "Designer Dresses", name: "Designer Kurtas & Kurtis", image: "/libas-dress-06.jpg", href: "/collections?category=Dresses&type=Designer+Kurtas+%26+Kurtis" },
  { id: "handloom-designer-dresses", group: "Handloom Collection", name: "Handloom Designer Dresses", image: "/thridha-handloom-01.webp", href: "/collections?category=Handlooms&type=Handloom+Designer+Dresses" },
  { id: "gadwal-pattu-dresses", group: "Handloom Collection", name: "Gadwal Pattu Dresses", image: "/thridha-handloom-02.webp", href: "/collections?category=Handlooms&type=Gadwal+Pattu+Dresses" },
  { id: "narayanpet-handloom-dresses", group: "Handloom Collection", name: "Narayanpet Handloom Dresses", image: "/thridha-handloom-03.webp", href: "/collections?category=Handlooms&type=Narayanpet+Handloom+Dresses" },
  { id: "mangalagiri-pattu-dresses", group: "Handloom Collection", name: "Mangalagiri Pattu Dresses", image: "/thridha-handloom-04.webp", href: "/collections?category=Handlooms&type=Mangalagiri+Pattu+Dresses" },
  { id: "jamdani-dresses", group: "Handloom Collection", name: "Jamdani Dresses", image: "/thridha-handloom-05.webp", href: "/collections?category=Handlooms&type=Jamdani+Dresses" },
  { id: "kalamkari-dresses", group: "Handloom Collection", name: "Kalamkari Dresses", image: "/thridha-handloom-06.webp", href: "/collections?category=Handlooms&type=Kalamkari+Dresses" },
  { id: "chanderi-cotton-dresses", group: "Handloom Collection", name: "Chanderi Cotton Dresses", image: "/thridha-handloom-07.webp", href: "/collections?category=Handlooms&type=Chanderi+Cotton+Dresses" },
  { id: "kota-silk-dresses", group: "Handloom Collection", name: "Kota Silk Dresses", image: "/thridha-handloom-08.webp", href: "/collections?category=Handlooms&type=Kota+Silk+Dresses" },
  { id: "designer-long-frocks", group: "Designer Frocks", name: "Designer Long Frocks", image: "/libas-dress-07.jpg", href: "/collections?category=Dresses&type=Designer+Long+Frocks" },
  { id: "customized-designer-frocks", group: "Designer Frocks", name: "Customized Designer Frocks", image: "/libas-dress-08.jpg", href: "/collections?category=Dresses&type=Customized+Designer+Frocks" },
  { id: "pen-kalamkari-designer-lehengas", group: "Lehenga Collection", name: "Pen Kalamkari Designer Lehengas", image: "/lehengas-new-photo.jpg", href: "/collections?category=Lehengas&type=Pen+Kalamkari+Designer+Lehengas" },
  { id: "gadwal-pattu-lehengas", group: "Lehenga Collection", name: "Gadwal Pattu Lehengas", image: "/thridha-handloom-02.webp", href: "/collections?category=Lehengas&type=Gadwal+Pattu+Lehengas" },
  { id: "kanchipuram-pattu-lehengas", group: "Lehenga Collection", name: "Kanchipuram Pattu Lehengas", image: "/shop-all-featured-lehenga.png", href: "/collections?category=Lehengas&type=Kanchipuram+Pattu+Lehengas" },
  { id: "mangalagiri-pattu-lehengas", group: "Lehenga Collection", name: "Mangalagiri Pattu Lehengas", image: "/thridha-handloom-04.webp", href: "/collections?category=Lehengas&type=Mangalagiri+Pattu+Lehengas" },
  { id: "narayanpet-handloom-lehengas", group: "Lehenga Collection", name: "Narayanpet Handloom Lehengas", image: "/thridha-handloom-03.webp", href: "/collections?category=Lehengas&type=Narayanpet+Handloom+Lehengas" },
];

export const HEADER_NAV_LINKS: HeaderNavItem[] = NAV_LINKS;

export const HERO_ARCHED_CATEGORIES = [
  {
    id: "sarees",
    name: "SAREES",
    subtitle: "Timeless Elegance",
    image: "/sarees-new-photo.png",
    href: "/collections?category=Sarees",
  },
  {
    id: "dresses",
    name: "DRESSES",
    subtitle: "Everyday to Extraordinary",
    image: "/dresses-new-photo.png",
    href: "/collections?category=Dresses",
  },
  {
    id: "lehengas",
    name: "LEHENGAS",
    subtitle: "For Your Special Days",
    image: "/lehengas-new-photo.jpg",
    href: "/collections?category=Lehengas",
  },
  {
    id: "designer-frocks",
    name: "DESIGNER FROCKS",
    subtitle: "Made to Make an Entrance",
    image: "/libas-dress-07.jpg",
    href: "/collections?category=Dresses&type=Designer+Long+Frocks",
  },
  {
    id: "designer-dresses",
    name: "DESIGNER DRESSES",
    subtitle: "Everyday to Extraordinary",
    image: "/libas-dress-01.jpg",
    href: "/collections?category=Dresses&type=Customized+Designer+Dresses",
  },
  {
    id: "short-kurtis",
    name: "SHORT KURTIS",
    subtitle: "Grace in Every Thread",
    image: "/short-kurti-new-photo.png",
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

export const NEW_ARRIVALS_PRODUCTS = [
  {
    id: "blush-mirrorwork-lehenga",
    name: "Blush Mirrorwork Lehenga",
    price: "₹ 34,500",
    image: "/lehengas-new-photo.jpg",
    imagePosition: "object-center",
    href: "/collections?category=Lehengas",
  },
  {
    id: "heritage-silk-saree",
    name: "Heritage Silk Saree",
    price: "₹ 14,800",
    image: "/heritage-silk-saree-green.png",
    imagePosition: "object-top",
    href: "/collections?category=Sarees",
  },
  {
    id: "black-floral-short-kurti",
    name: "Black Floral Short Kurti",
    price: "₹ 1,499",
    image: "/short-kurti-new-photo.png",
    imagePosition: "object-center",
    href: "/collections?category=Designer+Suits",
  },
  {
    id: "plum-evening-dress",
    name: "Plum Evening Dress",
    price: "₹ 9,500",
    image: "/dress_1.jpg",
    imagePosition: "object-center",
    href: "/collections?category=Dresses",
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
    id: "black-floral-short-kurti-catalog",
    name: "Black Floral Short Kurti",
    price: "₹ 1,499",
    priceNum: 1499,
    category: "Designer Suits",
    image: "/libas-dress-01.jpg",
    description: "An easy everyday short kurti with a delicate floral print and comfortable tailored fit.",
  },
  {
    id: "plum-evening-dress-catalog",
    name: "Plum Evening Dress",
    price: "₹ 9,500",
    priceNum: 9500,
    category: "Dresses",
    image: "/libas-dress-02.jpg",
    description: "A graceful plum occasion dress with a clean silhouette and refined evening finish.",
  },
  {
    id: "heritage-silk-saree-catalog",
    name: "Heritage Silk Saree",
    price: "₹ 14,800",
    priceNum: 14800,
    category: "Sarees",
    image: "/thridha-handloom-01.webp",
    description: "A timeless green silk saree finished with a traditional gold woven border.",
  },
  {
    id: "blush-mirrorwork-lehenga-catalog",
    name: "Blush Mirrorwork Lehenga",
    price: "₹ 34,500",
    priceNum: 34500,
    category: "Lehengas",
    image: "/lehengas-new-photo.jpg",
    description: "A blush celebration lehenga detailed with luminous mirrorwork and a graceful festive flare.",
  },
  {
    id: "prod-1",
    name: "Rose Blush Saree",
    price: "₹ 12,500",
    priceNum: 12500,
    category: "Sarees",
    image: "/thridha-handloom-02.webp",
    description: "Pure organza drape in delicate rose blush with hand-embroidered floral motifs and scalloped border.",
  },
  {
    id: "prod-2",
    name: "Emerald Grace",
    price: "₹ 14,000",
    priceNum: 14000,
    category: "Sarees",
    image: "/thridha-handloom-03.webp",
    description: "Rich emerald silk weave with antique gold zari jaal pattern and regal contrast pallu.",
  },
  {
    id: "prod-3",
    name: "Ivory Dream",
    price: "₹ 15,200",
    priceNum: 15200,
    category: "Designer Suits",
    image: "/libas-dress-03.jpg",
    description: "Ivory raw silk ensemble adorned with resham work, pearl detailing and sheer dupatta.",
  },
  {
    id: "prod-4",
    name: "Royal Maroon",
    price: "₹ 16,900",
    priceNum: 16900,
    category: "Bridal Wear",
    image: "/libas-dress-04.jpg",
    description: "Opulent velvet and brocade lehenga set in deep maroon embellished with heavy zardozi handcraft.",
  },
  {
    id: "prod-5",
    name: "Pastel Elegance",
    price: "₹ 11,800",
    priceNum: 11800,
    category: "Handlooms",
    image: "/thridha-handloom-04.webp",
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
    image: "/thridha-handloom-05.webp",
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
    title: "Red Bridal Lehenga",
    category: "Bridal",
    image: "/lehenga-red-bridal.png",
    aspect: "tall",
  },
  {
    id: "look-2",
    title: "Floral Festive Dress",
    category: "Festive",
    image: "/libas-dress-01.jpg",
    aspect: "tall",
  },
  {
    id: "look-3",
    title: "Green Silk Saree",
    category: "Handloom",
    image: "/heritage-silk-saree-green.png",
    aspect: "tall",
  },
  {
    id: "look-4",
    title: "Ivory Bridal Lehenga",
    category: "Bridal",
    image: "/shop-all-featured-lehenga.png",
    aspect: "tall",
  },
  {
    id: "look-5",
    title: "Rose Occasion Suit",
    category: "Festive",
    image: "/shop-all-featured-dress.png",
    aspect: "tall",
  },
  {
    id: "look-6",
    title: "Contemporary Dress",
    category: "Contemporary",
    image: "/libas-dress-07.jpg",
    aspect: "tall",
  },
  {
    id: "look-7",
    title: "Woven Silk Detail",
    category: "Handloom",
    image: "/thridha-handloom-01.webp",
    aspect: "tall",
  },
  {
    id: "look-8",
    title: "Printed Designer Dress",
    category: "Contemporary",
    image: "/libas-dress-03.jpg",
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
  phone: "+91 91823 18862",
  phoneDial: "+919182318862",
  whatsapp: "919182318862",
};
