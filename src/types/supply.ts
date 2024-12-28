type VariationSupply = {
  productVariantId: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  dateCreated: string;
};

export type SupplyType = {
  id: string;
  name: string;
  description: string;
  image: string;
  dateCreated: string;
  rating: number;
  category: string;
  material: string;
  brand: string;
  type: string;
  variationsSupplies: VariationSupply[];
};

export type SupplyResponseType = {
  id: string;
  dateCreated: string;
  name: string;
  image: string;
  rating: number | null;
  type: string;
  price: number;
  description: string;
  status: number;
};

export type ListSupplyResponse = {
  products: SupplyResponseType[];
  totalPages: number;
};
