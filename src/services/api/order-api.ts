import { ListOrderResponseType, OrderApiResponse } from "@/types/order";
import { toCamelCase } from "@/utils/to-camel-case";
import { get, postFormData, update } from "../axios";

export async function getOrders(url: string) {
  const rawData = await get<ListOrderResponseType>({
    url: url,
  });
  const data = toCamelCase<ListOrderResponseType>(rawData);
  return data;
}

export async function getOrderDetail(url: string) {
  const rawData = await get<OrderApiResponse>({
    url: url,
  });
  const data = toCamelCase<OrderApiResponse>(rawData);
  return data;
}

export async function updateOrderStatus({
  data,
}: {
  data: { id: string; status: number };
}) {
  return await update({
    url: "/admin/orders/status",
    data,
  });
}

export async function createOrder({ data }: { data: FormData }) {
  return await postFormData({
    url: "/admin/orders/create",
    data,
  });
}
