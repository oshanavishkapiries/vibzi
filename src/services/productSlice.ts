import { apiSlice } from "./apiSlice";

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchProducts: builder.query({
      query: (data) => ({
        url: `/provider-service/product/search?provider=VIATOR`,
        method: "POST",
        body: data,
      }),
    }),
    productById: builder.query({
      query: (id) => ({
        url: `/provider-service/product/search?productCode=${id}&provider=VIATOR`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchProductsQuery , useProductByIdQuery } = productSlice;
