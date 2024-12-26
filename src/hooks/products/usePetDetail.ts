import { getPetDetail } from "@/services/api/products-api";
import useSWR, { mutate } from "swr";

type props = {
  id: string;
};

export default function usePetDetail({ id }: props) {
  const { data, error, isLoading } = useSWR(
    "/products/pets/" + id,
    getPetDetail,
  );

  const refreshData = () => {
    mutate("/products/pets/" + id, null, {
      revalidate: true,
    });
  };

  return {
    pet: data,
    isLoading,
    isError: error,
    refresh: refreshData,
  };
}
