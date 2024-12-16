import { apiSlice } from "./apiSlice";

export const destinationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    suggestDestination: builder.query({
      query: (keyword) => ({
        url: `/provider-service/product/search-destinations?text=${keyword}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSuggestDestinationQuery } = destinationSlice;
