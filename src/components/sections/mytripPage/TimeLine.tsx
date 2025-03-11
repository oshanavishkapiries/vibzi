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
  Trash2,
  Pencil,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import ItineraryAdd from "./itineraryAdd";
import { TimelineItem } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IteneryDateParser } from "@/utils/tripUtils/IteneryDateParser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSelector } from "react-redux";
import { useUpdateTripPlanItineraryMutation } from "@/store/api/trip/itenerySlice";
import { toast } from "sonner";
import { useState } from "react";
import AddFoodAndDrink from "./sheet/add-food-and-drink";
import AddNote from "./sheet/add-note";
import AddPlaceToStay from "./sheet/add-place-to-stay";
import AddTransportation from "./sheet/add-transporation";
import ThingsToDo from "./sheet/thingstodo";

export default function TimeLine({ data }: { data: TimelineItem[] }) {
  const trip = useSelector((state: any) => state.meta.trip);
  const [updateItinerary] = useUpdateTripPlanItineraryMutation();
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);

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

  const handleDelete = async (itemToDelete: TimelineItem) => {
    try {
      const currentItinerary = trip.itinerary?.itinerary || {};
  
      const updatedItineraryData = {
        id: trip.itinerary.id,
        tripId: trip.tripId,
        itinerary: {
          ...currentItinerary,
          [trip.select_date]: data.filter(item => item !== itemToDelete)
        }
      };

      await updateItinerary({ 
        id: trip.itinerary.id, 
        data: updatedItineraryData 
      }).unwrap();
      
      toast.success("Itinerary item deleted successfully.");
    } catch (error) {
      console.error("Failed to delete itinerary item:", error);
      toast.error("Failed to delete itinerary item. Please try again.");
    }
  };

  const handleUpdate = async (updatedItem: TimelineItem) => {
    try {
      const currentItinerary = trip.itinerary?.itinerary || {};
      const updatedItems = data.map(item => 
        item === editingItem ? updatedItem : item
      );

      const updatedItineraryData = {
        id: trip.itinerary.id,
        tripId: trip.tripId,
        itinerary: {
          ...currentItinerary,
          [trip.select_date]: updatedItems
        }
      };

      await updateItinerary({ 
        id: trip.itinerary.id, 
        data: updatedItineraryData 
      }).unwrap();
      
      toast.success("Itinerary item updated successfully.");
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to update itinerary item:", error);
      toast.error("Failed to update itinerary item. Please try again.");
    }
  };

  const renderEditComponent = () => {
    if (!editingItem) return null;

    switch (editingItem.type) {
      case "activity":
        return <ThingsToDo onUpdate={handleUpdate} editingItem={editingItem} />;
      case "restaurant":
        return <AddFoodAndDrink onUpdate={handleUpdate} editingItem={editingItem} />;
      case "hotel":
        return <AddPlaceToStay onUpdate={handleUpdate} editingItem={editingItem} />;
      case "flight":
        return <AddTransportation onUpdate={handleUpdate} editingItem={editingItem} />;
      case "note":
        return <AddNote onUpdate={handleUpdate} editingItem={editingItem} />;
      default:
        return null;
    }
  };

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
                <Card className="flex-1 p-4 shadow-none relative">
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button 
                      className="p-2 text-primary hover:bg-primary/10 rounded-full"
                      onClick={() => setEditingItem(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="p-2 text-destructive hover:bg-destructive/10 rounded-full">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Itinerary Item</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this itinerary item? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => handleDelete(item)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
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

      {renderEditComponent()}
    </div>
  );
}
