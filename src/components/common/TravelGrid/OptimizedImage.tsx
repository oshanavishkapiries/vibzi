"use client";
import { useState } from "react";
import Image from "next/image";

interface OptimizedImageProps {
    src: string;
    alt: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative w-full h-full object-cover rounded-lg overflow-hidden`}>
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-100/25 opacity-75 animate-pulse"></div>
            )}

            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                onLoad={() => setIsLoaded(true)}
                className={`duration-500 ease-in-out object-cover hover:scale-110 transition-all ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
            />
        </div>
    );
};

export default OptimizedImage;