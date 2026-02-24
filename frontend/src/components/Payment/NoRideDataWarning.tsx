import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Warning component displayed when user tries to access invoice page
 * without completing a ride first
 */
const NoRideDataWarning = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center w-full min-h-screen p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-amber-50 dark:bg-amber-950">
              <AlertTriangle className="w-16 h-16 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Keine Fahrtdaten gefunden
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Um eine Rechnung zu erstellen, müssen Sie zuerst eine Fahrt
            durchführen
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Car className="w-5 h-5 text-violet-600" />
              So erstellen Sie eine Rechnung:
            </h3>
            <ol className="space-y-2 text-sm text-muted-foreground ml-7">
              <li className="list-decimal">
                Gehen Sie zur <span className="font-semibold">Fahrten-Seite</span>
              </li>
              <li className="list-decimal">
                Geben Sie ein <span className="font-semibold">Ziel</span> ein und
                berechnen Sie die Route
              </li>
              <li className="list-decimal">
                Wählen Sie den <span className="font-semibold">Fahrt-Typ</span>{" "}
                (Botenfahrt/Taxifahrt)
              </li>
              <li className="list-decimal">
                <span className="font-semibold">Starten</span> Sie die Fahrt und{" "}
                <span className="font-semibold">beenden</span> Sie sie am Ziel
              </li>
              <li className="list-decimal">
                Sie werden automatisch zur Rechnungserstellung weitergeleitet
              </li>
            </ol>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
            <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <p className="font-semibold mb-1">Hinweis</p>
              <p>
                Diese Seite kann nicht direkt über die URL aufgerufen werden.
                Sie müssen den regulären Ablauf einer Fahrt durchlaufen.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default NoRideDataWarning;
