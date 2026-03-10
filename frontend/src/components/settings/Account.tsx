import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteAccount, logOut } from "@/utils/auth/auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState, type ChangeEvent, type JSX } from "react";
import {
  handleLogoutError,
  handleDeleteAccountError,
} from "@/utils/errorHandling";
import { toastMessages } from "@/content/auth/toastMessages";
import axios, { AxiosError } from "axios";
import { AuthStorage } from "@/utils/secureStorage";
import { refreshAccessToken } from "@/utils/auth/jwttokens";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { updateProfile } from "@/utils/profile/updateProfile";
import { handleUpdateProfileError } from "@/utils/errorHandling/updateProfileErrorHandler";
import {
  useInvalidEmail,
  useInvalidUsername,
} from "@/hooks/userfeedback/useValidator";
import { fetchAvatar } from "@/utils/profile/getAvatar";
import { setAvatarState } from "../../../redux/slices/avatarSlice";
import { setLink } from "../../../redux/slices/footerLinksSlice";
import { authTestIds } from "../../../constants/authDataTestId";

/**
 * Account settings page component.
 *
 * Provides a comprehensive interface for managing user account information including
 * profile details (first name, last name, email), avatar, and account actions.
 * Users can update their profile information with real-time validation, revert unsaved changes,
 * log out of their account, or permanently delete their account with password confirmation.
 * The component includes form validation, optimistic updates to Redux state, and proper
 * error handling with toast notifications.
 *
 * @returns {JSX.Element} A settings page with profile management and account action controls.
 */
