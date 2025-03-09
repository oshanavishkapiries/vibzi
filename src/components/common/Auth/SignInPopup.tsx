"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useId, useState } from "react";
import { useAuth } from "./AuthProvider";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SignInPopup({
  children,
}: {
  children: React.ReactNode;
}) {
  const id = useId();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signIn(email, password);
      toast.success("Successfully signed in!");
      setOpen(false);
      window.location.href = "/";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/logo/logo-rbg.png"
            alt="Vibzi Logo"
            width={100}
            height={60}
          />
          <DialogHeader>
            <DialogTitle className="sm:text-center">Welcome back</DialogTitle>
            <DialogDescription className="sm:text-center">
              Enter your credentials to login to your account.
            </DialogDescription>
          </DialogHeader>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                name="email"
                placeholder="email"
                type="email"
                required
                disabled={isLoading}
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                name="password"
                placeholder="password"
                type="password"
                required
                disabled={isLoading}
              />
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-sm text-primary hover:underline"
                  onClick={() => {
                    setOpen(false);
                    router.push("/auth/forgot-password");
                  }}
                >
                  Forgot password?
                </Button>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>{" "}
        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-xs">Or</span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/auth/signup")}
        >
          Sign up
        </Button>
      </DialogContent>
    </Dialog>
  );
}
