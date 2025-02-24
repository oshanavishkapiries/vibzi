"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useSelector } from "react-redux";
import { useUpdateTripPlanMutation } from "@/services/trip/tripPlanSlice";
import { useGetTripPlanByIdQuery } from "@/services/trip/tripPlanSlice";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export function EditDescriptionDialog({ children }: { children: React.ReactNode }) {
  const trip = useSelector((state: any) => state.meta.trip);
  const [open, setOpen] = React.useState(false);
  
  const { data: tripData } = useGetTripPlanByIdQuery(trip.id ?? "");
  const [updateTripPlan] = useUpdateTripPlanMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: tripData?.title || "",
      description: tripData?.description || "",
    },
  });

  React.useEffect(() => {
    if (tripData) {
      form.reset({
        title: tripData.title,
        description: tripData.description,
      });
    }
  }, [tripData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateTripPlan({
        id: trip.id,
        data: {
          ...tripData,
          title: values.title,
          description: values.description,
        },
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Failed to update trip:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Trip Details</DialogTitle>
          <DialogDescription>
            Edit the title and description of your trip.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Trip Title" {...field} />
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
                      placeholder="Trip Description" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}