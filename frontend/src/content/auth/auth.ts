// Gemeinsame Texte definieren
const shared = {
  placeholders: {
    password: "••••••••",
  },
  labels: {
    password: "Kennwort",
  },
  buttons: {
    google: "Mit Google anmelden",
  },
} as const;

// Auth-Content
export const authContent = {
  shared,
  register: {
    heading: {
      title: "Konto erstellen",
      subtitle: "Bitte geben Sie Ihre Daten ein, um ein Konto zu erstellen",
    },
    labels: {
      vorname: "Vorname",
      nachanme: "Nachname",
      email: "E-Mail-Adresse",
      atu: "Umsatzsteuer-ID (ATU)",
      fn: "Firmenbuchnummer (FN)",
      phone: "Telefonnummer",
      password: shared.labels.password,
      confirmPassword: shared.labels.password + " bestätigen"
    },
    placeholders: {
      vorname: "Max",
      nachanme: "Mustermann",
      email: "beispiel@domain.at",
      atu: "ATU123456789",
      fn: "FN123456a",
      phone: "+43 660 1234567",
      password: shared.placeholders.password,
      confirmPassword: shared.placeholders.password,
    },
    buttons: {
      register: "Jetzt registrieren",
      google: shared.buttons.google,
    },
    footer: {
      text: "Bereits registriert?",
      link: "Jetzt anmelden",
    },
  },
  login: {
    heading: {
      title: "Anmelden",
      subtitle: "Melden Sie sich mit Ihren Zugangsdaten an",
    },
    labels: {
      email: "E-Mail",
      password: shared.labels.password,
    },
    placeholders: {
      email: "beispiel@domain.at",
      password: shared.placeholders.password,
    },
    links: {
      forgotPassword: "Passwort vergessen?",
    },
    buttons: {
      login: "Jetzt anmelden",
      google: shared.buttons.google,
    },
    footer: {
      text: "Neu hier?",
      link: "Konto erstellen",
    },
  },
} as const;
