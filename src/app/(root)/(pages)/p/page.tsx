import ImageGallery from "@/components/common/ImageGallery";
import RecentSuggestions from "@/components/common/RecentSuggestions";
import { breadcrumbLinks } from "@/mock/_breadcrumbLinks";
import { travelData } from "@/mock/_travelData";

const P = () => {
  const pricing = {
    price: "$76.10",
    priceNote: "per person",
    cancellationPolicy: "Free cancellation + Unlimited reschedule",
    cancellationDetail:
      "up to 24 hours before the experience starts (local time)",
  };

  const bookingProvider = {
    logoSrc: "https://shorturl.at/i9EFb",
    name: "Viator",
    bookNowButtonLabel: "Reserve Now",
    poweredByLogoSrc: "https://shorturl.at/i9EFb",
  };

  return (
    <div className="container mx-auto min-h-screen">
      <RecentSuggestions
        breadcrumbLinks={breadcrumbLinks}
        title="Recent suggestions for you"
        reviews={250}
        rating={5}
        location="Bangkok, Thailand"
      />
      <ImageGallery
        images={travelData.slice(0, 10).map((item) => ({
          src: item.image_url,
          alt: item.title || "Travel image",
        }))}
        pricing={pricing}
        bookingProvider={bookingProvider}
      />
    </div>
  );
};

export default P;
