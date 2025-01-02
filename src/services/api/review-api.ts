import { toCamelCase } from "@/utils/to-camel-case";
import { get, update } from "../axios";
import { UpdateVoucherFormType } from "@/app/vouchers/components/voucher-detail";
import { ReviewList } from "@/types/reviews";

export async function getReviews(url: string) {
  const rawData = await get<ReviewList>({
    url: url,
  });
  const data = toCamelCase<ReviewList>(rawData);
  return data;
}

export async function updateReviewStatus({
  data,
}: {
  data: { id: string; status: number };
}) {
  return await update({
    url: "/admin/comments/status",
    data,
  });
}

export async function updateVoucher({ data }: { data: UpdateVoucherFormType }) {
  return await update({
    url: "/admin/vouchers/update",
    data,
  });
}

export async function deleteVoucher({ data }: { data: { id: string } }) {
  return await update({
    url: "/admin/vouchers/delete",
    data,
  });
}
