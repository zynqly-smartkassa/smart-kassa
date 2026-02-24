import { verifyAccessToken } from "../../utils/jwttokens";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { signInUser } from "../../../redux/slices/userSlice";
import type { USER_DTO } from "../../../constants/User";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  setAuthenticated,
  setUnauthenticated,
} from "../../../redux/slices/authSlice";
import { handleTokenError } from "../../utils/errorHandling";
import StatusOverlay from "../StatusOverlay";
import { setLink } from "../../../redux/slices/footerLinksSlice";

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

  // Check if the user is getting loaded currently
  const { isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.authState,
  );

  /**
   * useCallback is used here to create a stable reference for the 'getJWTTokens' function across renders.
   * This prevents an infinite loop, as the function is a dependency of the useEffect hook and must not change on every render.
   */
  const getJWTTokens = useCallback(async () => {
    try {
      if (!isAuthenticated) {
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
          }),
        );
        dispatch(setAuthenticated());
        dispatch(setLink(1));
      }
    } catch (error) {
      handleTokenError(error);
      await navigator("/register");
      dispatch(setUnauthenticated());
    }
  }, [dispatch, isAuthenticated, navigator]);

  useEffect(() => {
    getJWTTokens();
  }, [getJWTTokens]);
  // had to also use the authenticate value so it doesn't show home page for split second to non-loged in Users
  if (!isAuthenticated || isLoading) {
    return (
      <StatusOverlay
        text="Loading Service"
        isLoading={true}
        errorFallback={[
          "Unser Service ist leider fehlgeschlagen, bitte versuchen sie es nacher erneut!",
        ]}
      />
    );
  }

  return <>{children}</>;
};
