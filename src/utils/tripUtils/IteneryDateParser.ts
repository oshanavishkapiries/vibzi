export const IteneryDateParser = (date: string) => {
  const d = new Date(date);
  const optionsShort: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const optionsLong: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  return {
    short: d.toLocaleDateString(undefined, optionsShort).toLowerCase(),
    long: d.toLocaleDateString(undefined, optionsLong),
  };
};
