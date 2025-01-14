import {
  Clock,
  MapPin,
  Calendar,
  Plane,
  Utensils,
  Building2,
  Activity,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import ItineraryAdd from "./itineraryAdd";

interface TimelineItem {
  type: "activity" | "restaurant" | "hotel" | "flight";
  title: string;
  time?: string;
  location?: string;
  dates?: string;
  checkIn?: string;
  flightDetails?: string;
  route?: string;
}

export default function TimeLine() {
  const items: TimelineItem[] = [
    {
      type: "activity",
      title: "Some acitivity",
      time: "12:00 AM - 12:15 AM",
      location: "Pattaya, Thailand",
    },
    {
      type: "restaurant",
      title: "Restaurant Name",
      time: "12:00 AM - 12:15 AM",
      location: "Pattaya, Thailand",
    },
    {
      type: "hotel",
      title: "Hotel Name",
      dates: "Jan 13 → Jan 16, 2025",
      checkIn: "Check-in at 12:15 AM",
    },
    {
      type: "flight",
      title: "Dak Lak Province, Vietnam → Port Douglas, Australia",
      flightDetails: "Flight fdasfsdav #fdsa",
    },
  ];

  const getIcon = (type: TimelineItem["type"]) => {
    switch (type) {
      case "activity":
        return <Activity className="h-5 w-5" />;
      case "restaurant":
        return <Utensils className="h-5 w-5" />;
      case "hotel":
        return <Building2 className="h-5 w-5" />;
      case "flight":
        return <Plane className="h-5 w-5" />;
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-border" />

        {/* Timeline items */}
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white border-2">
                {getIcon(item.type)}
              </div>
              <Card className="flex-1 p-4 shadow-none">
                <h3 className="font-medium mb-2">{item.title}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  {item.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{item.time}</span>
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                  )}
                  {item.dates && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{item.dates}</span>
                    </div>
                  )}
                  {item.checkIn && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{item.checkIn}</span>
                    </div>
                  )}
                  {item.flightDetails && (
                    <div className="text-sm text-muted-foreground">
                      {item.flightDetails}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Add button */}
        <div className="relative z-10 mt-4">
          <ItineraryAdd />
        </div>
      </div>
    </div>
  );
}
