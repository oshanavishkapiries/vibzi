import Image from "next/image";
import React from "react";
//import { usePathname } from "next/navigation";
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
      className={`bg-background w-full h-auto sticky top-0 z-50 flex flex-col space-y-4 lg:flex-row justify-center items-center lg:justify-between
        px-[60px] py-5`}
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

      <div className="h-auto w-full  lg:w-2/5  justify-center items-center">
        <AdvanceSearch />
      </div>

      {/* container-end-dev */}
      <div className="hidden lg:block"></div>
    </div>
  );
};

export default Header;
