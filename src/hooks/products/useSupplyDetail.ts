import { getSupplyDetail } from "@/services/api/products-api";
import useSWR, { mutate } from "swr";

type props = {
  id: string;
};

export default function useSupplyDetail({ id }: props) {
  const { data, error, isLoading } = useSWR(
    "/admin/products/supplies/" + id,
    getSupplyDetail,
  );

  const refreshData = () => {
    mutate("/admin/products/supplies/" + id, null, {
      revalidate: true,
    });
  };

  return {
    supply: data,
    isLoading,
    isError: error,
    refresh: refreshData,
  };
}
