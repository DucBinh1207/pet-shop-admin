import { DayType } from "@/types/day";

export default function ConvertDayType({ date }: { date: Date }) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = (date.getFullYear() % 100).toString().padStart(2, "0");

  // Lưu trữ vào DayType
  const dateData: DayType = {
    day,
    month,
    year,
  };

  return dateData;
}
