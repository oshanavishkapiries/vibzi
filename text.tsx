"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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

  const [currentSlide, setCurrentSlide] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);

  // Function to shuffle array
  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    setShuffledImages(shuffleArray(images));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background Image Grid */}
      <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-5 gap-4 p-4 opacity-50">
        <AnimatePresence>
          {shuffledImages.slice(0, 15).map((img, index) => (
            <motion.div
              key={img + index}
              className="relative aspect-square overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  delay: index * 0.1,
                  duration: 0.5 
                }
              }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Image
                src={img}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 20vw"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              PLAN YOUR NEXT TRIP WITH{" "}
              <span className="text-primary">vibzi.</span>
            </h1>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-muted-foreground"
              >
                {[
                  "Lorem Ipsum is simply dummy text of simply dummy dummy simply dummy text",
                  "Plan your perfect trip with our expert recommendations",
                  "Discover amazing destinations around the world",
                ][currentSlide]}
              </motion.p>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="mt-8 bg-primary text-white hover:bg-primary/90"
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentSlide === index ? "bg-primary" : "bg-gray-300"
                }`}
                animate={{
                  scale: currentSlide === index ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;