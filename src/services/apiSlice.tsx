import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const client_url = process.env.NEXT_PUBLIC_COGNITO_AUTHORITY;
const client_id = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
const key = `oidc.user:${client_url}:${client_id}`;

const api_url = process.env.NEXT_PUBLIC_API_URL;
const api_url_2 = process.env.NEXT_PUBLIC_API_URL_2;

export const apiSlice = createApi({
  reducerPath: "apiOne",
  baseQuery: fetchBaseQuery({
    baseUrl: api_url,
  }),
  endpoints: () => ({}),
});

export const apiSlice1 = createApi({
  reducerPath: "apiTwo",
  baseQuery: fetchBaseQuery({
    baseUrl: api_url_2,
    prepareHeaders: (headers) => {
      const token = JSON.parse(
        sessionStorage.getItem(key) || "{}"
      ).access_token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["trips", "itineraries", "trips-id", "checklists", "attachments"],
  endpoints: () => ({}),
});
