import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

interface ITravelCardProps {
  src: string;
  alt: string;
  title: string;
  dateRange: string;
  location: string;
}

const TravelCard = ({ src, alt, title, dateRange, location }: ITravelCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative overflow-hidden rounded-lg h-[180px] md:h-[280px]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-transparent to-transparent" />
        <div className="absolute bottom-0 p-6 text-white">
          <h2 className="text-2xl font-bold mb-3">{title}</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Calendar className="w-4 h-4" />
              {dateRange}
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
