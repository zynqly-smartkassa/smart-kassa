import { useCallback, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/layout/use-mobile";
import type { InvoiceFiles } from "@/types/InvoiceFile";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfReader = ({
  InvoiceFile,
  maxSize,
}: {
  InvoiceFile: InvoiceFiles;
  maxSize?: boolean;
}) => {
  const mobileView = useIsMobile();
  const [numPages, setNumPages] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );

  if (!InvoiceFile.url) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-4 rounded-xl border border-border/40 bg-sidebar p-6">
        <div className="p-4 rounded-full bg-red-50 dark:bg-red-950">
          <FileText className="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>
        <div className="text-center">
          <p className="text-base font-semibold">PDF nicht verfügbar</p>
          <p className="text-sm text-muted-foreground mt-1">
            Die Vorschau-URL konnte nicht generiert werden.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${
        maxSize
          ? "h-full w-full overflow-auto"
          : mobileView
          ? "h-[40vh] min-h-52 overflow-auto rounded-xl border border-border/40"
          : "h-[60vh] min-h-52 overflow-auto rounded-xl border border-border/40 flex justify-center bg-white"
      }`}
    >
      <Document file={InvoiceFile.url} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={
              maxSize ? containerRef.current?.clientWidth : undefined
            }
            scale={maxSize ? undefined : mobileView ? 0.475 : 1}
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfReader;
