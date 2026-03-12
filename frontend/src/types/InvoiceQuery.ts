import type { InvoiceFiles } from "./InvoiceFile";

export interface InvoicesQuery {
  data?: {
    files: InvoiceFiles[];
    count: number;
    nextContinuationToken: string;
    message: string;
  };
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  isFetching: boolean;
}
