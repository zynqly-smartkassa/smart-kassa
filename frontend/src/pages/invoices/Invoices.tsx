import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import {
  FileText,
  Download,
  ExternalLink,
  Calendar,
  Info,
  User,
  CreditCard,
  Banknote,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { fetchBills } from "@/utils/invoices/fetchBills";
import { formatDate } from "@/utils/formatDate";
import { fetchDownload } from "@/utils/invoices/fetchDownload";
import type { InvoiceFiles } from "@/types/InvoiceFile";
import "@react-pdf-viewer/core/lib/styles/index.css";
import LoadingInvoices from "@/components/Invoices/LoadingInvoices";
import EmptyInvoices from "@/components/Invoices/EmptyInvoices";
import { useNavigate } from "react-router";
import QrCodeScanner from "@/components/Invoices/QrCodeScanner";
//, useParams

const Invoices = () => {
  const dispatch: AppDispatch = useDispatch();
  const bills = useSelector((state: RootState) => state.setBills.bills);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<InvoiceFiles[]>([]);
  //  const { id } = useParams();
  const retryRef = useRef(true);
  const navigator = useNavigate();

  const loadBills = useCallback(async () => {
    await fetchBills(bills, retryRef, dispatch, setFiles, setLoading);
  }, [dispatch, bills]);

  useEffect(() => {
    loadBills();
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
                    <Info
                      className="absolute top-4 right-4"
                      onClick={() =>
                        navigator(`/invoices/${file.billingData?.billing_id}`)
                      }
                    />
                    <QrCodeScanner
                      downloadUrl={file.downloadUrl}
                      url={file.url}
                    />
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
                            <Coins className="w-4 h-4" />
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
                      <a href={file.url}>
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

        {(!files || files.length === 0) && !loading && <EmptyInvoices />}
        {loading && <LoadingInvoices />}
      </div>
    </section>
  );
};

export default Invoices;
