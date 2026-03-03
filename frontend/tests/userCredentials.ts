import { RegisterableUser } from "./helpers";

const RUN_ID = Date.now();

/**
 * Function to create Unique test credentials once per test run.
 * Used for the main registration flow in `AuthFlow.spec.ts`.
 * All UNIQUE fields (email, telefon, FN, ATU) are derived from `Date.now()`
 * to prevent DB conflicts across runs.
 * @param uniqueId to set a unique id, use Date.now()
 */
export const createUniqueUser = (
  uniqueId: number = Date.now(),
): RegisterableUser => {
  return {
    vorname: "Max",
    nachname: "Mustermann",
    email: `playwright_${uniqueId}@test.at`,
    telefon: `+43 660 ${String(uniqueId).slice(-7)}`,
    fn: `FN${String(uniqueId).slice(-6)}a`,
    atu: `ATU${String(uniqueId).slice(-9)}`,
    password: "Test1234!",
  } as const;
};

/**
 * A user registered in the logout test and reused in the login+delete test.
 * The email is intentionally fixed so it can be found across sequential tests within the same run.
 * FN, ATU and phone are unique per run to avoid DB conflicts on re-registration.
 */
export const toDeletedUser: RegisterableUser = {
  vorname: "Max",
  nachname: "Mustermann",
  email: "playwright_reload_1@test.at",
  telefon: `+43 660 ${String(RUN_ID).slice(-7)}`,
  fn: `FN${String(RUN_ID).slice(-6)}b`,
  atu: `ATU${String(RUN_ID).slice(-9)}`,
  password: "Test1234!",
} as const;

/**
 * Fixed credentials for the dedicated ride-flow test user.
 * This user must exist in the test database before `RideFlow.spec.ts` runs.
 * Create once manually or via a DB seed script — the ride flow never deletes this account.
 */
export const LOGIN_USER = {
  email: "john@doe.com",
  password: "Passwort#1",
} as const;
