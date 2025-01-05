import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import Link from "next/link";
import React from "react";

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">Page Not Found</h1>
      <Link href="/">
        <Button className="mt-10 p-2 flex items-center">
        <House />Back to Home</Button>
      </Link>
    </div>
  );
};

export default Notfound;
