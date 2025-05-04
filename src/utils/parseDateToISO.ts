export function parseDateToISO(dateString: string): string {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
    } catch (error) {
      console.error("Error parsing date:", error);
      throw error;
    }
  }
    