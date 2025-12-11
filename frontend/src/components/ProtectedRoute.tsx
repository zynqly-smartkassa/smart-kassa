import { verifyAccessToken } from "../utils/jwttokens";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { signInUser } from "../../redux/slices/userSlice";
import type { USER_DTO } from "../../constants/User";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
<<<<<<< Updated upstream
import {
  setAuthenticated,
  setUnauthenticated,
} from "../../redux/slices/authSlice";
import { toast } from "sonner";
=======
import { finishLoading, setAuthenticated, setUnauthenticated, startLoading } from "../../redux/slices/authSlice";
>>>>>>> Stashed changes

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Component used to redirect to register page if user not loged in on device
 * @param children all Components that should be only accesible if user is loged in
 * @returns
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Überprüfen, ob der User eingeloggt ist
  // Kann man später mit einem Auth-Context oder localStorage machen
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();
  const toastShownRef = useRef(false);

  // Check if the user is getting loaded currently
  const { isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.authState
  );

  // Check if the user is getting loaded currently
  const {isLoading} = useSelector((state: RootState) => state.authState);

  useEffect(() => {
    async function getJWTTokens() {

      dispatch(startLoading());

      try {
        const userData: USER_DTO = await verifyAccessToken();
        if (!userData) {
          throw new Error("User Data invalid");
        }
        dispatch(
          signInUser({
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
          })
        );
<<<<<<< Updated upstream
        dispatch(setAuthenticated());

        // Only show toast once per session
        if (!toastShownRef.current) {
          toast.success(`Welcome back ${userData.firstName}!`, {
            className: "mt-5 md:mt-0",
            position: "top-center",
          });
          toastShownRef.current = true;
        }
      } catch {
        await navigator("/register");
        dispatch(setUnauthenticated());
=======
       dispatch(setAuthenticated())
      } catch {
        navigator("/register");
        dispatch(setUnauthenticated());
        dispatch(finishLoading());
>>>>>>> Stashed changes
      }
    }
    getJWTTokens();
  }, [dispatch, navigator]);

<<<<<<< Updated upstream
  // had to also use the authenticate value so it doesn't show home page for split second to non-loged in Users
  if (!isAuthenticated || isLoading) {
    return (
=======

  if (isLoading) {
     return (
>>>>>>> Stashed changes
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};
