import { apiSlice1 } from "../apiSlice";


interface TripPlanItinerary {
  id?: string; 
  tripPlanId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface TripPlanItinerarySearchParams {
  tripPlanId?: string;
  title?: string;
  page?: number;
  size?: number;
}

interface  TripPlanItineraryCreate { tripId: string; itinerary: any; }

export const itinerarySlice = apiSlice1.injectEndpoints({
  endpoints: (builder) => ({
    getTripPlanItineraryById: builder.query<TripPlanItineraryCreate, TripPlanItineraryCreate>({
      query: (id) => ({
        url: `/common-service/trip-plan-itinerary/by-trip-id/${id}`,
        method: "GET",
      }),
      providesTags: ['itineraries'], 
    }),

    createTripPlanItinerary: builder.mutation<TripPlanItinerary, TripPlanItineraryCreate>({
      query: (data) => ({
        url: `/common-service/trip-plan-itinerary`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['itineraries'], 
    }),

    updateTripPlanItinerary: builder.mutation<TripPlanItinerary, { id: string; data: Partial<TripPlanItinerary> }>({
      query: ({ id, data }) => ({
        url: `/common-service/trip-plan-itinerary/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['itineraries'], 
    }),

    deleteTripPlanItinerary: builder.mutation<void, string>({
      query: (id) => ({
        url: `/common-service/trip-plan-itinerary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['itineraries'],
    }),

    searchTripPlanItineraries: builder.query<TripPlanItinerary[], TripPlanItinerarySearchParams>({
      query: (params) => ({
        url: `/common-service/trip-plan-itinerary/search`,
        method: "POST",
        body: params,
      }),
      providesTags: ['itineraries'], 
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