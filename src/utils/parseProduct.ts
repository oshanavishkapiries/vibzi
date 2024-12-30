export function parseProduct(response: any) {
  if (!response || !response.data || !response?.data?.products) {
    return [];
  }

  return response.data.products.results.map((product: any) => {
    const imageUrl =
      product.images?.[0]?.variants?.find(
        (variant: any) => variant.width === 400 && variant.height === 400
      )?.url || "";

    return {
      id: product.productCode || "",
      image_url: imageUrl,
      title: product.title || "",
      sub_title: product.description?.split("\n")[0] || "",
      price: `${product.pricing?.summary?.price || 0} ${
        product.pricing?.currency || ""
      }`.trim(),
      rating: product.reviews?.averageReviews || 0,
      reviews: product.reviews?.totalReviews || 0,
    };
  });
}
