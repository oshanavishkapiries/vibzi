import Attachments from "@/components/sections/mytripPage/tabs/attachments";
import Checklist from "@/components/sections/mytripPage/tabs/checklist";
import Itinerary from "@/components/sections/mytripPage/tabs/itinerary";
import TravelCard from "@/components/sections/mytripPage/TravelCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTripPlanByIdQuery } from "@/services/trip/tripPlanSlice";
import { Pencil } from "lucide-react";
import { useSelector } from "react-redux";

const Tripsection = () => {
  const id = useSelector((state: any) => state.meta.trip.id);

  const { data: tripPlan, isLoading } = useGetTripPlanByIdQuery(id);

  if (isLoading) {
    return <Scelton />;
  }

  return (
    <div className="w-full h-auto flex flex-col">
      <TravelCard
        src="/2.jpg"
        alt={tripPlan?.destinationName || "Destination"}
        title={tripPlan?.title || "Trip Title"}
        dateRange={`${tripPlan?.startDate.replace(
          /(\d{4})-(\d{2})-(\d{2})/,
          "$1 / $2 / $3"
        )} - ${tripPlan?.endDate.replace(
          /(\d{4})-(\d{2})-(\d{2})/,
          "$1 / $2 / $3"
        )}`}
      />
      <div className="flex items-center mt-4">
        <p className="text-sm text-muted-foreground">
          {tripPlan?.description || "No description available"}
        </p>

        <Button className="ml-2" variant="ghost" size="sm">
          <Pencil className="h-4 w-4 mr-1" />
        </Button>
      </div>
      <Tabs defaultValue="itinerary" className="w-full mt-4">
        <TabsList className="bg-background">
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>
        <TabsContent value="itinerary" className="space-y-6">
          <Itinerary />
        </TabsContent>
        <TabsContent value="checklist" className="space-y-6">
          <Checklist />
        </TabsContent>
        <TabsContent value="attachments" className="space-y-6">
          <Attachments />
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
