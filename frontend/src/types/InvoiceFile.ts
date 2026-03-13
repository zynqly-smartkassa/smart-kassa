/**
 * Used to identify attributes to show of in the invoices section. Information like size of the
 * File (Bill) and when it was modified etc.
 * @author Casper Zielinski
 */
export interface InvoiceFiles {
  billingData?: {
    billing_id: string;
    amount_gross: string;
    amount_net: string;
    amount_tax: string;
    payment_method: string;
    tax_rate: string;
    tip_amount: string;
    ride_id: string;
  };
  driverData?: {
    email: string;
    name: string;
    phonenumber: string;
  };
  key: string | undefined;
  size: number | undefined;
  lastModified: Date | undefined;
  url: string | null;
  downloadUrl: string | null;
}
