"use client";
import { Button } from "@/components/ui/button";
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
import { useSelector } from "react-redux";
import { useUpdateTripPlanItineraryMutation } from "@/store/api/trip/itenerySlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { TimelineItem } from "@/types";

const AddNote = ({
  children,
  onUpdate,
  editingItem,
}: {
  children?: React.ReactNode;
  onUpdate?: (item: any) => Promise<void>;
  editingItem?: TimelineItem | null;
}) => {
  const [formData, setFormData] = useState({
    title: editingItem?.details?.title || "",
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
      position: itinerary.itinerary[selectedDate]?.length + 1 || 1,
      date: selectedDate,
      type: "note",
      details: {
        title: formData.title,
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
        toast.success("Note added successfully.");
        setIsOpen(false);
      } catch (error) {
        console.log("error: ", error);
        toast.error("Failed to add note. Please try again.");
      }
    }
  };

  const handleClear = () => {
    setFormData({
      title: "",
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
              {editingItem ? "Edit Note" : "Add a Note"}
            </SheetTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            {editingItem ? "Edit your note" : "Add a note for your trip"}
          </p>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <input
              id="title"
              type="text"
              placeholder="Enter note title..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">
              Note <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="note"
              placeholder="Write your note here..."
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              className="resize-none min-h-[200px]"
              required
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
              ) : editingItem ? (
                "Update"
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

export default AddNote;
