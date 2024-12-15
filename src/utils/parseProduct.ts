import { ITravelData } from "@/types";

export const parseProduct = (product: any): ITravelData => {
    const image_url = product.images?.[0]?.variants?.[0]?.url || '';
    const title = product.title || '';
    const sub_title = product.description?.split('\n')[0] || '';
    const price = product.pricing?.summary?.price?.toFixed(2) || '0.00';
    const rating = product.reviews?.averageReviews || 0;
    const reviews = product.reviews?.totalReviews || 0;

    return {
        image_url,
        title,
        sub_title,
        price,
        rating,
        reviews
    };
};