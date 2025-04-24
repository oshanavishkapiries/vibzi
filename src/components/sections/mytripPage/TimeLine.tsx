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
  Save,
  GripVertical,
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
import { useState, useEffect, useCallback, memo, forwardRef } from "react";
import AddFoodAndDrink from "./sheet/add-food-and-drink";
import AddNote from "./sheet/add-note";
import AddPlaceToStay from "./sheet/add-place-to-stay";
import AddTransportation from "./sheet/add-transporation";
import ThingsToDo from "./sheet/thingstodo";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import type { CSSProperties } from 'react';
import React from "react";

// Types
interface TimeLineProps {
  data: TimelineItem[];
}

interface TimelineItemControlsProps {
  item: TimelineItem;
  onEdit: (item: TimelineItem) => void;
  onDelete: (item: TimelineItem) => void;
}

interface TimelineItemContentProps {
  item: TimelineItem;
}

interface SortableItemProps {
  item: TimelineItem;
  onEdit: (item: TimelineItem) => void;
  onDelete: (item: TimelineItem) => void;
}

// Utility Components
const TimelineItemIcon = memo(({ type }: { type: TimelineItem["type"] }) => {
  const iconMap = {
    activity: <Activity className="h-5 w-5" />,
    restaurant: <Utensils className="h-5 w-5" />,
    hotel: <Building2 className="h-5 w-5" />,
    flight: <Plane className="h-5 w-5" />,
    note: <NotebookIcon className="h-5 w-5" />,
  };

  return iconMap[type] || null;
});

TimelineItemIcon.displayName = "TimelineItemIcon";

