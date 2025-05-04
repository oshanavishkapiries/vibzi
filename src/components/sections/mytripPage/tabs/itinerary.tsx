import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import TimeLine from "../TimeLine";
import { TimelineItem } from "@/types";
import { useGetTripPlanItineraryByIdQuery } from "@/store/api/trip/itenerySlice";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setitinerary, setTripDate } from "@/store/slices/metaSlice";
import { IteneryDateParser } from "@/utils/tripUtils/IteneryDateParser";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const Itinerary = () => {
  const dispatch = useDispatch();
  const trip = useSelector((state: any) => state.meta.trip);
  const selectedDate = useSelector((state: any) => state.meta.trip.select_date);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const timelineRef = useRef<any>(null);

  const { data } = useGetTripPlanItineraryByIdQuery(
    trip.tripId ? trip.tripId : ""
  );

  const dates: string[] = Object.keys(data?.itinerary || {});

  useEffect(() => {
    if (!trip.select_date) {
      dispatch(setTripDate(dates[0]));
    }
  }, [dates, dispatch, trip.select_date]);

  useEffect(() => {
    dispatch(setitinerary(data));
  }, [data, dispatch]);

  const items: TimelineItem[] = data?.itinerary[selectedDate] || [];

  const checkForOverflow = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowScrollButtons(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkForOverflow();
    window.addEventListener("resize", checkForOverflow);
    return () => window.removeEventListener("resize", checkForOverflow);
  }, [dates]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleDateChange = async (newDate: string) => {
    if (timelineRef.current?.hasUnsavedChanges) {
      try {
        await timelineRef.current.handleSave();
        dispatch(setTripDate(newDate));
      } catch (error) {
        toast.error("Please save your changes before switching dates");
        console.log(error);
        return;
      }
    } else {
      dispatch(setTripDate(newDate));
    }
  };

  return (
    <>
      {/* itinerary */}
      {/* date range */}
      <div className="relative">
        {showScrollButtons && (
          <Button
            variant="ghost"
            size="icon"
            className="bg-background rounded-full border-2 border-primary absolute flex items-center justify-center left-0 top-1/2 -translate-y-1/2 z-10 "
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        <div className={
          cn("flex items-center justify-between mx-auto", showScrollButtons ? "w-[90%]" : "w-[100%]" )
        }>
          <div
            ref={scrollContainerRef}
            className={"flex gap-2 overflow-x-auto scrollbar-hide py-4"}
          >
            {dates.map((date) => {
              return (
                <Button
                  key={date}
                  variant="outline"
                  className={cn(
                    "rounded-full border-2 border-primary min-w-[80px] hover:bg-primary/25",
                    trip.select_date === date ? "bg-primary text-white" : ""
                  )}
                  onClick={() => handleDateChange(date)}
                >
                  {IteneryDateParser(date).short}
                </Button>
              );
            })}
          </div>
        </div>
        {showScrollButtons && (
          <Button
            variant="ghost"
            size="icon"
            className="bg-background rounded-full border-2 border-primary absolute flex items-center justify-center right-0 top-1/2 -translate-y-1/2 z-10 "
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* timeline */}
      <TimeLine data={items} ref={timelineRef} />
    </>
  );
};

export default Itinerary;
