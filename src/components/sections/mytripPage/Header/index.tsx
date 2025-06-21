"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import Link from "next/link";
import Profile from "./Profile";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { NotificationSheet } from "./NotificationSheet";
import { useGetPendingInvitesQuery } from "@/store/api/collaboration/collaborationSlice";

const HeaderMyTrip = () => {
  const scrollPosition = useScrollPosition();
  const path = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((state: any) => state?.auth?.user);

  const { data: pendingInvites } = useGetPendingInvitesQuery(
    {
      email: user?.email,
      tripInviteStatus: "PENDING",
    },
    {
      skip: !user?.email,
    },
  );

  useEffect(() => {
    setIsScrolled(scrollPosition > 0 || path === "/detail");
  }, [scrollPosition, path]);

  return (
    <div
      className={`bg-background w-full min-h-[50px] sticky top-0 z-50 px-0 py-4 mb-3 ${
        isScrolled && "border-b-2"
      }`}
    >
      <div className="w-full h-auto container flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <Link href="/" className={"cursor-pointer"}>
            <Image
              src={"/logo/logo-rbg.png"}
              sizes="(max-width: 768px) 33vw, 20vw"
              alt="logo"
              width={400}
              height={150}
              priority
              className={`w-[80px]`}
            />
          </Link>
        </div>

        {/* container-end-dev */}
        <div className="flex flex-row gap-4 justify-center items-center max-md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-6 w-6" />
                {pendingInvites && pendingInvites?.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                    {pendingInvites?.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <NotificationSheet />
              </div>
            </SheetContent>
          </Sheet>
          <Profile />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-6 w-6" />
                {pendingInvites && pendingInvites?.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                    {pendingInvites?.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <NotificationSheet />
              </div>
            </SheetContent>
          </Sheet>
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default HeaderMyTrip;
