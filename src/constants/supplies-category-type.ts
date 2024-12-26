export const SuppliesCategoryType = {
  BEDDING: "Giường",
  HYGIENE: "Vệ sinh",
  CLOTHING: "Đồ áo",
  TOY: "Đồ chơi",
  HEALTH: "Sức khỏe",
  OTHER: "Khác",
} as const;

export type SuppliesCategoryTypes =
  (typeof SuppliesCategoryType)[keyof typeof SuppliesCategoryType];
