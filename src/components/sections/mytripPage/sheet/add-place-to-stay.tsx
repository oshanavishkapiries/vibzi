"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup } from "@/components/ui/radio-group";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import { useUpdateTripPlanItineraryMutation } from "@/store/api/trip/itenerySlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { TimelineItem } from "@/types";

const AddPlaceToStay = ({ 
  children,
  onUpdate,
  editingItem 
}: { 
  children?: React.ReactNode;
  onUpdate?: (item: any) => Promise<void>;
  editingItem?: TimelineItem | null;
}) => {
  const [formData, setFormData] = useState({
    activityName: editingItem?.details?.title || "",
    booked: editingItem?.details?.customFields?.booked || "no",
    startTime: editingItem?.details?.customFields?.startTime ? new Date(editingItem.details.customFields.startTime) : new Date(),
    endTime: editingItem?.details?.customFields?.endTime ? new Date(editingItem.details.customFields.endTime) : new Date(),
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
      position:(itinerary.itinerary[selectedDate]?.length + 1) || 1,
      date: selectedDate,
      type: "hotel",
      details: {
        title: formData.activityName,
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
        toast.success("Place to stay added successfully.");
        setIsOpen(false);
      } catch (error) {
        console.log('error: ', error);
        toast.error("Failed to add place to stay. Please try again.");
      }
    }
  };

  const handleClear = () => {
    setFormData({
      activityName: "",
      booked: "no",
      startTime: new Date(),
      endTime: new Date(),
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
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">
              {editingItem ? "Edit place to stay" : "Add a place to stay"}
            </SheetTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            {editingItem ? "Edit your place to stay details" : "Add a description here"}
          </p>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activityName">
              Name Of Activity <span className="text-red-500">*</span>
            </Label>
            <Input
              id="activityName"
              value={formData.activityName}
              onChange={(e) =>
                setFormData({ ...formData, activityName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Booked?</Label>
            <RadioGroup
              className="flex gap-4"
              value={formData.booked}
              onValueChange={(value) =>
                setFormData({ ...formData, booked: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Check In Time</Label>
              <Input
                type="time"
                value={formData.startTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':');
                  const newDate = new Date(formData.startTime);
                  newDate.setHours(parseInt(hours), parseInt(minutes));
                  setFormData({ ...formData, startTime: newDate });
                }}
              />
            </div>
            <div>
              <Label>Check Out Time</Label>
              <Input
                type="time"
                value={formData.endTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':');
                  const newDate = new Date(formData.endTime);
                  newDate.setHours(parseInt(hours), parseInt(minutes));
                  setFormData({ ...formData, endTime: newDate });
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
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
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              placeholder="Add Any extra details"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              className="resize-none"
            />
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

export default AddPlaceToStay;