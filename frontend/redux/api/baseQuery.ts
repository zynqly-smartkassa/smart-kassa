import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { AuthStorage } from "../../src/utils/secureStorage";
import { refreshAccessToken } from "../../src/utils/auth/jwttokens";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL as string,
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const accessToken = await AuthStorage.getAccessToken();

  const withAuth = (token: string) =>
    typeof args === "string"
      ? { url: args, headers: { Authorization: `Bearer ${token}` } }
      : {
          ...args,
          headers: {
            ...(args.headers ?? {}),
            Authorization: `Bearer ${token}`,
          },
        };

  let result = await rawBaseQuery(withAuth(accessToken!), api, extraOptions);

  if (
    result.error &&
    (result.error?.status === 401 ||
      result.error?.status === 403 ||
      result.error?.status === 500)
  ) {
    const errorData = result.error.data as { error: string; path: string };
    if (errorData.path === "auth middleware") {
      const newToken = await refreshAccessToken();
      result = await rawBaseQuery(withAuth(newToken), api, extraOptions);
    }
  }

  return result;
};
