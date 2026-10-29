# Website purchase policies — owner-approved wording

Prepared and approved by the boutique owner on 29 October 2026. The owner approved publication of the return and purchase conditions below and asked the website to use the current boutique name and email for customer support for now. The customer-facing wording is in `app/returns/page.tsx` and `app/terms/page.tsx`.

## Approved conditions

1. Ready-to-wear pieces: customers may request a return or size exchange within **7 calendar days of delivery**. Change-of-mind or fit returns require the piece to be unused, unwashed, unaltered and tagged. If an exchange size is unavailable, the customer may choose a refund.
2. Custom, personalised or altered pieces: no change-of-mind return after work starts. Defective, damaged, incorrect or materially misdescribed goods remain eligible for applicable remedies.
3. Return postage: customer pays for an approved change-of-mind or fit return. Rosepetal arranges or covers reasonable return shipping for a wrong, damaged, defective or materially misdescribed piece.
4. Cancellation: a customer may request cancellation before dispatch and receive a full refund. Once dispatched, the return conditions apply.
5. Refund timing: Rosepetal initiates an approved refund to the original payment method within **7 business days** after cancellation approval or inspection and approval of a returned piece. The payment provider may take longer to post it.
6. Prebook enquiries without payment do not reserve stock. A paid prebook follows a confirmed checkout total and product-specific delivery arrangement.

Existing statutory consumer rights remain unaffected.

## Business details still to confirm

- Confirm whether the legal seller name is exactly Rosepetal Designer Boutique and provide its public business address.
- Provide a named grievance officer or role and a fuller complaint-handling procedure if required for the boutique.
- Review any product-specific exceptions and disclose them beside the affected product before sale.

For now, the owner chose the current Rosepetal Designer Boutique name and `rosepetalfashionstudio@gmail.com` as the public contact. The current site also supplies the boutique phone through `data/boutique-data.ts`. The outstanding identity and grievance details should be added after the owner confirms them.

## Website implementation

- `app/returns/page.tsx`: return, exchange, cancellation, postage and refund conditions.
- `app/terms/page.tsx`: purchase, payment, fulfilment, prebook and support terms.
- `app/checkout/checkout-client.tsx`: direct links to Returns, Delivery and Terms beside the Pay button.

The Government of India's [Consumer Protection (E-Commerce) Rules, 2020](https://consumeraffairs.nic.in/sites/default/files/E%20commerce%20rules_0.pdf) call for accurate, clear information about returns, refunds, exchange, delivery, payment and grievance redress. Owner approval of this wording is not a legal-compliance sign-off; the business details above still need confirmation.
