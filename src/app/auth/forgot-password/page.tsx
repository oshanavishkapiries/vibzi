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
import { Loader2, ArrowLeft } from "lucide-react";
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
      await forgotPassword(data.email);
      setIsLoading(false);
      toast.success("Password reset instructions sent to your email!");
      window.location.href = "/auth/verify";
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred while processing your request");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen">
      <div className="absolute inset-0 -z-10 lg:hidden">
        <div className="h-full w-full absolute inset-0 z-10" />
        <InfiniteGallery />
      </div>

      {/* left */}
      <div className="hidden lg:flex flex-col items-center justify-center w-full h-full pl-[100px]">
        <div className="h-full w-full absolute inset-0 z-10" />
        <InfiniteGallery />
      </div>

      {/* right */}
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col gap-4 p-6 md:p-10 relative z-20 bg-white rounded-xl m-5">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-lg backdrop-blur-sm p-3 rounded-xl">
              <div className="space-y-6">
                <div className="flex items-center">
                  <Link
                    href="/auth/signin"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 text-gray-600" />
                  </Link>
                </div>
                <Link href="/" className="flex justify-center items-center gap-2 font-medium w-full">
                  <Image
                    src="/logo/logo-rbg.png"
                    alt="logo"
                    width={80}
                    height={32}
                    className="block"
                  />
                </Link>
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl font-bold">Forgot Password</h1>
                  <p className="text-gray-500">
                    Enter your email address and we&apos;ll send you instructions to reset your password
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
                        "Send Reset Instructions"
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
