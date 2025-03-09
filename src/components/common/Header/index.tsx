"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import Link from "next/link";
import { AdvanceSearch } from "./AdvanceSearch";
import Profile from "./Profile";
import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollPosition = useScrollPosition();
  const path = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollPosition > 0 || path === "/detail");
  }, [scrollPosition, path]);

  return (
    <div
      className={`bg-background w-full min-h-[50px] sticky top-0 z-50 p-5 ${
        isScrolled && "border-b-2"
      }`}
    >
      <div className="w-full h-auto container max-w-7xl mx-auto flex flex-row justify-between items-center">
        <Link href="/" className={"cursor-pointer"}>
          <Image
            src={"/logo/logo-rbg.png"}
            alt="logo"
            width={400}
            height={150}
            priority
            className={`w-[80px]`}
          />
        </Link>

        {path !== "/" && path !== "/my-trips" && (
          <div className="h-auto w-full  lg:w-2/5  justify-center items-center max-lg:hidden">
            <AdvanceSearch />
          </div>
        )}

        {/* container-end-dev */}
        <div className="flex flex-row gap-2 justify-center items-center">
          <Link
            href={path === "/my-trips" ? "/" : "/my-trips"}
            className="flex flex-row gap-1 items-center"
          >
            <Button
              variant="outline"
              className={`m-1 rounded-full shadow-none border-none hover:scale-105 ${
                path === "/my-trips" &&
                "bg-secondary"
              }`}
            >
             Plan Your Trip <span className="text-[10px] bg-primary text-white px-[6px] py-[2px] animate-pulse rounded-full">New</span> 
            </Button>
          </Link>
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Header;
