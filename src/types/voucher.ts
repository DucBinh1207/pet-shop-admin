export type VoucherType = {
  id: string;
  code: string;
  percent: string;
  dateCreated: string;
  status: number;
  quantity: number;
};

export type ListVoucherResponseApi = {
  vouchers: VoucherType[];
  
}