const TimelineItemControls = memo(
  ({ item, onEdit, onDelete }: TimelineItemControlsProps) => (
    <div className="absolute top-2 right-2 flex gap-2">
      <button
        className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
        onClick={() => onEdit(item)}
      >
        <Pencil className="h-4 w-4" />
      </button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Itinerary Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this itinerary item? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => onDelete(item)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
);

TimelineItemControls.displayName = "TimelineItemControls";

const TimelineItemContent = memo(({ item }: TimelineItemContentProps) => {
  const extractDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace(/^www\./, "");
    } catch {
      return url;
    }
  };

  return (
    <>
      <h3 className="font-medium mb-2">{item?.details?.title}</h3>
      <div className="space-y-1 text-sm text-muted-foreground">
        {item?.details?.customFields.startTime &&
          item?.details?.customFields.endTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{`${
                IteneryDateParser(item?.details?.customFields.startTime).long
              } -> ${
                IteneryDateParser(item?.details?.customFields.endTime).long
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
    </>
  );
});

TimelineItemContent.displayName = "TimelineItemContent";

const SortableItem = ({ item, onEdit, onDelete }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id || `item-${item?.details?.title}` });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={cn(
        "flex gap-4 w-full",
        isDragging && "opacity-0"
      )}
    >
      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background shrink-0">
        <TimelineItemIcon type={item.type} />
      </div>
      <Card className="flex-1 p-4 shadow-none relative">
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
            onClick={() => onEdit(item)}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Itinerary Item</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this itinerary item? This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive hover:bg-destructive/90"
                  onClick={() => onDelete(item)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
          >
            <GripVertical className="h-4 w-4" />
          </div>
        </div>
        <TimelineItemContent item={item} />
      </Card>
    </div>
  );
};

// Main Component
const TimeLine = forwardRef<{ handleSave: () => Promise<void> }, TimeLineProps>(({ data }, ref) => {
  const trip = useSelector((state: any) => state.meta.trip);
  const [updateItinerary] = useUpdateTripPlanItineraryMutation();
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<TimelineItem[]>(
    data.map((item) => ({
      ...item,
      id: item.id || crypto.randomUUID(),
    }))
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<TimelineItem[]>(
    data.map((item) => ({
      ...item,
      id: item.id || crypto.randomUUID(),
    }))
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const itemsWithIds = data.map((item) => ({
      ...item,
      id: item.id || crypto.randomUUID(),
    }));
    setItems(itemsWithIds);
    setPendingChanges(itemsWithIds);
  }, [data]);

  const handleDelete = useCallback((itemToDelete: TimelineItem) => {
    setPendingChanges((prev) => {
      const newItems = prev.filter((item) => item !== itemToDelete);
      setHasUnsavedChanges(true);
      return newItems;
    });
  }, []);

  const handleUpdate = useCallback(
    async (updatedItem: TimelineItem) => {
      setPendingChanges((prev) => {
        const newItems = prev.map((item) =>
          item === editingItem ? { ...updatedItem, id: editingItem.id } : item
        );
        setHasUnsavedChanges(true);
        return newItems;
      });
      setEditingItem(null);
    },
    [editingItem]
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setPendingChanges((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        setHasUnsavedChanges(true);
        return newItems;
      });
    }
  };

  const handleSave = useCallback(async () => {
    try {
      const currentItinerary = trip.itinerary?.itinerary || {};

      const updatedItineraryData = {
        id: trip.itinerary.id,
        tripId: trip.tripId,
        itinerary: {
          ...currentItinerary,
          [trip.select_date]: pendingChanges,
        },
      };

      await updateItinerary({
        id: trip.itinerary.id,
        data: updatedItineraryData,
      }).unwrap();

      setItems(pendingChanges);
      setIsEditMode(false);
      setHasUnsavedChanges(false);
      toast.success("Itinerary updated successfully.");
    } catch (error) {
      console.error("Failed to update itinerary:", error);
      toast.error("Failed to update itinerary. Please try again.");
    }
  }, [trip, pendingChanges, updateItinerary]);

  const handleCancel = useCallback(() => {
    setPendingChanges(items);
    setIsEditMode(false);
    setHasUnsavedChanges(false);
  }, [items]);

  const renderEditComponent = useCallback(() => {
    if (!editingItem) return null;

    const editComponents = {
      activity: ThingsToDo,
      restaurant: AddFoodAndDrink,
      hotel: AddPlaceToStay,
      flight: AddTransportation,
      note: AddNote,
    };

    const EditComponent = editComponents[editingItem.type];
    return EditComponent ? (
      <EditComponent onUpdate={handleUpdate} editingItem={editingItem} />
    ) : null;
  }, [editingItem, handleUpdate]);

  const renderDraggingItem = (id: string) => {
    const item = pendingChanges.find((item) => item.id === id);
    if (!item) return null;

    return (
      <div className="flex gap-4 w-full">
        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background shrink-0">
          <TimelineItemIcon type={item.type} />
        </div>
        <Card className="flex-1 p-4 shadow-none relative">
          <div className="absolute top-2 right-2 flex gap-2">
            <button className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
              <Pencil className="h-4 w-4" />
            </button>
            <button className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
            <div className="cursor-grab p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
              <GripVertical className="h-4 w-4" />
            </div>
          </div>
          <TimelineItemContent item={item} />
        </Card>
      </div>
    );
  };

  React.useImperativeHandle(ref, () => ({
    handleSave,
    hasUnsavedChanges,
  }));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        {trip.select_date && (
          <h2 className="font-semibold text-xl">
            {IteneryDateParser(trip.select_date).long}
          </h2>
        )}
        {items.length !== 0 && (
          <div className="flex gap-2">
            {isEditMode && (
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300"
              >
                Cancel
              </Button>
            )}
            <Button
              variant="default"
              onClick={() => (isEditMode ? handleSave() : setIsEditMode(true))}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300",
              )}
            >
              {isEditMode ? (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <div className="relative">
        {items.length !== 0 && (
          <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-border" />
        )}

        {isEditMode ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={pendingChanges.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-6">
                {pendingChanges.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    onEdit={setEditingItem}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {activeId ? renderDraggingItem(activeId) : null}
            </DragOverlay>
          </DndContext>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background">
                  <TimelineItemIcon type={item.type} />
                </div>
                <Card className="flex-1 p-4 shadow-none relative">
                  <TimelineItemContent item={item} />
                </Card>
              </div>
            ))}
          </div>
        )}

        {items.length === 0 && (
          <div className="text-center text-muted-foreground">
            add your first itinerary
          </div>
        )}

        <div
          className={cn(
            items.length !== 0
              ? "relative z-10 mt-4"
              : "flex justify-center items-center"
          )}
        >
          <ItineraryAdd initmode={items.length} />
        </div>
      </div>

      {renderEditComponent()}
    </div>
  );
});

TimeLine.displayName = "TimeLine";

export default memo(TimeLine);
