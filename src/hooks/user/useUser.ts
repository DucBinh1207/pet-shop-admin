import { getRevenue } from "@/services/api/dashboard-api";
import useSWR from "swr";

type props = {
  search: string;
  page: number;
  limit?: number;
  idRole: 1 | 2 | 3;
  status: 1 | 2;
};

export default function useUser({
  search = "",
  page,
  limit = 10,
  idRole,
  status = 1,
}: props) {
  const params = new URLSearchParams();

  params.append("search", search);
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  params.append("id_role", idRole.toString());
  params.append("status", status.toString());

  const { data, error, isLoading } = useSWR(
    "/admin/users/get?" + params.toString(),
    getRevenue,
  );

  return {
    revenueData: data,
    isLoading,
    isError: error,
  };
}
