import { getRevenue } from "@/services/api/dashboard-api";
import { DayType } from "@/types/day";
import useSWR from "swr";

type props = {
  startDate: DayType;
  endDate: DayType;
  option: "month" | "day";
};

export default function useRevenue({
  startDate,
  endDate,
  option = "month",
}: props) {
  const dayStart = startDate.day + "-" + startDate.month + "-" + startDate.year;
  const dayEnd = endDate.day + "-" + endDate.month + "-" + endDate.year;
  const params = new URLSearchParams();

  params.append("startDate", dayStart);
  params.append("endDate", dayEnd);
  params.append("option", option);

  const { data, error, isLoading } = useSWR(
    "/admin/income/orders?" + params.toString(),
    getRevenue,
  );

  return {
    revenueData: data,
    isLoading,
    isError: error,
  };
}
