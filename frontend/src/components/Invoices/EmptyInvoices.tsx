import { ArrowUpRightIcon, FolderOpen } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import type { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { isMobile } from "@/hooks/layout/use-mobile";
import { Button } from "../ui/button";
import { setLink } from "../../../redux/slices/footerLinksSlice";

const EmptyInvoices = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  return (
    <Empty className="justify-self-center">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>Noch keine Rechnungen</EmptyTitle>
        <EmptyDescription>Sie haben noch keine Rechnungen.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="grid grid-cols-2 gap-4">
          <Button
            className="col-span-2 sm:col-span-1 shadow-xl bg-gray-300 dark:bg-black"
            onClick={() => {
              if (isMobile) {
                navigator("/ride");
              } else {
                navigator("/statistics");
              }
              dispatch(setLink(0));
            }}
          >
            {isMobile ? "Fahrt starten" : "Statistiken prüfen"}
          </Button>
          <Button
            className="col-span-2 sm:col-span-1"
            variant="outline"
            onClick={() => {
              navigator("/");
              dispatch(setLink(1));
            }}
          >
            Zurück zur Startseite
          </Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Mehr erfahren <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  );
};

export default EmptyInvoices;
