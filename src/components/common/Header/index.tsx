"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import Link from "next/link";
import Profile from "./Profile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const scrollPosition = useScrollPosition();
  const path = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollPosition > 0 || path === "/detail");
  }, [scrollPosition, path]);

  return (
    <div
      className={`bg-background w-full min-h-[50px] sticky top-0 z-50 p-5 ${
        isScrolled && "border-b-2"
      }`}
    >
      <div className="w-full h-auto container flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
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
          <Link
            href="/explore"
            className={cn(
              "max-md:hidden flex flex-row gap-1 items-center text-sm font-semibold transition-all duration-300 hover:border-b-4 hover:border-primary",
              path === "/explore" && "border-b-4 border-primary"
            )}
          >
            Explore
          </Link>
        </div>

        {/* container-end-dev */}
        <div className="flex flex-row gap-4 justify-center items-center max-md:hidden">
          <Link
            href="/about"
            className={cn(
              "flex flex-row gap-1 items-center text-sm font-semibold transition-all duration-300 hover:border-b-4 hover:border-primary",
              path === "/about" && "border-b-4 border-primary"
            )}
          >
            About
          </Link>
          <Link
            href={path === "/my-trips" ? "/" : "/my-trips"}
            className={cn(
              "flex flex-row gap-1 items-center text-sm font-semibold transition-all duration-300 hover:border-b-4 hover:border-primary",
              path === "/my-trips" && "border-b-4 border-primary"
            )}
          >
            Plan Your Trip
          </Link>
          <Profile />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              
              <div className="mt-4">
                <Profile />
              </div>
              <nav className="flex flex-col gap-3 mt-8">
                <Link
                  href="/results"
                  className={cn(
                    "flex flex-row gap-1 items-center text-sm font-semibold transition-all duration-300 hover:border-b-4 hover:border-primary",
                    path === "/results" && "border-b-4 border-primary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Explore
                </Link>
                <Link
                  href="/about"
                  className={cn(
                    "flex flex-row gap-1 items-center text-sm font-semibold transition-all duration-300 hover:border-b-4 hover:border-primary",
                    path === "/about" && "border-b-4 border-primary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href={path === "/my-trips" ? "/" : "/my-trips"}
                  className={cn(
                    "flex flex-row gap-1 items-center text-sm font-semibold transition-all duration-300 hover:border-b-4 hover:border-primary",
                    path === "/my-trips" && "border-b-4 border-primary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Plan Your Trip
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
