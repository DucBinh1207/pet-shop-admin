export const OrderStatus = {
  ALL: 7,
  PENDING: 6,
  ORDERED: 5,
  PREPARING: 4,
  SHIPPING: 3,
  OUT_FOR_DELIVERY: 2,
  DELIVERED: 1,
  CANCELLED: 0,
} as const;

export const OrderStatusLabel = {
  [OrderStatus.ALL]: "Tất cả",
  [OrderStatus.PENDING]: "Đang chờ xác nhận",
  [OrderStatus.ORDERED]: "Đã được đặt",
  [OrderStatus.PREPARING]: "Đang được chuẩn bị",
  [OrderStatus.SHIPPING]: "Đang được vận chuyển",
  [OrderStatus.OUT_FOR_DELIVERY]: "Đang được giao tới bạn",
  [OrderStatus.DELIVERED]: "Đã giao thành công",
  [OrderStatus.CANCELLED]: "Đã bị hủy",
};

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];
