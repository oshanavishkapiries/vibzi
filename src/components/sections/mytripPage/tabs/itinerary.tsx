import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import TimeLine from "../TimeLine";
import { TimelineItem } from "@/types";
import { useGetTripPlanItineraryByIdQuery } from "@/services/trip/itenerySlice";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setitinerary, setTripDate } from "@/features/metaSlice";
import { IteneryDateParser } from "@/utils/tripUtils/IteneryDateParser";

const Itinerary = () => {
  const dispatch = useDispatch();
  const trip = useSelector((state: any) => state.meta.trip);
  const selectedDate = useSelector((state: any) => state.meta.trip.select_date);

  const { data } = useGetTripPlanItineraryByIdQuery(
    trip.tripId ? trip.tripId : ""
  );

  const dates: string[] = Object.keys(data?.itinerary || {});

  useEffect(() => {
    if (!trip.select_date) {
      dispatch(setTripDate(dates[0]));
    }
  }, [dates]);

  useEffect(() => {
    dispatch(setitinerary(data));
  }, [data]);

  const items: TimelineItem[] = data?.itinerary[selectedDate] || [];

  

  return (
    <>
      {/* itinerary */}
      {/* date range */}
      <div className="flex gap-2 overflow-x-auto py-4">
        {dates.map((date) => {
          return (
            <Button
              key={date}
              variant="outline"
              className={cn(
                "rounded-full border-2 border-primary min-w-[80px] hover:bg-primary/25",
                trip.select_date === date ? "bg-primary text-white" : ""
              )}
              onClick={() => dispatch(setTripDate(date))}
            >
              {IteneryDateParser(date).short}
            </Button>
          );
        })}
      </div>
      {trip.select_date && (
        <h2 className="font-semibold text-xl ms-4">
          {IteneryDateParser(trip.select_date).long}
        </h2>
      )}

      {/* timeline */}
      <TimeLine data={items} />
    </>
  );
};

export default Itinerary;
