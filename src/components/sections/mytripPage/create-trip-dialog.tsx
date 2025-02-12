"use client";
import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSuggestDestinationQuery } from "@/services/destinationSlice";
import { Destination } from "@/types";
import { useCreateTripPlanMutation } from "@/services/trip/tripPlanSlice";
import { toast } from "sonner";

const formSchema = z.object({
  tripName: z
    .string()
    .min(2, { message: "Trip name must be at least 2 characters." }),
  description: z.string().optional(),
  destination: z.string().min(2, { message: "Please select a destination." }),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateTripDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { data: suggestionsData = [] } = useSuggestDestinationQuery(
    searchTerm || undefined,
    {
      refetchOnMountOrArgChange: true,
      skip: !searchTerm,
    }
  );
  const [createTripPlan, { isLoading: isCreating }] =
    useCreateTripPlanMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripName: "",
      description: "",
      destination: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const selectedDestination = suggestionsData?.data?.find(
        (item: Destination) => item.name === values.destination
      );
      if (!selectedDestination) {
        toast.error("Please select a valid destination from the suggestions.");
        return;
      }
      const tripData: any = {
        title: values.tripName,
        startDate: format(values.startDate, "yyyy-MM-dd"),
        endDate: format(values.endDate, "yyyy-MM-dd"),
        destinationId: selectedDestination.destinationId,
        destinationName: selectedDestination.name,
        description: values.description,
        userId: "1234", // Replace with actual user ID
      };
      const res = await createTripPlan(tripData).unwrap();

      if (!res) {
        toast.error("Failed to create trip plan");
        return;
      }

      toast.success("Trip created successfully!");
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error creating trip:", error);
      toast.error("Failed to create trip. Please try again.");
    }
  };

  const handleDestinationSelect = (destinationName: string) => {
    form.setValue("destination", destinationName);
    setSearchTerm(""); // Clear suggestions dropdown
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Trip</DialogTitle>
          <DialogDescription>
            Plan a new trip by entering basic details below.
          </DialogDescription>
        </DialogHeader>
        <div className=" max-h-[70vh] overflow-y-auto scrollbar-hide">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 p-2"
            >
              <FormField
                control={form.control}
                name="tripName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trip Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter trip name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter trip description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Destination</FormLabel>
                    <div className="relative">
                      <Input
                        placeholder="Search destination..."
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          setSearchTerm(e.target.value);
                          setIsDropdownOpen(true);
                        }}
                        onFocus={() => setIsDropdownOpen(true)}
                        onBlur={() =>
                          setTimeout(() => setIsDropdownOpen(false), 500)
                        }
                      />
                      {isDropdownOpen &&
                        searchTerm &&
                        suggestionsData?.data?.length > 0 && (
                          <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-md max-h-40 overflow-auto">
                            {suggestionsData.data.map(
                              (suggestion: Destination) => (
                                <div
                                  key={suggestion.destinationId}
                                  onClick={() =>
                                    handleDestinationSelect(suggestion.name)
                                  }
                                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                >
                                  {suggestion.name}
                                </div>
                              )
                            )}
                          </div>
                        )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date > new Date("2025-12-31")
                        }
                        initialFocus
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < form.getValues("startDate") ||
                          date > new Date("2025-12-31")
                        }
                        initialFocus
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full" disabled={isCreating}>
                  {isCreating ? "Saving..." : "Create Trip"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
