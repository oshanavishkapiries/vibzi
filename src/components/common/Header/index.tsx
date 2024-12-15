import Image from "next/image";
import React, { useState, useEffect, memo } from "react";
import { usePathname } from "next/navigation";
import { AdvanceSearch } from "./AdvanceSearch";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import Link from "next/link";

const Header = memo(() => {
  const scrollPosition = useScrollPosition();
  const path = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollPosition > 0 || path === "/p");
  }, [scrollPosition, path]);

  return (
    <div
      className={cn(
        "w-full h-[200px] px-[30px] md:px-[60px] py-3 flex flex-col justify-center items-center bg-background space-y-3 transition-all duration-500 sticky top-0 left-0 z-50",
        isScrolled && "h-[100px] border-b border-gray-200"
      )}
    >
      <div className="flex items-center">
        <Link href="/" className={"cursor-pointer"}>
          <Image
            src={"/logo/logo-rbg.png"}
            alt="logo"
            width={400}
            height={150}
            priority
            className={cn(
              "w-20 transition-all duration-500 md:hidden",
              isScrolled && "hidden"
            )}
          />
        </Link>
      </div>

      <div
        className={cn(
          "w-full flex justify-center relative mt-[70px] transition-all duration-500",
          isScrolled && "mt-0"
        )}
      >
        <div
          className={cn(
            "flex items-center h-full absolute left-0 top-[-50px] transition-all duration-500",
            isScrolled && "top-0"
          )}
        >
          <Link href="/" className={"cursor-pointer"}>
            <Image
              src={"/logo/logo-rbg.png"}
              alt="logo"
              width={400}
              height={150}
              priority
              className={cn(
                "w-16 lg:w-28 transition-all duration-500 max-md:hidden",
                isScrolled && "lg:w-20"
              )}
            />
          </Link>
        </div>

        <AdvanceSearch className={cn(isScrolled && "lg:w-1/2 shadow-sm")} />
      </div>
    </div>
  );
});



export default Header;
