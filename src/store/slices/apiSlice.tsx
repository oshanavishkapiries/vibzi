import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const client_id = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID;
const api_url = process.env.NEXT_PUBLIC_API_URL;
const api_url_2 = process.env.NEXT_PUBLIC_API_URL_2;

const getAuthToken = () => {
  try {
    const user_id = localStorage.getItem("user_id");
    const key = `CognitoIdentityServiceProvider.${client_id}.${user_id}.accessToken`;
    const accessToken = localStorage.getItem(key);
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
    baseUrl: api_url,
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
    baseUrl: api_url_2,
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
