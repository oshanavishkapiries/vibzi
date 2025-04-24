import { apiSlice1 } from "../../slices/apiSlice";

interface CountrySearchRequest {
  type: string;
  name: string | null;
  page: number;
  size: number;
}

interface PackageSearchRequest {
  title: string | null;
  provider: string | null;
  country: string | null;
  destination: string | null;
  packageType: string;
  region: string | null;
  userId: string | null;
  page: number;
  size: number;
}

export const esimSlice = apiSlice1.injectEndpoints({
  endpoints: (builder) => ({
    searchCountriesOrRegions: builder.mutation<any, CountrySearchRequest>({
      query: (data) => ({
        url: `/provider-service/countries-or-regions/search`,
        method: "POST",
        body: data,
      }),
    }),

    searchPackages: builder.mutation<any, PackageSearchRequest>({
      query: (data) => ({
        url: `/provider-service/packages/search`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSearchCountriesOrRegionsMutation,
  useSearchPackagesMutation,
} = esimSlice; 