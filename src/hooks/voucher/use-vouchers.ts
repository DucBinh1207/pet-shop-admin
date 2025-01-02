import { VoucherStatusType } from "@/constants/voucher-status";
import { getVouchers } from "@/services/api/voucher-api";
import useSWR, { mutate } from "swr";

type props = {
  search: string;
  paging: number;
  limit?: number;
  sortBy: string;
  status: VoucherStatusType;
};

export default function useVouchers({
  search = "",
  paging,
  limit = 10,
  sortBy,
  status = 1,
}: props) {
  const params = new URLSearchParams();

  if (search !== "") params.append("code", search);
  params.append("sortBy", sortBy);
  params.append("status", status.toString());
  params.append("available", status.toString());
  params.append("page", paging.toString());
  params.append("limit", limit.toString());

  const { data, error, isLoading } = useSWR(
    "admin/vouchers?" + params.toString(),
    getVouchers,
  );
  const refreshData = () => {
    mutate("admin/vouchers?" + params.toString(), null, { revalidate: true });
  };

  return {
    vouchers: data?.vouchers,
    totalPages: data?.totalPages,
    totalRecords: data?.totalRecords,
    isLoading,
    isError: error,
    refresh: refreshData,
  };
}
