export interface PasswordErrors {
  tooShort: string;
  missingNumber: string;
  missingSymbol: string;
}

export interface ConfirmPasswordErrors {
  required: string;
  invalid: string;
}


// 🔹 Alle Validierungsnachrichten
export const validationMessages = {
  // 🔸 Login-bezogene Fehler
  login: {
    email: {
      invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
      required: "E-Mail-Adresse darf nicht leer sein",
    },
    password: {
      tooShort: "Passwort braucht mindestens 8 Zeichen"
    },
  },

  // 🔸 Register-bezogene Fehler
  register: {
    vorname: {
      required: "Bitten geben Sie ihren Vornamen ein",
    },
    nachname: {
      required: "Bitten geben Sie ihren Nachnamen ein",
    },
    email: {
      invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    },
    atu: {
      invalid:
        "Bitte geben Sie eine gültige Umsatzsteuer-ID ein (Format: ATU123456789)",
    },
    fn: {
      invalid:
        "Bitte geben Sie eine gültige Firmenbuchnummer ein (Format:FN123456a)",
    },
    phone: {
      invalid: "Bitte geben Sie eine gültige Telefonnummer ein (7-20 Zeichen)",
    },
    password: {
      tooShort: "Das Passwort muss mindestens 8 Zeichen enthalten",
      missingNumber: "Das Passwort muss mindestens eine Zahl enthalten",
      missingSymbol: "Das Passwort muss mindestens ein Sonderzeichen enthalten",
    },
    confirmPassword: {
      required: "Bitte bestätigen Sie Ihr Passwort",
      invalid: "Die Passwörter stimmen nicht überein",
    },
  },
} as const;
