import { IParseProductDeatils } from "@/types";

export function parseProductDeatils(json: any): IParseProductDeatils {
  return {
    title: json.data.title || "",
    productCode: json.data.productCode || "",
    description: json.data.description || "",
    language: json.data.language || "",
    timeZone: json.data.timeZone || "",
    reviews: {
      totalReviews: json.data.reviews.totalReviews,
      averageReviews: json.data.reviews.averageReviews,
    },
    images: (json.data.images || []).map((image: any) => {
      const smallImage =
        image.variants.find((v: any) => v.width <= 500)?.url || "";
      const bigImage =
        image.variants.find((v: any) => v.width > 700)?.url || "";
      return { small: smallImage, big: bigImage };
    }),
    inclusions: (json.data.inclusions || []).map(
      (inc: any) => inc.description ||  inc.otherDescription || inc.categoryDescription
    ),
    exclusions: (json.data.exclusions || []).map(
      (exc: any) => exc.description ||  exc.otherDescription || exc.categoryDescription
    ),
    additionalInfo: (json.data.additionalInfo || []).map(
      (info: any) => info.description || ""
    ),
    pricing: {
      price: json.data.pricing.netPrice?.toString() || "",
      priceNote: json.data.pricing.summary || "",
      cancellationPolicy: json.data.cancellationPolicy?.type || "",
      cancellationDetail: json.data.cancellationPolicy?.description || "",
    },
    bookingProvider: {
      logoSrc: "",
      name: json.data.supplier?.name || "",
      bookNowButtonLabel: "Book Now",
      poweredByLogoSrc: "",
    },
  };
}