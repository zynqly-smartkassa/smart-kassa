/**
 * `data-testid` selectors for authentication-related UI elements.
 *
 * @property register - Input fields and buttons on the registration form.
 * @property login    - Input fields and buttons on the login form.
 * @property modal    - Logout and delete-account modal controls (used on the settings page).
 */
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
