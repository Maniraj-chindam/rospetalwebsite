"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useBoutique } from "@/context/BoutiqueContext";
import { readPaymentStatus } from "@/lib/checkout";

function PaymentResult() {
  const params = useSearchParams();
  const token = params.get("token");
  const { clearBag } = useBoutique();
  const [status, setStatus] = useState<"checking" | "paid" | "pending" | "failed" | "error">("checking");
  const [error, setError] = useState("");

  const check = useCallback(async () => {
    if (!token) { setStatus("error"); setError("The payment reference is missing. Please contact the boutique before paying again."); return; }
    setStatus("checking");
    setError("");
    try {
      const result = await readPaymentStatus(token);
      setStatus(result);
      if (result === "paid") clearBag();
    } catch (cause) { setStatus("error"); setError(cause instanceof Error ? cause.message : "Payment status could not be checked."); }
  }, [token, clearBag]);

  useEffect(() => { void check(); }, [check]);

  return <div className="mx-auto max-w-xl rounded-2xl border border-rosepetal-border bg-[#FFF9F7] p-7 text-center shadow-xl sm:p-10" role="status">
    {status === "checking" && <><h1 className="font-serif-luxury text-3xl text-rosepetal-text">Checking your payment</h1><p className="mt-3 text-sm text-rosepetal-muted">Please wait while we confirm this with the payment service.</p></>}
    {status === "paid" && <><h1 className="font-serif-luxury text-3xl text-rosepetal-text">Payment confirmed</h1><p className="mt-3 text-sm text-rosepetal-muted">Your order has been paid. Keep the confirmation from the payment provider for your records.</p><Link href="/" className="mt-6 inline-block text-sm font-semibold text-rosepetal-wine underline underline-offset-4">Return home</Link></>}
    {status === "pending" && <><h1 className="font-serif-luxury text-3xl text-rosepetal-text">Payment is being confirmed</h1><p className="mt-3 text-sm text-rosepetal-muted">Please do not pay again until this check completes.</p><button type="button" onClick={() => void check()} className="mt-6 min-h-11 rounded-lg bg-rosepetal-wine px-5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosepetal-wine">Check again</button></>}
    {status === "failed" && <><h1 className="font-serif-luxury text-3xl text-rosepetal-text">Payment was not completed</h1><p className="mt-3 text-sm text-rosepetal-muted">Your bag is still saved. You can return to checkout when ready.</p><Link href="/checkout" className="mt-6 inline-block text-sm font-semibold text-rosepetal-wine underline underline-offset-4">Return to checkout</Link></>}
    {status === "error" && <><h1 className="font-serif-luxury text-3xl text-rosepetal-text">We could not confirm your payment</h1><p className="mt-3 text-sm text-rosepetal-muted">{error}</p><Link href="/contact" className="mt-6 inline-block text-sm font-semibold text-rosepetal-wine underline underline-offset-4">Contact the boutique</Link></>}
  </div>;
}

export default function CheckoutReturnPage() {
  return <div className="mx-auto px-4 py-20"><Suspense fallback={<p className="text-center text-white">Checking payment…</p>}><PaymentResult /></Suspense></div>;
}
