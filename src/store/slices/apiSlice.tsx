import { getAuthToken } from "@/utils/getAuthToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const provider_service_url = process.env.NEXT_PUBLIC_PROVIDER_SERVICE_URL;
const common_service_url = process.env.NEXT_PUBLIC_COMMON_SERVICE_URL;

export const apiSlice = createApi({
  reducerPath: "apiOne",
  baseQuery: fetchBaseQuery({
    baseUrl: provider_service_url,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const apiSlice1 = createApi({
  reducerPath: "apiTwo",
  baseQuery: fetchBaseQuery({
    baseUrl: common_service_url,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "trips",
    "itineraries",
    "trips-id",
    "checklists",
    "attachments",
    "TripMembers",
    "TripInvites",
  ],

  endpoints: () => ({}),
});
