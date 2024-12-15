import OptimizedImage from "@/components/common/TravelCarousel/OptimizedImage";

export default function BentoGrid() {
  const images = [
    { src: "https://shorturl.at/tzyTZ", span: "col-span-2 row-span-2" },
    { src: "https://shorturl.at/tzyTZ", span: "" },
    { src: "https://shorturl.at/tzyTZ", span: "" },
    { src: "https://shorturl.at/tzyTZ", span: "" },
    { src: "https://shorturl.at/tzyTZ", span: "" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-[30px] md:px-[60px]">
      <h2 className="text-lg font-semibold mb-4">Traveler Photos</h2>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-video overflow-hidden rounded-md ${image.span}`}
          >
            <OptimizedImage
              key={index}
              src={image.src}
              alt={`Traveler photo ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
