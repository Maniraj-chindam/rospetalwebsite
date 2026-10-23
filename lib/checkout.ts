import type { BagLine } from './checkout-quote';

const apiBase = (process.env.NEXT_PUBLIC_POS_API_BASE_URL || 'https://gpu272zv2g.execute-api.ap-south-1.amazonaws.com').replace(/\/$/, '');

export type CheckoutBuyer = { name: string; email: string; phone: string };
export type CheckoutAddress = { line1: string; line2: string; city: string; state: string; pincode: string; country: 'IN' };
export type CheckoutStatus = { reference: string; paymentStatus: string; fulfillmentStatus: string; totalPaise: number; expiresAt?: string };
export type CheckoutSession = CheckoutStatus & { checkoutToken: string; razorpayOrderId: string; keyId: string; currency: 'INR'; expiresAt: string };

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);
  try {
    const response = await fetch(`${apiBase}${path}`, { ...init, cache: 'no-store', signal: controller.signal });
    const body = await response.json().catch(() => null);
    if (!response.ok) throw new Error(typeof body?.error === 'string' ? body.error : 'Checkout could not be completed. Please try again.');
    return body as T;
  } catch (error) {
    if (controller.signal.aborted) throw new Error('Checkout timed out. Please check your order status before retrying.');
    throw error;
  } finally { clearTimeout(timeout); }
}

export function createCheckoutSession(items: BagLine[], buyer: CheckoutBuyer, address: CheckoutAddress, requestId: string) {
  return request<CheckoutSession>('/api/checkout/session', {
    method: 'POST', headers: { 'content-type': 'application/json', 'x-request-id': requestId },
    body: JSON.stringify({ items, buyer, address }),
  });
}

export function verifyCheckout(session: CheckoutSession, payment: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
  return request<CheckoutStatus>('/api/checkout/verify', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ checkoutToken: session.checkoutToken, razorpayOrderId: payment.razorpay_order_id, razorpayPaymentId: payment.razorpay_payment_id, razorpaySignature: payment.razorpay_signature }),
  });
}

export function getCheckoutStatus(token: string) {
  return request<CheckoutStatus>(`/api/checkout/status?token=${encodeURIComponent(token)}`);
}

declare global {
  interface Window {
    Razorpay?: new (options: {
      key: string; amount: number; currency: string; name: string; description: string; order_id: string;
      prefill: CheckoutBuyer; handler: (payment: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void;
      modal: { ondismiss: () => void }; theme: { color: string };
    }) => { open: () => void; on: (event: string, handler: () => void) => void };
  }
}

export async function loadRazorpayCheckout() {
  if (window.Razorpay) return;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Secure payment could not load. Please try again.'));
    document.head.appendChild(script);
  });
  if (!window.Razorpay) throw new Error('Secure payment could not load. Please try again.');
}
