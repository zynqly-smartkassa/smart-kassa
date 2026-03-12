import { useRef, useState } from "react";
import LoadingInvoices from "@/components/Invoices/LoadingInvoices";
import EmptyInvoices from "@/components/Invoices/EmptyInvoices";
import ErrorInvoices from "@/components/Invoices/ErrorInvoices";
import InvoiceCard from "@/components/Invoices/InvoiceCard";
import InvoicesPagination from "@/components/Invoices/InvoicesPagination";
import { useParams } from "react-router";
import SingleInvoice from "./SingleInvoice";
import { useGetInvoicesQuery } from "../../../redux/api/invoiceApi";
import type { InvoicesQuery } from "@/types/InvoiceQuery";

const Invoices = () => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const tokenTracker = useRef(new Map<number, string>());
  const { data, isLoading, isError, refetch, isFetching }: InvoicesQuery =
    useGetInvoicesQuery({ token });

  if (id) {
    return <SingleInvoice />;
  }

  const handlePrevious = () => {
    if (page > 1) {
      setToken(tokenTracker.current.get(page - 2) || undefined);
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (data?.nextContinuationToken) {
      if (tokenTracker.current.size === page - 1)
        tokenTracker.current.set(page, data.nextContinuationToken);
      setToken(data.nextContinuationToken);
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="flex flex-col w-full min-h-screen">
      <div className="flex flex-col gap-1 pb-4">
        <h2 className="page-title">Rechnungen</h2>
        <p className="subheader">
          Sehen und laden Sie alle Ihre generierten Rechnungen herunter
        </p>
      </div>

      <div className="flex flex-col min-h-[70vh] mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {data &&
            data.files.length !== 0 &&
            !isLoading &&
            !isFetching &&
            data.files.map((file, index) => (
              <InvoiceCard key={index} file={file} />
            ))}
        </div>

        {(!data || !data.files || data.files.length === 0) &&
          !isLoading &&
          !isFetching &&
          !isError && <EmptyInvoices />}
        {(isLoading || isFetching) && <LoadingInvoices />}
        {isError && <ErrorInvoices onRetry={refetch} />}
      </div>

      <InvoicesPagination
        page={page}
        hasNext={!!data?.nextContinuationToken}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </section>
  );
};

export default Invoices;
