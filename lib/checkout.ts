import { BagItem } from "@/lib/commerce";

export interface CheckoutCustomer {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: "IN";
}

export interface CheckoutQuote {
  quoteId: string;
  lines: { productId: string; name: string; size: string; quantity: number; unitPricePaise: number; totalPaise: number }[];
  subtotalPaise: number;
  shippingPaise: number;
  totalPaise: number;
  currency: "INR";
}

function apiBase(): string {
  const value = process.env.NEXT_PUBLIC_CHECKOUT_API_BASE_URL?.replace(/\/$/, "");
  if (!value) throw new Error("Online checkout is not available yet. Please contact the boutique for help.");
  if (!/^https:\/\//.test(value) && !/^http:\/\/localhost(?::\d+)?$/.test(value)) throw new Error("Checkout service is not configured securely.");
  return value;
}

async function parseResponse(response: Response): Promise<unknown> {
  let body: unknown;
  try { body = await response.json(); } catch { throw new Error("The checkout service returned an invalid response."); }
  if (!response.ok) {
    const error = body && typeof body === "object" && "error" in body && typeof body.error === "string" ? body.error : "Checkout could not continue. Please try again.";
    throw new Error(error);
  }
  return body;
}

async function request(url: string, init?: RequestInit): Promise<unknown> {
  let response: Response;
  try { response = await fetch(url, init); }
  catch { throw new Error("We could not reach the checkout service. Please try again later."); }
  return parseResponse(response);
}

export async function createQuote(items: BagItem[], customer: CheckoutCustomer): Promise<CheckoutQuote> {
  const body = await request(`${apiBase()}/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ items, customer }),
  }) as Partial<CheckoutQuote> | null;
  if (!body || typeof body.quoteId !== "string" || !body.quoteId || body.currency !== "INR" || !Array.isArray(body.lines) || body.lines.length === 0 || !Number.isSafeInteger(body.subtotalPaise) || body.subtotalPaise! < 1 || !Number.isSafeInteger(body.shippingPaise) || body.shippingPaise! < 0 || !Number.isSafeInteger(body.totalPaise) || body.totalPaise! < 1 || body.subtotalPaise! + body.shippingPaise! !== body.totalPaise!) {
    throw new Error("The checkout service returned an invalid order total.");
  }
  for (const line of body.lines) {
    if (!line || typeof line.productId !== "string" || !line.productId || typeof line.name !== "string" || !line.name || typeof line.size !== "string" || !line.size || !Number.isSafeInteger(line.quantity) || line.quantity < 1 || !Number.isSafeInteger(line.unitPricePaise) || line.unitPricePaise < 1 || line.quantity * line.unitPricePaise !== line.totalPaise) throw new Error("The checkout service returned invalid order items.");
  }
  if (body.lines.reduce((sum, line) => sum + line.totalPaise, 0) !== body.subtotalPaise) throw new Error("The checkout service returned an inconsistent order total.");
  return body as CheckoutQuote;
}

export async function startPayment(quoteId: string): Promise<string> {
  const body = await request(`${apiBase()}/pay`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ quoteId }),
  }) as { paymentUrl?: unknown } | null;
  if (!body || typeof body.paymentUrl !== "string" || !body.paymentUrl.startsWith("https://")) throw new Error("The payment provider did not return a secure checkout link.");
  return body.paymentUrl;
}

export async function readPaymentStatus(token: string): Promise<"paid" | "pending" | "failed"> {
  const body = await request(`${apiBase()}/status?token=${encodeURIComponent(token)}`, { headers: { Accept: "application/json" } }) as { status?: unknown } | null;
  if (body?.status !== "paid" && body?.status !== "pending" && body?.status !== "failed") throw new Error("Payment status is unavailable. Please contact the boutique before paying again.");
  return body.status;
}
