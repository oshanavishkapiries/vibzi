import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const provider_service_url = process.env.NEXT_PUBLIC_PROVIDER_SERVICE_URL;
const common_service_url = process.env.NEXT_PUBLIC_COMMON_SERVICE_URL;

const getAuthToken = () => {
  try {
    const accessTokenKey = Object.keys(localStorage).find(key => key.endsWith('.accessToken'));
    
    if (!accessTokenKey) {
      return null;
    }
    
    const accessToken = localStorage.getItem(accessTokenKey);
    if (!accessToken) {
      return null;
    }
    return accessToken;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

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
  tagTypes: ["trips", "itineraries", "trips-id", "checklists", "attachments"],
  endpoints: () => ({}),
});
