

export function parseTrips(response : any) {
    if (!response || !response.items) {
      return [];
    }
    return response.items.map((item : any) => ({
      id: item.id,
      tripId:item.tripId,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl || "/1.jpg",
      startDate: item.startDate,
    }));
  }
