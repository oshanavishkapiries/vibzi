"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Plus, CircleChevronUp } from "lucide-react";
import { CreateTripDialog } from "./create-trip-dialog";
import TripCard from "./TripCard";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setTrip_Id, setTripId, setTripDate } from "@/store/slices/metaSlice";
import { parseTrips } from "@/utils/tripUtils/tripDataFunction";
import { useSearchTripPlansQuery } from "@/store/api/trip/tripPlanSlice";

const MobileBottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.auth?.user);

  const { data: trips } = useSearchTripPlansQuery({
    userId: user?.id,
    title: "",
    destinationName: "",
    page: 0,
    size: 10,
  });
  const tripsData = parseTrips(trips);

  const handleCardClick = (id: string, tripId: string, startDate: string) => {
    dispatch(setTripId(id));
    dispatch(setTrip_Id(tripId));
    dispatch(setTripDate(startDate));
    router.push(`/my-trips?id=${id}&tripId=${tripId}`);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center py-6 gap-2 rounded-none hover:bg-gray-50"
          >
            <CircleChevronUp className="h-4 w-4" />
            <span className="text-sm font-medium">View All Trips</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <div className="pt-6">
            <CreateTripDialog>
              <Button variant="outline" className="w-full mb-4 h-16">
                <Plus className="h-4 w-4 mr-2" />
                Create a new trip
              </Button>
            </CreateTripDialog>
            <div className="grid gap-4">
              {tripsData?.map((trip: any) => (
                <TripCard
                  key={trip.id}
                  id={trip.id}
                  src={trip.imageUrl}
                  alt={trip.title}
                  title={trip.title}
                  description={trip.description}
                  onClick={() =>
                    handleCardClick(trip.id, trip.tripId, trip.startDate)
                  }
                />
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileBottomNav;
