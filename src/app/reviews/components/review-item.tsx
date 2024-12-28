import { ReviewStatus, ReviewStatusType } from "@/constants/review-status";
import useMutation from "@/hooks/use-mutation";
import { updateReviewStatus } from "@/services/api/review-api";
import { Review } from "@/types/reviews";
import { convertDateFull } from "@/utils/convert-date";
import cn from "@/utils/style/cn";
import { toastError } from "@/utils/toast";
import Image from "next/image";
import { useEffect, useState } from "react";

type props = {
  review: Review;
  setReviewDetailData: (review: Review) => void;
};

export default function ReviewItem({ review, setReviewDetailData }: props) {
  const [status, setStatus] = useState<ReviewStatusType>(
    review.status as ReviewStatusType,
  );

  const { mutate } = useMutation({
    fetcher: updateReviewStatus,
    options: {
      onSuccess: async () => {
        setStatus(ReviewStatus.VIEWED);
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  function handleViewed(review: Review) {
    if ((review.status as ReviewStatusType) === ReviewStatus.NOT_VIEWED) {
      const data = {
        id: review.id,
        status: ReviewStatus.VIEWED,
      };
      mutate({ data });
    }
  }

  useEffect(() => {
    setStatus(review.status as ReviewStatusType);
  }, [review.id, review.status]);

  return (
    <div
      className={cn(
        "grid cursor-pointer grid-cols-7 border-b border-stroke dark:border-strokedark",
        {
          "bg-[#3c4a5a]": status === ReviewStatus.NOT_VIEWED,
          "bg-meta-7": status === ReviewStatus.DELETED,
        },
      )}
      onClick={() => {
        handleViewed(review);
      }}
    >
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="h-[48px] w-[48px] flex-shrink-0 overflow-hidden rounded-[50%]">
          <Image
            src={
              review.image === "null" ? "/images/user/client.png" : review.image
            }
            alt="user"
            width={48}
            height={48}
          />
        </div>
        <p className="hidden whitespace-normal break-all text-black sm:block dark:text-white">
          {review.id}
        </p>
      </div>
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <p className="hidden w-full whitespace-normal break-all text-center text-black sm:block dark:text-white">
          {review.productName}
        </p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-6">{review.star}</p>
      </div>

      <div className="col-span-2 hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white">{review.content}</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">
          {review.time ? convertDateFull(review.time) : ""}
        </p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <button
          className="rounded bg-boxdark px-4 py-2 text-blue-700 hover:bg-gray-700 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            setReviewDetailData(review);
          }}
        >
          Xem
        </button>
      </div>
    </div>
  );
}
