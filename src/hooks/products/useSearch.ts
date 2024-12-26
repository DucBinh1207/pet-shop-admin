// import { searchProducts } from "@/services/api/products-api";
// import useSWR, { mutate } from "swr";

// export default function useSearch(search: string) {
//   const { data, error, isLoading } = useSWR(
//     "/products/search/?name=" + search,
//     searchProducts,
//   );

//   const refreshData = (search: string) => {
//     mutate("/products/search/?name=" + search, null, { revalidate: true });
//   };

//   return {
//     products: data,
//     isLoading,
//     isError: error,
//     refresh: refreshData,
//   };
// }
