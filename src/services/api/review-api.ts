import { toCamelCase } from "@/utils/to-camel-case";
import { get, post } from "../axios";
import { toSnakeCase } from "@/utils/to-snake-case";

import { AddReviewDataType, ReviewResponse } from "@/types/review";

export async function getReviews(url: string) {
  const rawData = await get<ReviewResponse>({
    url: url,
  });
  const data = toCamelCase<ReviewResponse>(rawData);
  return data;
}

export async function addReview({
  data: reviewData,
}: {
  data: AddReviewDataType;
}) {
  const data = toSnakeCase(reviewData);
  return await post({
    url: "/comments/add",
    data,
  });
}
