"use client";
import HeaderMyTrip from "@/components/sections/mytripPage/Header";
import React, { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <Suspense fallback={<></>}>
        <HeaderMyTrip />
      </Suspense>
      <main className="w-full min-h-[calc(100vh-350px)]">
        {/* {isAuthenticated && <TermsAndConditions />} */}
        <Suspense fallback={<></>}>{children}</Suspense>
      </main>
    </Suspense>
  );
};

export default Layout;
