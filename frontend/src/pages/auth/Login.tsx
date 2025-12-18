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
import { toast } from "sonner";
import { useState } from "react";
import {
  useInvalidEmail,
  useInvalidPassword,
  type PASSWORD_VALIDATOR,
} from "../../hooks/useValidator";
import { authContent } from "../../content/auth/auth";
import { validationMessages } from "../../content/auth/validationMessages";
import { toastMessages } from "../../content/auth/toastMessages";
import { useWarningToast } from "../../hooks/useToast";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { login } from "../../utils/auth";
import { handleLoginError } from "../../utils/errorHandling";
import type {
  Container,
  LoginShowError,
  PasswordContainer,
} from "../../../constants/Compontents";
import Inputs from "../../components/Inputs";
import PasswordInputs from "../../components/PasswordInputs";

/**
 * The Login page, where users sign in
 * @returns Login Page where Users can Sign In
 * @author Umejr Džinović
 * @author Casper Zielinski
 */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // to show the user how to input valid data and in which input field
  const [showHint, setShowHint] = useState<LoginShowError>({
    EmailFocused: false,
    PasswordFocused: false,
  });

  const l = authContent.login;
  const v = validationMessages.login;
  const t = toastMessages.login;

  const navigator = useNavigate();

  // Redux States and Dispatches
  const toastState = useSelector((state: RootState) => state.toastState);
  const dispatch: AppDispatch = useDispatch();

  const invalidemail = useInvalidEmail(email);
  const invalidPassword: PASSWORD_VALIDATOR = useInvalidPassword(password);

  async function handleLogin() {
    toast.promise(
      async () => {
        await login(email, password, dispatch);
      },
      {
        loading: "Anmelden...",
        success: async () => {
          await navigator("/");
          return t.success.title;
        },
        error: (err) => handleLoginError(err),
        className: "mt-5 md:mt-0",
      }
    );
  }

  useWarningToast(toastState.showWarning, t.warning.title, dispatch);

  //Form Validator, so the username is not empty, the email is not unvalid and the password is min. 6 chars long, one Special char and one Digit
  const formUnvalid = invalidemail || !invalidPassword.passwordminimum6Chars;

  const emailContainer: Container[] = [
    {
      className:
        (invalidemail && showHint.EmailFocused && "border-2 border-red-500") ||
        "",
      id: "email",
      label: l.labels.email,
      onBlurListener: () =>
        setShowHint((prev) => ({ ...prev, EmailFocused: true })),
      onChangeListener: setEmail,
      onFocusListener: () =>
        setShowHint((prev) => ({ ...prev, EmailFocused: false })),
      placeholder: l.placeholders.email,
      type: "email",
      validation: invalidemail && showHint.EmailFocused,
      validationMessage: v.email.invalid,
      value: email,
      autocomplete: "email",
    },
  ];

  const passwordContainer: PasswordContainer[] = [
    {
      className:
        (!invalidPassword.passwordminimum6Chars &&
          showHint.PasswordFocused &&
          "border-2 border-red-500") ||
        "",
      id: "password",
      label: "", // Empty label since we render it manually with forgot password link
      onBlurListener: () =>
        setShowHint((prev) => ({
          ...prev,
          PasswordFocused: true,
        })),
      onChangeListener: setPassword,
      setShowPassword: setShowPassword,
      showPassword: showPassword,
      placeholder: l.placeholders.password,
      title: "Über 6 Zeichen mit einer Zahl und einem Zeichen",
      type: showPassword ? "text" : "password",
      validation: [
        !invalidPassword.passwordminimum6Chars && showHint.PasswordFocused,
      ],
      validationMessage: [v.password.tooShort],
      value: password,
      autocomplete: "current-password",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <main
      className="min-w-screen min-h-screen flex justify-center items-center bg-zinc-200
     dark:bg-black overflow-y-auto scrollbar-hide pt-5 md:pt-2"
    >
      <Card className="w-11/12 max-w-sm my-5 dark:bg-zinc-900 pt-4">
        <img
          src="Logo.png"
          width={220}
          height={220}
          alt="Logo"
          className="mx-auto mb-2"
        ></img>
        <CardHeader className="text-center">
          <CardTitle>{l.heading.title}</CardTitle>
          <CardDescription>{l.heading.subtitle}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            {/* Main Container */}
            <div className="flex flex-col gap-6">
              {/* Email Container */}
              <Inputs Containers={emailContainer} classname="  " />
              {/* Password Container - with forgot password link */}
              <div>
                <div className="flex items-center mb-2">
                  <label
                    htmlFor="password"
                    className="form-label"
                  >
                    {l.labels.password}
                  </label>
                  <a
                    href="#"
                    className="auth-link-small"
                  >
                    {l.links.forgotPassword}
                  </a>
                </div>
                <PasswordInputs
                  PasswordContainer={passwordContainer}
                  classname=" "
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="btn-auth-submit"
              variant="default"
              disabled={formUnvalid}
              data-testid="login"
            >
              {l.buttons.login}
            </Button>
            <Button type="button" variant="outline" className="w-full">
              {l.buttons.google}
            </Button>
            <div className="w-full flex justify-center mt-2 text-center">
              <div className="text-sm text-muted-foreground">
                <p>{l.footer.text}</p>
                <Link
                  to="/register"
                  className="auth-link"
                  data-testid="registerLink"
                >
                  {l.footer.link}
                </Link>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}

export default Login;
