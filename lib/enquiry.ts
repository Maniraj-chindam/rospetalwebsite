export interface EnquiryPayload {
  type: "contact" | "consultation" | "piece";
  name: string;
  email: string;
  phone?: string;
  message: string;
  piece?: string;
  preferredDate?: string;
}

export async function sendEnquiry(payload: EnquiryPayload): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;
  if (!endpoint) {
    throw new Error("Online enquiries are temporarily unavailable. Please try again later.");
  }
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("We could not connect to the enquiry service. Please call the boutique or try again later.");
  }
  if (!response.ok) {
    let message = "Your enquiry could not be sent. Please try again.";
    try {
      const body = await response.json();
      if (typeof body?.error === "string") message = body.error;
    } catch { /* use safe default */ }
    throw new Error(message);
  }
}
