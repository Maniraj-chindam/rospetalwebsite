import type { ProductItem } from "@/data/boutique-data";

const apiBase = (process.env.NEXT_PUBLIC_POS_API_BASE_URL || "https://gpu272zv2g.execute-api.ap-south-1.amazonaws.com").replace(/\/$/, "");
const assetBase = (process.env.NEXT_PUBLIC_POS_ASSET_BASE_URL || "https://d1xuisyba3w17i.cloudfront.net").replace(/\/$/, "");
const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0, maximumFractionDigits: 2 });

type CatalogVariant = {
  id: string;
  sku: string;
  name: string;
  category: string;
  size: string;
  color: string;
  pricePaise: number;
  image: string;
  availableStock: number;
};

function toProduct(value: CatalogVariant): ProductItem {
  if (!value || typeof value.id !== "string" || typeof value.name !== "string" ||
      typeof value.category !== "string" || typeof value.image !== "string" ||
      !/^\/(assets|uploads)\/[a-zA-Z0-9_.-]+$/.test(value.image) ||
      !Number.isSafeInteger(value.pricePaise) || value.pricePaise <= 0 ||
      !Number.isSafeInteger(value.availableStock) || value.availableStock < 0) {
    throw new Error("The catalog response was invalid.");
  }

  const priceNum = value.pricePaise / 100;
  return {
    id: value.id,
    sku: value.sku,
    name: value.name,
    category: value.category,
    size: value.size,
    color: value.color,
    priceNum,
    price: rupees.format(priceNum),
    image: `${assetBase}${value.image}`,
    availableStock: value.availableStock,
  };
}

export async function fetchPosCatalog(signal?: AbortSignal): Promise<ProductItem[]> {
  const products: ProductItem[] = [];
  const seen = new Set<string>();
  let cursor: string | null = null;

  for (let page = 0; page < 20; page += 1) {
    const url = new URL(`${apiBase}/api/catalog`);
    if (cursor) url.searchParams.set("after", cursor);
    const response = await fetch(url, { signal, cache: "no-store" });
    if (!response.ok) throw new Error("The live collection is temporarily unavailable.");
    const body = await response.json();
    if (!body || !Array.isArray(body.items) ||
        (body.nextCursor !== null && typeof body.nextCursor !== "string")) {
      throw new Error("The catalog response was invalid.");
    }
    products.push(...body.items.map(toProduct));
    if (!body.nextCursor) return products;
    if (seen.has(body.nextCursor)) throw new Error("The catalog response repeated a page.");
    seen.add(body.nextCursor);
    cursor = body.nextCursor;
  }

  throw new Error("The catalog has too many pages to load.");
}
