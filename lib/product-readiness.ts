import type { ProductItem } from "@/data/boutique-data";

const draftCopy = /website publishing test|stock availability is to be confirmed|contact the boutique for details|online checkout is not active yet|\b(?:tbd|tbc|placeholder|sample product|demo product)\b/i;
const draftName = /^(?:designer frock\s*\d+|.*\b(?:test|sample|demo|placeholder)\b.*)$/i;

export function productReadinessIssues(product: ProductItem, catalog: ProductItem[]): string[] {
  const issues: string[] = [];
  if (draftName.test(product.name.trim())) {
    issues.push("The product name needs boutique confirmation.");
  }
  if ([product.description, product.fabric, product.care, product.delivery].some((value) => !value?.trim() || draftCopy.test(value))) {
    issues.push("Product details and availability need boutique confirmation.");
  }
  if (!product.sizeMeasurements?.trim() || draftCopy.test(product.sizeMeasurements)) {
    issues.push("Size measurements need boutique confirmation.");
  }

  const style = catalog.filter((item) => (item.styleCode || item.id) === (product.styleCode || product.id));
  if (style.some((item) => item.id !== product.id && item.color !== product.color && item.image === product.image)) {
    issues.push("An individual photo of the selected colour is still needed.");
  }
  return issues;
}

export function isProductReadyForCheckout(product: ProductItem, catalog: ProductItem[]): boolean {
  return productReadinessIssues(product, catalog).length === 0;
}

export function assessBagProducts(lines: Array<{ productId: string; qty: number }>, catalog: ProductItem[]) {
  const byId = new Map(catalog.map((product) => [product.id, product]));
  const missingIds: string[] = [];
  const unconfirmedIds: string[] = [];
  for (const line of lines) {
    const product = byId.get(line.productId);
    if (!product) missingIds.push(line.productId);
    else if (!isProductReadyForCheckout(product, catalog)) unconfirmedIds.push(line.productId);
  }
  return { ready: lines.length > 0 && missingIds.length === 0 && unconfirmedIds.length === 0, missingIds, unconfirmedIds };
}
