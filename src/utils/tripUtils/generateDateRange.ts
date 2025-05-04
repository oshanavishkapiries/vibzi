export const generateDateRange = (start: string, end: string) => {
    const dates = [];
    const currentDate = new Date(start);
    const lastDate = new Date(end);

    while (currentDate <= lastDate) {
      dates.push(new Date(currentDate).toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates.reduce((acc:any, date) => {
      acc[date] = [];
      return acc;
    }, {});
  };
