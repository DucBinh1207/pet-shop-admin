export type OrderResponseType = {
  id: string;
  userId: string;
  name: string;
  totalPrice: string;
  dateCreated: string;
  status: number;
};

export type ListOrderResponseType = {
  orders: OrderResponseType[];
  totalPages: number;
};

export type OrderItemType = {
  id: string;
  idProduct: string;
  category: string;
  quantity: number;
  ingredient?: string;
  weight?: string;
  size?: string;
  color?: string;
  name: string;
  price: number;
  image: string;
};

export type OrderType = {
  id: string;
  dateCreated: string;
  status: number;
  subtotalPrice: string;
  shippingPrice: string;
  totalPrice: string;
  paymentMethod: string;
  note: string;
  name: string;
  telephoneNumber: string;
  email: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  voucher?: string;
  percent: number;
  orderItems: OrderItemType[];
};

export type OrderApiResponse = {
  order: OrderType;
};
