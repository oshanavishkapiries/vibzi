"use client";
import { AuthMiddleware } from "@/Middleware/AuthMiddleware";
import { CreateTripDialog } from "@/components/sections/mytripPage/create-trip-dialog";
import TripCard from "@/components/sections/mytripPage/TripCard";
import Tripsection from "@/components/sections/mytripPage/Tripsection";
import { Button } from "@/components/ui/button";
import { setTrip_Id, setTripId, setTripDate } from "@/store/slices/metaSlice";
import { useSearchTripPlansQuery } from "@/store/api/trip/tripPlanSlice";
import { parseTrips } from "@/utils/tripUtils/tripDataFunction";
import { Loader2, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MobileBottomNav from "@/components/sections/mytripPage/MobileBottomNav";
import Image from "next/image";
import { useTripCollaboration } from "@/hooks/useTripCollaboration";

const MyTrips = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tripId = searchParams.get("id");
  const trip_Id = searchParams.get("tripId");
  const user = useSelector((state: any) => state?.auth?.user);

  const { data: trips, isLoading } = useSearchTripPlansQuery({
    userId: user?.id,
    title: "",
    destinationName: "",
    page: 0,
    size: 10,
  });

  const tripsData = parseTrips(trips);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && tripsData.length > 0) {
      if (!tripId || !trip_Id) {
        const firstTrip = tripsData[0];
        router.replace(
          `/my-trips?id=${firstTrip.id}&tripId=${firstTrip.tripId}`,
        );
        dispatch(setTripId(firstTrip.id));
        dispatch(setTrip_Id(firstTrip.tripId));
        dispatch(setTripDate(firstTrip.startDate));
      } else {
        dispatch(setTripId(tripId));
        dispatch(setTrip_Id(trip_Id));
      }
    }
  }, [isLoading, tripsData, tripId, trip_Id, router, dispatch]);

  const { subscribe, unsubscribe } = useTripCollaboration(
    trip_Id || "",
    tripId || "",
  );

  useEffect(() => {
    if (!isLoading && tripsData.length > 0) {
      const currentTripId = localStorage.getItem("currentTripId");
      const currentTrip_Id = localStorage.getItem("currentTrip_Id");
      const lastConnectionTime = localStorage.getItem("lastConnectionTime");
      const currentTime = Date.now();

      if (tripId !== currentTripId || trip_Id !== currentTrip_Id) {
        if (currentTripId && currentTrip_Id) {
          unsubscribe();
        }

        if (
          tripId &&
          trip_Id &&
          (!lastConnectionTime ||
            currentTime - parseInt(lastConnectionTime) > 5000)
        ) {
          localStorage.setItem("currentTripId", tripId);
          localStorage.setItem("currentTrip_Id", trip_Id);
          localStorage.setItem("lastConnectionTime", currentTime.toString());
          subscribe();
        }
      }
    }
    return () => {
      if (tripId && trip_Id) {
        unsubscribe();
        localStorage.removeItem("currentTripId");
        localStorage.removeItem("currentTrip_Id");
        localStorage.removeItem("lastConnectionTime");
      }
    };
  }, [isLoading, tripsData.length, tripId, trip_Id, subscribe, unsubscribe]);

  console.log("⚡⚡⚡⚡⚡");

  const handleCardClick = (id: string, tripId: string, startDate: string) => {
    dispatch(setTripId(id));
    dispatch(setTrip_Id(tripId));
    dispatch(setTripDate(startDate));
    router.push(`/my-trips?id=${id}&tripId=${tripId}`);
  };

  return (
    <AuthMiddleware>
      <div
        className={`container min-h-[calc(100vh-350px)] px-3 mx-auto mb-8 ${
          tripsData.length === 0 || isLoading
            ? "flex justify-center items-center"
            : ""
        }`}
      >
        {isLoading && (
          <div className="w-full flex flex-col items-center justify-center p-6 cursor-pointer shadow-none border-none">
            <Loader2 className="w-15 h-15 animate-spin" />
          </div>
        )}

        {tripsData.length === 0 && !isLoading && (
          <CreateTripDialog>
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src="/create_trip.gif"
                alt="Create Trip"
                width={80}
                height={80}
              />

              <Button variant="outline" className="rounded-md px-6 py-3">
                + Create new Trip
              </Button>
            </div>
          </CreateTripDialog>
        )}

        {tripsData.length > 0 && !isLoading && (
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3">
            <div className="w-full h-full col-span-2">
              <Tripsection />
            </div>

            <div className="w-full h-full col-span-1 pl-4 max-lg:hidden">
              <CreateTripDialog>
                <Button variant="outline" className="w-full mb-2 h-16">
                  <Plus className="h-4 w-4" />
                  Create a new trip
                </Button>
              </CreateTripDialog>
              <div className="grid gap-2">
                {tripsData?.map((trip: any) => (
                  <TripCard
                    key={trip.id}
                    id={trip.id}
                    src={trip.imageUrl}
                    alt={trip.title}
                    title={trip.title}
                    description={trip.description}
                    user_id={trip.userId}
                    onClick={() =>
                      handleCardClick(trip.id, trip.tripId, trip.startDate)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <MobileBottomNav />
    </AuthMiddleware>
  );
};

export default MyTrips;
