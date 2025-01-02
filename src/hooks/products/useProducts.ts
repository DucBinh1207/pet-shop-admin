import { searchProduct } from "@/services/api/products-api";
import useSWR, { mutate } from "swr";

type props = {
  name: string;
};

export default function useProducts({ name }: props) {
  const { data, error, isLoading } = useSWR(
    "/admin/products/searchByName/?name=" + name,
    searchProduct,
  );

  const refreshData = () => {
    mutate("/admin/products/searchByName/?name=" + name, null, {
      revalidate: true,
    });
  };


  return {
    product: data?.productVariants,
    isLoading,
    isError: error,
    refresh: refreshData,
  };
}
