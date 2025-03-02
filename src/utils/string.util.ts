export const STRING_UTIL: {
  toPhoneNumber: (phone?: string) => string;
  toDateInKorean: (
    date?: Date,
    options?: {
      isYearVisible?: boolean;
      isMonthVisible?: boolean;
      isDateVisible?: boolean;
      isDayOfWeekVisible?: boolean;
      isTimeVisible?: boolean;
      isParenthesisInDay?: boolean;
    }
  ) => string;
  dateStringToDate: (dateString: string) => Date;
  dateToDateString: (date: Date) => string;
} = {
  toPhoneNumber(phone): string {
    if (!phone) {
      return "";
    }

    return phone.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  },
  toDateInKorean: (date, options?): string => {
    if (!date) {
      return "";
    }

    const {
      isYearVisible = true,
      isMonthVisible = true,
      isDateVisible = true,
      isDayOfWeekVisible = true,
      isTimeVisible = true,
      isParenthesisInDay = true,
    } = options ?? {};
    const daysOfWeekKorean = ["일", "월", "화", "수", "목", "금", "토"];
    const hours = date.getHours();
    const hours12 = String(hours % 12 || 12);
    const amPm = hours >= 12 ? "오후" : "오전";

    const year = isYearVisible ? `${date.getFullYear()}년` : "";
    const month = isMonthVisible ? `${date.getMonth() + 1}월` : "";
    const dateString = isDateVisible ? `${date.getDate()}일` : "";
    const time = isTimeVisible
      ? `${amPm} 
    ${hours12}:${String(date.getMinutes()).padStart(2, "0")}`
      : "";
    const dayOfWeek = isParenthesisInDay
      ? `(${daysOfWeekKorean[date.getDay()]})`
      : daysOfWeekKorean[date.getDay()];

    return `${year} ${month} 
    ${dateString} ${isDayOfWeekVisible ? dayOfWeek : ""} 
    ${time} 
    `;
  },
  dateStringToDate: (dateString) => {
    const [year, month, day] = dateString.split("-") as [
      string,
      string,
      string
    ];
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  },
  dateToDateString: (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  },
};
