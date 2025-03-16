"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/common/Auth/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import InfiniteGallery from "@/components/common/InfiniteGallery";

export default function VerifyPage() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { verifyEmail } = useAuth();

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email address is missing");
      return;
    }

    try {
      setIsVerifying(true);
      await verifyEmail(email, verificationCode);
      toast.success("Email verified successfully!");
      router.push("/auth/signin");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to verify email");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email address is missing");
      return;
    }

    try {
      await verifyEmail(email, "", true); 
      toast.success("Verification code resent successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to resend verification code");
    }
  };

  return (
    <div className="grid min-h-svh">
      <div className="relative">
        {/* InfiniteGallery for mobile */}
        <div className="absolute inset-0 -z-10 lg:hidden">
          <div className="h-full w-full bg-black/30 absolute inset-0 z-10" />
          <InfiniteGallery />
        </div>
        {/* InfiniteGallery for desktop */}
        <div className="hidden lg:block lg:w-1/2 fixed left-0 top-0 h-full pl-[8%]">
          <InfiniteGallery />
        </div>

        <div className="flex flex-col gap-4 p-6 md:p-10 relative z-20 lg:ml-[50%]">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <Image src="/logo/logo-rbg.png" alt="logo" width={70} height={32} className="hidden lg:block" />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-lg backdrop-blur-sm bg-white p-6 rounded-xl">
              <div className="space-y-6">
                <Link href="/" className="flex items-center gap-2 font-medium">
                  <Image
                    src="/logo/logo-rbg.png"
                    alt="logo"
                    width={70}
                    height={32}
                    className="block lg:hidden"
                  />
                </Link>
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl font-bold">Verify Your Email</h1>
                  <p className="text-gray-500">
                    Please enter the verification code sent to your email address
                  </p>
                </div>
                <form onSubmit={handleVerification} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Enter verification code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isVerifying}
                  >
                    {isVerifying ? "Verifying..." : "Verify Email"}
                  </Button>
                </form>
                <div className="text-center">
                  <button
                    onClick={handleResendCode}
                    className="text-sm text-primary hover:underline"
                  >
                    Resend verification code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 