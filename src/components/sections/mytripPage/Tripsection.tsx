import Attachments from "@/components/sections/mytripPage/tabs/attachments";
import Checklist from "@/components/sections/mytripPage/tabs/checklist";
import Itinerary from "@/components/sections/mytripPage/tabs/itinerary";
import TravelCard from "@/components/sections/mytripPage/TravelCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTripPlanByIdQuery } from "@/store/api/trip/tripPlanSlice";
import { Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import { EditDescriptionDialog } from "./edit-description-dialog";
import { formatDate } from "@/utils/tripUtils/formatDates";
import TravelWallet from "./tabs/TravelWallet";

const Tripsection = () => {
  const id = useSelector((state: any) => state.meta.trip.id);

  const { data: tripPlan, isLoading } = useGetTripPlanByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return <Scelton />;
  }

  return (
    <div className="w-full h-auto flex flex-col">
      <TravelCard
        src={tripPlan?.imageUrl || "/1.jpg"}
        alt={tripPlan?.destinationName || "Destination"}
        title={tripPlan?.title || "Trip Title"}
        dateRange={`${formatDate(tripPlan?.startDate)} → ${formatDate(
          tripPlan?.endDate
        )}`}
        location={tripPlan?.destinationName || "Location"}
      />

      <div className="flex items-center justify-center">
        <p className="text-lg font-semibold">
          {tripPlan?.title || "Trip Title"}
        </p>
        <EditDescriptionDialog>
          <Button variant="ghost" size="sm" className="">
            <Pencil className="h-4 w-4 ml-1" />
          </Button>
        </EditDescriptionDialog>
      </div>
      <Tabs defaultValue="itinerary" className="w-full mt-4 mb-6">
        <div className="w-full overflow-x-auto scrollbar-hide">
          <TabsList className="bg-background">
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
            <TabsTrigger value="travel-wallet">Travel Wallet</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="itinerary" className="space-y-6">
          <Itinerary />
        </TabsContent>
        <TabsContent value="checklist" className="space-y-6">
          <Checklist />
        </TabsContent>
        <TabsContent value="attachments" className="space-y-6">
          <Attachments />
        </TabsContent>
        <TabsContent value="travel-wallet" className="space-y-6">
          <TravelWallet />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tripsection;

export const Scelton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-[180px] md:h-[280px] w-full rounded-md"></div>
      <div className="flex items-center mt-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="ml-2 h-8 w-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};
