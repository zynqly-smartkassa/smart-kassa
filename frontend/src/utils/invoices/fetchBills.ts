import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { AuthStorage } from "@/utils/secureStorage";
import { refreshAccessToken } from "@/utils/auth/jwttokens";
import type { InvoiceFiles } from "@/types/InvoiceFile";

export const fetchBills = async (
  retryRef: MutableRefObject<boolean>,
  setFiles: Dispatch<SetStateAction<InvoiceFiles[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
): Promise<void> => {
  try {
    let accessToken: string | null;
    if (retryRef.current) {
      accessToken = await AuthStorage.getAccessToken();
    } else {
      accessToken = await refreshAccessToken();
    }

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/list-blobs/invoices`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    setFiles(data.files);
    setLoading(false);
    retryRef.current = true;
  } catch (error) {
    setLoading(false);
    if (error instanceof AxiosError) {
      const isAuthError =
        error.status === 403 ||
        error.status === 401 ||
        error.response?.data?.path === "auth middleware";

      if (isAuthError && retryRef.current) {
        retryRef.current = false;
        return await fetchBills(
          retryRef,
          setFiles,
          setLoading,
        );
      } else if (isAuthError && !retryRef.current) {
        toast.error("Sitzung abgelaufen. Bitte melden Sie sich erneut an.");
      } else {
        toast.error(
          "Rechnungen konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
        );
      }
    } else {
      toast.error("Ein unerwarteter Fehler ist aufgetreten.");
    }
  }
};
