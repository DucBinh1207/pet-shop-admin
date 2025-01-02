export type Product = {
  image: string;
  name: string;
  category: string;
  price: number;
  sold: number;
  profit: number;
};

export type ProductVariant = {
  productVariantId: string;
  name: string;
  category: string;
  ingredient: string;
  weight: string;
  size: string;
  color: string;
  stock: string;
  price: string;
};

export type ResponseProductVariant = {
  productVariants: ProductVariant[];
};
