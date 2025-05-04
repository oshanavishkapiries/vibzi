"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "@/components/common/Auth/AuthProvider";
import { useSearchParams } from "next/navigation";

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
import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState } from "react";
import InfiniteGallery from "@/components/common/InfiniteGallery";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!code) {
      toast.error("Invalid reset code");
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword(code, data.password);
      setIsLoading(false);
      toast.success("Password reset successful!");
      window.location.href = "/auth/signin";
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred while resetting your password");
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
                  <h1 className="text-3xl font-bold">Reset Password</h1>
                  <p className="text-gray-500">
                    Enter your new password below
                  </p>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="••••••••"
                                type={showConfirmPassword ? "text" : "password"}
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Reset Password"
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
