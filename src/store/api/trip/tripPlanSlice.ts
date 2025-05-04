import { apiSlice1 } from "../../slices/apiSlice";
import type { TripPlan, TripPlanSearchParams } from "../../../types";

export const tripPlanSlice = apiSlice1.injectEndpoints({
  endpoints: (builder) => ({
    createTripPlan: builder.mutation<TripPlan, TripPlan>({
      query: (data) => ({
        url: `/common-service/trip-plan`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["trips"],
    }),
    getTripPlanById: builder.query<TripPlan, string>({
      query: (id) => ({
        url: `/common-service/trip-plan/${id}`,
        method: "GET",
      }),
      providesTags: ["trips-id"],
    }),
    searchTripPlans: builder.query<TripPlan[], TripPlanSearchParams>({
      query: (data) => ({
        url: `/common-service/trip-plan/search`,
        method: "POST",
        body: data,
      }),
      providesTags: ["trips"],
    }),
    updateTripPlan: builder.mutation<
      TripPlan,
      { id: string; data: Partial<TripPlan> }
    >({
      query: ({ id, data }) => ({
        url: `/common-service/trip-plan/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["trips", "trips-id"],
    }),
    deleteTripPlan: builder.mutation<void, string>({
      query: (id) => ({
        url: `/common-service/trip-plan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["trips"],
    }),
  }),
});

export const {
  useCreateTripPlanMutation,
  useGetTripPlanByIdQuery,
  useSearchTripPlansQuery,
  useUpdateTripPlanMutation,
  useDeleteTripPlanMutation,
} = tripPlanSlice;
