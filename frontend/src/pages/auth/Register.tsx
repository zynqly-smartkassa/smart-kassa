import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import {
  useInvalidATU,
  useInvalidConfirmPassword,
  useInvalidEmail,
  useInvalidFirmenbuchnummer,
  useInvalidPassword,
  useInvalidTelefonnummer,
  useInvalidUsername,
  type PASSWORD_VALIDATOR,
} from "../../hooks/useValidator";
import { authContent } from "../../content/auth/auth";
import { validationMessages } from "../../content/auth/validationMessages";
import { toastMessages } from "../../content/auth/toastMessages";
import type { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useWarningToast } from "../../hooks/useToast";
import { register } from "../../utils/auth";
import { toast } from "sonner";
import { handleRegisterError } from "../../utils/errorHandling";
import type {
  Container,
  PasswordContainer,
  showError,
} from "../../../constants/Compontents";
import Inputs from "../../components/Inputs";
import PasswordInputs from "../../components/PasswordInputs";
import { useCheckForNews } from "../notifications/useNews";


/**
 * The Sign Up page, where users Sign Up
 * @returns Register Page where Users can Sign Up
 * @author Casper Zielinski
 * @author 
 */
function Register() {
  // useState Hooks for the Form
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [atu, setAtu] = useState("");
  const [firmenbuchnummer, setFirmenbuchnummer] = useState("");
  const [telefonnummer, setTelefonnummer] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  useCheckForNews(isRegistered);
  const navigator = useNavigate();

  // Constant Values for Messages for the User
  const r = authContent.register;
  const v = validationMessages.register;
  const t = toastMessages.register;

  // to show the user how to input valid data and in which input field
  const [showHint, setShowHint] = useState<showError>({
    Firstnamefocused: false,
    LastnameFocused: false,
    EmailFocused: false,
    PasswordFocused: false,
    ConfirmPasswordFocused: false,
    ATUFocused: false,
    FNFocused: false,
    TelefonnummerFocused: false,
  });

  // invalid... returns true if used value is invalid
  const invalidFirstname = useInvalidUsername(firstname);
  const invalidLastname = useInvalidUsername(lastname);
  const invalidEmail = useInvalidEmail(email);
  const invalidATU = useInvalidATU(atu);
  const invalidFN = useInvalidFirmenbuchnummer(firmenbuchnummer);
  const invalidTelefonNumber = useInvalidTelefonnummer(telefonnummer);
  const invalidPassword: PASSWORD_VALIDATOR = useInvalidPassword(password);
  const invalidConfirmPassword = useInvalidConfirmPassword(
    password,
    confirmPassword
  );

  // Redux States and Dispatches
  const toastState = useSelector((state: RootState) => state.toastState);
  const dispatch: AppDispatch = useDispatch();

  // to show the User that he has to log in to use the app
  useWarningToast(toastState.showWarning, t.warning.title, dispatch);

  //Form Validator, so the username is not empty, the email is not unvalid and the password is min. 6 chars long, one Special char and one Digit
  const formUnvalid =
    invalidFirstname ||
    invalidLastname ||
    invalidEmail ||
    invalidPassword.passwordIsInvalid ||
    invalidConfirmPassword.invalid ||
    invalidATU ||
    invalidFN ||
    invalidTelefonNumber;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.promise(
      async () => {
        await register(
          firstname,
          lastname,
          email,
          telefonnummer,
          password,
          firmenbuchnummer,
          atu,
          dispatch // to set Global User Variable (Injected)
        );
      },
      {
        loading: "Registrierung...",
        success: async () => {
          await navigator("/");
          setIsRegistered(true);
          return t.success.title;
        },
        error: (err) => handleRegisterError(err),
        className: "mt-5 md:mt-0",
      }
    );
  };

  const nameContainer: Container[] = [
    {
      className:
        (invalidFirstname &&
          showHint.Firstnamefocused &&
          "border-2 border-red-500") ||
        "",
      id: "vorname",
      label: r.labels.vorname,
      onBlurListener: () =>
        setShowHint((prev) => ({
          ...prev,
          Firstnamefocused: true,
        })),
      onChangeListener: setFirstname,
      onFocusListener: () =>
        setShowHint((prev) => ({
          ...prev,
          Firstnamefocused: false,
        })),
      placeholder: r.placeholders.vorname,
      type: "text",
      validation: invalidFirstname && showHint.Firstnamefocused,
      value: firstname,
      validationMessage: v.vorname.required,
      autocomplete: "name",
    },
    {
      className:
        (invalidLastname &&
          showHint.LastnameFocused &&
          "border-2 border-red-500") ||
        "",
      id: "nachname",
      label: r.labels.nachanme,
      onBlurListener: () =>
        setShowHint((prev) => ({
          ...prev,
          LastnameFocused: true,
        })),
      onChangeListener: setLastname,
      onFocusListener: () =>
        setShowHint((prev) => ({
          ...prev,
          LastnameFocused: false,
        })),
      placeholder: r.placeholders.nachanme,
      type: "text",
      validation: invalidLastname && showHint.LastnameFocused,
      value: lastname,
      validationMessage: v.nachname.required,
      autocomplete: "family-name",
    },
  ];

  const verificationContainer: Container[] = [
    {
      className:
        (invalidEmail && showHint.EmailFocused && "border-2 border-red-500") ||
        "",
      id: "email",
      label: r.labels.email,
      onBlurListener: () =>
        setShowHint((prev) => ({ ...prev, EmailFocused: true })),
      onChangeListener: setEmail,
      onFocusListener: () =>
        setShowHint((prev) => ({ ...prev, EmailFocused: false })),
      placeholder: r.placeholders.email,
      type: "email",
      validation: invalidEmail && showHint.EmailFocused,
      validationMessage: v.email.invalid,
      value: email,
      autocomplete: "email",
    },
    {
      className:
        (invalidTelefonNumber &&
          showHint.TelefonnummerFocused &&
          "border-2 border-red-500") ||
        "",
      id: "Telefonnummer",
      label: r.labels.phone,
      onBlurListener: () =>
        setShowHint((prev) => ({
          ...prev,
          TelefonnummerFocused: true,
        })),
      onChangeListener: setTelefonnummer,
      onFocusListener: () =>
        setShowHint((prev) => ({
          ...prev,
          TelefonnummerFocused: false,
        })),
      placeholder: r.placeholders.phone,
      type: "tel",
      validation: invalidTelefonNumber && showHint.TelefonnummerFocused,
      validationMessage: v.phone.invalid,
      value: telefonnummer,
      autocomplete: "tel",
    },
  ];

  const businessContainer: Container[] = [
    {
      className:
        (invalidFN && showHint.FNFocused && "border-2 border-red-500") || "",
      id: "FirmenBuchNummer",
      label: r.labels.fn,
      onBlurListener: () =>
        setShowHint((prev) => ({ ...prev, FNFocused: true })),
      onChangeListener: setFirmenbuchnummer,
      onFocusListener: () =>
        setShowHint((prev) => ({ ...prev, FNFocused: false })),
      placeholder: r.placeholders.fn,
      type: "text",
      validation: invalidFN && showHint.FNFocused,
      validationMessage: v.fn.invalid,
      value: firmenbuchnummer,
      autocomplete: "off",
    },
    {
      className:
        (invalidATU && showHint.ATUFocused && "border-2 border-red-500") || "",
      id: "ATU",
      label: r.labels.atu,
      onBlurListener: () =>
        setShowHint((prev) => ({ ...prev, ATUFocused: true })),
      onChangeListener: setAtu,
      onFocusListener: () =>
        setShowHint((prev) => ({ ...prev, ATUFocused: false })),
      placeholder: r.placeholders.atu,
      type: "text",
      validation: invalidATU && showHint.ATUFocused,
      validationMessage: v.atu.invalid,
      value: atu,
      autocomplete: "off",
    },
  ];

  const passwordContainer: PasswordContainer[] = [
    {
      className:
        (invalidPassword.passwordIsInvalid &&
          showHint.PasswordFocused &&
          "border-2 border-red-500") ||
        "",
      id: "password",
      label: r.labels.password,
      onBlurListener: () =>
        setShowHint((prev) => ({
          ...prev,
          PasswordFocused: true,
        })),
      onChangeListener: setPassword,
      setShowPassword: setShowPassword,
      showPassword: showPassword,
      placeholder: r.placeholders.password,
      title: "Über 6 Zeichen mit einer Zahl und einem Zeichen",
      type: showPassword ? "text" : "password",
      validation: [
        !invalidPassword.passwordhasNumber && showHint.PasswordFocused,
        !invalidPassword.passwordhasSpecialChar && showHint.PasswordFocused,
        !invalidPassword.passwordminimum6Chars && showHint.PasswordFocused,
      ],
      validationMessage: [
        v.password.missingNumber,
        v.password.missingSymbol,
        v.password.tooShort,
      ],
      value: password,
      autocomplete: "new-password",
    },
    {
      className:
        (invalidConfirmPassword.invalid &&
          showHint.ConfirmPasswordFocused &&
          "border-2 border-red-500") ||
        "",
      id: "confirmPassword",
      label: r.labels.confirmPassword,
      onBlurListener: () =>
        setShowHint((prev) => ({
          ...prev,
          ConfirmPasswordFocused: true,
        })),
      onChangeListener: setConfirmPassword,
      setShowPassword: setShowConfirmPassword,
      showPassword: showConfirmPassword,
      placeholder: r.placeholders.confirmPassword,
      title: "Über 6 Zeichen mit einer Zahl und einem Zeichen",
      type: showConfirmPassword ? "text" : "password",
      validation: [
        invalidConfirmPassword.missing && showHint.ConfirmPasswordFocused,
        !invalidConfirmPassword.matching && showHint.ConfirmPasswordFocused,
      ],
      validationMessage: [
        v.confirmPassword.required,
        v.confirmPassword.invalid,
      ],
      value: confirmPassword,
      autocomplete: "off",
    },
  ];

  return (
    <main className="py-7 min-w-screen min-h-screen flex justify-center items-center bg-zinc-200 dark:bg-black overflow-y-auto scrollbar-hide pt-5 md:pt-2">
      <Card className="w-11/12 max-w-sm md:max-w-xl my-5 dark:bg-zinc-900 pt-4">
        <img
          src="Logo.png"
          width={220}
          height={220}
          alt="Logo"
          className="mx-auto mb-2"
        ></img>
        <CardHeader className="text-center">
          <CardTitle>{r.heading.title}</CardTitle>
          <CardDescription>{r.heading.subtitle}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            {/* Main Container */}
            <div className="flex flex-col gap-6">
              {/* Name Container */}
              <Inputs Containers={nameContainer} />
              {/* Email - Number - Container */}
              <Inputs Containers={verificationContainer} />
              {/* FN - ATU - Container */}
              <Inputs Containers={businessContainer} />
              {/* password - Container */}
              <PasswordInputs PasswordContainer={passwordContainer} />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="btn-auth-submit"
              disabled={formUnvalid}
              data-testid="register"
            >
              {r.buttons.register}
            </Button>
            <Button type="button" variant="outline" className="w-full">
              {r.buttons.google}
            </Button>
            <div className="w-full flex justify-center mt-2 text-center">
              <div className="text-sm text-muted-foreground">
                <p>{r.footer.text}</p>
                <Link
                  to="/login"
                  className="auth-link"
                  data-testid="loginLink"
                >
                  {r.footer.link}
                </Link>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}

export default Register;
