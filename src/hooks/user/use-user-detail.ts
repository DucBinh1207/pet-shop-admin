import { getUserDetail } from "@/services/api/user-api";
import useSWR from "swr";

export default function useUserDetail() {
  const { data, error, isLoading } = useSWR("/user/info", getUserDetail);

  return {
    userInfo: data,
    isLoading,
    isError: error,
  };
}
