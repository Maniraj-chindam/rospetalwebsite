import type { Metadata } from "next";
import CustomerInfoPage from "@/components/CustomerInfoPage";

export const metadata: Metadata = { title: "Returns & refunds | Rosepetal Designer Boutique", description: "Return, exchange, cancellation and refund conditions for Rosepetal website orders.", alternates: { canonical: "/returns" } };

export default function ReturnsPage() {
  return <CustomerInfoPage eyebrow="Customer information" title="Returns, exchanges and refunds" intro="These conditions apply to pieces bought through the Rosepetal website. Contact us with your order reference before sending anything back so we can confirm the return method and address." sections={[
    { heading: "Ready-to-wear pieces", text: "You may request a return or size exchange within 7 calendar days after delivery. For a change of mind or fit issue, the piece must be unused, unwashed, unaltered and returned with its original tags. Exchanges depend on available stock. If the requested size is unavailable, you may choose a refund instead." },
    { heading: "Custom and altered pieces", text: "A made-to-measure, personalised or altered piece cannot be returned for a change of mind or fit preference after work has started. This does not affect your rights if the piece is defective, damaged, incorrect or materially different from what was agreed." },
    { heading: "Wrong, damaged or defective pieces", text: "Contact us as soon as you discover the issue, preferably within 7 days after delivery, with your order reference, a description and clear photos. We will review the issue and arrange an appropriate replacement, exchange or refund. The 7-day request period does not limit rights that apply under law." },
    { heading: "Return delivery cost", text: "For an approved change-of-mind or fit return, you pay the return courier cost. If we sent the wrong piece or the piece is damaged, defective or materially not as described, we will arrange collection or cover reasonable return shipping. Please do not send a parcel before we confirm the method." },
    { heading: "Cancellation before dispatch", text: "Contact us promptly if you need to cancel. If the order has not been dispatched, we will cancel it and refund the amount paid. Once dispatched, the applicable return conditions above apply. A prebook enquiry that has not reached payment is not a purchase and can be withdrawn by contacting us." },
    { heading: "Refund timing", text: "After we approve a cancellation or inspect and approve a returned piece, we will initiate the refund to the original payment method within 7 business days. Your bank or payment provider may take additional time to show the credit. We will provide the refund reference when available." },
    { heading: "How to ask for help", text: "Email us with the website order reference, the piece name, the reason for your request and photos if there is an issue. We will explain the next step and keep the request linked to your order." },
    { heading: "Your statutory rights", text: "Nothing on this page removes or reduces rights available to you under applicable consumer law." },
  ]} />;
}
