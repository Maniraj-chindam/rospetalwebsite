import type { Metadata } from "next";
import CustomerInfoPage from "@/components/CustomerInfoPage";

export const metadata: Metadata = { title: "Delivery | Rosepetal Designer Boutique", description: "Delivery information for Rosepetal orders within India.", alternates: { canonical: "/shipping" } };

export default function ShippingPage() {
  return <CustomerInfoPage eyebrow="Customer information" title="Delivery" intro="The delivery fee is ₹0 for now. Rosepetal is accepting prepaid orders within India, but courier dispatch is paused until the boutique resumes delivery." sections={[
    { heading: "At checkout", text: "Enter your six-digit India PIN code and address. The order summary shows the exact item total and a ₹0 delivery fee before Razorpay opens. The boutique checks stock and the payable total again before payment." },
    { heading: "Dispatch is paused", text: "A paid order will be recorded and its stock reserved, but no courier shipment or pickup is booked while delivery is paused. The boutique will contact you about dispatch when delivery resumes." },
    { heading: "Questions about an order", text: "Contact the boutique with your order reference for help with a piece or delivery destination." },
  ]} />;
}
