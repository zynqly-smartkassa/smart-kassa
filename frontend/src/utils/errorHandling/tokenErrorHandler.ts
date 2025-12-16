import { toast } from "sonner";
import { toastMessages } from "../../content/auth/toastMessages";

/**
 * Handles JWT/token-related errors and displays appropriate toast messages
 * @param error - The error object to handle
 * @param className - Optional className for the toast (default: "mt-5 md:mt-0")
 * @author Casper Zielinski
 */
export function handleTokenError(
  error: unknown,
  className: string = "mt-5 md:mt-0"
): void {
  console.error(error);
  const t = toastMessages.token;

  // Display appropriate error message based on error type
  if (error instanceof Error) {
    switch (error.message) {
      case "Session Expired":
        toast.error(t.error.sessionExpired, { className });
        break;
      case "Refresh Token Expired":
        toast.error(t.error.refreshTokenExpired, { className });
        break;
      case "Refresh Token Invalid":
        toast.error(t.error.refreshTokenInvalid, { className });
        break;
      case "Refresh Token Required":
        toast.error(t.error.refreshTokenRequired, { className });
        break;
      case "Failed to Refresh Token":
        toast.error(t.error.failedToRefresh, { className });
        break;
      case "Unauthorized":
        toast.error(t.error.unauthorized, { className });
        break;
      case "Authentication Failed":
        toast.error(t.error.authenticationFailed, { className });
        break;
      case "Internal Server Error":
        toast.error(t.error.internalServerError, { className });
        break;
      case "Network Error":
        toast.error(t.error.networkError, { className });
        break;
      case "Timeout":
        toast.error(t.error.timeout, { className });
        break;
      default:
        break;
    }
  } else {
    toast.error(t.error.sessionExpired, { className });
  }
}
