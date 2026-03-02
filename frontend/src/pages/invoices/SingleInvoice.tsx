import { useLocation, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  CreditCard,
  Banknote,
  User,
  Receipt,
  Download,
  ExternalLink,
  ArrowDown,
  QrCode,
  StickyNote,
  X,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import PdfReader from "@/components/Invoices/PdfReader";
import type { InvoiceFiles } from "@/types/InvoiceFile";
import { formatDate } from "@/utils/formatDate";
import { fetchDownload } from "@/utils/invoices/fetchDownload";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogClose, DialogContent } from "@/components/ui/dialog";
import { useCallback, useEffect, useRef, useState } from "react";
import { isMobile, useIsMobile } from "@/hooks/layout/use-mobile";
import { toast } from "sonner";
import { AuthStorage } from "@/utils/secureStorage";
import { refreshAccessToken } from "@/utils/auth/jwttokens";
import axios, { AxiosError } from "axios";
import LoadingSingleInvoice from "@/components/Invoices/LoadingSingleInvoice";
import ErrorSingleInvoice from "@/components/Invoices/ErrorSingleInvoice";

const SingleInvoice = ({ invoice }: { invoice?: InvoiceFiles }) => {
  const navigator = useNavigate();
  const location = useLocation();
  const mobileView = useIsMobile();
  const { id } = useParams();
  const [qrCodeOrPdf, setQrCodeOrPdf] = useState(isMobile ? "qrcode" : "pdf");
  const [file, setFile] = useState(invoice);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const retryRef = useRef(true);

  const fetchBill = useCallback(async () => {
    setLoading(false);
    if (!file && (location.state satisfies InvoiceFiles)) {
      setFile(location.state);
    } else {
      try {
        let accessToken: string | null;
        if (retryRef.current) {
          accessToken = await AuthStorage.getAccessToken();
        } else {
          accessToken = await refreshAccessToken();
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/list-blobs/invoices/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setFile(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          const isAuthError =
            error.status === 403 ||
            error.status === 401 ||
            error.response?.data?.path === "auth middleware";

          if (isAuthError && retryRef.current) {
            retryRef.current = false;
            return await fetchBill();
          } else if (isAuthError && !retryRef.current) {
            toast.error("Sitzung abgelaufen. Bitte melden Sie sich erneut an.");
            setError(true);
          } else {
            toast.error(
              "Rechnung konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
            );
            setError(true);
          }
        } else {
          toast.error("Ein unerwarteter Fehler ist aufgetreten.");
          setError(true);
        }
      }
    }

    setLoading(false);
  }, [file, id, location.state]);

  useEffect(() => {
    fetchBill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labelClass = "text-gray-500 text-sm md:text-base";
  const valueClass = "font-bold text-base md:text-xl";

  if (loading || !file) {
    return <LoadingSingleInvoice />;
  }

  if (error) {
    return <ErrorSingleInvoice onRetry={fetchBill} />;
  }

  const isCard = file.billingData?.payment_method === "card";

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

      <div className="w-11/12 md:w-9/12 lg:w-7/12 flex rounded-lg p-[0.1rem] bg-gray-200 dark:bg-black">
        <button
          className={`flex p-[0.2rem] justify-center w-1/2 rounded-lg space-x-2 ${
            qrCodeOrPdf === "pdf" ? "dark:bg-gray-700 bg-gray-300" : ""
          }`}
          onClick={() => setQrCodeOrPdf("pdf")}
        >
          <StickyNote />
          <p className="font-bold">Rechnung</p>
        </button>
        <button
          className={`flex p-[0.2rem] justify-center w-1/2 rounded-lg space-x-2 ${
            qrCodeOrPdf === "qrcode" ? "dark:bg-gray-700 bg-gray-300" : ""
          }`}
          onClick={() => setQrCodeOrPdf("qrcode")}
        >
          <QrCode />
          <p className="font-bold">Qr-Code</p>
        </button>
      </div>

      {qrCodeOrPdf === "pdf" ? (
        <Dialog>
          <DialogTrigger className=" flex justify-center">
            <PdfReader InvoiceFile={file} />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center justify-center p-2 sm:h-[95dvh] sm:w-[95vw] sm:max-w-4xl sm:p-4 gap-0">
            <DialogClose enterKeyHint="send">
              <X className="text-transparent w-full"></X>
            </DialogClose>
            <PdfReader InvoiceFile={file} maxSize={!mobileView} />
          </DialogContent>
        </Dialog>
      ) : (
        (file.downloadUrl ?? file.url) && (
          <div className="my-4 flex justify-center">
            <div className="p-4 bg-white rounded-lg w-fit">
              <QRCodeSVG
                size={mobileView ? window.innerWidth - 120 : 500}
                value={file.downloadUrl ?? file.url ?? ""}
              />
            </div>
          </div>
        )
      )}

      <button
        className="dark:bg-black bg-gray-300 hover:bg-gray-400/50 p-2 rounded-full animate-bounce"
        onClick={() => {
          window.scrollBy({ top: 500, behavior: "smooth" });
        }}
      >
        <ArrowDown className="w-4 h-4" />
      </button>

      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-1">
          <span className={labelClass}>Beleg-Nr:</span>
          <span className={valueClass}>
            #{file.billingData?.billing_id ?? id}
          </span>
        </div>

        <div className="flex flex-col gap-2 w-full md:flex-row md:gap-8">
          <div className="flex flex-row gap-1 items-center">
            <BadgeCheck size={28} fill="#10B981" color="green" />
            <span className={valueClass}>Rechnung erfolgreich erstellt</span>
          </div>

          <div className="flex flex-row gap-8 md:w-1/2">
            <div className="flex flex-col text-left w-1/3 md:w-full md:flex-row md:gap-1 md:items-center">
              <span className={labelClass}>Zahlung:</span>
              <div className="flex items-center gap-1">
                {isCard ? (
                  <CreditCard className="relative top-[0.1rem] w-5 h-5 text-violet-500" />
                ) : (
                  <Banknote className="relative top-[0.1rem] w-5 h-5 text-green-500" />
                )}
                <span className={valueClass}>
                  {isCard ? "Karte" : "Bargeld"}
                </span>
              </div>
            </div>

            <div className="bg-gray-500/30 w-0.5 h-full" />

            <div className="flex flex-col text-left ">
              <span className={labelClass}>Datum:</span>
              <div className="flex relative items-baseline gap-1">
                <Calendar className="relative top-[0.2rem] w-5 h-5 text-orange-500" />
                <span className={valueClass}>
                  {formatDate(file.lastModified?.toString()) ?? "–"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          <div className="flex flex-col gap-1">
            <span className={labelClass}>Brutto</span>
            <span className="font-bold text-xl text-violet-600 dark:text-violet-400">
              €{file.billingData?.amount_gross}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className={labelClass}>Netto</span>
            <span className={valueClass}>€{file.billingData?.amount_net}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className={labelClass}>
              MwSt ({file.billingData?.tax_rate?.split(".00")[0]}%)
            </span>
            <span className={valueClass}>€{file.billingData?.amount_tax}</span>
          </div>
          {Number(file.billingData?.tip_amount) > 0 && (
            <div className="flex flex-col gap-1">
              <span className={labelClass}>Trinkgeld</span>
              <span className={valueClass}>
                €{file.billingData?.tip_amount}
              </span>
            </div>
          )}
        </div>

        {file.driverData?.name && (
          <div className="w-full flex flex-row gap-2 items-center pt-2 border-t">
            <User size={22} className="text-blue-500" />
            <span className={labelClass}>Fahrer:</span>
            <span className={valueClass}>{file.driverData.name}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 justify-center pt-2">
          <Button variant="outline" onClick={() => navigator("/invoices")}>
            <Receipt className="w-4 h-4 mr-2" />
            Alle Rechnungen
          </Button>

          {file.url && (
            <Button variant="outline" asChild>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Online ansehen
              </a>
            </Button>
          )}

          {file.downloadUrl && (
            <Button
              className="bg-violet-500 hover:bg-violet-600 text-white font-bold"
              onClick={() =>
                fetchDownload(
                  file.downloadUrl,
                  file.key?.split("/").pop() || "Rechnung",
                )
              }
            >
              <Download className="w-4 h-4 mr-2" />
              Herunterladen
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleInvoice;
