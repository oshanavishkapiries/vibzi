"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "@/components/common/Auth/AuthProvider";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import InfiniteGallery from "@/components/common/InfiniteGallery";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setIsLoading(true);
      const response = await forgotPassword(data.email);
      if (response instanceof Error) {
        toast.error("Something went wrong, please try again later");
      } else {
        toast.success("Password reset code sent to your email!");
        window.location.href = "/auth/reset-password";
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      toast.error("An error occurred while sending the reset code");
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
                  <h1 className="text-3xl font-bold">Forgot Password</h1>
                  <p className="text-gray-500">
                    Enter your email address and we&apos;ll send you a code to
                    reset your password
                  </p>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Send Reset Code"
                      )}
                    </Button>
                  </form>
                </Form>
                <div className="text-center text-sm">
                  Remember your password?{" "}
                  <Link
                    href="/auth/signin"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
