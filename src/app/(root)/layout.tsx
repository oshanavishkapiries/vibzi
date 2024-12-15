"use client";

// import { useWindowSize } from "@/hooks/useWindowSize";
import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const size = useWindowSize()

  return (
    <>
      {/* <div className="fixed top-0 left-0 z-50 bg-white">   DEV: {size}  </div> */}
      <Header />
      {children}
      <Footer />
    </>
  );
}
