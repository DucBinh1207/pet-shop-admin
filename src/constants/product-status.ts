export const ProductStatus = {
  ALL: 1,
  AVAILABLE: 2,
  SOLD_OUT: 3,
  DELETED: 4,
};

export const ProductStatusLabel = {
  [ProductStatus.ALL]: "Toàn bộ",
  [ProductStatus.AVAILABLE]: "Còn hàng",
  [ProductStatus.SOLD_OUT]: "Hết hàng",
  [ProductStatus.DELETED]: "Đã xóa",
};
