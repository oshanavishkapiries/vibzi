import { apiSlice1 } from "../../slices/apiSlice";
import type { TripPlanChecklist } from "../../../types";

export const checklistSlice = apiSlice1.injectEndpoints({
  endpoints: (builder) => ({
    getTripPlanChecklistByTripId: builder.query<TripPlanChecklist, string>({
      query: (tripId) => ({
        url: `/common-service/trip-plan-checklist/by-trip-id/${tripId}`,
        method: "GET",
      }),
      providesTags: ["checklists"],
    }),

    updateTripPlanChecklist: builder.mutation<
      TripPlanChecklist,
      { id: string; data: Partial<TripPlanChecklist> }
    >({
      query: ({ id, data }) => ({
        url: `/common-service/sse/trip-collaboration/checklist/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["checklists"],
    }),
  }),
});

export const {
  useGetTripPlanChecklistByTripIdQuery,
  useUpdateTripPlanChecklistMutation,
} = checklistSlice;
