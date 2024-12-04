'use client'

import { useWindowSize } from "@/hooks/useWindowSize";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const size = useWindowSize()

  return (
    <>
      [  Development mode: {size} ]
      {children}
    </>
  );
}
