import Image from 'next/image';

interface ITripCardProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const TripCard = ({ src, alt, title, description }: ITripCardProps) => {
  return (
    <div className="p-2 rounded-lg hover:shadow-md bg-white">
      <div className="flex gap-4">
        <div className="relative h-24 w-40 flex-shrink-0">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
