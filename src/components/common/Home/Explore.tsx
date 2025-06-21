import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Explore = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-8 lg:py-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left side - Content */}
          <div className="lg:w-1/2 space-y-4 lg:space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 text-center lg:text-left">
              Explore your activities
            </h2>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed text-center lg:text-left">
              Find the perfect activities with Vibzi’s activity search—explore
              options, filter by interest, and add them to your itinerary with
              ease.
            </p>
            <div className="pt-4 flex justify-center lg:justify-start">
              <Link href="/explore">
                <Button className="bg-primary text-white px-6 lg:px-8 py-4 lg:py-6 text-base lg:text-lg rounded-full hover:bg-primary/90 transition-colors">
                  Explore Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Video */}
          <div className="lg:w-1/2 w-full">
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
              <iframe
                frameBorder="0"
                allowFullScreen
                scrolling="no"
                allow="autoplay;fullscreen"
                src="https://onelineplayer.com/player.html?autoplay=true&autopause=false&muted=true&loop=true&url=https%3A%2F%2Fres.cloudinary.com%2Fcomseeker%2Fvideo%2Fupload%2Fv1742650412%2Fvibzi%2FHome_page_Dubai_u8e7qa.mp4&poster=&time=false&progressBar=false&overlay=true&muteButton=false&fullscreenButton=true&style=light&quality=auto&playButton=true&buttonColor=&buttonSize=60"
                style={{
                  height: "100%",
                  width: "100%",
                  aspectRatio: "1920/1080",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
