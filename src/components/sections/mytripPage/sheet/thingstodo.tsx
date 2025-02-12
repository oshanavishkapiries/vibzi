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
import { useUpdateTripPlanItineraryMutation } from "@/services/trip/itenerySlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ThingsToDo = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState({
    activityName: "",
    booked: "no",
    startTime: "12:00 PM",
    endTime: "12:00 PM",
    link: "",
    reservationNumber: "",
    note: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const itinerary = useSelector((state: any) => state.meta.trip.itinerary);
  const it_id = itinerary?.id;
  const selectedDate = useSelector((state: any) => state.meta.trip.select_date);
  const [updateItinerary, { isLoading }] = useUpdateTripPlanItineraryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itinerary || !selectedDate) return;

    const obj = {
      position: itinerary.itinerary[selectedDate].length + 1,
      date: selectedDate,
      type: "activity",
      details: {
        title: formData.activityName,
        customFields: { ...formData },
      },
    };

    const updatedItinerary = {
      ...itinerary,
      itinerary: {
        ...itinerary.itinerary,
        [selectedDate]: [...itinerary.itinerary[selectedDate], obj],
      },
    };

    try {
      await updateItinerary({ id: it_id, data: updatedItinerary }).unwrap();
      toast.success("Things to do added successfully.");
      setIsOpen(false);
    } catch (error) {
      console.log('error: ', error);
      toast.error("Failed to add things to do. Please try again.");
    }
  };

  const handleClear = () => {
    setFormData({
      activityName: "",
      booked: "no",
      startTime: "12:00 PM",
      endTime: "12:00 PM",
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
            <SheetTitle className="text-xl font-semibold">Add a things to do</SheetTitle>
          </div>
          <p className="text-sm text-muted-foreground">Add a description here</p>
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
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
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
                "Add to trip"
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ThingsToDo;