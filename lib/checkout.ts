import type { BagLine } from './checkout-quote';

const apiBase = (process.env.NEXT_PUBLIC_POS_API_BASE_URL || 'https://gpu272zv2g.execute-api.ap-south-1.amazonaws.com').replace(/\/$/, '');
const attemptStorageKey = 'rosepetal_checkout_request';
const attempts = new Map<string, { id: string; createdAt: number }>();

export type CheckoutBuyer = { name: string; email: string; phone: string };
export type CheckoutAddress = { line1: string; line2: string; city: string; state: string; pincode: string; country: 'IN' };
export type CheckoutStatus = { reference: string; paymentStatus: string; fulfillmentStatus: string; totalPaise: number; expiresAt?: string; paymentTestOnly?: boolean };
export type CheckoutSession = CheckoutStatus & { checkoutToken: string; razorpayOrderId: string; keyId: string; currency: 'INR'; expiresAt: string; inputFingerprint?: string };

async function inputFingerprint(items: BagLine[], buyer: CheckoutBuyer, address: CheckoutAddress) {
  const bytes = new TextEncoder().encode(JSON.stringify({ items, buyer, address }));
  return [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(value => value.toString(16).padStart(2, '0')).join('');
}

export async function assertCheckoutSessionCurrent(session: CheckoutSession, items: BagLine[], buyer: CheckoutBuyer, address: CheckoutAddress, quotedTotalPaise: number) {
  if (Date.parse(session.expiresAt) <= Date.now()) throw new Error('This checkout expired. Review your bag and start again.');
  if (!session.inputFingerprint || session.inputFingerprint !== await inputFingerprint(items, buyer, address)) {
    throw new Error('Your bag, contact details or address changed after this checkout was prepared. Restore those details or wait for the previous checkout to expire before paying.');
  }
  if (session.totalPaise !== quotedTotalPaise) throw new Error('The current quote differs from the prepared checkout. Check the previous order before making another payment.');
}

function checkoutStatus(value: unknown): CheckoutStatus {
  const status = value as Partial<CheckoutStatus> | null;
  if (!status || !/^RP-W-[A-F0-9]{8}$/.test(status.reference ?? '') ||
      typeof status.paymentStatus !== 'string' || !status.paymentStatus ||
      typeof status.fulfillmentStatus !== 'string' || !status.fulfillmentStatus ||
      !Number.isSafeInteger(status.totalPaise) || (status.totalPaise ?? 0) <= 0) {
    throw new Error('The order status was invalid. Please contact the boutique before trying another payment.');
  }
  return status as CheckoutStatus;
}

function checkoutSession(value: unknown): CheckoutSession {
  const session = value as Partial<CheckoutSession> | null;
  checkoutStatus(value);
  if (!session || session.currency !== 'INR' || !/^[a-f0-9]{48}$/.test(session.checkoutToken ?? '') ||
      !/^order_[A-Za-z0-9]+$/.test(session.razorpayOrderId ?? '') ||
      !/^rzp_(live|test)_[A-Za-z0-9]+$/.test(session.keyId ?? '') ||
      typeof session.expiresAt !== 'string' || !Number.isFinite(Date.parse(session.expiresAt)) || Date.parse(session.expiresAt) <= Date.now()) {
    throw new Error('The payment session was invalid. Please return to your bag and try again.');
  }
  return session as CheckoutSession;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);
  try {
    const response = await fetch(`${apiBase}${path}`, { ...init, cache: 'no-store', signal: controller.signal });
    const body = await response.json().catch(() => null);
    if (!response.ok) throw Object.assign(new Error(typeof body?.error === 'string' ? body.error : 'Checkout could not be completed. Please try again.'), { status: response.status });
    return body as T;
  } catch (error) {
    if (controller.signal.aborted) throw new Error('Checkout timed out. Please check your order status before retrying.');
    throw error;
  } finally { clearTimeout(timeout); }
}

export async function createCheckoutSession(items: BagLine[], buyer: CheckoutBuyer, address: CheckoutAddress, requestId?: string) {
  const fingerprint = await inputFingerprint(items, buyer, address);
  if (!requestId) {
    let attempt = attempts.get(fingerprint);
    try {
      const saved = JSON.parse(sessionStorage.getItem(attemptStorageKey) || 'null');
      if (saved?.fingerprint === fingerprint && /^[a-zA-Z0-9-]{16,100}$/.test(saved.id) && Number.isFinite(saved.createdAt)) attempt = saved;
    } catch { /* Memory still protects retries when browser storage is unavailable. */ }
    if (!attempt || attempt.createdAt > Date.now()) attempt = { id: crypto.randomUUID(), createdAt: Date.now() };
    attempts.set(fingerprint, attempt);
    requestId = attempt.id;
    try { sessionStorage.setItem(attemptStorageKey, JSON.stringify({ fingerprint, ...attempt })); } catch {}
  }
  try {
    const result = await request<unknown>('/api/checkout/session', {
    method: 'POST', headers: { 'content-type': 'application/json', 'x-request-id': requestId },
    body: JSON.stringify({ items, buyer, address }),
    });
    return { ...checkoutSession(result), inputFingerprint: fingerprint };
  } catch (error) {
    // A known expired/cancelled order may start a fresh attempt on the next click.
    // An unknown outcome or preparation conflict must retain its original ID.
    if (error instanceof Error && 'status' in error && error.status === 409 && error.message === 'Checkout expired. Please start again.') {
      attempts.delete(fingerprint);
      try { sessionStorage.removeItem(attemptStorageKey); } catch {}
    }
    throw error;
  }
}

export async function verifyCheckout(session: CheckoutSession, payment: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
  if (payment.razorpay_order_id !== session.razorpayOrderId) throw new Error('The payment reference did not match this order. Please check its status before retrying.');
  const result = await request<unknown>('/api/checkout/verify', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ checkoutToken: session.checkoutToken, razorpayOrderId: payment.razorpay_order_id, razorpayPaymentId: payment.razorpay_payment_id, razorpaySignature: payment.razorpay_signature }),
  });
  return checkoutStatus(result);
}

// Razorpay may invoke its success handler more than once for the same payment.
// Keep a single verification request in flight; an uncertain result is reconciled
// through the saved checkout token instead of submitting the callback again.
export function reservePaymentCallback(handledPaymentIds: Set<string>, paymentId: string): boolean {
  if (!/^pay_[A-Za-z0-9]+$/.test(paymentId) || handledPaymentIds.has(paymentId)) return false;
  handledPaymentIds.add(paymentId);
  return true;
}

export async function getCheckoutStatus(token: string) {
  return checkoutStatus(await request<unknown>(`/api/checkout/status?token=${encodeURIComponent(token)}`));
}

declare global {
  interface Window {
    Razorpay?: new (options: {
      key: string; amount: number; currency: string; name: string; description: string; order_id: string;
      prefill: { name: string; email: string; contact: string }; handler: (payment: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void;
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
