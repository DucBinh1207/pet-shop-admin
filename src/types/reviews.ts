export type Review = {
  id: string;
  userId: string;
  image: string;
  idProduct: string;
  productName: string;
  star: number;
  content: string;
  status: number;
  time: string;
};

export type ReviewList = {
  comments: Review[];
  totalPages: number;
};
