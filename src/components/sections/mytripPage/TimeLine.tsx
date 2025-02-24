import {
  Clock,
  MapPin,
  Calendar,
  Plane,
  Utensils,
  Building2,
  Activity,
  NotebookIcon,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import ItineraryAdd from "./itineraryAdd";
import { TimelineItem } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IteneryDateParser } from "@/utils/tripUtils/IteneryDateParser";

export default function TimeLine({ data }: { data: TimelineItem[] }) {
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
        return <NotebookIcon className="h-5 w-5" />;
    }
  };

  const extractDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace(/^www\./, "");
    } catch {
      return url;
    }
  };

  console.log("data", data);

  return (
    <div className="w-full">
      <div className="relative">
        {/* Timeline line */}
        {data.length !== 0 && (
          <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-border" />
        )}

        {/* Timeline items */}
        <div className="space-y-6 ">
          {data.length !== 0 &&
            data?.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white border-2">
                  {getIcon(item.type)}
                </div>
                <Card className="flex-1 p-4 shadow-none">
                  <h3 className="font-medium mb-2">{item?.details?.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {item?.details?.customFields.startTime &&
                      item?.details?.customFields.endTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{`${
                            IteneryDateParser(
                              item?.details?.customFields.startTime
                            ).long
                          } -> ${
                            IteneryDateParser(
                              item?.details?.customFields.endTime
                            ).long
                          }`}</span>
                        </div>
                      )}
                    {item.type === "flight" &&
                      item?.details?.customFields.departureLocation &&
                      item?.details?.customFields.arrivalLocation && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{`${item?.details?.customFields.departureLocation} → ${item?.details?.customFields.arrivalLocation}`}</span>
                        </div>
                      )}

                    {item.type === "hotel" &&
                      item?.details?.customFields.reservationNumber && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{`Reservation: ${item?.details?.customFields.reservationNumber}`}</span>
                        </div>
                      )}
                    {item?.details?.customFields.link && (
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        <Link
                          href={item?.details?.customFields?.link}
                          target="_blank"
                          className="text-primary hover:underline"
                        >
                          {extractDomain(item?.details?.customFields?.link)}
                        </Link>
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

        {data.length === 0 && (
          <div className="text-center text-muted-foreground">
            add your first itinerary
          </div>
        )}

        <div className={cn(data.length !== 0 ? "relative z-10 mt-4" : "flex justify-center items-center")}>
          <ItineraryAdd initmode={data.length} />
        </div>
      </div>
    </div>
  );
}
