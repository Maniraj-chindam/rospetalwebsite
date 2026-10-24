import type { Metadata } from "next";
import CustomerInfoPage from "@/components/CustomerInfoPage";

export const metadata: Metadata = { title: "Returns | Rosepetal Designer Boutique", description: "How to ask Rosepetal about a return, alteration or order issue." };

export default function ReturnsPage() {
  return <CustomerInfoPage eyebrow="Customer information" title="Returns and order issues" intro="Return, exchange and alteration conditions for specific pieces have not yet been published. Please ask the boutique for the applicable terms before paying; this page does not promise that every piece can be returned." sections={[
    { heading: "Before you order", text: "Ask about the exact piece, size, colour and any custom work. The boutique can confirm the terms that apply to it before you decide." },
    { heading: "If there is a problem", text: "Contact the boutique promptly with your order reference, a description of the issue and relevant photos. The team will review the case and explain the available next step." },
    { heading: "Your rights", text: "This information does not limit any rights that apply under law." },
  ]} />;
}
