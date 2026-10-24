import type { Metadata } from "next";
import CustomerInfoPage from "@/components/CustomerInfoPage";

export const metadata: Metadata = { title: "Privacy | Rosepetal Designer Boutique", description: "How Rosepetal uses information sent through its website.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <CustomerInfoPage eyebrow="Customer information" title="Privacy" intro="This page explains the information used by the website's current enquiry and shopping features. Contact the boutique if you need more detail before submitting." sections={[
    { heading: "Enquiries", text: "Contact forms collect your name, email and message. Consultation requests may also include a phone number, occasion, preferred date and design notes. The website sends these details to the boutique's enquiry service so the team can respond. A reference appears only after the service confirms the enquiry was saved." },
    { heading: "Bag and wishlist", text: "The website saves your bag and wishlist in this browser so they remain available when you return on the same device. You can remove pieces from either list at any time." },
    { heading: "Payments and delivery", text: "When online checkout is available, the website passes the order and delivery details needed to process payment and shipment to its checkout service. Razorpay provides the payment interface; the website does not ask you to enter card details into a Rosepetal form." },
    { heading: "Questions about your information", text: "Contact the boutique using the email below to ask about information you submitted or to request a correction." },
  ]} />;
}
