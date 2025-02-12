import { useDeleteTripPlanMutation } from '@/services/trip/tripPlanSlice';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ITripCardProps {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  onClick : () => void;
}

const TripCard = ({ id, src, alt, title, description , onClick }: ITripCardProps) => {
  const [deleteTripPlan] = useDeleteTripPlanMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTripPlan(id);
    setIsDeleting(false);
    toast.success('Trip deleted successfully');
    setOpenDialog(false); 
  };

  return (
    <div onClick={onClick} className="p-2 rounded-lg shadow-md hover:shadow-lg relative">
      <div className="flex gap-4">
        <div className="relative h-24 w-40 flex-shrink-0">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className='w-full'>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{description.length > 40 ? description?.slice(0,40) + "..." : description}</p>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <button
                onClick={() => setOpenDialog(true)}
                className="mt-2 text-red-500 hover:text-red-700"
                disabled={isDeleting}
              >
                <Trash2 className='w-4 h-4 absolute bottom-2 right-2' />
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle>Delete Trip</DialogTitle>
              <DialogDescription>Are you sure you want to delete this trip?</DialogDescription>

              <DialogFooter>
                <DialogClose asChild>
                  <button className="mr-2">Cancel</button>
                </DialogClose>
                <Button
                  onClick={handleDelete}
                  variant={"destructive"}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
