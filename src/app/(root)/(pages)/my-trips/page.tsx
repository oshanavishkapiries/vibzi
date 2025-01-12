import TimeLine from "@/components/sections/mytripPage/TimeLine";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const MyTrips = () => {
  const dates = ["13", "14", "15", "16", "17", "18", "19"];

  return (
    <div className="container px-3 mx-auto min-h-screen mb-8">
      {/* header */}
      <div className="w-full max-w-7xl mx-auto h-full flex justify-between items-center py-4">
        <h1 className="text-2xl font-semibold">My Trips</h1>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Create a new trip
        </Button>
      </div>

      {/* main content */}
      <div className="max-w-7xl mx-auto w-full h-full grid grid-cols-3">
        {/* side left */}
        <div className="w-full h-full col-span-2 ">
          {/* trip-card */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="relative overflow-hidden rounded-lg h-[250px] md:h-[350px]">
              <Image
                src="/2.jpg"
                alt="Vietnam coastline"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Trip to Vietnam</h2>
                <p className="text-sm">Jan 13 - Jan 20</p>
              </div>
            </div>
          </div>
          {/* description */}
          <p className="text-sm text-muted-foreground mt-4">
            This is travel to vietnam description
          </p>
          {/* tabs */}
          <Tabs defaultValue="itinerary" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-3">
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
                    className="rounded-full min-w-[80px]"
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
          {/* trip-list-card */}
          <div className="grid gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-2">
                <div className="flex gap-4">
                  <div className="relative h-28 w-40 flex-shrink-0">
                    <Image
                      src={`/${i}.jpg`}
                      alt="The Grand Palace"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">The Grand Palace</h4>
                    <p className="text-sm text-muted-foreground">
                      this is travel to vietnam description
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
