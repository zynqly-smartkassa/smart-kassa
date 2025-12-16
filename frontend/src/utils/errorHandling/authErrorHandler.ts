import { toastMessages } from "../../content/auth/toastMessages";

/**
 * Handles registration-related errors and returns appropriate error message
 * @param error - The error object to handle
 * @returns Error message string to be displayed
 * @author Casper Zielinski
 */
export function handleRegisterError(error: unknown): string {
  console.error(error);
  const t = toastMessages.register;

  if (error instanceof Error) {
    // Check if it's a specific empty fields error with field names
    if (error.message.startsWith("Empty Fields:")) {
      const fields = error.message.replace("Empty Fields: ", "");
      return `${t.error.missingFields}\nFehlende Felder: ${fields}`;
    }

    // Handle specific error messages from auth.ts
    switch (error.message) {
      case "Email already exists":
        return t.error.emailAlreadyInUse;
      case "FN already exists":
        return t.error.fnAlreadyInUse;
      case "Phonenumber already exists":
        return t.error.phoneNumberAlreadyInUse;
      case "ATU already exists":
        return t.error.atuAlreadyInUse;
      case "Internal Server Error":
        return t.error.internalServerError;
      case "Missing Fields":
        return t.error.missingFields;
      case "Network Error":
        return t.error.networkError;
      case "Timeout":
        return t.error.timeout;
      case "Response is Empty":
        return t.error.emptyResponse;
      case "Conflict":
        return t.error.conflict;
      default:
        return t.error.title;
    }
  } else {
    return t.error.title;
  }
}

/**
 * Handles login-related errors and returns appropriate error message
 * @param error - The error object to handle
 * @returns Error message string to be displayed
 * @author Casper Zielinski
 */
export function handleLoginError(error: unknown): string {
  console.error(error);
  const t = toastMessages.login;

  if (error instanceof Error) {
    // Handle specific error messages from auth.ts
    switch (error.message) {
      case "User Not Found":
        return t.error.userNotFound;
      case "Wrong Email or Password":
        return t.error.wrongCredentials;
      case "Internal Server Error":
        return t.error.internalServerError;
      case "Missing Fields":
        return t.error.missingFields;
      case "Network Error":
        return t.error.networkError;
      case "Timeout":
        return t.error.timeout;
      case "Unauthorized":
        return t.error.unauthorized;
      default:
        return t.error.title;
    }
  } else {
    return t.error.title;
  }
}

/**
 * Handles logout-related errors and returns appropriate error message
 * @param error - The error object to handle
 * @returns Error message string to be displayed
 * @author Casper Zielinski
 */
export function handleLogoutError(error: unknown): string {
  console.error(error);
  const t = toastMessages.logout;

  if (error instanceof Error) {
    // Handle specific error messages from auth.ts
    switch (error.message) {
      case "Missing Fields":
        return t.error.missingFields;
      case "User Not Found":
        return t.error.userNotFound;
      case "Internal Server Error":
        return t.error.internalServerError;
      case "Network Error":
        return t.error.networkError;
      case "Timeout":
        return t.error.timeout;
      default:
        return t.error.title;
    }
  } else {
    return t.error.title;
  }
}

/**
 * Handles delete account-related errors and returns appropriate error message
 * @param error - The error object to handle
 * @returns Error message string to be displayed
 * @author Casper Zielinski
 */
export function handleDeleteAccountError(error: unknown): string {
  console.error(error);
  const t = toastMessages.deleteAccount;

  if (error instanceof Error) {
    // Handle specific error messages from auth.ts
    switch (error.message) {
      case "Invalid Password":
        return t.error.invalidPassword;
      case "Missing Fields":
        return t.error.missingFields;
      case "User Not Found":
        return t.error.userNotFound;
      case "Unauthorized":
        return t.error.unauthorized;
      case "Internal Server Error":
        return t.error.internalServerError;
      case "Network Error":
        return t.error.networkError;
      case "Timeout":
        return t.error.timeout;
      default:
        return t.error.title;
    }
  } else {
    return t.error.title;
  }
}
