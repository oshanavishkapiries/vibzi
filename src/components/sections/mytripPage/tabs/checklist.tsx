"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useGetTripPlanChecklistByTripIdQuery,
  useUpdateTripPlanChecklistMutation,
} from "@/services/trip/checklistSlice";
import { Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const Checklist = () => {
  const tripId = useSelector((state: any) => state.meta.trip.tripId);
  const [_id, setId] = useState("");
  const [updateTripPlanChecklist] = useUpdateTripPlanChecklistMutation();
  const { data, isLoading, refetch } =
    useGetTripPlanChecklistByTripIdQuery(tripId);
  const [items, setItems] = useState<
    { id: string; description: string; isChecked: boolean }[]
  >([]);
  const [newItemText, setNewItemText] = useState("");

  useEffect(() => {
    if (data?.id) {
      setId(data.id);
    }
    if (data?.checklist) {
      setItems(
        data.checklist.map((item: any) => ({
          id: item.id || Date.now().toString(),
          description: item.description,
          isChecked: item.isChecked || false,
        }))
      );
    }
  }, [data]);

  const addItem = async () => {
    if (newItemText.trim()) {
      const newItem = {
        id: new Date().toISOString(),
        description: newItemText,
        isChecked: false,
      };
      const updatedChecklist = [...items, newItem];
      await updateTripPlanChecklist({
        id: _id,
        data: {
          tripId,
          checklist: updatedChecklist,
        },
      });
      setItems(updatedChecklist);
      setNewItemText("");
      toast.success("Item added successfully");
      refetch();
    }
  };

  const toggleItem = async (id: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    await updateTripPlanChecklist({
      id: _id,
      data: {
        tripId,
        checklist: updatedItems,
      },
    });
    setItems(updatedItems);
    toast.success("Item updated successfully");
    refetch();
  };

  const deleteItem = async (id: string) => {
    const filteredItems = items.filter((item) => item.id !== id);
    await updateTripPlanChecklist({
      id: _id,
      data: {
        tripId,
        checklist: filteredItems,
      },
    });
    setItems(filteredItems);
    toast.success("Item deleted successfully");
    refetch();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2 p-2 shadow-sm border w-full h-auto relative">
            <Checkbox
              id={`item-${item.id}`}
              checked={item.isChecked}
              onCheckedChange={() => toggleItem(item.id)}
            />
            <label
              htmlFor={`item-${item.id}`}
              className={`text-sm font-medium leading-none w-full peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                item.isChecked ? "line-through text-gray-500" : ""
              }`}
            >
              {item.description}
            </label>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The item will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500" onClick={() => deleteItem(item.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 px-3 py-2 border rounded-md"
          onKeyPress={(e) => e.key === "Enter" && addItem()}
        />
        <Button variant="outline" className="gap-2" onClick={addItem}>
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default Checklist;