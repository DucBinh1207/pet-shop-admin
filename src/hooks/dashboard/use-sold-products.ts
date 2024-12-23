import { getSoldProducts } from "@/services/api/dashboard-api";
import { DayType } from "@/types/day";
import useSWR from "swr";

type props = {
  startDate: DayType;
  endDate: DayType;
};

export default function useSoldProducts({ startDate, endDate }: props) {
  const dayStart = startDate.day + "-" + startDate.month + "-" + startDate.year;
  const dayEnd = endDate.day + "-" + endDate.month + "-" + endDate.year;
  const params = new URLSearchParams();

  params.append("startDate", dayStart);
  params.append("endDate", dayEnd);

  const { data, error, isLoading } = useSWR(
    "/admin/income/categories?" + params.toString(),
    getSoldProducts,
  );

  return {
    soldProductsData: data,
    isLoading,
    isError: error,
  };
}
