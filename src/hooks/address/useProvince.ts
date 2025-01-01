//provinces.open-api.vn/api/p/

import { GetProvince } from "@/services/api/address-api";
import useSWR, { mutate } from "swr";

export default function useProvinces() {
  const { data, error, isLoading } = useSWR(
    "https://provinces.open-api.vn/api/p/",
    GetProvince,
  );

  const refreshData = () => {
    mutate("https://provinces.open-api.vn/api/p/", null, { revalidate: true });
  };

  return {
    provinces: data,
    isLoading,
    isError: error,
    refresh: refreshData,
  };
}
