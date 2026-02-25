import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/layout/use-mobile";
import type { InvoiceFiles } from "@/types/InvoiceFile";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { formatDate } from "@/utils/formatDate";

const PdfReader = ({ InvoiceFile }: { InvoiceFile: InvoiceFiles }) => {
  const mobileView = useIsMobile();
  return (
    <Card
      className={`${mobileView ? "h-[70vh]" : "h-[80vh] lg:h-[70vh]"} ${
        !InvoiceFile.url ? "p-6" : "p-0"
      }`}
    >
      {InvoiceFile.url ? (
        <>
          <CardHeader className="pt-2">
            <CardTitle className="text-left pl-2 section-header break-words">
              {`Rechnung vom ` +
                formatDate(InvoiceFile.lastModified?.toString()) || "Rechnung"}
            </CardTitle>
          </CardHeader>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <CardDescription
              className={`${
                mobileView ? "h-[70vh]" : "h-[80vh] lg:h-[70vh]"
              } overflow-scroll`}
            >
              <Viewer
                fileUrl={InvoiceFile.url}
                defaultScale={SpecialZoomLevel.PageFit}
              />
            </CardDescription>
          </Worker>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="p-4 rounded-full bg-red-50 dark:bg-red-950">
            <FileText className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-lg font-semibold">
              PDF nicht verfügbar
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-2">
              Die Vorschau-URL für diese Rechnung konnte nicht generiert werden.
              Die Datei ist jedoch in unserem System gespeichert.
            </CardDescription>
          </CardHeader>
        </div>
      )}
    </Card>
  );
};

export default PdfReader;
