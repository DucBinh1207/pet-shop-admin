import { getUser } from "@/services/api/user-api";
import useSWR, { mutate } from "swr";

type props = {
  search: string;
  paging: number;
  limit?: number;
  idRole: 1 | 2 | 3;
  status: 0 | 1 | 2;
};

export default function useUser({
  search = "",
  paging,
  limit = 10,
  idRole,
  status = 1,
}: props) {
  const params = new URLSearchParams();

  params.append("search", search);
  params.append("page", paging.toString());
  params.append("limit", limit.toString());
  params.append("id_role", idRole.toString());
  if (status !== 0) params.append("status", status.toString());

  const { data, error, isLoading } = useSWR(
    "/admin/users/get?" + params.toString(),
    getUser,
  );
  const refreshData = () => {
    mutate("/admin/users/get?" + params.toString(), null, { revalidate: true });
  };

  return {
    users: data?.users,
    totalPages: data?.totalPages,
    totalRecords: data?.totalRecords,
    isLoading,
    isError: error,
    refresh: refreshData,
  };
}
