import type { Dispatch, RefObject, SetStateAction } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { AuthStorage } from "@/utils/secureStorage";
import { refreshAccessToken } from "@/utils/auth/jwttokens";
import type { InvoiceFiles } from "@/types/InvoiceFile";

export const fetchBills = async (
  retryRef: RefObject<boolean>,
  setFiles: Dispatch<SetStateAction<InvoiceFiles[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setToken: Dispatch<SetStateAction<string[]>>,
  index: number,
  tokenLength: number,
  token?: string,
): Promise<void> => {
  setLoading(true);
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
        params: {
          token: token,
          limit: 10,
        },
      },
    );

    setFiles(data.files);
    if (index - 1 === tokenLength && data.nextContinuationToken) {
      setToken((prev) => [...prev, data.nextContinuationToken]);
    }
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
          setToken,
          index,
          tokenLength,
          token,
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