const Account = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const avatarState = useSelector((state: RootState) => state.avatarState.url);
  const { modal: m } = authTestIds;

  useEffect(() => {
    if (avatarState) {
      setPreview(avatarState);
      return;
    }

    fetchAvatar(true, setLoading, setPreview, setPreviewError, dispatch);
    dispatch(setLink(2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function changeAvatar(avatarFile: File, retryFetch: boolean = true) {
    try {
      let accessToken: string | null;
      if (retryFetch) {
        accessToken = await AuthStorage.getAccessToken();
      } else {
        accessToken = await refreshAccessToken();
      }

      const formData = new FormData();
      formData.append("newAvatar", avatarFile);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/storage/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      retryFetch = true;
      setPreview(response.data.url);
      dispatch(setAvatarState(response.data.url));
      return;
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        const isAuthError =
          error.status === 403 ||
          error.status === 401 ||
          error.response?.data?.path === "auth middleware";

        if (isAuthError && retryFetch) {
          // First retry with refreshed token
          retryFetch = false;
          return await changeAvatar(avatarFile, false);
        } else if (isAuthError && !retryFetch) {
          // Second attempt failed - session expired
          throw new Error(
            "Sitzung abgelaufen. Bitte melden Sie sich erneut an.",
          );
        } else {
          throw new Error(
            "Ressourcen konnten nicht geladen werden, überprüfen Sie Ihre Internetverbindung",
          );
        }
      } else {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten.");
      }
    }
  }

  const onSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      toast.info("Datei auswählen", { className: "mt-5 md:mt-0" });
      return;
    }

    const selectedFile = e.target.files[0];

    toast.promise(
      async () => {
        await changeAvatar(selectedFile);
      },
      {
        success: "Profilbild aktualisiert!",
        error: "Ein unerwarteter Fehler ist aufgetreten.",
        loading: "Profilbild wird aktualisiert",
        className: "mt-5 md:mt-0",
      },
    );
  };

  const user = useSelector((state: RootState) => state.user);

  const form = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  // Watch all form fields for changes
  const { firstName, lastName, email } = form.watch();

  // Check if any field has changed from the original user values
  const toRevert =
    user.email.trim() !== email.trim() ||
    user.firstName.trim() !== firstName.trim() ||
    user.lastName.trim() !== lastName.trim();

  const invalidFirstname = useInvalidUsername(firstName.trim());
  const invalidLastname = useInvalidUsername(lastName.trim());
  const invalidEmail = useInvalidEmail(email);

  const formInvalid = invalidFirstname || invalidLastname || invalidEmail;

  const revertChanges = () => {
    if (toRevert) {
      form.setValue("email", user.email);
      form.setValue("firstName", user.firstName);
      form.setValue("lastName", user.lastName);
      toast.success("Änderungen verworfen.", {
        duration: 3000, // 3 Sekunden sind ideal
        icon: "🗑️",
        className: "text-black dark:text-white mt-5 md:mt-0",
      });
    } else {
      toast.info("Keine Änderungen zum verwerfen!", {
        className: "mt-5 md:mt-0",
      });
    }
  };

  const navigator = useNavigate();
  const [deletePassword, setDeletePassword] = useState("");

  // to show the user how to input valid data and in which input field
  const [showHint, setShowHint] = useState({
    FirstNameFocused: false,
    LastNameFocused: false,
    EmailFocused: false,
  });

  return (
    <div className="settings-page-container">
      {/* Page Header */}
      <div className="page-header-container">
        <h2 className="page-title">Kontoeinstellungen</h2>
        <p className="subheader">
          Verwalten Sie Ihre Kontoinformationen, Avatar und
          E-Mail-Einstellungen.
        </p>
      </div>

      {/* Information Section */}
      <div className="section-container">
        {/* Left Label Column */}
        <div className="w-full md:w-64">
          <h3 className="section-header">Informationen</h3>
          <p className="section-description">
            Verwenden Sie eine Adresse, unter der Sie E-Mails empfangen können.
          </p>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-10 w-full max-w-xl">
          {/* Avatar Row */}
          <div className="flex flex-row gap-8 items-center">
            <Avatar>
              <AvatarImage
                src={
                  preview && !previewError
                    ? preview
                    : "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
                }
                alt="Profilbild"
                className="rounded-full w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover"
              />
              <AvatarFallback>
                <User className={loading ? "" : "animate-pulse"} />
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2 items-start">
              <Label
                htmlFor="AvatarChanger"
                className="underline cursor-pointer"
              >
                Neues Profilbild auswählen
              </Label>
              <input
                type="file"
                alt="Change Avatar"
                about="Change Avatar"
                title="Avatarinput"
                accept=".jpg, .png, .webp, .svg"
                id="AvatarChanger"
                className="
                text-xs hidden
                "
                onChange={onSelectFile}
              />

              <p className="text-xs font-light">JPG, GIF oder PNG. Max. 1MB.</p>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async () => {
                if (formInvalid) {
                  toast.error("Bitte füllen Sie alle Felder korrekt aus", {
                    className: "mt-5 md:mt-0",
                  });
                  return;
                }
                if (!toRevert) {
                  toast.info("Keine Änderungen zum Speichern", {
                    className: "mt-5 md:mt-0",
                  });
                  return;
                }
                if (toRevert) {
                  toast.promise(
                    async () =>
                      updateProfile(true, firstName, lastName, email, dispatch),
                    {
                      loading: "Änderungen speichern...",
                      success: "Änderung erfolgreich gespeichert!",
                      error: (err) => handleUpdateProfileError(err),
                      className: "mt-5 md:mt-0",
                    },
                  );
                }
              })}
              className="space-y-6 w-full max-w-xl"
            >
              {/* 2 column grid on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vorname</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Max"
                          onBlur={() =>
                            setShowHint((prev) => ({
                              ...prev,
                              FirstNameFocused: true,
                            }))
                          }
                          onFocus={() =>
                            setShowHint((prev) => ({
                              ...prev,
                              FirstNameFocused: false,
                            }))
                          }
                          className={
                            invalidFirstname && showHint.FirstNameFocused
                              ? "h-11 bg-gray-100 dark:bg-gray-700 border-2 border-red-500 focus:ring-2 focus:ring-violet-400"
                              : "h-11 bg-gray-100 dark:bg-gray-700 border border-violet-400 focus:ring-2 focus:ring-violet-400"
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nachname</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Mustermann"
                          onBlur={() =>
                            setShowHint((prev) => ({
                              ...prev,
                              LastNameFocused: true,
                            }))
                          }
                          onFocus={() =>
                            setShowHint((prev) => ({
                              ...prev,
                              LastNameFocused: false,
                            }))
                          }
                          className={
                            invalidLastname && showHint.LastNameFocused
                              ? "h-11 bg-gray-100 dark:bg-gray-700 border-2 border-red-500 focus:ring-2 focus:ring-violet-400"
                              : "h-11 bg-gray-100 dark:bg-gray-700 border border-violet-400 focus:ring-2 focus:ring-violet-400"
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email (full-width on desktop) */}
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-Mail</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="beispiel@mail.com"
                            onBlur={() =>
                              setShowHint((prev) => ({
                                ...prev,
                                EmailFocused: true,
                              }))
                            }
                            onFocus={() =>
                              setShowHint((prev) => ({
                                ...prev,
                                EmailFocused: false,
                              }))
                            }
                            className={
                              invalidEmail && showHint.EmailFocused
                                ? "h-11 bg-gray-100 dark:bg-gray-700 border-2 border-red-500 focus:ring-2 focus:ring-violet-400"
                                : "h-11 bg-gray-100 dark:bg-gray-700 border border-violet-400 focus:ring-2 focus:ring-violet-400"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className={
                  toRevert
                    ? "btn-main ml-2"
                    : `
                  ml-2 bg-white dark:bg-black border-violet-400 border-2 dark:border-0 black:text-white font-extrabold px-8 py-3
                  transition-all duration-200
                  hover:bg-violet-400 hover:text-white
                  hover:shadow-md
                  hover:scale-[1.02]
                  active:scale-[0.98]
                `
                }
              >
                Speichern
              </Button>
              <Button
                onClick={revertChanges}
                type="button"
                className={
                  toRevert
                    ? "btn-main ml-2"
                    : `
                  ml-2 bg-white dark:bg-black border-violet-400 border-2 dark:border-0 black:text-white font-extrabold px-8 py-3
                  transition-all duration-200
                  hover:bg-violet-400 hover:text-white
                  hover:shadow-md
                  hover:scale-[1.02]
                  active:scale-[0.98]
                `
                }
              >
                Änderungen verwerfen
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Log Out & Delete Account Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Log Out Section */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="section-header">Abmelden</h3>
            <p className="section-description">
              Melden Sie sich von Ihrem Konto ab. Sie können sich jederzeit
              wieder anmelden.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="btn-main-action"
                data-testid={m.logoutTrigger}
              >
                Abmelden
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Von Ihrem Konto abmelden?</DialogTitle>
                <DialogDescription>
                  Sie werden von Ihrem Konto abgemeldet. Sie können sich
                  jederzeit mit Ihren Anmeldedaten wieder anmelden.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  data-testid={m.logoutButton}
                  onClick={async () => {
                    toast.promise(
                      async () => {
                        await logOut(dispatch);
                      },
                      {
                        loading: "Abmelden...",
                        success: () => {
                          navigator("/register");
                          return toastMessages.logout.success.title;
                        },
                        error: (err) => handleLogoutError(err),
                        className: "mt-5 md:mt-0",
                      },
                    );
                  }}
                  className="btn-main-action"
                >
                  Abmelden
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Delete Account Section */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="section-header-danger">Konto löschen</h3>
            <p className="section-description">
              Sie möchten unseren Service nicht mehr nutzen? Diese Aktion ist
              dauerhaft und kann nicht rückgängig gemacht werden.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="btn-danger"
                data-testid={m.deleteAccountTrigger}
              >
                Mein Konto löschen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form
                name="Delete Form"
                title="Delete Account Form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!deletePassword) {
                    toast.error(
                      "Bitte geben Sie Ihr Passwort ein, um zu bestätigen",
                      {
                        className: "mt-5 md:mt-0",
                      },
                    );
                    return;
                  }
                  toast.promise(
                    async () => {
                      await deleteAccount(deletePassword, dispatch);
                    },
                    {
                      loading: "Konto wird gelöscht...",
                      success: async () => {
                        setDeletePassword("");
                        await navigator("/register");
                        return toastMessages.deleteAccount.success.title;
                      },
                      error: (err) => handleDeleteAccountError(err),
                      className: "mt-5 md:mt-0",
                    },
                  );
                }}
              >
                <DialogHeader>
                  <DialogTitle className="text-red-600">
                    Sind Sie absolut sicher?
                  </DialogTitle>
                  <DialogDescription className="flex flex-col gap-4">
                    <p>
                      Diese Aktion kann nicht rückgängig gemacht werden. Ihr
                      Konto wird dauerhaft gelöscht und Ihre Daten werden von
                      unseren Servern entfernt.
                    </p>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="delete-password"
                        className="text-sm font-semibold text-gray-900 dark:text-gray-100"
                      >
                        Geben Sie Ihr Passwort ein, um zu bestätigen:
                      </label>
                      <Input
                        required
                        id="delete-password"
                        type="password"
                        placeholder="Geben Sie Ihr Passwort ein"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        className="h-11 bg-gray-100 dark:bg-gray-700 border border-red-400 focus:ring-2 focus:ring-red-500"
                        data-testid={m.confirmPassword}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={!deletePassword}
                      data-testid={m.deleteAccountButton}
                      className=" my-2
                bg-red-500 text-white font-extrabold w-full md:w-56 py-3
                transition-all duration-200
                hover:bg-red-600
                hover:shadow-md
                hover:scale-[1.02]
                active:scale-[0.98]
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:hover:scale-100
                            "
                    >
                      Mein Konto löschen
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Account;
