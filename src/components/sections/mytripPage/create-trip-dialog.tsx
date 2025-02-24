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
import { useSuggestDestinationQuery } from "@/services/product/destinationSlice";
import { Destination } from "@/types";
import { useCreateTripPlanMutation } from "@/services/trip/tripPlanSlice";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const formSchema = z.object({
  tripName: z
    .string()
    .min(2, { message: "Trip name must be at least 2 characters." }),
  description: z.string().optional(),
  destination: z.string().min(2, { message: "Please select a destination." }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
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
  const userId = useSelector((state: any) => state.meta.user.id);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripName: "",
      description: "",
      destination: "",
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
    },
  });

  const imageUrl = () => {
    return `/${Math.floor(Math.random() * 6) + 1}.jpg`;
  };
  

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
        startDate: format(values.dateRange.from, "yyyy-MM-dd"),
        endDate: format(values.dateRange.to, "yyyy-MM-dd"),
        destinationId: selectedDestination.destinationId,
        destinationName: selectedDestination.name,
        description: values.description,
        userId: userId,
        imageUrl: imageUrl(),
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
    setSearchTerm(""); 
    setIsDropdownOpen(false); 
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-[530px]">
        <DialogHeader>
          <DialogTitle>Create Trip</DialogTitle>
          <DialogDescription>
            Plan a new trip by entering basic details below.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-2">
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
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Range</FormLabel>
                    <FormControl className="p-[0px]">
                      <div className="rounded-md p-4">
                        <div className="mb-2 text-sm text-muted-foreground">
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                Selected: {format(field.value.from, "LLL dd, y")} -{" "}
                                {format(field.value.to, "LLL dd, y")}
                              </>
                            ) : (
                              `Start: ${format(field.value.from, "LLL dd, y")}`
                            )
                          ) : (
                            "Select date range"
                          )}
                        </div>
                        <Calendar
                          mode="range"
                   
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                          disabled={(date) =>
                            date < new Date() || date > new Date("2025-12-31")
                          }
                          className="flex justify-center items-center"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
