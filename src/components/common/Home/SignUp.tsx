"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../Auth/AuthProvider";

const SignUp = () => {
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
  ]);
  const { googleSignIn } = useAuth();

  return (
    <div className="flex flex-col gap-4 w-full min-h-screen relative">
      <div className="w-full h-screen overflow-hidden relative">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-1">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg aspect-[2/3]"
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
          {images.slice(0, 10).map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg aspect-[2/3]"
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="w-full h-screen p-4 absolute top-0 left-0 flex items-center justify-center">
        <div className="pt-[70px] container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 max-w-6xl">
          {/* Left side - Main Title */}
          <div className="lg:w-1/2 text-white space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Sign up to plan
              <br />
              and explore
              <br />
              your trips
            </h1>
          </div>

          {/* Right side - Sign Up Form */}
          <div className="lg:w-1/2 w-full max-w-lg">
            <div className="bg-white rounded-xl p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">vibzi.</h1>
                <p className="text-gray-600">Create an account</p>
                <p className="text-sm text-gray-500">
                  Enter your information to create your account
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/auth/signup">
                  <Button
                    variant="outline"
                    className="w-full bg-primary text-white"
                  >
                    Sign up with email
                  </Button>
                </Link>

                <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
                  <span className="text-muted-foreground text-xs">Or</span>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => googleSignIn()}
                >
                  <FcGoogle className="h-5 w-5" />
                  Sign up with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
