import { Calendar } from 'lucide-react';
import Image from 'next/image';

interface ITravelCardProps {
  src: string;
  alt: string;
  title: string;
  dateRange: string;
}

const TravelCard = ({ src, alt, title, dateRange }: ITravelCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative overflow-hidden rounded-lg h-[180px] md:h-[280px]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-sm flex flex-row gap-2 align-center"> <Calendar className='w-4 h-4' />{dateRange}</p>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
