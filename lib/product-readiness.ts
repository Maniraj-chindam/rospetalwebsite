import type { ProductItem } from "@/data/boutique-data";

const draftCopy = /website publishing test|stock availability is to be confirmed|contact the boutique for details|online checkout is not active yet|\b(?:tbd|tbc|placeholder|sample product|demo product)\b/i;
const draftName = /^(?:designer frock\s*\d+|.*\b(?:test|sample|demo|placeholder)\b.*)$/i;

export function productContentIssues(product: ProductItem, catalog: ProductItem[]): string[] {
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
  if (!product.color?.trim()) {
    issues.push("The product colour needs boutique confirmation.");
  }

  const style = catalog.filter((item) => (item.styleCode || item.id) === (product.styleCode || product.id));
  if (style.some((item) => item.id !== product.id && item.color !== product.color && item.image === product.image)) {
    issues.push("An individual photo of the selected colour is still needed.");
  }
  return issues;
}

export function customerVisibleCatalog(catalog: ProductItem[]): ProductItem[] {
  // The POS Website checkbox controls publication. Its public catalog has
  // already excluded unpublished variants; missing editorial details must not
  // silently hide a product that the boutique chose to publish.
  return catalog;
}

export function productReadinessIssues(product: ProductItem, catalog: ProductItem[]): string[] {
  if (isPaymentTestProduct(product)) return [];
  const issues = productContentIssues(product, catalog);
  if (product.checkoutAllowed === false) {
    issues.push(product.prebookOnly
      ? "Secure prebook payment is not available yet; you can send a request to the boutique."
      : "This piece is currently available for enquiry while boutique checkout approval is completed.");
  }
  return issues;
}

export function isPaymentTestProduct(product: ProductItem): boolean {
  return product.paymentTestOnly===true&&product.checkoutAllowed===true&&product.id==='7552dfbd-31bf-4ef8-8b1c-98f84cb8784a'&&product.styleCode==='RP-RAZORPAY-TEST-SAREE'&&product.priceNum===1;
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
