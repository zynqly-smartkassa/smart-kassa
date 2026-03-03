const RUN_ID = Date.now();
const TEST_EMAIL = `playwright_${RUN_ID}@test.at`;
const TEST_PASSWORD = "Test1234!";
/** 
 * Unique Test-Credentials for every test run, to avoid conflicts
 */
export const TEST_USER = {
  vorname: "Max",
  nachname: "Mustermann",
  email: TEST_EMAIL,
  telefon: `+43 660 ${String(RUN_ID).slice(-7)}`,
  fn: `FN${String(RUN_ID).slice(-6)}a`,
  atu: `ATU${String(RUN_ID).slice(-9)}`,
  password: TEST_PASSWORD,
} as const;