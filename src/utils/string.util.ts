export const STRING_UTIL: {
  dateToDateString: (date: Date) => string;
} = {
  dateToDateString: (date) => {
    console.log(" date:", date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  },
};
