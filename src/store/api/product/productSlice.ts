import { apiSlice } from "../../slices/apiSlice";

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchProducts: builder.query({
      query: (data) => ({
        url: `/provider-service/product/${data?.destinationId ? "search":"search-free-text"}?provider=VIATOR`,
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
