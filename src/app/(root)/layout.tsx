"use client"
import React, { Suspense } from "react";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { useAuth } from "react-oidc-context";
import TermsAndConditions from "@/components/common/TearmsAndConditions";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const auth = useAuth();

 

  return (
    <Suspense fallback={<></>}>
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <main className="w-full min-h-screen">
        {auth.isAuthenticated && <TermsAndConditions />}
        <Suspense fallback={<></>}>{children}</Suspense>
      </main>
      <Suspense fallback={<></>}>
        <Footer />
      </Suspense>
    </Suspense>
  );
}
