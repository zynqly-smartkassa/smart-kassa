import axios, { AxiosError } from "axios";
import { AuthStorage } from "@/utils/secureStorage";
import { refreshAccessToken } from "@/utils/auth/jwttokens";
import type { InvoiceFiles } from "@/types/InvoiceFile";

export type SendBillParams = {
  rideId: string | undefined;
  rideType: string;
  ridePrice: number;
  tip: number;
  paymentMethod: string;
};

export const sendBill = async (
  params: SendBillParams,
  retry: boolean = true,
): Promise<InvoiceFiles> => {
  const { rideId, rideType, ridePrice, tip, paymentMethod } = params;
  const taxRate = rideType === "Taxifahrt" ? 0.1 : 0.2;
  const gross = ridePrice + tip;
  const net = gross / (1 + taxRate);
  const tax = gross - net;

  const billingData = {
    ride_id: rideId,
    amount_net: parseFloat(net.toFixed(2)),
    tax_rate: taxRate,
    amount_tax: parseFloat(tax.toFixed(2)),
    amount_gross: parseFloat(gross.toFixed(2)),
    payment_method: paymentMethod,
    tip_amount: tip,
  };

  try {
    const accessToken = retry
      ? await AuthStorage.getAccessToken()
      : await refreshAccessToken();

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/invoice`,
      billingData,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    return data.files as InvoiceFiles;
  } catch (error) {
    if (error instanceof AxiosError) {
      const isAuthError =
        error.status === 403 ||
        error.status === 401 ||
        error.response?.data?.path === "auth middleware";

      if (isAuthError && retry) {
        return sendBill(params, false);
      } else if (isAuthError && !retry) {
        console.error(error);
        throw new Error("Sitzung abgelaufen. Bitte melden Sie sich erneut an.");
      } else if (error.status === 409) {
        throw new Error("Diese Rechnung existiert bereits.");
      } else {
        console.error(error);
        throw new Error(
          "Ressourcen konnten nicht geladen werden, überprüfen Sie Ihre Internetverbindung.",
        );
      }
    }
    console.error(error);
    throw new Error("Ein unerwarteter Fehler ist aufgetreten.");
  }
};
