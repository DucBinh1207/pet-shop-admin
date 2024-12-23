export type SoldProductsByCategory = {
  category: "pets" | "foods" | "supplies";
  soldQuantity: number;
  income: number;
};

export type ResponseSoldProductsApi = {
  income: SoldProductsByCategory[];
};
