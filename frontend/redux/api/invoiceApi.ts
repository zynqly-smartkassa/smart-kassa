import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const invoicesApi = createApi({
  reducerPath: "invoicesApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => ({
        url: "/invoices",
        params: { limit: 10 },
        method: "GET",
      }),
    }),
  }),
});

export const { useGetInvoicesQuery } = invoicesApi;
