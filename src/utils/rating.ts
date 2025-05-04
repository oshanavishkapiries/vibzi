export function calculateStarRatings(rating: number, maxStars = 5) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);
  
    return { fullStars, halfStar, emptyStars };
  }
  