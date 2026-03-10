import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  Mail,
  Github,
  ExternalLink,
  Car,
  Receipt,
  User,
  MapPin,
  CreditCard,
  Download,
  QrCode,
  Settings,
  BookOpen,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const Help = () => {
  return (
    <section className="flex flex-col w-full min-h-screen">
      <div className="flex flex-col gap-1 pb-4">
        <h2 className="page-title">Hilfe & Support</h2>
        <p className="subheader">
          Häufig gestellte Fragen und nützliche Anleitungen
        </p>
      </div>

      <div className="flex flex-col gap-6 mt-4">
        {/* Schnellstart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-violet-600" />
              Schnellstart
            </CardTitle>
            <CardDescription>
              Die wichtigsten Schritte für den Einstieg
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-950 space-y-2">
                <Car className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                <h3 className="font-semibold text-sm">1. Fahrt starten</h3>
                <p className="text-xs text-muted-foreground">
                  Geben Sie eine Zieladresse ein, wählen Sie den Fahrttyp
                  (Taxifahrt/Botenfahrt) und starten Sie die Fahrt.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 space-y-2">
                <Receipt className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-sm">2. Rechnung erstellen</h3>
                <p className="text-xs text-muted-foreground">
                  Nach Fahrtende wählen Sie die Zahlungsmethode und erstellen
                  automatisch eine PDF-Rechnung.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 space-y-2">
                <Download className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-sm">3. Rechnungen verwalten</h3>
                <p className="text-xs text-muted-foreground">
                  Alle Rechnungen werden gespeichert und können jederzeit
                  heruntergeladen oder online angesehen werden.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Fahrten */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5 text-violet-600" />
              FAQ - Fahrten
            </CardTitle>
            <CardDescription>
              Häufige Fragen zu Fahrten und Navigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="start-ride">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Wie starte ich eine Fahrt?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Navigieren Sie zur Seite "Fahrt starten" (nur mobil)</li>
                    <li>Geben Sie die Zieladresse ein</li>
                    <li>Wählen Sie "Taxifahrt" oder "Botenfahrt"</li>
                    <li>Klicken Sie auf "Route berechnen"</li>
                    <li>Starten Sie die Fahrt mit "Start Fahrt"</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ride-types">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Was ist der Unterschied zwischen Taxifahrt und Botenfahrt?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-sidebar">
                      <p className="font-semibold">Taxifahrt</p>
                      <p className="text-xs">
                        Personenbeförderung - 10% Mehrwertsteuer
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-sidebar">
                      <p className="font-semibold">Botenfahrt</p>
                      <p className="text-xs">
                        Waren-/Paketlieferung - 20% Mehrwertsteuer
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="gps-error">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    GPS funktioniert nicht - was tun?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Prüfen Sie die Standort-Berechtigung in den Geräteeinstellungen</li>
                    <li>Aktivieren Sie GPS/Standortdienste</li>
                    <li>Stellen Sie sicher, dass Sie eine Internetverbindung haben</li>
                    <li>Laden Sie die App neu</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="view-rides">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Wo finde ich meine vergangenen Fahrten?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Navigieren Sie zur Seite "Alle Fahrten" in der Sidebar. Dort
                    können Sie:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Alle Fahrten von heute, gestern oder insgesamt sehen</li>
                    <li>Nach Datum, Distanz oder Dauer sortieren</li>
                    <li>Nach Fahrttyp filtern</li>
                    <li>Details zu einzelnen Fahrten anzeigen</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* FAQ Rechnungen */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-violet-600" />
              FAQ - Rechnungen
            </CardTitle>
            <CardDescription>
              Häufige Fragen zu Rechnungen und Zahlungen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="create-invoice">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4" />
                    Wie erstelle ich eine Rechnung?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Nach Beendigung einer Fahrt:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Werden Sie automatisch zur Zahlungsseite weitergeleitet</li>
                    <li>Wählen Sie die Zahlungsmethode (Bar oder Karte)</li>
                    <li>Optional: Geben Sie ein Trinkgeld ein</li>
                    <li>Klicken Sie auf "Rechnung erstellen"</li>
                    <li>Die PDF wird automatisch generiert und gespeichert</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="payment-methods">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Welche Zahlungsmethoden gibt es?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar">
                      <CreditCard className="w-5 h-5 text-violet-600" />
                      <div>
                        <p className="font-semibold text-sm">Karte</p>
                        <p className="text-xs">Kredit- oder Debitkarte</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar">
                      <Receipt className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-sm">Bargeld</p>
                        <p className="text-xs">Barzahlung</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="download-invoice">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Wie kann ich Rechnungen herunterladen?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Gehen Sie zur Seite "Rechnungen"</li>
                    <li>Wählen Sie die gewünschte Rechnung</li>
                    <li>Klicken Sie auf "Herunterladen"</li>
                    <li>Die PDF wird auf Ihr Gerät heruntergeladen</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="qr-code">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4" />
                    Was ist der QR-Code bei Rechnungen?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Jede Rechnung hat einen QR-Code, der direkt zur Online-Version
                    der Rechnung führt. So können Sie:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Die Rechnung mit dem Smartphone scannen</li>
                    <li>Sie direkt im Browser öffnen</li>
                    <li>Sie einfach mit anderen teilen</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="invoice-missing">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4" />
                    Rechnung wird nicht erstellt - was tun?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Prüfen Sie Ihre Internetverbindung</li>
                    <li>Stellen Sie sicher, dass alle Pflichtfelder ausgefüllt sind</li>
                    <li>Versuchen Sie es erneut</li>
                    <li>Falls das Problem weiterhin besteht, kontaktieren Sie den Support</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* FAQ Account */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-violet-600" />
              FAQ - Konto & Einstellungen
            </CardTitle>
            <CardDescription>
              Häufige Fragen zu Ihrem Account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="change-profile">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Wie ändere ich mein Profil?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Gehen Sie zu "Einstellungen"</li>
                    <li>Wählen Sie den Tab "Account"</li>
                    <li>Bearbeiten Sie Vorname, Nachname oder E-Mail</li>
                    <li>Klicken Sie auf "Änderungen speichern"</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="delete-account">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Wie lösche ich meinen Account?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-semibold text-orange-600 dark:text-orange-400">
                    Achtung: Diese Aktion kann nicht rückgängig gemacht werden!
                  </p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Gehen Sie zu "Einstellungen"</li>
                    <li>Wählen Sie den Tab "Account"</li>
                    <li>Scrollen Sie nach unten zur "Danger Zone"</li>
                    <li>Klicken Sie auf "Account löschen"</li>
                    <li>Bestätigen Sie die Löschung</li>
                  </ol>
                  <p className="text-xs mt-2">
                    Hinweis: Ihre persönlichen Daten werden anonymisiert.
                    Geschäftsdaten werden gemäß österreichischem Steuerrecht 7
                    Jahre aufbewahrt.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="login-error">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Login funktioniert nicht - was tun?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Überprüfen Sie Ihre E-Mail-Adresse und Passwort</li>
                    <li>Stellen Sie sicher, dass Caps Lock deaktiviert ist</li>
                    <li>Löschen Sie den Browser-Cache</li>
                    <li>Falls Sie Ihr Passwort vergessen haben, kontaktieren Sie den Support</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Support Kontakt */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-violet-600" />
              Support & Kontakt
            </CardTitle>
            <CardDescription>
              Brauchen Sie weitere Hilfe?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Falls Sie Ihre Frage hier nicht finden konnten, helfen wir Ihnen
              gerne weiter:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button asChild variant="outline">
                <a
                  href="https://github.com/zynqly-smartkassa/smart-kassa/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Issues
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/documentation">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Zur Dokumentation
                </a>
              </Button>
            </div>

            <div className="pt-4 border-t space-y-2">
              <p className="text-sm font-semibold">Team Kontakte:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="p-2 rounded-lg bg-sidebar">
                  <p className="font-medium">Casper Zielinski</p>
                  <p className="text-xs text-muted-foreground">Fullstack Developer</p>
                </div>
                <div className="p-2 rounded-lg bg-sidebar">
                  <p className="font-medium">Mario Shenouda</p>
                  <p className="text-xs text-muted-foreground">CEO & Backend</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weiterführende Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-violet-600" />
              Weiterführende Links
            </CardTitle>
            <CardDescription>
              Nützliche externe Ressourcen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button asChild variant="outline">
                <a
                  href="https://github.com/zynqly-smartkassa/smart-kassa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Source Code
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://www.figma.com/design/BPqmonzixS6mlzLSKTUJoK/Zynqly---Smart-Kassa-Project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Figma Design
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Help;