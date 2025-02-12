"use client";
import { CreateTripDialog } from "@/components/sections/mytripPage/create-trip-dialog";
import TripCard from "@/components/sections/mytripPage/TripCard";
import Tripsection from "@/components/sections/mytripPage/Tripsection";
import { Button } from "@/components/ui/button";
import { setTrip_Id, setTripId } from "@/features/metaSlice";
import { useSearchTripPlansQuery } from "@/services/trip/tripPlanSlice";
import { parseTrips } from "@/utils/tripUtils/tripDataFunction";
import { Loader2, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyTrips = () => {
  const { data: trips, isLoading } = useSearchTripPlansQuery({
    userId: "1234",
    title: "",
    destinationName: "",
    page: 0,
    size: 10,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const tripsData = parseTrips(trips);
  const tripId = searchParams.get("id");
  const trip_Id = searchParams.get("tripId");

  const dispatch = useDispatch();

  useEffect(() => {
    if (tripsData.length > 0 && !tripId) {
      router.push(
        `/my-trips?id=${tripsData[0].id}&tripId=${tripsData[0]?.tripId}`
      );
    }
    dispatch(setTripId(tripId || ""));
    dispatch(setTrip_Id(trip_Id || ""));
  }, [tripsData, tripId, trip_Id, router]);

  const handleCardClick = (id: string, tripId: string) => {
    dispatch(setTripId(id));
    dispatch(setTrip_Id(tripId));
    router.push(`/my-trips?id=${id}&tripId=${tripId}`);
  };

  const storeState = useSelector((state) => state);

  console.log("redux-store", storeState);

  return (
    <div
      className={`container px-3 mx-auto min-h-[500px] mb-8 ${
        tripsData.length === 0 || isLoading
          ? "flex justify-center items-center"
          : ""
      }`}
    >
      {isLoading && (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 cursor-pointer shadow-none border-none">
          <Loader2 className="w-15 h-15 animate-spin" />
        </div>
      )}

      {tripsData.length === 0 && !isLoading && (
        <CreateTripDialog>
          <Button variant="outline" className="w-[240px] mb-2 h-16">
            <Plus className="h-4 w-4" />
            Create a new trip
          </Button>
        </CreateTripDialog>
      )}

      {tripsData.length > 0 && !isLoading && (
        <div className="max-w-7xl mx-auto w-full min-h-[500px] grid grid-cols-3">
          <div className="w-full h-full col-span-2 ">
            <Tripsection />
          </div>

          <div className="w-full h-full col-span-1 pl-4">
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
                  src={trip.src}
                  alt={trip.title}
                  title={trip.title}
                  description={trip.description}
                  onClick={() => handleCardClick(trip.id, trip.tripId)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
