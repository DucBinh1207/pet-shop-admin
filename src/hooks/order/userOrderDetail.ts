import { getOrderDetail } from "@/services/api/order-api";
import useSWR, { mutate } from "swr";

type props = {
  orderId: string;
};

export default function useOrderDetail({ orderId }: props) {
  const { data, error, isLoading } = useSWR(
    "/orders/user/details?id_order=" + orderId,
    getOrderDetail,
  );

  const refreshData = () => {
    mutate("/orders/user/details?id_order=" + orderId, null, {
      revalidate: true,
    });
  };

  return {
    order: data?.order,
    isLoading,
    isError: error,
    refresh: refreshData,
  };
}
