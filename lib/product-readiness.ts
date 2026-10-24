import type { ProductItem } from "@/data/boutique-data";

const draftCopy = /website publishing test|stock availability is to be confirmed|contact the boutique for details|online checkout is not active yet/i;

export function productReadinessIssues(product: ProductItem, catalog: ProductItem[]): string[] {
  const issues: string[] = [];
  if ([product.description, product.fabric, product.care, product.delivery].some((value) => !value?.trim() || draftCopy.test(value))) {
    issues.push("Product details and availability need boutique confirmation.");
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
