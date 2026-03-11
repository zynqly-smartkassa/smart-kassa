import { toast } from "sonner";

export function handleTokenError(
  error: unknown,
  className: string = "mt-5 md:mt-0"
): void {
  console.error(error);

  if (error instanceof Error) {
    switch (error.message) {
      case "Session Expired":
        toast.error("Fehler: Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.", { className });
        break;
      case "Refresh Token Expired":
        toast.error("Fehler: Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.", { className });
        break;
      case "Refresh Token Invalid":
        toast.error("Fehler: Ihre Sitzung ist ungültig. Bitte melden Sie sich erneut an.", { className });
        break;
      case "Refresh Token Required":
        toast.error("Fehler: Bitte melden Sie sich an.", { className });
        break;
      case "Failed to Refresh Token":
        toast.error("Fehler: Ihre Sitzung konnte nicht erneuert werden. Bitte melden Sie sich erneut an.", { className });
        break;
      case "Unauthorized":
        toast.error("Fehler: Bitte melden Sie sich an, um fortzufahren.", { className });
        break;
      case "Authentication Failed":
        toast.error("Fehler: Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.", { className });
        break;
      case "Internal Server Error":
        toast.error("Fehler: Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.", { className });
        break;
      case "Network Error":
        toast.error("Fehler: Keine Internetverbindung. Bitte überprüfen Sie Ihre Verbindung.", { className });
        break;
      case "Timeout":
        toast.error("Fehler: Die Verbindung hat zu lange gedauert. Bitte versuchen Sie es erneut.", { className });
        break;
      default:
        break;
    }
  } else {
    toast.error("Fehler: Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.", { className });
  }
}
