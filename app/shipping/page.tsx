import type { Metadata } from "next";
import CustomerInfoPage from "@/components/CustomerInfoPage";

export const metadata: Metadata = { title: "Delivery | Rosepetal Designer Boutique", description: "Delivery information for Rosepetal orders within India.", alternates: { canonical: "/shipping" } };

export default function ShippingPage() {
  return <CustomerInfoPage eyebrow="Customer information" title="Delivery" intro="Rosepetal currently prepares website checkout for prepaid orders within India. A delivery charge must be available before you can pay." sections={[
    { heading: "Delivery estimate", text: "Enter a six-digit India PIN code in your bag or at checkout. When the piece has confirmed packed measurements and a courier serves the destination, the site shows a live Shiprocket estimate and checks the final total again before payment." },
    { heading: "When an estimate is unavailable", text: "Checkout stays unavailable if packed measurements, a courier quote, or another required order detail is missing. Contact the boutique for help with a particular piece or destination." },
    { heading: "Dispatch and tracking", text: "The boutique confirms preparation and dispatch details for an accepted order. A courier estimate is not a guaranteed delivery date." },
  ]} />;
}
