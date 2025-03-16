"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const InfiniteGallery = () => {
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

  // Distribute images across three columns
  const distributeImages = () => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    const columnSize = Math.ceil(shuffled.length / 3);

    return {
      column1: shuffled.slice(0, columnSize),
      column2: shuffled.slice(columnSize, columnSize * 2),
      column3: shuffled.slice(columnSize * 2),
    };
  };

  const { column1, column2, column3 } = distributeImages();

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div className="absolute inset-0 grid grid-cols-3 gap-3">
        {/* Column 1 - Scroll Up */}
        <div className="overflow-hidden">
          <div className="animate-scroll-up flex flex-col gap-3">
            {[...column1, ...column1, ...column1].map((image, index) => (
              <div
                key={`col1-${index}`}
                className="relative w-full aspect-[3/4] rounded-xl overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 - Scroll Down */}
        <div className="overflow-hidden">
          <div className="animate-scroll-down flex flex-col gap-3">
            {[...column2, ...column2, ...column2].map((image, index) => (
              <div
                key={`col2-${index}`}
                className="relative w-full aspect-[3/4] rounded-xl overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Column 3 - Scroll Up */}
        <div className="overflow-hidden">
          <div className="animate-scroll-up flex flex-col gap-3">
            {[...column3, ...column3, ...column3].map((image, index) => (
              <div
                key={`col3-${index}`}
                className="relative w-full aspect-[3/4] rounded-xl overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteGallery;
