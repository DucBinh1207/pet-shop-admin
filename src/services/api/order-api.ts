// import { get, post } from "../axios";
// import { toSnakeCase } from "@/utils/to-snake-case";
// import { toCamelCase } from "@/utils/to-camel-case";
// import { OrderFormType } from "@/app/cart/checkout/_components/bill-details";
// import { OrderApiResponse, OrderType } from "@/types/order-item";

// export async function CreateOrder({
//   data: orderData,
// }: {
//   data: OrderFormType;
// }) {
//   type dataType = {
//     idOrder: string;
//     amount: string;
//   };
//   const data = toSnakeCase(orderData);
//   const dataResponse = await post<dataType>({
//     url: "/orders/create",
//     data,
//   });
//   return toCamelCase<dataType>(dataResponse);
// }

// export async function getOrderDetail(url: string) {
//   const rawData = await get<OrderApiResponse>({
//     url: url,
//   });
//   const data = toCamelCase<OrderApiResponse>(rawData);
//   return data;
// }

// export async function getOrderItems(url: string) {
//   const rawData = await get<OrderType[]>({
//     url: url,
//   });
//   const data = toCamelCase<OrderType[]>(rawData);
//   return data;
// }
