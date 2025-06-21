"use client";
import { RootState } from "@/store/store";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (isAuthenticated) {
    toast.success("You are already logged in");
    return redirect("/");
  }

  return <>{children}</>;
};

export default AuthLayout;
