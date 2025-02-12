import {
  Clock,
  MapPin,
  Calendar,
  Plane,
  Utensils,
  Building2,
  Activity,
  NotebookIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import ItineraryAdd from "./itineraryAdd";
import { TimelineItem } from "@/types";
import { cn } from "@/lib/utils";



export default function TimeLine({ data }:{ data:TimelineItem[] }) {
  

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
      case "note":
        return <NotebookIcon className="h-5 w-5" />
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-border" />

        {/* Timeline items */}
        <div className="space-y-6 ">
          {data?.map((item, index) => (
            <div key={index} className="flex gap-4">
            <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white border-2">
              {getIcon(item.type)}
            </div>
            <Card className="flex-1 p-4 shadow-none">
              <h3 className="font-medium mb-2">{item?.details?.title}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                {item?.details?.customFields.startTime && item?.details?.customFields.endTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{`${item?.details?.customFields.startTime} - ${item?.details?.customFields.endTime}`}</span>
                  </div>
                )}
                {item.type === "flight" && item?.details?.customFields.departureLocation && item?.details?.customFields.arrivalLocation && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{`${item?.details?.customFields.departureLocation} → ${item?.details?.customFields.arrivalLocation}`}</span>
                  </div>
                )}
                {item.type === "hotel" && item?.details?.customFields.reservationNumber && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{`Reservation: ${item?.details?.customFields.reservationNumber}`}</span>
                  </div>
                )}
                {item?.details?.customFields.note && (
                  <div className="flex items-center gap-2">
                    <NotebookIcon className="h-4 w-4" />
                    <span>{item?.details?.customFields.note}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
          ))}
        </div>

        {/* Add button */}
        <div className={cn("relative z-10 mt-4 ",
          data.length === 0 ? "border-t-2 border-primary" : ""
        )}>
          <ItineraryAdd />
        </div>
      </div>
    </div>
  );
}
