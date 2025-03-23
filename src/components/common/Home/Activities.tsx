import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Activities = () => {
  return (
    <div
      id="activities-section"
      className="w-full min-h-screen flex flex-col items-center justify-center py-8 lg:py-0 bg-primary"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left side - Content */}
          <div className="lg:w-1/2 space-y-4 lg:space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-white text-center lg:text-left leading-tight">
              From planning,
              <br />
              to tracking,
              <br />
              to reliving
            </h2>
            <p className="text-base lg:text-lg text-white/80 leading-relaxed text-center lg:text-left">
              Manage itineraries for stays, dining, and more, create checklists
              for tasks, and attach docs like tickets—all in one place for a
              seamless trip.
            </p>
            <div className="pt-4 flex justify-center lg:justify-start">
              <Link href="/my-trips">
                <Button className="bg-white text-primary px-6 lg:px-8 py-4 lg:py-6 text-base lg:text-lg rounded-full hover:bg-white/90 transition-colors">
                  Get Started
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
                src="https://onelineplayer.com/player.html?autoplay=true&autopause=false&muted=true&loop=true&url=https://res.cloudinary.com/comseeker/video/upload/v1742711950/vibzi/Giff_3_mvouvr.mp4&poster=&time=false&progressBar=false&overlay=true&muteButton=false&fullscreenButton=true&style=light&quality=auto&playButton=true&buttonColor=&buttonSize=60"
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

export default Activities;
