"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2 } from "lucide-react";

export function ShareTripDialog({
  tripName = "Chian Mai Trip",
  shareUrl = "www.tripadvisor.com/Trips?tt=c4406/783-2322-",
  children,
}: {
  tripName?: string;
  shareUrl?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    // Optionally show a toast/notification here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share &quot;{tripName}&quot;</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="flex items-center gap-2 font-semibold mb-1">
            <Share2 className="w-5 h-5" />
            <span>Share with anyone</span>
          </div>
          <div className="text-gray-500 text-sm mb-4">
            Copy and send the link below to share your trip. Anyone with this
            link can view the trip, but can&apos;t edit or add to it.
          </div>
          <div className="flex items-center gap-3">
            <Input
              value={shareUrl}
              readOnly
              className="flex-1 bg-gray-100 text-gray-400 font-medium"
            />

            <Button
              variant="outline"
              className="rounded-full px-6 py-2"
              type="button"
              onClick={handleCopy}
            >
              Copy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
