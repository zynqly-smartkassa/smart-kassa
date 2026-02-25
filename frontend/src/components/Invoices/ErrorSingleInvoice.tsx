import { ArrowLeft, FileX, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const ErrorSingleInvoice = ({ onRetry }: { onRetry?: () => void }) => {
  const navigator = useNavigate();

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 items-center z-20">
      <Button
        variant="ghost"
        onClick={() => navigator("/invoices")}
        className="self-start p-0"
      >
        <ArrowLeft />
        <span className="font-bold text-2xl">Rechnungsdetails</span>
      </Button>

      <div className="flex flex-col items-center justify-center gap-4 w-full py-16 px-4 rounded-xl border border-border/40 bg-sidebar">
        <div className="p-4 rounded-full bg-red-50 dark:bg-red-950">
          <FileX className="w-12 h-12 text-red-500 dark:text-red-400" />
        </div>
        <div className="text-center flex flex-col gap-1">
          <p className="text-lg font-semibold">Rechnung nicht gefunden</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Die Rechnungsdaten konnten nicht geladen werden. Bitte gehen Sie
            zurück und versuchen Sie es erneut.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Erneut versuchen
            </Button>
          )}
          <Button variant={"outline"} onClick={() => navigator("/invoices")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Alle Rechnungen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorSingleInvoice;
