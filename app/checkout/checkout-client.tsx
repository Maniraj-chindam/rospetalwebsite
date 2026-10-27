'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, LockKeyhole, PackageCheck } from 'lucide-react';
import { useBoutique } from '@/context/BoutiqueContext';
import { quoteBag, type BagQuote } from '@/lib/checkout-quote';
import { assertCheckoutSessionCurrent, createCheckoutSession, getCheckoutStatus, loadRazorpayCheckout, reservePaymentCallback, verifyCheckout, type CheckoutAddress, type CheckoutBuyer, type CheckoutSession, type CheckoutStatus } from '@/lib/checkout';
import { fetchPosCatalog } from '@/lib/pos-catalog';
import { assessBagProducts, customerVisibleCatalog, isPaymentTestProduct } from '@/lib/product-readiness';
import type { ProductItem } from '@/data/boutique-data';

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });
const fieldClass = 'mt-1.5 w-full rounded-lg border border-rosepetal-border bg-white px-3 py-3 text-sm text-rosepetal-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine';
const initialBuyer: CheckoutBuyer = { name: '', email: '', phone: '' };
const initialAddress: CheckoutAddress = { line1: '', line2: '', city: '', state: '', pincode: '', country: 'IN' };

export default function CheckoutClient() {
  const { bag, clearBag } = useBoutique();
  const [buyer, setBuyer] = useState(initialBuyer);
  const [address, setAddress] = useState(initialAddress);
  const [quote, setQuote] = useState<BagQuote | null>(null);
  const [quoteError, setQuoteError] = useState('');
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteRetry, setQuoteRetry] = useState(0);
  const [catalog, setCatalog] = useState<ProductItem[]>([]);
  const [catalogState, setCatalogState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [outcome, setOutcome] = useState<CheckoutStatus | null>(null);
  const [recovering, setRecovering] = useState(true);
  const handledPaymentIds = useRef(new Set<string>());
  const paymentTestOnly = catalogState==='ready' && bag.length===1 && bag[0].qty===1 && catalog.some(p=>p.id===bag[0].productId&&isPaymentTestProduct(p));
  const pinReady = paymentTestOnly || /^[1-9][0-9]{5}$/.test(address.pincode);

  useEffect(() => {
    const controller = new AbortController();
    fetchPosCatalog(controller.signal).then(items => { setCatalog(customerVisibleCatalog(items)); setCatalogState('ready'); }).catch(() => {
      if (!controller.signal.aborted) setCatalogState('error');
    });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('rosepetal_checkout_token');
    if (!token) { setRecovering(false); return; }
    getCheckoutStatus(token).then(value => {
      if (['Paid', 'PaidReviewRequired'].includes(value.paymentStatus)) { setOutcome(value); clearBag(); sessionStorage.removeItem('rosepetal_checkout_token'); }
      else if (value.paymentStatus === 'AwaitingPayment' && value.expiresAt && Date.parse(value.expiresAt) > Date.now()) setOutcome({ ...value, paymentStatus: 'Processing' });
      else sessionStorage.removeItem('rosepetal_checkout_token');
    }).catch(() => {}).finally(() => setRecovering(false));
  }, [clearBag]);

  useEffect(() => {
    if (!bag.length || !pinReady || outcome) { setQuote(null); return; }
    const controller = new AbortController();
    setQuote(null); setQuoteError(''); setQuoteLoading(true);
    quoteBag(bag, paymentTestOnly ? undefined : address.pincode, controller.signal).then(setQuote).catch(reason => {
      if (!controller.signal.aborted) setQuoteError(reason instanceof Error ? reason.message : 'Could not check the bag.');
    }).finally(() => { if (!controller.signal.aborted) setQuoteLoading(false); });
    return () => controller.abort();
  }, [bag, address.pincode, pinReady, paymentTestOnly, quoteRetry, outcome]);

  useEffect(() => {
    if (!quote) return;
    const delay = Math.max(1000, Date.parse(quote.expiresAt) - Date.now());
    const timer = window.setTimeout(() => setQuoteRetry(value => value + 1), delay);
    return () => window.clearTimeout(timer);
  }, [quote]);

  useEffect(() => {
    if (outcome?.paymentStatus !== 'Processing') return;
    const token = sessionStorage.getItem('rosepetal_checkout_token');
    if (!token) return;
    const timer = window.setInterval(() => {
      getCheckoutStatus(token).then(value => {
        if (['Paid', 'PaidReviewRequired'].includes(value.paymentStatus)) { setOutcome(value); clearBag(); sessionStorage.removeItem('rosepetal_checkout_token'); }
        else if (['Expired', 'Cancelled'].includes(value.paymentStatus) || value.expiresAt && Date.parse(value.expiresAt) <= Date.now()) { setOutcome(null); sessionStorage.removeItem('rosepetal_checkout_token'); setError('The previous checkout expired. Review your bag and start again.'); }
      }).catch(() => {});
    }, 5000);
    return () => window.clearInterval(timer);
  }, [outcome?.paymentStatus, clearBag]);

  const itemCount = useMemo(() => bag.reduce((sum, item) => sum + item.qty, 0), [bag]);
  const productsReady = catalogState === 'ready' && assessBagProducts(bag, catalog).ready;
  const ready = !!quote?.checkoutAvailable && !!quote.totalPaise && !quoteLoading && productsReady;

  async function pay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || !pinReady || !bag.length || busy) return;
    setError(''); setBusy(true);
    try {
      let current = session;
      if (!current || Date.parse(current.expiresAt) <= Date.now()) {
        current = await createCheckoutSession(bag, buyer, address);
        setSession(current);
        sessionStorage.setItem('rosepetal_checkout_token', current.checkoutToken);
        if (current.totalPaise !== quote.totalPaise) {
          setError(`The final total changed to ${currency.format(current.totalPaise / 100)}. Review it and press Pay again.`);
          setBusy(false);
          return;
        }
      }
      await assertCheckoutSessionCurrent(current, bag, buyer, address, quote.totalPaise!);
      await loadRazorpayCheckout();
      const Razorpay = window.Razorpay;
      if (!Razorpay) throw new Error('Secure payment could not load.');
      const activeSession = current;
      let callbackStarted = false;
      let paymentFailed = false;
      const checkout = new Razorpay({
        key: current.keyId, amount: current.totalPaise, currency: 'INR', name: 'Rosepetal Boutique',
        description: current.paymentTestOnly ? `₹1 payment test — no shipment · ${current.reference}` : `${itemCount} ${itemCount === 1 ? 'piece' : 'pieces'} · ${current.reference}`,
        order_id: current.razorpayOrderId, prefill: { name: buyer.name, email: buyer.email, contact: buyer.phone },
        theme: { color: '#702039' },
        modal: { ondismiss: () => { if (callbackStarted) return; if (!paymentFailed) setError('Payment window closed without confirmation. Check this order’s status before trying again.'); setBusy(false); } },
        handler: payment => {
          if (!reservePaymentCallback(handledPaymentIds.current, payment.razorpay_payment_id)) return;
          callbackStarted = true;
          setBusy(true);
          verifyCheckout(activeSession, payment).then(value => {
            setOutcome(value);
            if (['Paid', 'PaidReviewRequired'].includes(value.paymentStatus)) { clearBag(); sessionStorage.removeItem('rosepetal_checkout_token'); }
          }).catch(() => {
            setOutcome({ reference: activeSession.reference, totalPaise: activeSession.totalPaise, paymentTestOnly:activeSession.paymentTestOnly, paymentStatus: 'Processing', fulfillmentStatus: 'On hold' });
            setError('Payment was submitted. We are checking its final status; please do not pay again.');
          }).finally(() => setBusy(false));
        },
      });
      checkout.on('payment.failed', () => { paymentFailed = true; setError('Payment did not complete. You can try again with the same order.'); setBusy(false); });
      checkout.open();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Payment could not start. Please try again.');
      setBusy(false);
    }
  }

  if (recovering) return <main className="min-h-[70dvh] bg-rosepetal-deep-pink px-5 pt-32 text-center text-white" role="status">Checking your order…</main>;
  if (outcome) return <main className="min-h-[70dvh] bg-rosepetal-deep-pink px-4 pb-20 pt-32 sm:px-6"><div className="mx-auto max-w-2xl rounded-2xl bg-[#fff9f7] p-7 text-center text-rosepetal-text shadow-xl sm:p-12"><PackageCheck className="mx-auto size-10 text-rosepetal-wine" /><h1 className="mt-5 font-serif-luxury text-4xl">{outcome.paymentTestOnly && outcome.paymentStatus==='Paid' ? 'Test payment confirmed' : outcome.paymentStatus === 'Paid' ? 'Your order is confirmed' : outcome.paymentStatus === 'PaidReviewRequired' ? 'Payment received' : 'Payment is being checked'}</h1><p className="mt-4 text-sm leading-7 text-rosepetal-muted">{outcome.paymentTestOnly ? 'This was a ₹1 payment test. No physical delivery or shipment will be created.' : outcome.paymentStatus === 'Paid' ? outcome.fulfillmentStatus === 'Delivery paused' ? 'Your pieces are reserved. Delivery is paused; the boutique will contact you before dispatch.' : 'Your pieces are reserved. The boutique will prepare your order for dispatch.' : outcome.paymentStatus === 'PaidReviewRequired' ? 'The boutique needs to review stock before dispatch and will contact you.' : 'Please do not make another payment while we confirm this one. You can safely return to this page to check its status.'}</p><p className="mt-6 font-semibold text-rosepetal-wine">Reference {outcome.reference}</p><Link href="/collections" className="mt-8 inline-block rounded-full bg-rosepetal-wine px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white">Return to the collection</Link></div></main>;

  return <main className="min-h-[70dvh] bg-rosepetal-deep-pink px-4 pb-20 pt-28 text-rosepetal-text sm:px-6 sm:pt-32"><div className="mx-auto max-w-6xl"><Link href="/bag" className="inline-flex items-center gap-2 text-sm text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><ArrowLeft className="size-4" /> Back to your bag</Link><div className="my-7 border-b border-white/25 pb-6 text-white"><p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-rose-100">THE ROSEPETAL EDIT</p><h1 className="mt-2 font-serif-luxury text-4xl sm:text-5xl">Secure checkout</h1><p className="mt-3 max-w-xl text-sm leading-6 text-rose-100">{paymentTestOnly ? '₹1 Razorpay payment test only. Enter your contact and address details, then continue to Razorpay. No delivery charge or physical shipment. With live payment credentials, completing payment charges ₹1.' : 'Review your details and total. The delivery fee is ₹0 for now; courier dispatch is paused until the boutique resumes delivery.'}</p></div>
    {!bag.length ? <div className="rounded-2xl bg-[#fff9f7] p-8 text-center shadow-xl"><p>Your bag is empty.</p><Link href="/collections" className="mt-4 inline-block font-semibold text-rosepetal-wine underline">Explore the collection</Link></div> :
    <form onSubmit={pay} className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_350px]"><div className="space-y-6"><section className="rounded-2xl bg-[#fff9f7] p-6 shadow-xl sm:p-8"><div className="mb-5 flex items-baseline justify-between gap-3 border-b border-rosepetal-border pb-4"><h2 className="font-serif-luxury text-2xl">Your details</h2><span className="text-xs text-rosepetal-muted">{paymentTestOnly ? 'Payment test' : '01 / 02'}</span></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold text-rosepetal-wine sm:col-span-2">Full name<input required autoComplete="name" maxLength={100} value={buyer.name} onChange={event => { setBuyer({ ...buyer, name: event.target.value }); }} className={fieldClass}/></label><label className="text-xs font-semibold text-rosepetal-wine">Email<input required type="email" autoComplete="email" maxLength={254} value={buyer.email} onChange={event => { setBuyer({ ...buyer, email: event.target.value }); }} className={fieldClass}/></label><label className="text-xs font-semibold text-rosepetal-wine">Mobile number<input required type="tel" autoComplete="tel" inputMode="tel" pattern="[+0-9 ()-]{8,20}" value={buyer.phone} onChange={event => { setBuyer({ ...buyer, phone: event.target.value }); }} className={fieldClass}/></label></div></section><section className="rounded-2xl bg-[#fff9f7] p-6 shadow-xl sm:p-8"><div className="mb-5 flex items-baseline justify-between gap-3 border-b border-rosepetal-border pb-4"><h2 className="font-serif-luxury text-2xl">Delivery address</h2><span className="text-xs text-rosepetal-muted">02 / 02</span></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold text-rosepetal-wine sm:col-span-2">Address line 1<input required autoComplete="address-line1" maxLength={160} value={address.line1} onChange={event => { setAddress({ ...address, line1: event.target.value }); }} className={fieldClass}/></label><label className="text-xs font-semibold text-rosepetal-wine sm:col-span-2">Address line 2 (optional)<input autoComplete="address-line2" maxLength={160} value={address.line2} onChange={event => { setAddress({ ...address, line2: event.target.value }); }} className={fieldClass}/></label><label className="text-xs font-semibold text-rosepetal-wine">City<input required autoComplete="address-level2" maxLength={80} value={address.city} onChange={event => { setAddress({ ...address, city: event.target.value }); }} className={fieldClass}/></label><label className="text-xs font-semibold text-rosepetal-wine">State<input required autoComplete="address-level1" maxLength={80} value={address.state} onChange={event => { setAddress({ ...address, state: event.target.value }); }} className={fieldClass}/></label><label className="text-xs font-semibold text-rosepetal-wine">Indian PIN code<input required inputMode="numeric" autoComplete="postal-code" pattern="[1-9][0-9]{5}" maxLength={6} value={address.pincode} onChange={event => { setAddress({ ...address, pincode: event.target.value.replace(/\D/g, '').slice(0, 6) }); }} className={fieldClass}/></label></div></section></div><aside className="rounded-2xl bg-[#fff9f7] p-6 shadow-xl lg:sticky lg:top-28"><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rosepetal-wine">ORDER SUMMARY</p><h2 className="mt-2 font-serif-luxury text-2xl">Your chosen pieces</h2><p className="mt-2 text-sm text-rosepetal-muted">{itemCount} {itemCount === 1 ? 'piece' : 'pieces'} · {paymentTestOnly ? 'payment test — no shipment' : 'delivery within India'}</p>{quoteLoading && <p role="status" className="mt-6 text-sm">Checking prices and delivery…</p>}{quoteError && <p role="alert" className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-800">{quoteError} <button type="button" onClick={() => setQuoteRetry(value => value + 1)} className="font-semibold underline">Retry</button></p>}{!pinReady && <p className="mt-6 text-sm text-rosepetal-muted">Enter a valid PIN code to confirm your order total.</p>}{catalogState === 'error' && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">The live product details could not be checked. Return to your bag and try again.</p>}{catalogState === 'ready' && !productsReady && <p role="status" className="mt-4 rounded-lg bg-rosepetal-card p-3 text-sm text-rosepetal-muted">A piece in your bag is unavailable for checkout or out of stock. Please return to your bag.</p>}{quote && <><dl className="mt-6 space-y-3 border-y border-rosepetal-border py-4 text-sm"><div className="flex justify-between gap-3"><dt>Pieces</dt><dd>{currency.format(quote.subtotalPaise / 100)}</dd></div><div className="flex justify-between gap-3"><dt>{paymentTestOnly ? 'Delivery (not required)' : 'Delivery'}</dt><dd>{quote.shippingPaise === null ? 'Unavailable' : currency.format(quote.shippingPaise / 100)}</dd></div></dl><div className="mt-4 flex justify-between gap-3 font-serif-luxury text-xl"><span>Total</span><strong>{quote.totalPaise === null ? 'Pending' : currency.format(quote.totalPaise / 100)}</strong></div>{quote.deliveryStatus === 'paused' && <p role="status" className="mt-3 text-xs leading-5 text-rosepetal-muted">Delivery fee is waived. No shipment or pickup will be booked while delivery is paused. The boutique will contact you before dispatch.</p>}{quote.deliveryQuote && <p className="mt-3 text-xs leading-5 text-rosepetal-muted">Courier estimate via {quote.deliveryQuote.courierName}. Final total is checked again before payment.</p>}{!quote.checkoutAvailable && <p role="status" className="mt-4 rounded-lg bg-rosepetal-card p-3 text-sm text-rosepetal-muted">{quote.deliveryStatus === 'packaging_required' ? 'Packed measurements are missing for a piece.' : quote.deliveryStatus === 'unserviceable' ? 'This PIN code is not currently serviceable.' : quote.reason || 'Checkout is unavailable right now.'}</p>}</>}{error && <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}<button type="submit" disabled={!ready || busy} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-rosepetal-wine px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-rosepetal-wineHover disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine"><LockKeyhole className="size-4" />{busy ? 'Preparing payment…' : paymentTestOnly ? 'Pay ₹1 with Razorpay' : 'Pay with Razorpay'}</button><p className="mt-3 text-center text-xs leading-5 text-rosepetal-muted">{paymentTestOnly ? 'Only the ₹1 test item can be paid for. A successful payment is confirmed after capture; no shipment is created.' : 'Payment opens in Razorpay’s secure checkout when the order total is confirmed. Your order is confirmed after payment is captured.'}</p></aside></form>}
  </div></main>;
}
