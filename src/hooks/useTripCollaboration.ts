import { useSSE } from "@/hooks/useSSE";
import { useSelector, useDispatch } from "react-redux";
import { apiSlice1 } from "@/store/slices/apiSlice";
import { AppDispatch, RootState } from "@/store/store";
import { toast } from "sonner";
import { getAuthToken } from "@/utils/getAuthToken";
import { useCallback, useEffect } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_COMMON_SERVICE_URL +
  "/common-service/sse/trip-collaboration";

export const useTripCollaboration = (tripId: string, id: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const token = getAuthToken();

  const {
    message,
    isConnected,
    error,
    subscribe: sseSubscribe,
  } = useSSE({
    url: `${API_BASE_URL}/subscribe?tripId=${tripId}&clientId=${currentUser?.id}`,
    eventTypes: [
      "checklist_updated",
      "itinerary_updated",
      "trip_updated",
      "attachments_updated",
    ],
    retryInterval: 5000,
    token,
  });

  useEffect(() => {
    if (message) {
      const eventType = message.event;
      const data = message.data;

      switch (eventType) {
        case "checklist_updated":
          dispatch(
            apiSlice1.util.updateQueryData(
              "getTripPlanChecklistByTripId" as never,
              tripId as never,
              () => data
            )
          );
          break;
        case "itinerary_updated":
          dispatch(
            apiSlice1.util.updateQueryData(
              "getTripPlanItineraryById" as never,
              tripId as never,
              () => data
            )
          );
          break;
        case "trip_updated":
          dispatch(
            apiSlice1.util.updateQueryData(
              "getTripPlanById" as never,
              id as never,
              () => data
            )
          );
          break;
        case "attachments_updated":
          dispatch(
            apiSlice1.util.updateQueryData(
              "getAttachmentsByTripId" as never,
              tripId as never,
              () => data
            )
          );
          break;
      }
    }
  }, [message, tripId, id, dispatch]);

  if (error) {
    toast.error("Error subscribing to trip collaboration");
  }

  const unsubscribe = useCallback(async () => {
    if (!tripId || !currentUser?.id) return false;

    try {
      const response = await fetch(
        `${API_BASE_URL}/unsubscribe?tripId=${tripId}&clientId=${currentUser?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch {
      toast.error("Error unsubscribing from trip collaboration");
      return false;
    }
  }, [tripId, currentUser?.id, token]);

  const subscribe = useCallback(async () => {
    if (!tripId || !currentUser?.id) return;

    try {
      // First try to unsubscribe
      const unsubscribeSuccess = await unsubscribe();

      // Only subscribe if unsubscribe was successful
      if (unsubscribeSuccess) {
        sseSubscribe();
      } else {
        toast.error("Failed to unsubscribe from previous trip");
      }
    } catch {
      toast.error("Error in subscription process");
    }
  }, [tripId, currentUser?.id, unsubscribe, sseSubscribe]);

  return { isConnected, subscribe, unsubscribe };
};
