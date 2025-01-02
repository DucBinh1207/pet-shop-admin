import { GetDistricts } from "@/services/api/address-api";
import useSWR, { mutate } from "swr";

export default function useDistricts(province: string) {
  const { data, error, isLoading } = useSWR(
    "https://provinces.open-api.vn/api/p/" + province,
    GetDistricts,
  );

  const refreshData = (province: string) => {
    const provinceSelected = "https://provinces.open-api.vn/api/p/" + province;
    mutate(provinceSelected, GetDistricts(provinceSelected), {
      revalidate: true,
    });
  };


  return {
    province: data,
    isLoading,
    isError: error,
    refresh: refreshData,
  };
}
