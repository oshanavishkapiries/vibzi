"use client";

import { useWindowSize } from "@/hooks/useWindowSize";
import React, { Suspense } from "react";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const size = useWindowSize();

  return (
    <Suspense fallback={<></>}>
      <div className="fixed top-0 left-0 z-[100] bg-white">DEV: {size}</div>
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <main>
        <Suspense fallback={<></>}>{children}</Suspense>
      </main>
      <Suspense fallback={<></>}>
        <Footer />
      </Suspense>
    </Suspense>
  );
}
