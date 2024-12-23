export type RevenueByMonth = {
  date: string;
  totalIncome: number;
};

export type ResponseRevenueApi = {
  totalIncome: number;
  details: RevenueByMonth[];
};
