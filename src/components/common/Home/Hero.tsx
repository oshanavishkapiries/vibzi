"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";

const Hero = () => {
  const [images] = useState([
    "/gallery/1.webp",
    "/gallery/2.webp",
    "/gallery/3.webp",
    "/gallery/4.webp",
    "/gallery/5.webp",
    "/gallery/6.webp",
    "/gallery/7.webp",
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
    "/gallery/7.jpg",
    "/gallery/8.jpg",
    "/gallery/9.jpg",
    "/gallery/10.jpg",
    "/gallery/11.jpg",
    "/gallery/12.jpg",
    "/gallery/13.jpg",
    "/gallery/14.jpg",
    "/gallery/15.jpg",
  ]);

  const initMargin = [
    "mt-[120px]",
    "mt-[220px]",
    "mt-[320px]",
    "mt-[420px]",
    "mt-[320px]",
    "mt-[220px]",
    "mt-[120px]",
  ];

  const [currentImages, setCurrentImages] = useState<string[][]>([]);
  const [changingImage, setChangingImage] = useState<{
    col: number;
    row: number;
  } | null>(null);
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] =
    useState(false);
  const [usedImages, setUsedImages] = useState<Set<string>>(new Set());

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      description:
        "Itinerary : Plan daily with Vibzi itineraries add stays, activities, dining, and links easily.",
    },
    {
      description:
        "Checklist : Stay on track with Vibzi checklists—list tasks like packing or checks, never miss a step.",
    },
    {
      description:
        "Attachment : Store docs in Vibzi attachments upload tickets, bookings, and more for easy, secure access.",
    },
  ];

  const getRandomImage = useCallback((currentImage: string, currentRow: number) => {
    const rowImages = currentImages.map((col) => col[currentRow]);
    const availableImages = images.filter(
      (img) =>
        !rowImages.includes(img) && img !== currentImage && !usedImages.has(img)
    );

    if (availableImages.length === 0) {
      setUsedImages(new Set());
      const allImagesExceptCurrent = images.filter(
        (img) => img !== currentImage
      );
      return allImagesExceptCurrent[
        Math.floor(Math.random() * allImagesExceptCurrent.length)
      ];
    }

    const newImage =
      availableImages[Math.floor(Math.random() * availableImages.length)];
    setUsedImages((prev) => new Set([...prev, newImage]));
    return newImage;
  }, [currentImages, images, usedImages]);

  useEffect(() => {
    const initialColumns = Array.from({ length: 7 }, (_, columnIndex) => {
      const columnImages = Array.from({ length: 3 }, (_, imageIndex) => {
        const imageArrayIndex = (columnIndex * 2 + imageIndex) % images.length;
        const image = images[imageArrayIndex];
        setUsedImages((prev) => new Set([...prev, image]));
        return image;
      });
      return columnImages;
    });
    setCurrentImages(initialColumns);

    const lastColumnIndex = 6;
    const lastImageIndex = 1;
    const totalDelay =
      (lastColumnIndex * 0.1 + lastImageIndex * 0.1 + 0.5) * 1000;

    setTimeout(() => {
      setIsInitialAnimationComplete(true);
    }, totalDelay);
  }, [images]);

  useEffect(() => {
    if (!isInitialAnimationComplete) return;

    const interval = setInterval(() => {
      if (currentImages.length === 0) return;

      const randomCol = Math.floor(Math.random() * 7);
      const randomRow = Math.floor(Math.random() * 2);

      setChangingImage({ col: randomCol, row: randomRow });

      const currentImage = currentImages[randomCol][randomRow];
      const newImage = getRandomImage(currentImage, randomRow);

      const newImages = currentImages.map((column, colIndex) => {
        if (colIndex === randomCol) {
          return column.map((img, rowIndex) => {
            if (rowIndex === randomRow) {
              return newImage;
            }
            return img;
          });
        }
        return column;
      });

      setCurrentImages(newImages);

      setTimeout(() => {
        setChangingImage(null);
      }, 1200);
    }, 1500);

    return () => clearInterval(interval);
  }, [currentImages, isInitialAnimationComplete, getRandomImage]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <div className="w-full h-screen flex flex-col justify-end items-center relative">
      <div className="h-full w-full relative overflow-hidden mb-20">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 -translate-x-1/2 w-[1400px] h-full grid grid-cols-7 gap-3">
            {currentImages.map((columnImages, columnIndex) => (
              <div
                key={columnIndex}
                className={`col-span-1 flex flex-col gap-3 ${initMargin[columnIndex]}`}
              >
                {columnImages.map((image, imageIndex) => (
                  <motion.div
                    key={`${columnIndex}-${imageIndex}-${image}`}
                    className="relative w-full aspect-[2/3] rounded-lg overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: columnIndex * 0.1 + imageIndex * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={image}
                        className="absolute inset-0"
                        initial={{
                          opacity: 0,
                          scale: 0.95,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          transition: {
                            duration: 1.2,
                            ease: "easeInOut",
                          },
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.95,
                          transition: {
                            duration: 1.2,
                            ease: "easeInOut",
                          },
                        }}
                      >
                        <Image
                          src={image}
                          alt={`Gallery image ${
                            columnIndex * 2 + imageIndex + 1
                          }`}
                          fill
                          className={`object-cover transition-all duration-1000 ${
                            changingImage?.col === columnIndex &&
                            changingImage?.row === imageIndex
                              ? "scale-105"
                              : ""
                          }`}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
          <div className="absolute inset-0 gradient-to-t" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-start h-full text-center px-4 pt-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              PLAN YOUR NEXT TRIP WITH{" "}
              <span className="text-primary block md:inline">vibzi.</span>
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-base md:text-md text-muted-foreground max-w-lg mx-auto"
              >
                {slides[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            <div className="space-y-6">
              <Link href="/my-trips">
                <Button
                  size="default"
                  className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-6 rounded-full"
                >
                  Get Started
                </Button>
              </Link>

              <div className="flex justify-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index ? "bg-primary w-4" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col items-center justify-center absolute bottom-0 z-10">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full flex justify-center items-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary rounded-full p-4 cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => {
              const nextSection = document.getElementById("activities-section");
              nextSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <ChevronDownIcon className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>

        <div className="w-full h-auto bg-primary flex flex-col items-center justify-center py-3">
          <p className="text-white text-base font-bold flex flex-row items-center gap-2">
            Here&apos;s how it works
            <ChevronDownIcon className="w-6 h-6 font-bold" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
