"use client";

import ReviewDetail from "@/app/reviews/components/review-detail";
import ReviewItem from "@/app/reviews/components/review-item";

import { Rating, RatingLabel, RatingType } from "@/constants/rating";
import {
  ReviewStatus,
  ReviewStatusLabel,
  ReviewStatusType,
} from "@/constants/review-status";
import useReviews from "@/hooks/reviews/use-reviews";
import useBlockScroll from "@/hooks/use-block-scroll";
import { useDebounce } from "@/hooks/use-debounce";
import { Review } from "@/types/reviews";
import cn from "@/utils/style/cn";

import { ChangeEvent, useMemo, useState } from "react";
import Pagination from "../pagination";

const ReviewsTable = () => {
  const [reviewDetailData, setReviewDetailData] = useState<Review | null>(null);

  function handleCloseReviewDetail() {
    setReviewDetailData(null);
  }

  useBlockScroll(reviewDetailData !== null);

  const [rating, setRating] = useState<RatingType>(Rating.ALL);
  const [search, setSearch] = useState("");
  const [paging, setPaging] = useState(1);
  const [status, setStatus] = useState<ReviewStatusType>(ReviewStatus.ALL);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearch = useDebounce(search);

  const {
    reviews,
    totalPages: total,
    refresh,
  } = useReviews({
    search: debouncedSearch,
    paging: paging,
    limit: 10,
    status: status,
    rating: rating,
  });

  function handlePagingFilter(pagingCurrent: number) {
    setPaging(pagingCurrent);
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPaging(1);
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = parseInt(e.target.value, 10);
    setStatus(newStatus);
    setPaging(1);
    refresh();
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRating = parseInt(e.target.value, 10);
    setRating(newRating);
    setPaging(1);
  };

  useMemo(() => {
    if (total !== undefined) {
      if (total === 0) setTotalPages(1);
      else setTotalPages(total);
    }
  }, [total]);

  if (reviews)
    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1 dark:border-strokedark dark:bg-boxdark">
        <div className="mb-[20px] flex items-center justify-between">
          <div className="hidden sm:block">
            <form action="https://formbold.com/s/unique_form_id" method="POST">
              <div className="relative">
                <button className="absolute left-0 top-1/2 -translate-y-1/2">
                  <svg
                    className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                      fill=""
                    />
                  </svg>
                </button>

                <input
                  type="text"
                  onChange={handleSearch}
                  placeholder="Nhập mã người dùng để tìm. . . "
                  className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                />
              </div>
            </form>
          </div>
          <div className="flex gap-[10px]">
            <select
              className="block w-full min-w-[150px] rounded-sm bg-gray-200 p-2.5 text-black dark:bg-gray-700 dark:text-white"
              defaultValue={status}
              onChange={handleStatusChange}
            >
              {Object.entries(ReviewStatus).map(([, statusValue]) => (
                <option key={statusValue} value={statusValue}>
                  {ReviewStatusLabel[statusValue]}
                </option>
              ))}
            </select>

            <select
              className="block w-full min-w-[150px] rounded-sm bg-gray-200 p-2.5 text-black dark:bg-gray-700 dark:text-white"
              defaultValue={rating}
              onChange={handleRatingChange}
            >
              {Object.entries(Rating).map(([, ratingValue]) => (
                <option key={ratingValue} value={ratingValue}>
                  {RatingLabel[ratingValue]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-7 rounded-sm bg-gray-2 sm:grid-cols-7 dark:bg-meta-4">
            <div className="col-span-1 p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Người dùng
              </h5>
            </div>
            <div className="col-span- p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tên sản phẩm
              </h5>
            </div>
            <div className="col-span-1 p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Sao
              </h5>
            </div>
            <div className="col-span-2 p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nội dung
              </h5>
            </div>
            <div className="col-span-1 p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Thời gian
              </h5>
            </div>

            <div className="col-span-1 p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Trạng thái
              </h5>
            </div>
          </div>

          {reviews.map((review, key) => (
            <ReviewItem
              key={key}
              review={review}
              setReviewDetailData={setReviewDetailData}
            />
          ))}
        </div>

        <Pagination
          paging={paging}
          totalPages={totalPages}
          handlePagingFilter={handlePagingFilter}
        />

        {reviewDetailData && (
          <>
            <ReviewDetail
              review={reviewDetailData}
              handleCloseReviewDetail={handleCloseReviewDetail}
              refresh={refresh}
            />
            <div
              className={cn(
                "fixed inset-0 z-[105] h-[100vh] w-[100vw] bg-overlay_color transition-opacity",
                {
                  "block opacity-100": reviewDetailData,
                  "hidden opacity-0": !reviewDetailData,
                },
              )}
            />
          </>
        )}
      </div>
    );
};

export default ReviewsTable;
