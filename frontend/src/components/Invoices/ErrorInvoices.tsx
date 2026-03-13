import { TriangleAlert, RefreshCw, Home } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { setLink } from "../../../redux/slices/footerLinksSlice";

interface ErrorInvoicesProps {
  onRetry?: () => void;
}

const ErrorInvoices = ({ onRetry }: ErrorInvoicesProps) => {
  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return (
    <Empty className="justify-self-center border-red-200 dark:border-red-900">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-red-50 dark:bg-red-950">
          <TriangleAlert className="text-red-600 dark:text-red-400" />
        </EmptyMedia>
        <EmptyTitle>Rechnungen konnten nicht geladen werden</EmptyTitle>
        <EmptyDescription>
          Ein Fehler ist beim Laden Ihrer Rechnungen aufgetreten. Bitte
          versuchen Sie es erneut oder kehren Sie zur Startseite zurück.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="grid grid-cols-2 gap-4 w-full">
          {onRetry && (
            <Button
              className="col-span-2 sm:col-span-1 btn-main"
              onClick={onRetry}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Erneut versuchen
            </Button>
          )}
          <Button
            className={onRetry ? "col-span-2 sm:col-span-1" : "col-span-2"}
            variant="outline"
            onClick={() => {
              navigator("/");
              dispatch(setLink(1));
            }}
          >
            <Home className="w-4 h-4 mr-2" />
            Zur Startseite
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};

export default ErrorInvoices;
