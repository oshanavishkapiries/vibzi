import Image from "next/image";

const NotFound = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center gap-2 w-full h-[300px] justify-center">
      <Image
        src={"/not-found.gif"}
        className="w-[90px] h-[90px]"
        width={400}
        height={400}
        alt="404"
      />

      <h1 className="text-center">{title}</h1>
    </div>
  );
};

export default NotFound;
