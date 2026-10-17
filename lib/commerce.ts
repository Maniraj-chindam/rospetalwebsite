import { ProductItem, PRODUCTS_CATALOG } from "@/data/boutique-data";

export interface BagItem {
  productId: string;
  size: string;
  quantity: number;
}

export interface BagLine extends BagItem {
  product: ProductItem;
  unitPricePaise: number;
  totalPaise: number;
  stock: number;
}

export function formatINR(paise: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(paise / 100);
}

export function isVerifiedForSale(product: ProductItem): boolean {
  return Boolean(product.verifiedForSale === true && product.sku && Number.isSafeInteger(product.pricePaise) && (product.pricePaise ?? 0) > 0 && product.variants?.length && product.variants.every((variant) => variant.size && Number.isSafeInteger(variant.stock) && variant.stock >= 0));
}

export function isPurchasable(product: ProductItem): boolean {
  return isVerifiedForSale(product) && Boolean(product.variants?.some((variant) => variant.stock > 0));
}

export function getBagLines(items: BagItem[], catalog: ProductItem[] = PRODUCTS_CATALOG): BagLine[] {
  return items.flatMap((item) => {
    const product = catalog.find((candidate) => candidate.id === item.productId);
    const variant = product?.variants?.find((candidate) => candidate.size === item.size);
    if (!product || !isPurchasable(product) || !variant || variant.stock < 1 || !Number.isSafeInteger(item.quantity) || item.quantity < 1) return [];
    return [{ ...item, product, stock: variant.stock, unitPricePaise: product.pricePaise!, totalPaise: product.pricePaise! * item.quantity }];
  });
}

export function bagSubtotalPaise(items: BagItem[], catalog: ProductItem[] = PRODUCTS_CATALOG): number {
  return getBagLines(items, catalog).reduce((total, line) => total + line.totalPaise, 0);
}
