import { getFoodDetail } from "@/services/api/products-api";
import useSWR, { mutate } from "swr";

type props = {
  id: string;
};

export default function useFoodDetail({ id }: props) {
  const { data, error, isLoading } = useSWR(
    "/admin/products/foods/" + id,
    getFoodDetail,
  );

  const refreshData = () => {
    mutate("/admin/products/foods/" + id, null, {
      revalidate: true,
    });
  };

  return {
    food: data,
    isLoading,
    isError: error,
    refresh: refreshData,
  };
}
