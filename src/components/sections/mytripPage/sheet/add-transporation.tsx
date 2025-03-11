"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSelector } from "react-redux";
import { useUpdateTripPlanItineraryMutation } from "@/store/api/trip/itenerySlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { TimelineItem } from "@/types";

const AddTransportation = ({ 
  children,
  onUpdate,
  editingItem 
}: { 
  children?: React.ReactNode;
  onUpdate?: (item:   any) => Promise<void>;
  editingItem?: TimelineItem | null;
}) => {
  const [formData, setFormData] = useState({
    type: editingItem?.details?.customFields?.type || "Flight",
    name: editingItem?.details?.title || "",
    departureLocation: editingItem?.details?.customFields?.departureLocation || "",
    departureTime: editingItem?.details?.customFields?.departureTime ? new Date(editingItem.details.customFields.departureTime) : new Date(),
    arrivalLocation: editingItem?.details?.customFields?.arrivalLocation || "",
    arrivalTime: editingItem?.details?.customFields?.arrivalTime ? new Date(editingItem.details.customFields.arrivalTime) : new Date(),
    link: editingItem?.details?.customFields?.link || "",
    reservationNumber: editingItem?.details?.customFields?.reservationNumber || "",
    note: editingItem?.details?.customFields?.note || "",
  });

  const [isOpen, setIsOpen] = useState(!!editingItem);
  const itinerary = useSelector((state: any) => state.meta.trip.itinerary);
  const it_id = itinerary?.id;
  const selectedDate = useSelector((state: any) => state.meta.trip.select_date);
  const [updateItinerary, { isLoading }] = useUpdateTripPlanItineraryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itinerary || !selectedDate) return;

    const obj = {
      position:  (itinerary.itinerary[selectedDate]?.length + 1) || 1,
      date: selectedDate,
      type: "flight",
      details: {
        title: formData.name,
        customFields: { ...formData },
      },
    };

    if (editingItem && onUpdate) {
      await onUpdate(obj);
      setIsOpen(false);
    } else {
      const updatedItinerary = {
        ...itinerary,
        itinerary: {
          ...itinerary.itinerary,
          [selectedDate]: [...(itinerary.itinerary[selectedDate] || []), obj],
        },
      };

      try {
        await updateItinerary({ id: it_id, data: updatedItinerary }).unwrap();
        toast.success("Transportation added successfully.");
        setIsOpen(false);
      } catch (error) {
        console.log('error: ', error);
        toast.error("Failed to add transportation. Please try again.");
      }
    }
  };

  const handleClear = () => {
    setFormData({
      type: "Flight",
      name: "",
      departureLocation: "",
      departureTime: new Date(),
      arrivalLocation: "",
      arrivalTime: new Date(),
      link: "",
      reservationNumber: "",
      note: "",
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            {editingItem ? "Edit transportation" : "Add a transportation"}
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            {editingItem ? "Edit your transportation details" : "Add your transportation details"}
          </p>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label>Type of transportation</Label>
            <ToggleGroup
              type="single"
              value={formData.type}
              onValueChange={(value: string) =>
                value && setFormData({ ...formData, type: value })
              }
              className="flex flex-wrap gap-2"
            >
              {["Flight", "Train", "Car", "Bus"].map((type) => (
                <ToggleGroupItem
                  key={type}
                  value={type}
                  className="px-4 py-2 text-sm"
                >
                  {type}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="departureLocation">Departure Location</Label>
              <Input
                id="departureLocation"
                value={formData.departureLocation}
                onChange={(e) =>
                  setFormData({ ...formData, departureLocation: e.target.value })
                }
                placeholder="Enter departure location"
              />
            </div>
            <div className="space-y-2">
              <Label>Departure Time</Label>
              <Input
                type="time"
                value={formData.departureTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':');
                  const newDate = new Date(formData.departureTime);
                  newDate.setHours(parseInt(hours), parseInt(minutes));
                  setFormData({ ...formData, departureTime: newDate });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="arrivalLocation">Arrival Location</Label>
              <Input
                id="arrivalLocation"
                value={formData.arrivalLocation}
                onChange={(e) =>
                  setFormData({ ...formData, arrivalLocation: e.target.value })
                }
                placeholder="Enter arrival location"
              />
            </div>
            <div className="space-y-2">
              <Label>Arrival Time</Label>
              <Input
                type="time"
                value={formData.arrivalTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':');
                  const newDate = new Date(formData.arrivalTime);
                  newDate.setHours(parseInt(hours), parseInt(minutes));
                  setFormData({ ...formData, arrivalTime: newDate });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                placeholder="Enter link"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reservationNumber">Reservation Number</Label>
              <Input
                id="reservationNumber"
                value={formData.reservationNumber}
                onChange={(e) =>
                  setFormData({ ...formData, reservationNumber: e.target.value })
                }
                placeholder="Enter reservation number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                placeholder="Add any extra details"
                className="resize-none"
              />
            </div>
          </div>
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={handleClear}>
              Clear
            </Button>
            <Button
              type="submit"
              className="bg-[#0B4D4A] hover:bg-[#0B4D4A]/90"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                editingItem ? "Update" : "Add to trip"
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddTransportation;