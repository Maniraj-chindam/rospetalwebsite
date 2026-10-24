import type { Metadata } from "next";
import CustomerInfoPage from "@/components/CustomerInfoPage";

export const metadata: Metadata = { title: "Order information | Rosepetal Designer Boutique", description: "Important information before placing a Rosepetal website order." };

export default function TermsPage() {
  return <CustomerInfoPage eyebrow="Customer information" title="Before placing an order" intro="The boutique is completing the terms for website purchases. Confirm any product-specific conditions, especially for custom work, before payment." sections={[
    { heading: "Products and availability", text: "The live catalog is supplied by the boutique's POS. A piece remains available for enquiry while its information or colour photos are being confirmed. Prices, stock and delivery charges are checked again during checkout." },
    { heading: "Order confirmation", text: "An item in your bag is not a confirmed order. A paid order is confirmed only after the payment service reports that payment was captured; the website then provides an order reference." },
    { heading: "Custom designs", text: "A consultation request does not create an order. Design, fabric, fit, timing, price and any applicable conditions must be agreed with the boutique separately." },
  ]} />;
}
