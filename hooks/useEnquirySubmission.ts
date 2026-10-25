"use client";

import { useRef, useState } from "react";
import { postEnquiry, type EnquiryPayload } from "@/lib/enquiries";

export function useEnquirySubmission() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const pending = useRef<{ key: string; id: string } | null>(null);
  const inFlight = useRef(false);

  const submit = async (payload: EnquiryPayload) => {
    if (inFlight.current) return;
    inFlight.current = true;
    const key = JSON.stringify(payload);
    if (pending.current?.key !== key) pending.current = { key, id: crypto.randomUUID() };
    setSubmitting(true);
    setError("");
    try {
      const savedReference = await postEnquiry(payload, pending.current.id);
      setReference(savedReference);
      pending.current = null;
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Your enquiry could not be saved. Please retry.");
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  };

  const reset = () => { setError(""); setReference(""); pending.current = null; };
  return { submitting, error, reference, submit, reset };
}
