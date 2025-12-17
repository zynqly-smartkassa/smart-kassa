// 🔹 Gemeinsame Toast-Texte
const shared = {
  errorPrefix: "Fehler:",
  successPrefix: "Erfolg:",
} as const;

// 🔹 Auth-Toasts
export const toastMessages = {
  shared,
  login: {
    success: {
      title: `${shared.successPrefix} Login erfolgreich! Sie werden weitergeleitet...`,
    },
    error: {
      title: `${shared.errorPrefix} Login fehlgeschlagen! Bitte überprüfen Sie Ihre E-Mail-Adresse und Ihr Kennwort.`,
      wrongCredentials: `${shared.errorPrefix} Ungültige E-Mail-Adresse oder falsches Passwort. Bitte versuchen Sie es erneut.`,
      userNotFound: `${shared.errorPrefix} Kein Konto mit dieser E-Mail-Adresse gefunden. Bitte registrieren Sie sich oder überprüfen Sie Ihre E-Mail-Adresse.`,
      internalServerError: `${shared.errorPrefix} Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.`,
      missingFields: `${shared.errorPrefix} Bitte füllen Sie alle erforderlichen Felder aus.`,
      networkError: `${shared.errorPrefix} Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.`,
      timeout: `${shared.errorPrefix} Die Anfrage hat zu lange gedauert. Bitte versuchen Sie es erneut.`,
      unauthorized: `${shared.errorPrefix} Zugriff verweigert. Bitte überprüfen Sie Ihre Anmeldedaten.`,
    },
    warning: {
      title:
        "Hinweis: Sie müssen sich anmelden oder registrieren, bevor Sie unseren Service nutzen können.",
    },
  },
  register: {
    success: {
      title: `${shared.successPrefix} Registrierung erfolgreich! Sie werden jetzt weitergeleitet`,
    },
    error: {
      title: `${shared.errorPrefix} Registrierung fehlgeschlagen! Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.`,
      emailAlreadyInUse: `${shared.errorPrefix} Diese Email wird bereits verwendet, Melden sie sich an oder Erstellen sie ein neues Konto mit einer anderen Email`,
      phoneNumberAlreadyInUse: `${shared.errorPrefix} Diese Telefonnumer wird bereits verwendet, Melden sie sich mit ihrer Email an oder geben sie eine neue Telefonnumer an `,
      fnAlreadyInUse: `${shared.errorPrefix} Diese Firmenbuchnummer wird bereits verwendet, Melden sie sich mit ihrer Email an`,
      atuAlreadyInUse: `${shared.errorPrefix} Diese ATU-Nummer wird bereits verwendet, Melden sie sich mit ihrer Email an`,
      internalServerError: `${shared.errorPrefix} Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.`,
      missingFields: `${shared.errorPrefix} Bitte füllen Sie alle erforderlichen Felder aus.`,
      networkError: `${shared.errorPrefix} Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.`,
      timeout: `${shared.errorPrefix} Die Anfrage hat zu lange gedauert. Bitte versuchen Sie es erneut.`,
      emptyResponse: `${shared.errorPrefix} Der Server hat keine Antwort gesendet. Bitte versuchen Sie es erneut.`,
      conflict: `${shared.errorPrefix} Ein Konflikt ist aufgetreten. Einige Ihrer Daten werden bereits verwendet.`,
    },
    warning: {
      title:
        "Hinweis: Sie müssen sich anmelden oder registrieren, bevor Sie unseren Service nutzen können.",
    },
  },
  token: {
    error: {
      sessionExpired: `${shared.errorPrefix} Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.`,
      noAccessToken: `${shared.errorPrefix} Bitte melden Sie sich an.`,
      invalidToken: `${shared.errorPrefix} Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.`,
      refreshTokenExpired: `${shared.errorPrefix} Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.`,
      refreshTokenInvalid: `${shared.errorPrefix} Ihre Sitzung ist ungültig. Bitte melden Sie sich erneut an.`,
      refreshTokenRequired: `${shared.errorPrefix} Bitte melden Sie sich an.`,
      failedToRefresh: `${shared.errorPrefix} Ihre Sitzung konnte nicht erneuert werden. Bitte melden Sie sich erneut an.`,
      unauthorized: `${shared.errorPrefix} Bitte melden Sie sich an, um fortzufahren.`,
      authenticationFailed: `${shared.errorPrefix} Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.`,
      internalServerError: `${shared.errorPrefix} Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.`,
      networkError: `${shared.errorPrefix} Keine Internetverbindung. Bitte überprüfen Sie Ihre Verbindung.`,
      timeout: `${shared.errorPrefix} Die Verbindung hat zu lange gedauert. Bitte versuchen Sie es erneut.`,
      emptyResponse: `${shared.errorPrefix} Keine Antwort vom Server. Bitte versuchen Sie es erneut.`,
    },
  },
  logout: {
    success: {
      title: `${shared.successPrefix} Erfolgreich abgemeldet!`,
    },
    error: {
      title: `${shared.errorPrefix} Abmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.`,
      missingFields: `${shared.errorPrefix} Fehlende Informationen. Bitte versuchen Sie es erneut.`,
      userNotFound: `${shared.errorPrefix} Benutzer nicht gefunden. Bitte melden Sie sich erneut an.`,
      internalServerError: `${shared.errorPrefix} Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.`,
      networkError: `${shared.errorPrefix} Keine Internetverbindung. Bitte überprüfen Sie Ihre Verbindung.`,
      timeout: `${shared.errorPrefix} Die Verbindung hat zu lange gedauert. Bitte versuchen Sie es erneut.`,
    },
  },
  deleteAccount: {
    success: {
      title: `${shared.successPrefix} Ihr Konto wurde erfolgreich gelöscht.`,
    },
    error: {
      title: `${shared.errorPrefix} Konto konnte nicht gelöscht werden. Bitte versuchen Sie es erneut.`,
      invalidPassword: `${shared.errorPrefix} Falsches Passwort. Bitte versuchen Sie es erneut.`,
      missingFields: `${shared.errorPrefix} Fehlende Informationen. Bitte versuchen Sie es erneut.`,
      userNotFound: `${shared.errorPrefix} Benutzer nicht gefunden.`,
      unauthorized: `${shared.errorPrefix} Nicht autorisiert. Bitte melden Sie sich an.`,
      internalServerError: `${shared.errorPrefix} Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.`,
      networkError: `${shared.errorPrefix} Keine Internetverbindung. Bitte überprüfen Sie Ihre Verbindung.`,
      timeout: `${shared.errorPrefix} Die Verbindung hat zu lange gedauert. Bitte versuchen Sie es erneut.`,
    },
  },
} as const;
