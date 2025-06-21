"use client";
import React, { Suspense } from "react";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
//import TermsAndConditions from "@/components/common/TearmsAndConditions";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated
  // );
  return (
    <Suspense fallback={<></>}>
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <main className="w-full min-h-[calc(100vh-350px)]">
        {/* {isAuthenticated && <TermsAndConditions />} */}
        <Suspense fallback={<></>}>{children}</Suspense>
      </main>
      <Suspense fallback={<></>}>
        <Footer />
      </Suspense>
    </Suspense>
  );
}
