import axios, { AxiosError } from "axios";
import { refreshAccessToken } from "../auth/jwttokens";
import { AuthStorage } from "../secureStorage";
import type { Dispatch, SetStateAction } from "react";
import { setAvatarState } from "../../../redux/slices/avatarSlice";
import type { AppDispatch } from "../../../redux/store";

/**
 * Function to fetch the Avatar and dispaly it using a useState Hook (setPreview). The setPreview useState SetStateAction will set the
 * URL of the Image into the state. Additional States provided when loading and if a error occurs
 * @param retryFetch boolean value to retry if access token invalid
 * @param setLoading setLoading useState SetStateAction to set state depending on the laoding state of the avatar
 * @param setPreview setPreview useState SetStateAction to set the url of the avater/image to display avatar
 * @param setError setError useState SetStateAction to set state depending on a error in fetching the data of the avatar
 * @returns void
 * @author Casper Zielinski
 */
export async function fetchAvatar(
  retryFetch: boolean = true,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setPreview: Dispatch<SetStateAction<string | null>>,
  setError: Dispatch<SetStateAction<boolean>>,
  dispatch: AppDispatch,
) {
  try {
    let accessToken: string | null;
    if (retryFetch) {
      accessToken = await AuthStorage.getAccessToken();
    } else {
      accessToken = await refreshAccessToken();
    }

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/list-blobs/avatar`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    retryFetch = true;
    const incomingPreview = response.data.files[0].url;
    setPreview(incomingPreview);
    dispatch(setAvatarState(incomingPreview));
    setLoading(true);
    return;
  } catch (error) {
    if (error instanceof AxiosError) {
      const isAuthError =
        error.status === 403 ||
        error.status === 401 ||
        error.response?.data?.path === "auth middleware";

      if (isAuthError && retryFetch) {
        // First retry with refreshed token
        retryFetch = false;
        return await fetchAvatar(
          false,
          setLoading,
          setPreview,
          setError,
          dispatch,
        );
      } else if (isAuthError && !retryFetch) {
        // Second attempt failed - session expired
        setLoading(true);
        setError(true);
        return;
      } else {
        setLoading(true);
        setError(true);
        return;
      }
    } else {
      setLoading(true);
      setError(true);
      return;
    }
  }
}
