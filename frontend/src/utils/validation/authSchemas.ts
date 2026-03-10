import { z } from "zod";

export const registerMessages = {
  vorname: { required: "Bitten geben Sie ihren Vornamen ein" },
  nachname: { required: "Bitten geben Sie ihren Nachnamen ein" },
  email: { invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein" },
  phone: {
    invalid: "Bitte geben Sie eine gültige Telefonnummer ein (7-20 Zeichen)",
  },
  fn: {
    invalid:
      "Bitte geben Sie eine gültige Firmenbuchnummer ein (Format:FN123456a)",
  },
  atu: {
    invalid:
      "Bitte geben Sie eine gültige Umsatzsteuer-ID ein (Format: ATU123456789)",
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
} as const;

export const loginMessages = {
  email: { invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein" },
  password: { tooShort: "Passwort braucht mindestens 8 Zeichen" },
} as const;

const rv = registerMessages;

export const registerSchema = z
  .object({
    vorname: z.string().trim().min(1, rv.vorname.required),
    nachname: z.string().trim().min(1, rv.nachname.required),
    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        rv.email.invalid,
      ),
    telefon: z
      .string()
      .min(7, rv.phone.invalid)
      .regex(/^[\d\s+()-]{7,20}$/, rv.phone.invalid),
    firmenbuchnummer: z
      .string()
      .regex(/^FN\d{6}[a-z]$/, rv.fn.invalid),
    atu: z
      .string()
      .transform((val) => val.trim().replace(/[\s/]/g, ""))
      .pipe(z.string().regex(/^ATU\d{9}$/, rv.atu.invalid)),
    password: z
      .string()
      .min(8, rv.password.tooShort)
      .regex(/[0-9]/, rv.password.missingNumber)
      .regex(/[!@#$%^&*()§_+=[\]{};':"\\|,.<>/?-]/, rv.password.missingSymbol),
    confirmPassword: z.string().min(1, rv.confirmPassword.required),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: rv.confirmPassword.invalid,
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

const lv = loginMessages;

export const loginSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      lv.email.invalid,
    ),
  password: z.string().min(8, lv.password.tooShort),
});

export type LoginFormData = z.infer<typeof loginSchema>;
