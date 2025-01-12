"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Grid2X2 } from "lucide-react";
import Image from "next/image";
import "react-photo-view/dist/react-photo-view.css";

const ShowAllImage = ({ images }: any) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="absolute bottom-4 right-4 gap-2"
          size="sm"
        >
          <Grid2X2 className="h-4 w-4" />
          Show all photos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[100vw] h-[100vh] w-full">
        <DialogTitle>All Photos</DialogTitle>
        <ScrollArea className="h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
            {images.map((image: any, index: number) => (
              <div
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
              >
                <Image
                  src={image.big}
                  alt={`Image ${index}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ShowAllImage;
