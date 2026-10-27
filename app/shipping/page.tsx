import type { Metadata } from "next";
import CustomerInfoPage from "@/components/CustomerInfoPage";

export const metadata: Metadata = { title: "Delivery | Rosepetal Designer Boutique", description: "Delivery information for Rosepetal orders within India.", alternates: { canonical: "/shipping" } };

export default function ShippingPage() {
  return <CustomerInfoPage eyebrow="Customer information" title="Delivery" intro="Delivery is free for now on prepaid website orders within India. After payment is confirmed, the boutique creates a Shiprocket order and arranges dispatch." sections={[
    { heading: "At checkout", text: "Enter your six-digit India PIN code and address. The order summary shows the exact item total and a ₹0 delivery fee before Razorpay opens. The boutique checks stock and the payable total again before payment." },
    { heading: "Dispatch and tracking", text: "A captured payment saves the order in POS and reserves stock. The boutique creates a Shiprocket order, then confirms the courier, AWB and pickup after the parcel is ready. We will update you when tracking is available." },
    { heading: "Questions about an order", text: "Contact the boutique with your order reference for help with a piece or delivery destination." },
  ]} />;
}
