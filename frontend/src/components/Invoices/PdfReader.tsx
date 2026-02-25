import { FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/layout/use-mobile";
import type { InvoiceFiles } from "@/types/InvoiceFile";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";

const PdfReader = ({
  InvoiceFile,
  maxSize,
}: {
  InvoiceFile: InvoiceFiles;
  maxSize?: true;
}) => {
  const mobileView = useIsMobile();

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
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <div
        className={`${
          maxSize
            ? "h-full w-full overflow-auto"
            : mobileView
            ? "h-[40vh] min-h-52 overflow-auto rounded-xl border border-border/40"
            : "h-[60vh] min-h-52 overflow-auto rounded-xl border border-border/40"
        }`}
      >
        <Viewer
          fileUrl={InvoiceFile.url}
          defaultScale={
            maxSize ? SpecialZoomLevel.PageWidth : mobileView ? 0.475 : 1
          }
        />
      </div>
    </Worker>
  );
};

export default PdfReader;
