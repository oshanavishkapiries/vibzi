export function parseTrips(response : any) {
    if (!response || !response.items) {
      return [];
    }
    return response.items.map((item : any) => ({
      id: item.id,
      tripId:item.tripId,
      title: item.title,
      description: item.description,
      src: `/2.jpg`,
    }));
  }
