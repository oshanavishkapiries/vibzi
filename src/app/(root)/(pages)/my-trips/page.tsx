import TimeLine from "@/components/sections/mytripPage/TimeLine";
import TravelCard from "@/components/sections/mytripPage/TravelCard";
import TripCard from "@/components/sections/mytripPage/TripCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import React from "react";

const MyTrips = () => {
  const dates = ["13", "14", "15", "16", "17", "18", "19"];
  const trips = [
    {
      id: 1,
      title: "The Grand Palace",
      description: "This is a trip to Vietnam description",
      src: "/1.jpg",
    },
    {
      id: 2,
      title: "Ha Long Bay",
      description: "Discover the beauty of Ha Long Bay",
      src: "/2.jpg",
    },
  ];


  return (
    <div className="container px-3 mx-auto min-h-screen mb-8">
      {/* header */}
      <div className="w-full max-w-7xl mx-auto h-full flex justify-between items-center py-4">
        <h1 className="text-2xl font-semibold">My Trips</h1>
      </div>

      {/* main content */}
      <div className="max-w-7xl mx-auto w-full h-full grid grid-cols-3">
        {/* side left */}
        <div className="w-full h-full col-span-2 ">
          {/* trip-card */}
          <TravelCard
            src="/2.jpg"
            alt="Vietnam coastline"
            title="Trip to Vietnam"
            dateRange="Jan 13 - Jan 20"
          />
          {/* description */}
          <p className="text-sm text-muted-foreground mt-4">
            This is travel to vietnam description
          </p>
          {/* tabs */}
          <Tabs defaultValue="itinerary" className="w-full mt-4">
            <TabsList className="bg-background">
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
            </TabsList>
            <TabsContent value="itinerary" className="space-y-6">
              {/* itinerary */}
              {/* date range */}
              <div className="flex gap-2 overflow-x-auto py-4">
                {dates.map((date) => (
                  <Button
                    key={date}
                    variant="outline"
                    className="rounded-full border-2 border-primary min-w-[80px]"
                  >
                    Jan {date}
                  </Button>
                ))}
              </div>
              {/* timeline */}
              <TimeLine />
            </TabsContent>
            <TabsContent value="checklist" className="space-y-6">
              {/* checklist */}
              {/* checkbox */}
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Book flight tickets
                </label>
              </div>
              {/* add btn */}
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </TabsContent>
            <TabsContent value="attachments" className="space-y-6">
              attachments
            </TabsContent>
          </Tabs>
        </div>    

        {/* side right */}
        <div className="w-full h-full col-span-1 pl-4">
          <Button variant="outline" className="w-full mb-2 h-16">
            <Plus className="h-4 w-4" />
            Create a new trip
          </Button>
          {/* trip-list-card */}
          <div className="grid gap-2">
            {trips?.map((trip) => (
              <TripCard
                key={trip.id}
                src={trip.src}
                alt={trip.title}
                title={trip.title}
                description={trip.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
