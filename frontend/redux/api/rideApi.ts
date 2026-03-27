import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const rideApi = createApi({
  reducerPath: "rideApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Ride"],
  endpoints: (builder) => ({
    getRides: builder.query({
      query: (arg) => ({
        url: "/rides",
        params: { limit: 12, cursor: arg.cursor },
        method: "GET",
      }),
      providesTags: ["Ride"],
      merge: (currentCacheData, responseData) => {
        currentCacheData.rides = responseData.rides;
        currentCacheData.next_cursor = responseData.next_cursor;
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.cursor !== previousArg?.cursor,
    }),
  }),
});

export const { useGetRidesQuery } = rideApi;
