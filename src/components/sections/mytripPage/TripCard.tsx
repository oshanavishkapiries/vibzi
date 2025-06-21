import { useDeleteTripPlanMutation } from "@/store/api/trip/tripPlanSlice";
import { Trash2, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { setTripDate } from "@/store/slices/metaSlice";
import { setTrip_Id } from "@/store/slices/metaSlice";
import { useDispatch, useSelector } from "react-redux";
import { setTripId } from "@/store/slices/metaSlice";
import { RootState } from "@/store/store";

interface ITripCardProps {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  user_id: string;
  onClick: () => void;
}

const TripCard = ({
  id,
  src,
  alt,
  title,
  description,
  user_id,
  onClick,
}: ITripCardProps) => {
  const [deleteTripPlan] = useDeleteTripPlanMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteTripPlan(id).unwrap();
      dispatch(setTripId(""));
      dispatch(setTrip_Id(""));
      dispatch(setTripDate(""));
      toast.success("Trip deleted successfully");
      setOpenDialog(false);
      window.location.href = "/my-trips";
    } catch {
      toast.error("Failed to delete trip");
    } finally {
      setIsDeleting(false);
    }
  };

  const isOwner = user_id === user?.id;

  return (
    <div
      onClick={onClick}
      className="p-2 rounded-lg shadow-md hover:shadow-lg relative"
    >
      <div className="flex gap-4">
        <div className="relative h-24 w-40 flex-shrink-0">
          <Image src={src} alt={alt} fill className="object-fill rounded-lg" />
        </div>




        <div className="w-full">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">
            {description.length > 40
              ? description?.slice(0, 40) + "..."
              : description}
          </p>
          {isOwner ? (
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDialog(true);
                  }}
                  className="mt-2 text-red-500 hover:text-red-700"
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4 absolute bottom-2 right-2" />
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogTitle>Delete Trip</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this trip?
                </DialogDescription>

                <DialogFooter>
                  <DialogClose asChild>
                    <button className="mr-2">Cancel</button>
                  </DialogClose>
                  <Button onClick={handleDelete} variant={"destructive"}>
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Users className="w-4 h-4 absolute bottom-2 right-2 text-blue-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
