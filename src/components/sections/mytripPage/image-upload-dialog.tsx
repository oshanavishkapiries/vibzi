"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useUploadTripPlanCoverImageMutation }  from "@/store/api/trip/tripPlanSlice";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ASPECT_RATIO = 16 / 9;
const CROP_WIDTH = 800;
const CROP_HEIGHT = CROP_WIDTH / ASPECT_RATIO;

export function ImageUploadDialog({
  children
}: {
    children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    width: CROP_WIDTH,
    height: CROP_HEIGHT,
    x: 0,
    y: 0,
  });
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [uploadTripPlanCoverImage, { isLoading }] = useUploadTripPlanCoverImageMutation();
  const tripPlanId = useSelector((state: any) => state.meta.trip.id);

  useEffect(() => {
    if (!open) {
      setFile(null);
      setPreview(null);
      setError(null);
      setCrop({
        unit: "px",
        width: CROP_WIDTH,
        height: CROP_HEIGHT,
        x: 0,
        y: 0,
      });
    }
  }, [open]);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const droppedFile = acceptedFiles[0];
    if (droppedFile) {
      if (droppedFile.size > MAX_FILE_SIZE) {
        setError("File size exceeds 5MB limit.");
        return;
      }
      setError(null);
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
  });

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    
    // Calculate the maximum possible crop dimensions
    const maxWidth = Math.min(width, CROP_WIDTH);
    const maxHeight = maxWidth / ASPECT_RATIO;
    
    // Create initial crop centered on the image
    const initialCrop = centerCrop(
      makeAspectCrop(
        {
          unit: 'px',
          width: maxWidth,
          height: maxHeight,
        },
        ASPECT_RATIO,
        width,
        height
      ),
      width,
      height
    );
    
    setCrop(initialCrop);
  };

  const handleCropChange = (newCrop: Crop) => {
    if (!imageRef) return;

    // Calculate boundaries
    const maxX = imageRef.width - newCrop.width;
    const maxY = imageRef.height - newCrop.height;

    // Ensure crop stays within image boundaries
    const boundedCrop = {
      ...newCrop,
      x: Math.max(0, Math.min(newCrop.x, maxX)),
      y: Math.max(0, Math.min(newCrop.y, maxY)),
    };

    setCrop(boundedCrop);
  };

  const getCroppedImg = async () => {
    if (!file || !imageRef) return null;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Set canvas dimensions to match the crop
    canvas.width = CROP_WIDTH;
    canvas.height = CROP_HEIGHT;

    // Calculate scale factors
    const scaleX = imageRef.naturalWidth / imageRef.width;
    const scaleY = imageRef.naturalHeight / imageRef.height;

    // Draw the cropped image
    ctx.drawImage(
      imageRef,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      CROP_WIDTH,
      CROP_HEIGHT
    );

    return new Promise<File | null>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(null);
          return;
        }
        const croppedFile = new File([blob], file.name, {
          type: file.type,
        });
        resolve(croppedFile);
      }, file.type);
    });
  };

  const handleSave = async () => {
    const croppedFile = await getCroppedImg();
    if (croppedFile) {
      try {
        await uploadTripPlanCoverImage({ id: tripPlanId, file: croppedFile }).unwrap();
        setOpen(false);
        toast("Cover image uploaded successfully");
      } catch (error) {
        setError("Failed to upload image. Please try again.");
        toast("Failed to upload cover image", {
          description: "Please try again later",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
       <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Change Cover Image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {!preview ? (
            <div
              {...getRootProps()}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 cursor-pointer transition hover:border-primary focus:border-primary"
            >
              <input {...getInputProps()} />
              <Upload className="w-10 h-10 text-gray-400 mb-2" />
              <p className="font-medium text-gray-700 mb-1">
                {isDragActive
                  ? "Drop the image here"
                  : "Drag & drop an image here, or click to select"}
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center max-h-[500px] overflow-hidden">
                <div className="relative w-full">
                  <ReactCrop
                    crop={crop}
                    onChange={handleCropChange}
                    aspect={ASPECT_RATIO}
                    className="max-h-[500px]"
                    locked={true}
                  >
                    <img
                      ref={setImageRef}
                      src={preview}
                      alt="Preview"
                      className="max-w-full max-h-[500px] object-contain"
                      onLoad={onImageLoad}
                      draggable={false}
                    />
                  </ReactCrop>
                </div>
              </div>
            </div>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            type="button"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!file || isLoading}
            type="button"
          >
            {isLoading ? "Uploading..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}