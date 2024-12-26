// import { getReviews } from "@/services/api/review-api";
// import useSWR, { mutate } from "swr";

// type props = {
//   productId: string;
//   paging: number;
//   limit?: number;
// };

// export default function useReviews({ productId, paging, limit = 5 }: props) {
//   const params = new URLSearchParams();
//   params.append("id_product", productId);
//   params.append("page", paging.toString());
//   params.append("limit", limit.toString());

//   const { data, error, isLoading } = useSWR("/comments/?" + params, getReviews);

//   const refreshData = () => {
//     mutate("/comments/?" + params, null, { revalidate: true });
//   };

//   return {
//     reviews: data,
//     isLoading,
//     isError: error,
//     refresh: refreshData,
//   };
// }
