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
import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState } from "react";
import InfiniteGallery from "@/components/common/InfiniteGallery";
import { FcGoogle } from "react-icons/fc";



const signinSchema = z.object({
  emailOrUsername: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

type SigninFormValues = z.infer<typeof signinSchema>;

export default function SigninPage() {
  const { signIn , googleSignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const onSubmit = async (data: SigninFormValues) => {
    try {
      setIsLoading(true);
      await signIn(data.emailOrUsername, data.password);
      setIsLoading(false);
      toast.success("Sign in successful!");

      window.location.href = "/my-trips";
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred during sign in");
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
                    href="/"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 text-gray-600" />
                  </Link>
                </div>{" "}
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
                  <h1 className="text-3xl font-bold">Welcome back</h1>
                  <p className="text-gray-500">
                    Enter your credentials to sign in to your account
                  </p>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="emailOrUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email or Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@example.com or johndoe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
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
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <div className="flex justify-end">
                            <Link
                              href="/auth/forgot-password"
                              className="text-sm text-primary hover:underline"
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleGoogleSignIn}
                    >
                      <FcGoogle className="h-5 w-5" />
                      Sign in with Google
                    </Button>
                  </form>
                </Form>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign up
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
