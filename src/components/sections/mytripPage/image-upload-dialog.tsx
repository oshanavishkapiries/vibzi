"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Cropper, { Area } from "react-easy-crop";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useUploadTripPlanCoverImageMutation } from "@/store/api/trip/tripPlanSlice";
import { useSelector } from "react-redux";

const FIXED_CROP_WIDTH = 1600;
const FIXED_CROP_HEIGHT = 900;

export function ImageUploadDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [uploadTripPlanCoverImage, { isLoading }] =
    useUploadTripPlanCoverImageMutation();
  const tripPlanId = useSelector((state: any) => state.meta.trip.id);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const aspectRatio = 14 / 5;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      const file = acceptedFiles[0];
      setFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setZoom(1);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxSize: 5 * 1024 * 1024,
    disabled: !!file,
    noClick: true,
    noKeyboard: true,
  });

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    if (!open) {
      setFile(null);
      setPreview(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [open]);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const onCrop = useCallback(
    (crop: { x: number; y: number }) => {
      setCrop(crop);
    },
    [setCrop]
  );

  const onZoom = useCallback(
    (zoom: number) => {
      setZoom(zoom);
    },
    [setZoom]
  );

  const onMediaLoaded = useCallback(
    (mediaSize: { width: number; height: number }) => {
      const width = mediaSize.width;
      const height = mediaSize.height;

      let cropWidth = width;
      let cropHeight = width / aspectRatio;

      if (cropHeight > height) {
        cropHeight = height;
        cropWidth = height * aspectRatio;
      }

      const x = (width - cropWidth) / 2;
      const y = (height - cropHeight) / 2;

      setCroppedAreaPixels({
        x,
        y,
        width: cropWidth,
        height: cropHeight,
      });
    },
    [aspectRatio]
  );

  const getCroppedImgBlob = async (
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number }
  ): Promise<Blob | null> => {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageSrc;
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
    });

    const canvas = document.createElement("canvas");
    canvas.width = FIXED_CROP_WIDTH;
    canvas.height = FIXED_CROP_HEIGHT;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      FIXED_CROP_WIDTH,
      FIXED_CROP_HEIGHT
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob || null), "image/jpeg", 0.9);
    });
  };

  const handleSave = async () => {
    if (!file || !preview) return;

    let fileToUpload: File = file;

    if (croppedAreaPixels) {
      const croppedBlob = await getCroppedImgBlob(preview, croppedAreaPixels);
      if (!croppedBlob) {
        toast("Failed to crop image");
        return;
      }
      fileToUpload = new File([croppedBlob], file.name, { type: "image/jpeg" });
    }

    try {
      await uploadTripPlanCoverImage({
        id: tripPlanId,
        file: fileToUpload,
      }).unwrap();
      toast("Cover image uploaded successfully");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast("Failed to upload image", {
        description: "Please try again later",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Change Cover Image</DialogTitle>
        </DialogHeader>

        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 transition ${
            isDragActive && !file ? "border-primary" : ""
          } ${file ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => !file && inputRef.current?.click()}
          style={{ minHeight: "500px" }}
        >
          <input {...getInputProps()} ref={inputRef} />
          {!file ? (
            <>
              <Upload className="w-14 h-14 text-gray-400 mb-4" />
              <p className="font-medium text-gray-700 mb-2">
                Drag & drop an image here, or click to select
              </p>
              <p className="text-sm text-gray-400">PNG, JPG, JPEG up to 5MB</p>
            </>
          ) : (
            <div className="relative w-full h-[450px] bg-black rounded overflow-hidden">
              <Cropper
                image={preview!}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={onCrop}
                onZoomChange={onZoom}
                onCropComplete={onCropComplete}
                onMediaLoaded={onMediaLoaded}
                zoomWithScroll={true}
                restrictPosition={true}
                objectFit="cover"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!file || isLoading}>
            {isLoading ? "Uploading..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
