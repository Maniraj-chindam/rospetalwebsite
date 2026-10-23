export type EnquiryPayload = {
  kind: "contact" | "consultation";
  name: string;
  email: string;
  phone?: string;
  message: string;
  occasion?: string;
  preferredDate?: string;
};

const apiBase = (process.env.NEXT_PUBLIC_POS_API_BASE_URL || "https://gpu272zv2g.execute-api.ap-south-1.amazonaws.com").replace(/\/$/, "");

export async function postEnquiry(payload: EnquiryPayload, requestId: string): Promise<string> {
  let response: Response;
  try {
    response = await fetch(`${apiBase}/api/enquiries`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-request-id": requestId },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    throw new Error("We could not confirm that your enquiry was saved. Please retry, or call the boutique.");
  }
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(response.status === 429
      ? "Too many enquiries were submitted from this connection. Please try again later or call the boutique."
      : typeof body.error === "string" && response.status < 500
        ? body.error
        : "Your enquiry could not be saved. Please retry, or call the boutique.");
  }
  if (typeof body.reference !== "string" || !/^RP-E-[A-F0-9]{8}$/.test(body.reference)) {
    throw new Error("We could not confirm that your enquiry was saved. Please retry, or call the boutique.");
  }
  return body.reference;
}
