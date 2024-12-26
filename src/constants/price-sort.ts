export const PriceSort = {
  NORMAL: "",
  PRICE: "price",
  PRICE_DESC: "price-desc",
} as const;

export type PriceSortType = (typeof PriceSort)[keyof typeof PriceSort];