import { apiSlice1 } from "../../slices/apiSlice";

interface CollaboratorUser {
  email: string;
  fullName: string;
  tripCollaboratorRole: "OWNER" | "MEMBER";
}

interface TripMembersResponse {
  tripId: string;
  collaboratorUserDtos: CollaboratorUser[];
}

interface SearchUserRequest {
  email?: string | null;
  givenName?: string | null;
  familyName?: string | null;
}

interface SearchUserResponse {
  userId: string;
  fullName: string;
  email: string;
  status: string;
  enabled: boolean;
}

interface TripInviteRequest {
  tripId: string;
  email: string;
  fullName?: string | null;
  userId: string | null;
}

interface TripInviteResponse {
  id: string;
  tripId: string;
  invitedUser: string;
  fullName: string | null;
  email: string;
  tripInviteStatus: "PENDING" | "ACCEPTED" | "REJECTED";
  inviteCode: string;
  tripPlanDto: null;
}

interface SearchTripInviteRequest {
  tripId?: string;
  email?: string;
  tripInviteStatus: "PENDING" | "ACCEPTED" | "REJECTED";
}

interface InviteResponseRequest {
  tripInviteStatus: "ACCEPTED" | "REJECTED";
  inviteCode: string;
}

export const collaborationSlice = apiSlice1.injectEndpoints({
  endpoints: (builder) => ({
    getTripMembers: builder.query<TripMembersResponse, string>({
      query: (tripId) => ({
        url: `/common-service/trip-collaboration/${tripId}/members`,
        method: "GET",
      }),
      providesTags: ["TripMembers"],
    }),

    searchUsers: builder.mutation<SearchUserResponse[], SearchUserRequest>({
      query: (searchParams) => ({
        url: "/common-service/users/search",
        method: "POST",
        body: searchParams,
      }),
    }),

    sendTripInvite: builder.mutation<TripInviteResponse, TripInviteRequest>({
      query: (inviteData) => ({
        url: "/common-service/trip-invite/send",
        method: "POST",
        body: inviteData,
      }),
      invalidatesTags: ["TripMembers", "TripInvites", "trips", "trips-id"],
    }),

    getPendingInvites: builder.query<
      TripInviteResponse[],
      SearchTripInviteRequest
    >({
      query: (searchParams) => ({
        url: "/common-service/trip-invite/search",
        method: "POST",
        body: searchParams,
      }),
      providesTags: ["TripInvites"],
    }),

    respondToInvite: builder.mutation<void, InviteResponseRequest>({
      query: (responseData) => ({
        url: "/common-service/trip-invite/respond",
        method: "PATCH",
        body: responseData,
      }),
      invalidatesTags: ["TripMembers", "TripInvites", "trips", "trips-id"],
    }),

    deleteInvite: builder.mutation<void, string>({
      query: (inviteId) => ({
        url: `/common-service/trip-invite/${inviteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TripInvites", "trips", "trips-id"],
    }),

    deleteTripMember: builder.mutation<void, { tripId: string; email: string }>(
      {
        query: ({ tripId, email }) => ({
          url: `/common-service/trip-collaboration/${tripId}/members?email=${email}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TripMembers", "trips", "trips-id"],
      }
    ),
  }),
});

export const {
  useGetTripMembersQuery,
  useSearchUsersMutation,
  useSendTripInviteMutation,
  useGetPendingInvitesQuery,
  useRespondToInviteMutation,
  useDeleteInviteMutation,
  useDeleteTripMemberMutation,
} = collaborationSlice;
