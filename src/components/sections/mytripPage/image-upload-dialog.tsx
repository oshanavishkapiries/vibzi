"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";

import { toast } from "sonner";
import "react-image-crop/dist/ReactCrop.css";
import { useUploadTripPlanCoverImageMutation } from "@/store/api/trip/tripPlanSlice";
import { useSelector } from "react-redux";
import Image from "next/image";

export function ImageUploadDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [crop, setCrop] = React.useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 320,
    height: 180,
  });
  const [completedCrop, setCompletedCrop] = React.useState<PixelCrop | null>(
    null
  );
  const [error, setError] = React.useState<string | null>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const [uploadTripPlanCoverImage, { isLoading }] =
    useUploadTripPlanCoverImageMutation();
  const tripPlanId = useSelector((state: any) => state.meta.trip.id);

  React.useEffect(() => {
    if (!open) {
      setFile(null);
      setPreview(null);
      setCrop({ unit: "px", x: 0, y: 0, width: 320, height: 180 });
      setCompletedCrop(null);
      setError(null);
      if (imgRef.current) {
        imgRef.current = null;
      }
    }
  }, [open]);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const file = acceptedFiles[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
      setCompletedCrop(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxSize: 5 * 1024 * 1024,
    disabled: !!file,
  });

  const getCroppedImg = async (): Promise<File | null> => {
    if (!completedCrop || !imgRef.current) return null;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    const outputWidth = 320;
    const outputHeight = 180;

    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      outputWidth,
      outputHeight
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(null);
          return;
        }
        const croppedFile = new File(
          [blob],
          file?.name || "cropped-image.jpg",
          { type: "image/jpeg" }
        );
        resolve(croppedFile);
      }, "image/jpeg");
    });
  };

  const handleSave = async () => {
    const croppedFile = await getCroppedImg();
    if (croppedFile) {
      try {
        await uploadTripPlanCoverImage({
          id: tripPlanId,
          file: croppedFile,
        }).unwrap();
        setOpen(false);
        toast("Cover image uploaded successfully");
      } catch (error) {
        console.log(error);
        setError("Failed to upload image. Please try again.");
        toast("Failed to upload cover image", {
          description: "Please try again later",
        });
      }
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    imgRef.current = e.currentTarget;

    if (imgRef.current) {
      const { width, height } = imgRef.current;

      let cropWidth = 320;
      let cropHeight = 180;

      if (width < 320 || height < 180) {
        const widthRatio = width / 320;
        const heightRatio = height / 180;

        if (widthRatio < heightRatio) {
          cropWidth = width;
          cropHeight = width * (9 / 16);
        } else {
          cropHeight = height;
          cropWidth = height * (16 / 9);
        }
      }

      const x = Math.max(0, (width - cropWidth) / 2);
      const y = Math.max(0, (height - cropHeight) / 2);

      setCrop({ unit: "px", x, y, width: cropWidth, height: cropHeight });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md max-w-sm">
        <DialogHeader>
          <DialogTitle>Change Cover Image</DialogTitle>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 transition hover:border-primary focus:border-primary ${
            isDragActive && !file ? "border-primary" : ""
          } ${file ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <ReactCrop
              crop={crop}
              onChange={(_, pixelCrop) => setCrop(pixelCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={16 / 9}
              locked={true}
              keepSelection={true}
              className="w-full"
            >
              <Image
                width={320}
                height={180}
                src={preview}
                alt="Preview"
                className="max-w-full h-auto object-contain"
                onLoad={handleImageLoad}
              />
            </ReactCrop>
          ) : (
            <>
              <Upload className="w-10 h-10 text-gray-400 mb-2" />
              <p className="font-medium text-gray-700 mb-1">
                Drag & drop an image here, or click to select
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
            </>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            type="button"
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
