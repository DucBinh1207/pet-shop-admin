export type PurchaseDataType = {
  productVariantId: string;
  category: "pets" | "foods" | "supplies";
  quantity: number;
};

export type ResponseBuyNowApi = {
  quantity: number;
};
