import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const invoicesApi = createApi({
  reducerPath: "invoicesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Invoice"],
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: (arg) => ({
        url: "/storage/invoices",
        params: { limit: 12, token: arg.token },
        method: "GET",
      }),
      providesTags: ["Invoice"],
      merge: (currentCacheData, responseData) => {
        currentCacheData.files = responseData.files;
        currentCacheData.nextContinuationToken =
          responseData.nextContinuationToken;
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.token !== previousArg?.token,
    }),
    createInvoice: builder.mutation({
      query: (body) => ({ url: "/invoices", method: "POST", body }),
      invalidatesTags: ["Invoice"],
    }),
  }),
});

export const { useGetInvoicesQuery } = invoicesApi;
