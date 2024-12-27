import { OrderStatus, OrderStatusType } from "@/constants/order-status";
import { getOrders } from "@/services/api/order-api";
import useSWR, { mutate } from "swr";

type props = {
  search: string;
  paging: number;
  limit?: number;
  sortBy: string;
  status: OrderStatusType;
};

export default function useOrder({
  search = "",
  paging,
  limit = 10,
  sortBy,
  status = 1,
}: props) {
  const params = new URLSearchParams();

  params.append("search", search);
  params.append("page", paging.toString());
  params.append("limit", limit.toString());
  params.append("sortBy", sortBy);
  if (status !== OrderStatus.ALL) params.append("status", status.toString());

  const { data, error, isLoading } = useSWR(
    "/admin/orders?" + params.toString(),
    getOrders,
  );
  const refreshData = () => {
    mutate("/admin/orders?" + params.toString(), null, { revalidate: true });
  };

  return {
    orders: data?.orders,
    totalPages: data?.totalPages,
    isLoading,
    isError: error,
    refresh: refreshData,
  };
}
