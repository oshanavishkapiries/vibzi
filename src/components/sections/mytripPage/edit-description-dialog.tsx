// "use client";
// import * as React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const formSchema = z.object({
//   description: z.string().min(2, {
//     message: "Description must be at least 2 characters.",
//   }),
// });

// export function EditDescriptionDialog({
//   children,
//   defaultDescription,
// }: {
//   children: React.ReactNode;
//   defaultDescription: string ;
// }) {
//   const [open, setOpen] = React.useState(false);
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       description: defaultDescription,
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     setOpen(false);
//     form.reset();
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit Description</DialogTitle>
//           <DialogDescription>
//             Edit the description of your trip.
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Summer Vacation" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <DialogFooter>
//               <Button type="submit">Save</Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }