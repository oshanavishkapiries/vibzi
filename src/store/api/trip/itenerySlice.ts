import {
  TripPlanItinerary,
  TripPlanItineraryCreate,
  TripPlanItinerarySearchParams,
} from "@/types";
import { apiSlice1 } from "../../slices/apiSlice";

export const itinerarySlice = apiSlice1.injectEndpoints({
  endpoints: (builder) => ({
    getTripPlanItineraryById: builder.query<
      TripPlanItineraryCreate,
      TripPlanItineraryCreate
    >({
      query: (id) => ({
        url: `/common-service/trip-plan-itinerary/by-trip-id/${id}`,
        method: "GET",
      }),
      providesTags: ["itineraries"],
    }),

    createTripPlanItinerary: builder.mutation<
      TripPlanItinerary,
      TripPlanItineraryCreate
    >({
      query: (data) => ({
        url: `/common-service/trip-plan-itinerary`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["itineraries"],
    }),

    updateTripPlanItinerary: builder.mutation<
      TripPlanItinerary,
      { id: string; data: Partial<TripPlanItinerary> }
    >({
      query: ({ id, data }) => ({
        url: `/common-service/sse/trip-collaboration/itinerary/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["itineraries"],
    }),

    deleteTripPlanItinerary: builder.mutation<void, string>({
      query: (id) => ({
        url: `/common-service/trip-plan-itinerary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["itineraries"],
    }),

    searchTripPlanItineraries: builder.query<
      TripPlanItinerary[],
      TripPlanItinerarySearchParams
    >({
      query: (params) => ({
        url: `/common-service/trip-plan-itinerary/search`,
        method: "POST",
        body: params,
      }),
      providesTags: ["itineraries"],
    }),
  }),
});

export const {
  useGetTripPlanItineraryByIdQuery,
  useCreateTripPlanItineraryMutation,
  useUpdateTripPlanItineraryMutation,
  useDeleteTripPlanItineraryMutation,
  useSearchTripPlanItinerariesQuery,
} = itinerarySlice;
