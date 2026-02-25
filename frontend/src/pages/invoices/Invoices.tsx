import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBills } from "../../../redux/slices/invoices";
import type { AppDispatch, RootState } from "../../../redux/store";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../components/ui/empty";
import {
  ArrowUpRightIcon,
  FolderOpen,
  FileText,
  Download,
  ExternalLink,
  Calendar,
  Info,
  QrCode,
  User,
  CreditCard,
  Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { isMobile, useIsMobile } from "../../hooks/layout/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { AuthStorage } from "../../utils/secureStorage";
import axios, { AxiosError } from "axios";
import { refreshAccessToken } from "../../utils/auth/jwttokens";
import { toast } from "sonner";
import { formatDate } from "@/utils/formatDate";
import { fetchDownload } from "@/utils/invoices/fetchDownload";
import type { Files } from "@/types/InvoiceFile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { QRCodeSVG } from "qrcode.react";
import { setLink } from "../../../redux/slices/footerLinksSlice";

const Invoices = () => {
  const dispatch: AppDispatch = useDispatch();
  const bills = useSelector((state: RootState) => state.setBills.bills);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<Files[]>([]);
  const navigator = useNavigate();
  const retryRef = useRef(true);
  const mobileView = useIsMobile();

  const fetchBills = useCallback(async () => {
    if (!bills || bills.length === 0) {
      try {
        let accessToken: string | null;
        if (retryRef.current) {
          accessToken = await AuthStorage.getAccessToken();
        } else {
          accessToken = await refreshAccessToken();
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/list-blobs/invoices`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        dispatch(setBills(data.files));
        setFiles(data.files);
        setLoading(false);
        retryRef.current = true; // Reset retry flag on success
      } catch (error) {
        setLoading(false);
        if (error instanceof AxiosError) {
          const isAuthError =
            error.status === 403 ||
            error.status === 401 ||
            error.response?.data?.path === "auth middleware";

          if (isAuthError && retryRef.current) {
            // First retry with refreshed token
            retryRef.current = false;
            return await fetchBills();
          } else if (isAuthError && !retryRef.current) {
            // Second attempt failed - session expired
            toast.error("Sitzung abgelaufen. Bitte melden Sie sich erneut an.");
          } else {
            toast.error(
              "Rechnungen konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
            );
          }
        } else {
          toast.error("Ein unerwarteter Fehler ist aufgetreten.");
        }
      }
    } else {
      setFiles(bills);
      setLoading(false);
    }
  }, [dispatch, bills]);

  useEffect(() => {
    fetchBills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col w-full min-h-screen">
      <div className="flex flex-col gap-1 pb-4">
        <h2 className="page-title">Rechnungen</h2>
        <p className="subheader">
          Sehen und laden Sie alle Ihre generierten Rechnungen herunter
        </p>
      </div>

      <div className="flex flex-col min-h-[70vh] mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {files &&
            files.length !== 0 &&
            !loading &&
            files.map((file, index) => (
              <Card
                key={index}
                className="relative rounded-xl border border-border/40 bg-sidebar dark:bg-sidebar shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                <CardHeader className="flex flex-row justify-between items-start pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950">
                      <FileText className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <CardTitle className="card-title-standard">
                        Rechnung
                      </CardTitle>
                    </div>
                    <Dialog>
                      <DialogTrigger>
                        <Info className="absolute top-4 right-4" />
                      </DialogTrigger>
                      <DialogContent
                        className={`${
                          mobileView ? "h-[70vh]" : "h-[80vh] lg:h-[70vh]"
                        } ${!file.url ? "p-6" : "p-0"}`}
                      >
                        {file.url ? (
                          <>
                            <DialogHeader className="pt-2">
                              <DialogTitle className="text-left pl-2 section-header break-words">
                                {`Rechnung vom ` +
                                  formatDate(file.lastModified?.toString()) ||
                                  "Rechnung"}
                              </DialogTitle>
                            </DialogHeader>
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                              <DialogDescription
                                className={`${
                                  mobileView
                                    ? "h-[70vh]"
                                    : "h-[80vh] lg:h-[70vh]"
                                } overflow-scroll`}
                              >
                                <Viewer
                                  fileUrl={file.url}
                                  defaultScale={SpecialZoomLevel.PageFit}
                                />
                              </DialogDescription>
                            </Worker>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full gap-4">
                            <div className="p-4 rounded-full bg-red-50 dark:bg-red-950">
                              <FileText className="w-12 h-12 text-red-600 dark:text-red-400" />
                            </div>
                            <DialogHeader className="text-center">
                              <DialogTitle className="text-lg font-semibold">
                                PDF nicht verfügbar
                              </DialogTitle>
                              <DialogDescription className="text-sm text-muted-foreground mt-2">
                                Die Vorschau-URL für diese Rechnung konnte nicht
                                generiert werden. Die Datei ist jedoch in
                                unserem System gespeichert.
                              </DialogDescription>
                            </DialogHeader>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger>
                        <QrCode className="absolute top-12 right-4" />
                      </DialogTrigger>
                      <DialogContent className="p-6 flex flex-col items-center gap-4">
                        {file.url ? (
                          <>
                            <DialogHeader className="text-center">
                              <DialogTitle className="section-header">
                                Scan to See Online
                              </DialogTitle>
                              <DialogDescription className="text-sm text-muted-foreground">
                                Scannen Sie den QR-Code mit Ihrem Smartphone
                              </DialogDescription>
                            </DialogHeader>
                            <div className="p-4 bg-white rounded-lg">
                              <QRCodeSVG size={260} value={file.url} />
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-4">
                            <div className="p-4 rounded-full bg-amber-50 dark:bg-amber-950">
                              <QrCode className="w-12 h-12 text-amber-600 dark:text-amber-400" />
                            </div>
                            <DialogHeader className="text-center">
                              <DialogTitle className="text-lg font-semibold">
                                QR-Code nicht verfügbar
                              </DialogTitle>
                              <DialogDescription className="text-sm text-muted-foreground">
                                Für diese Rechnung konnte kein QR-Code erstellt
                                werden, da keine Vorschau-URL verfügbar ist.
                              </DialogDescription>
                            </DialogHeader>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-lg text-violet-600 dark:text-violet-400">
                      €{file.billingData?.amount_gross}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Beleg #{file.billingData?.billing_id}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t">
                    <div>
                      <p className="text-muted-foreground text-xs">Netto</p>
                      <p className="font-medium">
                        €{file.billingData?.amount_net}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">
                        MwSt ({file.billingData?.tax_rate.split(".00")[0]}%)
                      </p>
                      <p className="font-medium">
                        €{file.billingData?.amount_tax}
                      </p>
                    </div>
                  </div>

                  {file.billingData?.tip_amount &&
                    Number(file.billingData.tip_amount) > 0 && (
                      <div className="flex items-center gap-2 text-sm pt-2 border-t">
                        <div className="p-1.5 rounded-lg bg-green-50 dark:bg-green-950">
                          <span className="text-green-600 dark:text-green-400 text-xs">
                            💶
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">
                            Trinkgeld
                          </p>
                          <p className="font-medium">
                            €{file.billingData.tip_amount}
                          </p>
                        </div>
                      </div>
                    )}

                  <div className="flex items-center gap-2 text-sm pt-2 border-t">
                    <div
                      className={`p-1.5 rounded-lg ${
                        file.billingData?.payment_method === "card"
                          ? "bg-violet-50 dark:bg-violet-950"
                          : "bg-green-50 dark:bg-green-950"
                      }`}
                    >
                      {file.billingData?.payment_method === "card" ? (
                        <CreditCard className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                      ) : (
                        <Banknote className="w-4 h-4 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">
                        Zahlungsmethode
                      </p>
                      <p className="font-medium capitalize">
                        {file.billingData?.payment_method === "card"
                          ? "Karte"
                          : "Bargeld"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm pt-2 border-t">
                    <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950">
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Fahrer</p>
                      <p className="font-medium text-sm">
                        {file.driverData?.name || "Nicht verfügbar"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm pt-2 border-t">
                    <div className="p-1.5 rounded-lg bg-orange-50 dark:bg-orange-950">
                      <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Datum</p>
                      <p className="font-medium text-sm">
                        {formatDate(file.lastModified?.toString()) ||
                          "Nicht verfügbar"}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 pt-2">
                  {file.url ? (
                    <Button asChild className="w-full" variant="link">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Online ansehen
                      </a>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="w-full"
                      variant="link"
                      title="Vorschau-URL nicht verfügbar"
                    >
                      <ExternalLink className="w-4 h-4 mr-2 opacity-50" />
                      <span className="opacity-50">Nicht verfügbar</span>
                    </Button>
                  )}

                  {file.url ? (
                    <Button
                      asChild
                      className="w-full cursor-pointer"
                      variant="outline"
                    >
                      <a
                        onClick={() =>
                          fetchDownload(
                            file.url,
                            file.key?.split("/").pop() || "Invoice",
                          )
                        }
                        download
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Herunterladen
                      </a>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="w-full"
                      variant="outline"
                      title="Download-URL nicht verfügbar"
                    >
                      <Download className="w-4 h-4 mr-2 opacity-50" />
                      <span className="opacity-50">Download nicht möglich</span>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
        </div>

        {(!files || files.length === 0) && !loading && (
          <Empty className="justify-self-center">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderOpen />
              </EmptyMedia>
              <EmptyTitle>Noch keine Rechnungen</EmptyTitle>
              <EmptyDescription>
                Sie haben noch keine Rechnungen.
              </EmptyDescription>
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
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.of(1, 2, 3, 4, 5, 6).map((_, index) => (
              <Card
                key={index}
                title="Loading Card"
                className="rounded-xl border border-border/40 bg-gray-300/60 dark:bg-black/30 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row justify-between items-start pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950">
                      <FileText className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <CardTitle className="card-title-standard">
                        Rechnung
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="py-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="bg-gray-600 animate-pulse text-transparent rounded w-32 h-5" />
                  </div>

                  <CardDescription className="mt-3 text-xs">
                    <span className="bg-gray-600 animate-pulse text-transparent rounded w-32 h-5" />
                  </CardDescription>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 pt-4">
                  <Button asChild className="w-full">
                    <span className="bg-gray-600 animate-pulse"></span>
                  </Button>
                  <Button disabled asChild className="w-full">
                    <span className="bg-gray-600 animate-pulse"></span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Invoices;
