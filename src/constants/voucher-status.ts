export const VoucherStatus = {
  ALL: 0,
  ACTIVE: 1,
  OUT_STOCK: 2,
  DELETED: 3,
};

export type VoucherStatusType =
  (typeof VoucherStatus)[keyof typeof VoucherStatus];

export const VoucherStatusLabel = {
  [VoucherStatus.ALL]: "Tất cả",
  [VoucherStatus.ACTIVE]: "Khả dụng",
  [VoucherStatus.OUT_STOCK]: "Hết số lượng",
  [VoucherStatus.DELETED]: "Đã bị xóa",
};
