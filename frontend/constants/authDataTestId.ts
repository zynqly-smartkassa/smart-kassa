export const authTestIds = {
  register: {
    vorname: "vorname",
    nachname: "nachname",
    email: "email",
    telefonnummer: "Telefonnummer",
    firmenBuchNummer: "FirmenBuchNummer",
    atu: "ATU",
    password: "password",
    confirmPassword: "confirmPassword",
    registerButton: "registerButton",
    loginLink: "loginLink",
  },
  login: {
    email: "email",
    password: "password",
    loginButton: "login",
    registerLink: "registerLink",
  },
  modal: {
    logoutTrigger: "modal-logout-trigger",
    logoutButton: "modal-logout-button",
    deleteAccountTrigger: "model-delete-account-trigger",
    confirmPassword: "confirm-password-delete-account",
    deleteAccountButton: "delete-account-button",
  },
} as const;
