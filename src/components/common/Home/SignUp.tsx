"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../../providers/AuthProvider";
import MiniFooter from "./MiniFooter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff } from "lucide-react";

const signupSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
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
  const { signUp, googleSignIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    givenName: "",
    familyName: "",
    birthdate: "",
    gender: "",
  });
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
        "+94770000000",
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

  const handleNext = async () => {
    if (step === 1) {
      const isValid = await form.trigger(["email"]);
      if (isValid) {
        const email = form.getValues("email");
        setFormData({ ...formData, email });
        form.reset({
          email: "",
          password: "",
          confirmPassword: "",
          givenName: "",
          familyName: "",
          birthdate: "",
          gender: "",
        });
        setStep(2);
      }
    } else if (step === 2) {
      const isValid = await form.trigger(["password", "confirmPassword"]);
      if (isValid) {
        const password = form.getValues("password");
        const confirmPassword = form.getValues("confirmPassword");
        setFormData({
          ...formData,
          password,
          confirmPassword,
        });
        form.reset({
          email: formData.email,
          password: "",
          confirmPassword: "",
          givenName: "",
          familyName: "",
          birthdate: "",
          gender: "",
        });
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      form.reset({
        email: formData.email,
        password: "",
        confirmPassword: "",
        givenName: "",
        familyName: "",
        birthdate: "",
        gender: "",
      });
    } else if (step === 3) {
      form.reset({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        givenName: "",
        familyName: "",
        birthdate: "",
        gender: "",
      });
    }
    setStep(step - 1);
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
                sizes="sizes=(max-width: 768px) 33vw, 20vw"
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
          <div className="lg:w-1/2 text-white space-y-4 max-sm:hidden">
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
                  {step === 1
                    ? "Enter your email to get started"
                    : step === 2
                      ? "Create a secure password"
                      : "Complete your profile information"}
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {step === 1 ? (
                    <>
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

                      <Button
                        type="button"
                        onClick={handleNext}
                        className="w-full"
                      >
                        Next
                      </Button>
                    </>
                  ) : step === 2 ? (
                    <>
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
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="••••••••"
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  {...field}
                                />

                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
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

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleBack}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={handleNext}
                          className="flex-1"
                        >
                          Next
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="givenName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="familyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="birthdate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Birth Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <FormControl>
                                <select
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field}
                                >
                                  <option value="">Select gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleBack}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button type="submit" className="flex-1">
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Sign Up"
                          )}
                        </Button>
                      </div>
                    </>
                  )}
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
                    onClick={() => googleSignIn()}
                  >
                    <FcGoogle className="h-5 w-5" />
                    Sign up with Google
                  </Button>
                </form>
              </Form>
              <div className="text-center text-sm mt-4">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                By continuing, you agree to vibzi&apos;s{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and acknowledge you&apos;ve read our{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <MiniFooter />
    </div>
  );
};

export default SignUp;
