"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "@/components/common/Auth/AuthProvider";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";

const signupSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
    givenName: z.string().min(1, "First name is required"),
    familyName: z.string().min(1, "Last name is required"),
    birthdate: z.string().min(1, "Birth date is required"),
    gender: z.string().min(1, "Gender is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      givenName: "",
      familyName: "",
      birthdate: "",
      gender: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      await signUp(
        data.email,
        data.password,
        data.email,
        data.givenName,
        data.familyName,
        data.birthdate,
        data.gender,
        "+94770000000"
      );
      setIsLoading(false);
      toast.success("Sign up successful! Please verify your email address.");
      router.push(`/auth/verify?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred during sign up");
      }
    }
  };

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
              <div className="lg:hidden">
                <Link href="/signup">
                  <Button
                    variant="outline"
                    className="w-full bg-primary text-white"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...form.register("givenName")}
                    />
                    {form.formState.errors.givenName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.givenName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...form.register("familyName")}
                    />
                    {form.formState.errors.familyName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.familyName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Birth Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...form.register("birthdate")}
                    />
                    {form.formState.errors.birthdate && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.birthdate.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Gender
                  </label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...form.register("gender")}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {form.formState.errors.gender && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.gender.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...form.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...form.register("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {form.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#003B4A] text-white py-2 rounded-lg hover:bg-[#002A35] transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : (
                    "Sign Up"
                  )}
                </button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/auth/signin"
                    className="text-blue-500 hover:underline"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
