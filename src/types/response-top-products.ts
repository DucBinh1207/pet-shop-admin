export type TopProductsItem = {
  id: string;
  name: string;
  sold: number;
  image: string;
  category: "pets" | "foods" | "supplies";
  rating: number;
};

export type ResponseTopProductsApi = {
  topProducts: TopProductsItem[];
};
