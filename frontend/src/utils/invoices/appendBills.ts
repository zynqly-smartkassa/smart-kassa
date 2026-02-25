import type { InvoiceFiles } from "@/types/InvoiceFile";
import axios, { AxiosError } from "axios";
import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { appendBillState } from "../../../redux/slices/invoices";
import { refreshAccessToken } from "../auth/jwttokens";
import { AuthStorage } from "../secureStorage";
import type { AppDispatch } from "../../../redux/store";

/**
 * Function used to append a Bill and create a Bill with the billing id
 * @warning this function creates a Bill with the Data used in the Billing table and it's corresponding billing_id,
 * if a data row with that billing id does not exist, the whole api request will fail
 * @param dispatch to set the global state of the Bills
 * @param billing_id to create a pdf bill depending on the billing data in the billing table
 * @param setFiles a optional hook that is used to set the files via a useState Hook
 *
 * If you want to access the bills, use the state of the invoices (or if you used the setFiles Hook, it's state) to
 * access the file(s), the files are of the type file from the types folder in the InvoiceFile.ts file
 * @package types
 */
export const appendNewBill = (
  dispatch: AppDispatch,
  billing_id: string | number,
  setFiles?: Dispatch<SetStateAction<InvoiceFiles[]>>,
) => {
  toast.promise(appendNewBillController(true, dispatch, billing_id, setFiles), {
    success: "Rechnung manuell hinzugefügt",
    error: "Ein unerwarteter Fehler ist aufgetreten.",
    loading: "Rechnung wird hinzugefügt",
    className: "mt-5 md:mt-0",
  });
};

const appendNewBillController = async (
  retry: boolean = true,
  dispatch: AppDispatch,
  billing_id: string | number,
  setFiles?: Dispatch<SetStateAction<InvoiceFiles[]>>,
) => {
  try {
    let accessToken: string | null;

    if (retry) {
      accessToken = await AuthStorage.getAccessToken();
    } else {
      accessToken = await refreshAccessToken();
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/list-blobs/invoices`,
      { billingId: billing_id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    dispatch(appendBillState(data as InvoiceFiles));

    if (setFiles) {
      setFiles((prev) => [...prev, data as InvoiceFiles]);
    }

    retry = true;
  } catch (error) {
    if (error instanceof AxiosError) {
      const tokenError =
        error.status === 403 ||
        error.status === 401 ||
        error.response?.data?.path === "auth middleware";

      if (tokenError && retry) {
        // First retry with refreshed token
        retry = false;
        return await appendNewBillController(
          false,
          dispatch,
          billing_id,
          setFiles,
        );
      } else if (tokenError && !retry) {
        // Second attempt failed - session expired
        console.error(error);
        throw new Error("Sitzung abgelaufen. Bitte melden Sie sich erneut an.");
      } else {
        console.error(error);
        throw new Error(
          "Ressourcen konnten nicht geladen werden, überprüfen Sie Ihre Internetverbindung",
        );
      }
    } else {
      console.error(error);
      throw new Error("Ein unerwarteter Fehler ist aufgetreten.");
    }
  }
};
