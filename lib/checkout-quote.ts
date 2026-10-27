const apiBase = (process.env.NEXT_PUBLIC_POS_API_BASE_URL || "https://gpu272zv2g.execute-api.ap-south-1.amazonaws.com").replace(/\/$/, "");

export type BagLine = { productId: string; qty: number };
export type BagQuote = {
  currency: "INR";
  checkoutMode?: 'payment_test';
  items: Array<{ productId: string; sku: string; name: string; size: string; color: string; qty: number; unitPricePaise: number; lineTotalPaise: number }>;
  subtotalPaise: number;
  deliveryPincode: string | null;
  deliveryStatus: "pin_required" | "packaging_required" | "available" | "unserviceable" | "unavailable" | "approval_required" | "not_required" | "paused" | "free";
  deliveryQuote: { courierCompanyId: number; courierName: string; estimatedChargePaise: number; estimatedDeliveryDays: number | null } | null;
  quotedAt: string;
  expiresAt: string;
  shippingPaise: number | null;
  totalPaise: number | null;
  checkoutAvailable: boolean;
  reason: string;
};

export async function quoteBag(items: BagLine[], deliveryPincode?: string, signal?: AbortSignal): Promise<BagQuote> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  const timeout = setTimeout(abort, 15000);
  let response: Response;
  try { response = await fetch(`${apiBase}/api/checkout/quote`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ items, ...(deliveryPincode ? { deliveryPincode } : {}) }),
    cache: "no-store",
    signal: controller.signal,
  }); } catch (error) {
    if (controller.signal.aborted && !signal?.aborted) throw new Error("The live price check timed out. Please try again.");
    throw error;
  } finally { clearTimeout(timeout); signal?.removeEventListener("abort", abort); }
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(typeof body?.error === "string" ? body.error : "The bag could not be checked. Please try again.");
  const paymentTest = body?.checkoutMode === 'payment_test';
  const validTest = paymentTest && body.items?.length===1 && body.items[0].productId==='7552dfbd-31bf-4ef8-8b1c-98f84cb8784a' && body.items[0].qty===1 && body.items[0].unitPricePaise===100 && body.subtotalPaise===100 && body.deliveryStatus==='not_required' && body.deliveryQuote===null && body.deliveryPincode===null;
  if (!body || body.currency !== "INR" || (body.checkoutMode!==undefined&&!paymentTest) || paymentTest&&!validTest || !Array.isArray(body.items) || body.items.length !== items.length ||
      !Number.isSafeInteger(body.subtotalPaise) || body.subtotalPaise < 0 ||
      !body.items.every((item: BagQuote["items"][number], index: number) => item && item.productId === items[index].productId && item.qty === items[index].qty &&
        Number.isSafeInteger(item.qty) && item.qty > 0 && Number.isSafeInteger(item.unitPricePaise) && item.unitPricePaise > 0 &&
        Number.isSafeInteger(item.lineTotalPaise) && item.lineTotalPaise > 0 &&
        item.lineTotalPaise === item.qty * item.unitPricePaise) ||
      body.items.reduce((sum: number, item: BagQuote["items"][number]) => sum + item.lineTotalPaise, 0) !== body.subtotalPaise ||
      typeof body.checkoutAvailable !== "boolean" || typeof body.reason !== "string" ||
      !["pin_required", "packaging_required", "available", "unserviceable", "unavailable", "approval_required", "paused", "free", ...(validTest?['not_required']:[])].includes(body.deliveryStatus) ||
      (body.deliveryQuote !== null && (!body.deliveryQuote || !Number.isSafeInteger(body.deliveryQuote.courierCompanyId) || body.deliveryQuote.courierCompanyId <= 0 ||
        !Number.isSafeInteger(body.deliveryQuote.estimatedChargePaise) || body.deliveryQuote.estimatedChargePaise < 0 ||
        typeof body.deliveryQuote.courierName !== "string" || !body.deliveryQuote.courierName.trim() ||
        (body.deliveryQuote.estimatedDeliveryDays !== null && (!Number.isSafeInteger(body.deliveryQuote.estimatedDeliveryDays) || body.deliveryQuote.estimatedDeliveryDays < 0)))) ||
      (body.deliveryStatus === "available") !== (body.deliveryQuote !== null) ||
      (["paused", "free"].includes(body.deliveryStatus) && (paymentTest || body.deliveryQuote !== null || body.shippingPaise !== (body.checkoutAvailable ? 0 : null))) ||
      typeof body.quotedAt !== "string" || !Number.isFinite(Date.parse(body.quotedAt)) ||
      typeof body.expiresAt !== "string" || !Number.isFinite(Date.parse(body.expiresAt)) ||
      Date.parse(body.expiresAt) <= Date.parse(body.quotedAt) || Date.parse(body.expiresAt) <= Date.now() ||
      (body.checkoutAvailable && (paymentTest ? body.shippingPaise!==0||body.totalPaise!==100 : ["paused", "free"].includes(body.deliveryStatus) ? body.shippingPaise !== 0 || body.totalPaise !== body.subtotalPaise : body.deliveryStatus !== "available" || body.shippingPaise !== body.deliveryQuote?.estimatedChargePaise ||
        !Number.isSafeInteger(body.totalPaise) || body.totalPaise !== body.subtotalPaise + body.shippingPaise)) ||
      (!body.checkoutAvailable && (body.shippingPaise !== null || body.totalPaise !== null))) {
    throw new Error("The bag quote was invalid. Please refresh and try again.");
  }
  return body as BagQuote;
}
