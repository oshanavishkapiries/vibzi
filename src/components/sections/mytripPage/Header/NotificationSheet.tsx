"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetPendingInvitesQuery,
  useRespondToInviteMutation,
} from "@/store/api/collaboration/collaborationSlice";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X, Calendar, MapPin, User } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface TripPlanDto {
  id: string;
  tripId: string;
  title: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  destinationId: number;
  destinationName: string;
  description: string;
  userId: string;
}

interface TripInvite {
  id: string;
  tripId: string;
  invitedUser: string;
  fullName: string | null;
  email: string;
  tripInviteStatus: "PENDING" | "ACCEPTED" | "REJECTED";
  inviteCode: string;
  tripPlanDto: TripPlanDto | null;
}

export function NotificationSheet() {
  const user = useSelector((state: any) => state?.auth?.user);
  const tripId = useSelector((state: any) => state?.meta?.trip?.tripId);

  const [respondToInvite] = useRespondToInviteMutation();
  const {
    data: pendingInvites,
    isLoading,
    error,
    refetch,
  } = useGetPendingInvitesQuery(
    {
      email: user?.email,
      tripInviteStatus: "PENDING",
    },
    {
      skip: !user?.email,
    },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (tripId) {
        refetch();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [refetch, tripId]);

  const handleInviteResponse = async (inviteCode: string, accept: boolean) => {
    try {
      console.log("Invite Code:", inviteCode);
      console.log("Accept:", accept);
      await respondToInvite({
        inviteCode,
        tripInviteStatus: accept ? "ACCEPTED" : "REJECTED",
      }).unwrap();
      toast.success(
        `Invitation ${accept ? "accepted" : "rejected"} successfully`,
      );
      refetch();
    } catch (error) {
      console.log("Error:", error);
      toast.error(`Failed to ${accept ? "accept" : "reject"} invitation`);
    }
  };

  // if (!user?.email || !tripId) return null;

  if (error) {
    return (
      <div className="text-center text-sm text-red-500 py-4">
        Failed to load notifications. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!pendingInvites?.length) {
    return (
      <div className="text-center text-sm text-gray-500 py-4">
        No pending notifications
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pendingInvites?.map((invite: TripInvite) => (
        <div
          key={invite.id}
          className="flex flex-col gap-3 p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-lg">Trip Invitation</h4>
              <p className="text-sm text-gray-500">
                You have been invited to join a trip
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User className="h-4 w-4" />
            <span>{invite.invitedUser}</span>
          </div>

          {invite.tripPlanDto && (
            <div className="mt-2 space-y-3">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={invite.tripPlanDto.imageUrl}
                    alt={invite.tripPlanDto.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <h5 className="font-medium text-lg">
                      {invite.tripPlanDto.title}
                    </h5>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{invite.tripPlanDto.destinationName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(
                        invite.tripPlanDto.startDate,
                      ).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(
                        invite.tripPlanDto.endDate,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {invite.tripPlanDto.description && (
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {invite.tripPlanDto.description}
                </p>
              )}
            </div>
          )}

          <div className="flex gap-2 mt-2 pt-2 border-t">
            <Button
              variant="default"
              size="sm"
              className="flex-1 flex items-center justify-center gap-1 bg-primary hover:bg-primary/80 text-white"
              onClick={() => handleInviteResponse(invite.inviteCode, true)}
            >
              <Check className="h-4 w-4" />
              Accept
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1 flex items-center justify-center gap-1 bg-[#B00020] hover:bg-[#B00020]/80 text-white"
              onClick={() => handleInviteResponse(invite.inviteCode, false)}
            >
              <X className="h-4 w-4" />
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
