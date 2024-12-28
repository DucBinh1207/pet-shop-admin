import Image from "next/image";
import FormInput from "@/components/form-input";
import cn from "@/utils/style/cn";
import { Review } from "@/types/reviews";
import {
  ReviewStatus,
  ReviewStatusLabel,
  ReviewStatusType,
} from "@/constants/review-status";
import { convertDateFull } from "@/utils/convert-date";
import { useState } from "react";
import useMutation from "@/hooks/use-mutation";
import { updateReviewStatus } from "@/services/api/review-api";
import { toastError } from "@/utils/toast";

type props = {
  review: Review;
  handleCloseReviewDetail: () => void;
  refresh: () => void;
};

const ReviewDetail = ({ review, handleCloseReviewDetail, refresh }: props) => {
  const [status, setStatus] = useState<ReviewStatusType>(
    review.status as ReviewStatusType,
  );

  const { mutate } = useMutation({
    fetcher: updateReviewStatus,
    options: {
      onSuccess: async () => {},
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = parseInt(e.target.value, 10) as ReviewStatusType;
    setStatus(newStatus);
    const data = {
      id: review.id,
      status: newStatus,
    };
    mutate({ data });
  };

  return (
    <div className="small-screen:h-0 small-screen:pb-[56.25%] fixed left-[50%] top-[50%] z-[110] h-[90vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] p-[50px]">
      <form className="grid h-full grid-cols-5 gap-8">
        <div className="xl:col-span-13 col-span-4 h-full overflow-hidden">
          <div className="h-full overflow-y-scroll rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Thông tin chi tiết
              </h3>
              <div className="flex justify-end gap-4.5">
                <select
                  className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  value={status}
                  onChange={handleStatusChange}
                >
                  {Object.entries(ReviewStatus).map(([, statusValue]) => {
                    if (
                      statusValue !== ReviewStatus.ALL &&
                      statusValue !== ReviewStatus.DELETED
                    ) {
                      return (
                        <option key={statusValue} value={statusValue}>
                          {ReviewStatusLabel[statusValue]}
                        </option>
                      );
                    }
                  })}
                </select>
                <button
                  className="flex justify-center rounded border border-stroke bg-blue-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    refresh();
                    handleCloseReviewDetail();
                  }}
                >
                  Thoát
                </button>
              </div>
            </div>

            <div className="h-full p-7">
              <div className="h-full w-full">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      disabled
                      label="Mã bình luận"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      value={review.id}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      disabled
                      label="Mã người dùng"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      value={review.userId}
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      disabled
                      label="Mã sản phẩm"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      value={review.idProduct}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      disabled
                      label="Tên sản phẩm"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      value={review.productName}
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      disabled
                      label="Số sao"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      value={review.star}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      disabled
                      label="Tịnh trạng bình luận"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      value={
                        ReviewStatusLabel[review.status as ReviewStatusType]
                      }
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <FormInput
                    disabled
                    label="Ngày bình luận"
                    id="name"
                    type="text"
                    variant="secondary"
                    className="w-full"
                    value={review.dateCreated ? convertDateFull(review.dateCreated) : ""}
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Username"
                  >
                    Nội dung
                  </label>
                  <div className="relative">
                    <textarea
                      disabled
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      rows={6}
                      value={review.content}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5 xl:col-span-1">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Avatar người dùng
              </h3>
            </div>
            <div className="p-7">
              <form>
                <div
                  id="FileUpload"
                  className={cn(
                    "relative mb-5.5 block h-full w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray dark:bg-meta-4",
                  )}
                >
                  <div
                    className="relative flex h-full w-full flex-col items-center justify-center"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Image
                      src={
                        review.image === undefined || review.image === "null"
                          ? "/images/user/avatar.svg"
                          : review.image
                      }
                      width={0}
                      height={0}
                      sizes="100%"
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewDetail;
