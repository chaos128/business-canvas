import { STRING_UTIL } from "./string.util";

export const DATE_UTIL: {
  addDays: (date: Date, days: number) => string;
} = {
  addDays: (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return STRING_UTIL.toDateString(newDate);
  },
};
