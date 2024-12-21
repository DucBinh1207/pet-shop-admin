import { getSummary } from "@/services/api/dashboard-api";
import useSWR from "swr";

export default function useSummary() {
  const { data, error, isLoading } = useSWR(
    "/admin/dashboard/summary",
    getSummary,
  );

  return {
    summaryData: data,
    isLoading,
    isError: error,
  };
}
