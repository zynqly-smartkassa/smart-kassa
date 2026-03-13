import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface InvoicesPaginationProps {
  page: number;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const InvoicesPagination = ({
  page,
  hasNext,
  onPrevious,
  onNext,
}: InvoicesPaginationProps) => {
  return (
    <Pagination className="mx-0 my-5 w-auto">
      <PaginationContent>
        <PaginationItem
          className={`${
            page === 1
              ? "pointer-events-none text-gray-400 dark:text-gray-500"
              : "cursor-pointer hover:text-gray-400 transition-colors"
          }`}
          onClick={onPrevious}
        >
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem
          className={`${
            hasNext
              ? "cursor-pointer hover:text-gray-400 transition-colors"
              : "pointer-events-none text-gray-400 dark:text-gray-500"
          }`}
          onClick={onNext}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default InvoicesPagination;
