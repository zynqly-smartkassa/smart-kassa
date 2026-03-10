import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const LoadingSingleInvoice = () => {
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

      <div className="w-11/12 flex rounded-lg p-[0.1rem] bg-black/20 animate-pulse h-9" />

      <div className="w-full h-[40vh] md:h-[60vh] min-h-52 rounded-xl border border-border/40 bg-black/20 animate-pulse" />

      <div className="w-full flex flex-col gap-4">
        <div className="h-6 w-36 rounded bg-black/40 animate-pulse" />

        <div className="flex flex-col gap-2 w-full md:flex-row md:gap-8">
          <div className="h-7 w-56 rounded bg-black/20 animate-pulse" />
          <div className="flex flex-row gap-8">
            <div className="h-10 w-24 rounded bg-black/30 animate-pulse" />
            <div className="h-10 w-24 rounded bg-black/30 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSingleInvoice;
