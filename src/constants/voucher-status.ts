export const VoucherStatus = {
  ALL: 4,
  ACTIVE: 2,
  OUT_STOCK: 3,
  AVAILABLE: 1,
  DELETED: 0,
};

export type VoucherStatusType =
  (typeof VoucherStatus)[keyof typeof VoucherStatus];

export const VoucherStatusLabel = {
  [VoucherStatus.ALL]: "Tất cả",
  [VoucherStatus.ACTIVE]: "Còn số lượng",
  [VoucherStatus.OUT_STOCK]: "Hết số lượng",
  [VoucherStatus.DELETED]: "Đã bị xóa",
  [VoucherStatus.AVAILABLE]: "Khả dụng",
};
