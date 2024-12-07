import {ITravelData} from "@/types";
import {TravelCard} from "@/components/common/TravelCarousel/travel-card";
import TravelCardSkeleton from "@/components/common/TravelCarousel/travel-card-skeleton";

export default function TravelPortalGrid(
    {
        travelData,
        title,
        children
    }: {
        travelData: ITravelData[];
        title: string;
        children?: React.ReactNode
    }) {

    const skeletonCards = Array.from({length: 15});

    return (
        <div className="w-full px-[30px] md:px-[60px] py-3">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-3">
                {title}
            </h4>
            {children}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {travelData.length === 0
                    ? skeletonCards.map((_, index) => (
                        <div key={`skeleton-${index}`} className="w-full">
                            <TravelCardSkeleton/>
                        </div>
                    ))
                    : travelData.map((item, index) => (
                        <div key={index} className="w-full">
                            <TravelCard
                                imageSrc={item.image_url}
                                rating={item.rating}
                                reviews={item.reviews}
                                title={item.title}
                                price={item.price}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}