import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MapPin,
  Clock,
  Route,
  CreditCard,
  Banknote,
  Receipt,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { toast } from "sonner";
import NoRideDataWarning from "@/components/NoRideDataWarning";
import { useForm } from "react-hook-form";
import { AuthStorage } from "@/utils/secureStorage";
import axios, { AxiosError } from "axios";
import type { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { appendBillState } from "../../../redux/slices/invoices";
import type { Files } from "@/types/InvoiceFile";
import { refreshAccessToken } from "@/utils/jwttokens";
import type { RideInfo } from "@/types/RideInfoForBill";
import { setRideInfo } from "@/utils/invoices/setRideInfo";
import LoadingPayment from "@/components/LoadingPayment";

/**
 * Invoice page where drivers can review ride details and select payment method
 * before creating the final invoice/billing record
 */
const Invoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [ride, setRide] = useState<RideInfo | null>(null);
  const { id } = useParams();
  const form = useForm({
    defaultValues: {
      tip: 0,
      zahlungmethode: "cash",
      ride_price: 0,
    },
  });

  const startAddressParagraph = useRef<HTMLParagraphElement>(null);
  const [lineheight, setLineheight] = useState(2.75);
  const dispatch: AppDispatch = useDispatch();

  const getRideData = useCallback(async () => {
    const rideData =
      (location.state as RideInfo) || (await setRideInfo.getRideInfo());

    setRide(rideData);
    setLoading(false);
  }, [location.state]);

  // ResizeObserver to automatically update line height when paragraph size changes
  useEffect(() => {
    getRideData();
    const element = startAddressParagraph.current;
    if (!element) return;

    const updateLineHeight = () => {
      const startaddr =
        Math.floor((element.offsetHeight || 20) / 20 - 1) * 1.25;
      setLineheight(2.75 + startaddr);
    };

    updateLineHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateLineHeight();
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [getRideData]);

  if (loading) {
    return <LoadingPayment />;
  }

  if (!ride) {
    return <NoRideDataWarning />;
  }

  const distanceInKm =
    typeof ride.distance === "number" && ride.distance > 100
      ? (ride.distance / 1000).toFixed(2)
      : ride.distance;

  // Reactive values for live display — driven by user input
  const ride_price_gross =
    parseFloat(form.watch("ride_price")?.toString() || "0") || 0;
  const tipAmount = parseFloat(form.watch("tip")?.toString() || "0") || 0;

  const tax_rate = ride.ride_type === "Taxifahrt" ? 0.1 : 0.2; // 10% for Taxi, 20% for Boten
  const amount_gross = ride_price_gross + tipAmount;
  const amount_net = amount_gross / (1 + tax_rate);
  const amount_tax = amount_gross - amount_net;

  // billingData is built inside sendBill to capture form values at submit time
  const sendBill = async (retry: boolean = true) => {
    const values = form.getValues();
    const ridePrice = parseFloat(values.ride_price?.toString() || "0") || 0;
    const tip = parseFloat(values.tip?.toString() || "0") || 0;
    const taxRate = ride.ride_type === "Taxifahrt" ? 0.1 : 0.2;
    const gross = ridePrice + tip;
    const net = gross / (1 + taxRate);
    const tax = gross - net;

    const billingData = {
      ride_id: id,
      amount_net: parseFloat(net.toFixed(2)),
      tax_rate: taxRate,
      amount_tax: parseFloat(tax.toFixed(2)),
      amount_gross: parseFloat(gross.toFixed(2)),
      payment_method: values.zahlungmethode,
      tip_amount: tip,
    };

    try {
      let accessToken: string | null;

      if (retry) {
        accessToken = await AuthStorage.getAccessToken();
      } else {
        accessToken = await refreshAccessToken();
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/invoice`,
        billingData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      dispatch(appendBillState(data.files as Files));
    } catch (error) {
      if (error instanceof AxiosError) {
        const tokenError =
          error.status === 403 ||
          error.status === 401 ||
          error.response?.data?.path === "auth middleware";

        if (tokenError && retry) {
          // First retry with refreshed token
          retry = false;
          return await sendBill(false);
        } else if (tokenError && !retry) {
          // Second attempt failed - session expired
          console.error(error);
          throw new Error(
            "Sitzung abgelaufen. Bitte melden Sie sich erneut an.",
          );
        } else if (error.status === 409) {
          throw new Error("Diese Rechnung existiert bereits.");
        } else {
          console.error(error);
          throw new Error(
            "Ressourcen konnten nicht geladen werden, überprüfen Sie Ihre Internetverbindung.",
          );
        }
      } else {
        console.error(error);
        throw new Error("Ein unerwarteter Fehler ist aufgetreten.");
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(
      async () => {
        await sendBill(true);
      },
      {
        className: "mt-5 md:mt-0",
        success: async () => {
          await navigate(`/invoices`);
          await setRideInfo.removeRideInfo();
          return "Rechnung erflogreich erstellt";
        },
        error: (err) => {
          if (err instanceof Error) {
            return err.message;
          } else return "Fehler beim erstellen der rechnung";
        },
        loading: "Rechnung wird erstellt",
      },
    );
  };

  return (
    <section className="flex flex-col w-full min-h-screen">
      <div className="flex flex-col gap-1 pb-4">
        <h2 className="page-title">Rechnung erstellen</h2>
        <p className="subheader">
          Überprüfen Sie die Fahrtdetails und wählen Sie die Zahlungsmethode
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Ride Summary Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-violet-600" />
              Fahrtdetails
            </CardTitle>
            <CardDescription>
              Fahrt #{id || "ID Konnte nicht geladen werden"} - {ride.ride_type}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Route Information */}
            <div className="space-y-3 relative">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950">
                  <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 max-w-[120%]">
                  <Label className="text-xs text-muted-foreground">Start</Label>
                  <p
                    ref={startAddressParagraph}
                    className="text-sm font-medium w-[70%] break-words"
                  >
                    {ride.start_address}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(ride.start_time)}
                  </p>
                </div>
              </div>

              <div
                style={{ height: `${lineheight}rem` }}
                className={`absolute left-[0.875rem] top-5 border-l-4 border-dashed border-black dark:border-white`}
              ></div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950">
                  <MapPin className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Ziel</Label>
                  <p className="text-sm font-medium w-[70%] break-words">
                    {ride.end_address}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(ride.end_time)}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950">
                  <Route className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Distanz
                  </Label>
                  <p className="text-lg font-bold">{distanceInKm} km</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950">
                  <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Dauer</Label>
                  <p className="text-lg font-bold">{ride.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 md:col-span-1">
                <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950">
                  <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Typ</Label>
                  <p className="text-lg font-bold">{ride.ride_type}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment & Summary Card */}
        <Form {...form}>
          <form
            className="space-y-3 pt-4 border-t"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Zahlung & Summe</CardTitle>
                <CardDescription>Zahlungsmethode auswählen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <FormField
                  control={form.control}
                  name="zahlungmethode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Zahlungsmethode
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          <button
                            type="button"
                            onClick={() => field.onChange("card")}
                            className={`w-full p-4 rounded-lg border-2 transition-all ${
                              field.value === "card"
                                ? "border-violet-500 bg-violet-50 dark:bg-violet-950"
                                : "border-border hover:border-violet-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  field.value === "card"
                                    ? "bg-violet-500"
                                    : "bg-gray-100 dark:bg-gray-800"
                                }`}
                              >
                                <CreditCard
                                  className={`w-5 h-5 ${
                                    field.value === "card"
                                      ? "text-white"
                                      : "text-gray-600 dark:text-gray-400"
                                  }`}
                                />
                              </div>
                              <div className="flex-1 text-left">
                                <p className="font-semibold">Karte</p>
                                <p className="text-xs text-muted-foreground">
                                  Kredit- oder Debitkarte
                                </p>
                              </div>
                              {field.value === "card" && (
                                <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                              )}
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => field.onChange("cash")}
                            className={`w-full p-4 rounded-lg border-2 transition-all ${
                              field.value === "cash"
                                ? "border-green-500 bg-green-50 dark:bg-green-950"
                                : "border-border hover:border-green-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  field.value === "cash"
                                    ? "bg-green-500"
                                    : "bg-gray-100 dark:bg-gray-800"
                                }`}
                              >
                                <Banknote
                                  className={`w-5 h-5 ${
                                    field.value === "cash"
                                      ? "text-white"
                                      : "text-gray-600 dark:text-gray-400"
                                  }`}
                                />
                              </div>
                              <div className="flex-1 text-left">
                                <p className="font-semibold">Bargeld</p>
                                <p className="text-xs text-muted-foreground">
                                  Barzahlung
                                </p>
                              </div>
                              {field.value === "cash" && (
                                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                              )}
                            </div>
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ride Price Input */}
                <FormField
                  control={form.control}
                  name="ride_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Fahrpreis
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            €
                          </span>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="pl-7"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            value={field.value}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tip Input */}
                <FormField
                  control={form.control}
                  name="tip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Trinkgeld (optional)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            €
                          </span>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="pl-7"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            value={field.value}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Amount Summary */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Fahrpreis: </span>
                    <span className="font-medium">
                      €{ride_price_gross.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Trinkgeld: </span>
                    <span className="font-medium">€{tipAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t">
                    <span>Gesamtbetrag</span>
                    <span className="text-violet-600">
                      €{amount_gross.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs">
                    <p>{`Enth. MwSt (${tax_rate * 100}%): ${amount_tax.toFixed(
                      2,
                    )}€`}</p>
                    <p>{`Nettoumsatz: ${amount_net.toFixed(2)} €`}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {form.formState.isSubmitting ? (
                    "Wird erstellt..."
                  ) : (
                    <>
                      Rechnung erstellen
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Invoice;
