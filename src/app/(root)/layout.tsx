import React, { Suspense } from "react";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<></>}>
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
