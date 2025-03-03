export const STRING_UTIL: {
  toDateString: (date: Date | string) => string;
} = {
  toDateString: (date) => {
    const newDate = typeof date === "string" ? new Date(date) : date;
    return `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(newDate.getDate()).padStart(2, "0")}`;
  },
};
