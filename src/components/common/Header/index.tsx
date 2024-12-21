import Image from "next/image";
import React from "react";
//import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
//import { useScrollPosition } from "@/hooks/useScrollPosition";
import Link from "next/link";
import { AdvanceSearch } from "./AdvanceSearch";

const Header = () => {
  //const scrollPosition = useScrollPosition();
  //const path = usePathname();
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   setIsScrolled(scrollPosition > 0 || path === "/detail");
  // }, [scrollPosition, path]);

  return (
    <div
      className={cn(`bg-background w-full h-auto sticky top-0 z-50 flex flex-row justify-between items-center 
        px-[60px] py-3 transition-all duration-500`)}
    >
      <Link href="/" className={"cursor-pointer"}>
        <Image
          src={"/logo/logo-rbg.png"}
          alt="logo"
          width={400}
          height={150}
          priority
          className={`w-[100px]`}
        />
      </Link>

      <div className="h-auto w-2/5 flex justify-center items-center">
        <AdvanceSearch />
      </div>

      {/* container-end-dev */}
      <div></div>
    </div>
  );
};

export default Header;
