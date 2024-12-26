import { getFoods } from "@/services/api/products-api";
import useSWR, { mutate } from "swr";

type props = {
  sort: string;
  search: string;
  paging: number;
  limit?: number;
  status: 1 | 2 | 3 | 4;
};

export default function useFoods({
  sort,
  paging,
  limit = 10,
  search,
  status,
}: props) {
  const params = new URLSearchParams();

  params.append("breeds", search);
  params.append("sortBy", sort);
  params.append("status", status.toString());
  params.append("page", paging.toString());
  params.append("limit", limit.toString());

  const { data, error, isLoading } = useSWR(
    "/admin/products/foods?" + params.toString(),
    getFoods,
  );

  const refreshData = () => {
    mutate("/admin/products/foods?" + params.toString(), null, {
      revalidate: true,
    });
  };

  return {
    foods: data?.products,
    totalPages: data?.totalPages,
    isLoading,
    isError: error,
    refresh: refreshData,
  };
}
