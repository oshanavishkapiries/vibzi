export interface TripPlan {
  id: string;
  title: string;
  description: string;
  destinationName: string;
  startDate: string;
  endDate: string;
  destination: string;
  imageUrl: string;
  userId: string;
}

export interface AttachmentResponse {
  id: string;
  tripId: string;
  title: string;
  attachments: Array<{
    key: string;
    originalFilename: string;
    fileUrl: string;
  }>;
}

export interface TripPlanChecklist {
  id: string;
  tripId: string;
  checklist: ChecklistItem[];
}

export interface TripPlanItinerary {
  id?: string;
  tripPlanId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
}

export interface TripPlanSearchParams {
  title?: string;
  destinationName?: string;
  userId?: string;
  page?: number;
  size?: number;
}

export interface TripPlanItinerarySearchParams {
  tripPlanId?: string;
  title?: string;
  page?: number;
  size?: number;
}

export interface TripPlanItineraryCreate {
  tripId: string;
  itinerary: any;
}

export interface Itinerary {
  id: string;
  tripId: string;
  day: number;
  activities: Activity[];
}

export interface Activity {
  id: string;
  title: string;
  time: string;
  location: string;
  notes?: string;
}

export interface Checklist {
  id: string;
  tripId: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  description?: string;
  isChecked?: boolean;
  text?: string;
  isCompleted?: boolean;
}

export interface Attachment {
  id: string;
  tripId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
}
