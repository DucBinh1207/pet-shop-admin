import { getWards } from "@/services/api/address-api";
import useSWR, { mutate } from "swr";

export default function useWards(district: string) {
  const { data, error, isLoading } = useSWR(
    "https://provinces.open-api.vn/api/d/" + district,
    getWards,
  );

  const refreshData = (district: string) => {
    const provinceSelected = "https://provinces.open-api.vn/api/d/" + district;
    mutate(provinceSelected, getWards(provinceSelected), {
      revalidate: true,
    });
  };

  return {
    district: data,
    isLoading,
    isError: error,
    refresh: refreshData,
  };
}
