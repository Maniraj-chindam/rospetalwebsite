import type { ProductItem } from "@/data/boutique-data";

const apiBase = (process.env.NEXT_PUBLIC_POS_API_BASE_URL || "https://gpu272zv2g.execute-api.ap-south-1.amazonaws.com").replace(/\/$/, "");
const assetBase = (process.env.NEXT_PUBLIC_POS_ASSET_BASE_URL || "https://d1xuisyba3w17i.cloudfront.net").replace(/\/$/, "");
const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0, maximumFractionDigits: 2 });
const photoPath = /^\/(assets|uploads)\/[a-zA-Z0-9_.-]+$/;
const categories = new Set(["Sarees", "Dresses", "Lehengas", "Designer Suits", "Handlooms", "Bed Linens", "Blankets & Quilts", "Accessories", "Bridal Wear", "Home Decor"]);

type CatalogVariant = {
  id: string;
  sku: string;
  styleCode: string;
  name: string;
  category: string;
  websiteType: string;
  description: string;
  fabric: string;
  care: string;
  delivery: string;
  size: string;
  sizeMeasurements?: string;
  color: string;
  pricePaise: number;
  actualPricePaise?: number;
  salePricePaise?: number | null;
  image: string;
  images: string[];
  availableStock: number;
  updatedAt: string;
  paymentTestOnly?: boolean;
  checkoutAllowed?: boolean;
};

function nonEmpty(value: unknown, max: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}

function toProduct(value: CatalogVariant): ProductItem {
  if (!value || !nonEmpty(value.id, 100) || !nonEmpty(value.sku, 60) ||
      !nonEmpty(value.styleCode, 60) || !nonEmpty(value.name, 200) ||
      !categories.has(value.category) || typeof value.websiteType !== "string" || value.websiteType.length > 100 || !nonEmpty(value.description, 2000) ||
      !nonEmpty(value.fabric, 300) || !nonEmpty(value.care, 500) ||
      !nonEmpty(value.delivery, 500) || !nonEmpty(value.size, 40) ||
      (value.sizeMeasurements !== undefined && typeof value.sizeMeasurements !== "string") ||
      (typeof value.sizeMeasurements === "string" && value.sizeMeasurements.length > 500) ||
      typeof value.color !== "string" || value.color.length > 60 ||
      !photoPath.test(value.image) || !Array.isArray(value.images) ||
      value.images.length < 1 || value.images.length > 5 ||
      !value.images.includes(value.image) || !value.images.every((photo) => typeof photo === "string" && photoPath.test(photo)) ||
      !Number.isSafeInteger(value.pricePaise) || value.pricePaise <= 0 ||
      (value.actualPricePaise !== undefined && (!Number.isSafeInteger(value.actualPricePaise) || value.actualPricePaise < value.pricePaise)) ||
      (value.salePricePaise != null && (!Number.isSafeInteger(value.salePricePaise) || value.salePricePaise !== value.pricePaise || value.actualPricePaise === undefined)) ||
      !Number.isSafeInteger(value.availableStock) || value.availableStock < 0 ||
      (value.paymentTestOnly !== undefined && typeof value.paymentTestOnly !== 'boolean') ||
      (value.checkoutAllowed !== undefined && typeof value.checkoutAllowed !== 'boolean') ||
      !nonEmpty(value.updatedAt, 40)) {
    throw new Error("The catalog response was invalid.");
  }

  const priceNum = value.pricePaise / 100;
  return {
    id: value.id,
    sku: value.sku,
    styleCode: value.styleCode,
    name: value.name,
    category: value.category,
    websiteType: value.websiteType,
    description: value.description,
    fabric: value.fabric,
    care: value.care,
    delivery: value.paymentTestOnly ? 'Payment test only. No physical delivery. Other product checkout and Shiprocket booking remain disabled.' : value.delivery,
    size: value.size,
    sizeMeasurements: value.sizeMeasurements?.trim(),
    color: value.color,
    priceNum,
    price: rupees.format(priceNum),
    actualPriceNum: (value.actualPricePaise ?? value.pricePaise) / 100,
    actualPrice: rupees.format((value.actualPricePaise ?? value.pricePaise) / 100),
    image: `${assetBase}${value.image}`,
    images: value.images.map((photo) => `${assetBase}${photo}`),
    availableStock: value.availableStock,
    updatedAt: value.updatedAt,
    paymentTestOnly: value.paymentTestOnly,
    checkoutAllowed: value.checkoutAllowed,
  };
}

export async function fetchPosCatalog(signal?: AbortSignal): Promise<ProductItem[]> {
  const products: ProductItem[] = [];
  const seenCursors = new Set<string>();
  const seenIds = new Set<string>();
  let cursor: string | null = null;

  for (let page = 0; page < 20; page += 1) {
    const url = new URL(`${apiBase}/api/catalog`);
    if (cursor) url.searchParams.set("after", cursor);
    const response = await fetch(url, { signal, cache: "no-store" });
    if (!response.ok) throw new Error("The live collection is temporarily unavailable.");
    const body = await response.json();
    if (!body || body.contractVersion !== 2 || !Array.isArray(body.items) ||
        (body.nextCursor !== null && typeof body.nextCursor !== "string")) {
      throw new Error("The catalog response was invalid.");
    }
    for (const value of body.items as CatalogVariant[]) {
      const product = toProduct(value);
      if (seenIds.has(product.id)) throw new Error("The catalog repeated a product.");
      seenIds.add(product.id);
      products.push(product);
    }
    if (!body.nextCursor) return products;
    if (seenCursors.has(body.nextCursor)) throw new Error("The catalog repeated a page.");
    seenCursors.add(body.nextCursor);
    cursor = body.nextCursor;
  }

  throw new Error("The catalog has too many pages to load.");
}

export function groupCatalogByStyle(products: ProductItem[]): ProductItem[][] {
  const groups = new Map<string, ProductItem[]>();
  for (const product of products) {
    const key = product.styleCode || product.id;
    const group = groups.get(key) || [];
    group.push(product);
    groups.set(key, group);
  }
  return [...groups.values()].map((group) => group.sort((first, second) =>
    Number((second.availableStock ?? 0) > 0) - Number((first.availableStock ?? 0) > 0) ||
    (first.size || "").localeCompare(second.size || "") ||
    (first.color || "").localeCompare(second.color || "")
  ));
}
