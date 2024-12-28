import { Rating, RatingType } from "@/constants/rating";
import { ReviewStatus, ReviewStatusType } from "@/constants/review-status";
import { getReviews } from "@/services/api/review-api";
import useSWR, { mutate } from "swr";

type props = {
  search: string;
  paging: number;
  limit?: number;
  rating: RatingType;
  status: ReviewStatusType;
};

export default function useReviews({
  search = "",
  paging,
  limit = 10,
  rating,
  status = ReviewStatus.ALL,
}: props) {
  const params = new URLSearchParams();

  params.append("page", paging.toString());
  params.append("limit", limit.toString());
  if (search !== "") params.append("userId", search);
  if (rating !== Rating.ALL) params.append("star", rating.toString());
  if (status !== ReviewStatus.ALL) params.append("status", status.toString());

  const { data, error, isLoading } = useSWR(
    "/admin/comments?" + params.toString(),
    getReviews,
  );
  const refreshData = () => {
    mutate("/admin/comments?" + params.toString(), null, { revalidate: true });
  };

  return {
    reviews: data?.comments,
    totalPages: data?.totalPages,
    isLoading,
    isError: error,
    refresh: refreshData,
  };
}
