const apiBase = (process.env.NEXT_PUBLIC_POS_API_BASE_URL || "https://gpu272zv2g.execute-api.ap-south-1.amazonaws.com").replace(/\/$/, "");

export type BagLine = { productId: string; qty: number };
export type BagQuote = {
  currency: "INR";
  items: Array<{ productId: string; sku: string; name: string; size: string; color: string; qty: number; unitPricePaise: number; lineTotalPaise: number }>;
  subtotalPaise: number;
  quotedAt: string;
  expiresAt: string;
  shippingPaise: number | null;
  totalPaise: number | null;
  checkoutAvailable: boolean;
  reason: string;
};

export async function quoteBag(items: BagLine[], signal?: AbortSignal): Promise<BagQuote> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  const timeout = setTimeout(abort, 15000);
  let response: Response;
  try { response = await fetch(`${apiBase}/api/checkout/quote`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ items }),
    cache: "no-store",
    signal: controller.signal,
  }); } catch (error) {
    if (controller.signal.aborted && !signal?.aborted) throw new Error("The live price check timed out. Please try again.");
    throw error;
  } finally { clearTimeout(timeout); signal?.removeEventListener("abort", abort); }
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(typeof body?.error === "string" ? body.error : "The bag could not be checked. Please try again.");
  if (!body || body.currency !== "INR" || !Array.isArray(body.items) || body.items.length !== items.length ||
      !Number.isSafeInteger(body.subtotalPaise) || body.subtotalPaise < 0 ||
      !body.items.every((item: BagQuote["items"][number], index: number) => item && item.productId === items[index].productId && item.qty === items[index].qty &&
        Number.isSafeInteger(item.qty) && Number.isSafeInteger(item.unitPricePaise) && Number.isSafeInteger(item.lineTotalPaise) &&
        item.lineTotalPaise === item.qty * item.unitPricePaise) ||
      body.items.reduce((sum: number, item: BagQuote["items"][number]) => sum + item.lineTotalPaise, 0) !== body.subtotalPaise ||
      typeof body.checkoutAvailable !== "boolean" || typeof body.reason !== "string" ||
      typeof body.quotedAt !== "string" || typeof body.expiresAt !== "string") {
    throw new Error("The bag quote was invalid. Please refresh and try again.");
  }
  return body as BagQuote;
}
