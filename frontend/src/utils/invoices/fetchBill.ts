import axios, { AxiosError } from "axios";
import { AuthStorage } from "@/utils/secureStorage";
import { refreshAccessToken } from "@/utils/auth/jwttokens";
import type { InvoiceFiles } from "@/types/InvoiceFile";

export const fetchBill = async (
  id: string | undefined,
  retry: boolean = true,
): Promise<InvoiceFiles> => {
  try {
    const accessToken = retry
      ? await AuthStorage.getAccessToken()
      : await refreshAccessToken();

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/storage/invoices/${id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    return data as InvoiceFiles;
  } catch (error) {
    if (error instanceof AxiosError) {
      const isAuthError =
        error.status === 403 ||
        error.status === 401 ||
        error.response?.data?.path === "auth middleware";

      if (isAuthError && retry) {
        return fetchBill(id, false);
      } else if (isAuthError) {
        throw new Error("Sitzung abgelaufen. Bitte melden Sie sich erneut an.");
      } else {
        throw new Error(
          "Rechnung konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
        );
      }
    }
    throw new Error("Ein unerwarteter Fehler ist aufgetreten.");
  }
};
