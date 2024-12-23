"use client";

import AddVoucher from "@/app/vouchers/components/add-voucher";
import VoucherDetail from "@/app/vouchers/components/voucher-detail";
import useBlockScroll from "@/hooks/use-block-scroll";
import { REVIEW } from "@/types/reviews";
import convertDate from "@/utils/convert-date";
import cn from "@/utils/style/cn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const reviews: REVIEW[] = [
  {
    id: "3ad712b2-c5f8-4ef0-ab54-e8df9daa2d8e",
    id_user: "a7b8d6c1-d6f5-4b44-bab5-7681c20b3e6d",
    email: "user1@gmail.com",
    name: "Nguyen Thanh Son",
    image: "https://example.com/image1.jpg",
    star: 5,
    content:
      "Tôi rất hài lòng với voucher giảm giá này! Sản phẩm chất lượng tốt và giá cả hợp lý hơn nhờ có mã giảm giá.",
    time: "2024-12-10T12:30:45.000Z",
    status: 0,
  },
  {
    id: "4e87fa52-453d-41f8-83da-397e3bc2c87e",
    id_user: "b4d6e3f4-b4a5-4d76-a9b3-b2d2e7f8f421",
    email: "user2@gmail.com",
    name: "Pham Minh Tri",
    image: "https://example.com/image2.jpg",
    star: 4,
    content:
      "Voucher hoạt động tốt, nhưng tôi hy vọng sẽ có thêm các ưu đãi hấp dẫn hơn trong các lần mua sắm tiếp theo.",
    time: "2024-12-12T08:15:30.000Z",
    status: 1,
  },
  {
    id: "587b2f32-93cf-4c34-8a7d-22f7c72bfb3b",
    id_user: "d5f9c7a3-c8d3-4fe7-9293-7c437b694dfb",
    email: "user3@gmail.com",
    name: "Le Hoang Long",
    image: "https://example.com/image3.jpg",
    star: 3,
    content:
      "Mã giảm giá không rõ ràng lắm, tôi gặp chút khó khăn khi nhập mã, nhưng cuối cùng cũng sử dụng được.",
    time: "2024-12-15T18:45:20.000Z",
    status: 0,
  },
  {
    id: "a9b3c2c1-9f02-4b2d-951f-ec71f9d8d66d",
    id_user: "c5d7e9f6-3b0f-4f7a-a1b2-9f53f871fe26",
    email: "user4@gmail.com",
    name: "Tran Minh Tu",
    image: "https://example.com/image4.jpg",
    star: 5,
    content:
      "Rất ấn tượng với quá trình mua hàng và sử dụng voucher! Việc áp dụng mã giảm giá cực kỳ dễ dàng và nhanh chóng.",
    time: "2024-12-16T10:15:00.000Z",
    status: 0,
  },
  {
    id: "e7c3d8f4-c9de-4be6-a7ad-6499a01c82b1",
    id_user: "f2b7e3f3-bb8f-4c8b-8461-0d65421b0549",
    email: "user5@gmail.com",
    name: "Hoang Lan Anh",
    image: "https://example.com/image5.jpg",
    star: 4,
    content:
      "Sản phẩm tôi mua rất tốt. Tuy nhiên, tôi nghĩ sẽ tuyệt hơn nếu mã giảm giá có thời gian áp dụng lâu hơn.",
    time: "2024-12-17T14:00:30.000Z",
    status: 1,
  },
  {
    id: "f9d8f29d-cfd0-426d-bf5a-5e0d02935aef",
    id_user: "89f7a6e7-4db8-4c44-9a8b-b2e0d4f5d8c9",
    email: "user6@gmail.com",
    name: "Nguyen Thi Mai",
    image: "https://example.com/image6.jpg",
    star: 5,
    content:
      "Mua sắm rất nhanh chóng và tiện lợi, mã giảm giá giúp tôi tiết kiệm được một khoản đáng kể.",
    time: "2024-12-18T11:45:20.000Z",
    status: 0,
  },
  {
    id: "7c9db102-bb8f-402e-98e4-34a1a8d957fd",
    id_user: "f8b7c5d1-c2bb-4c90-8b8c-3449812582bb",
    email: "user7@gmail.com",
    name: "Bui Minh Tuan",
    image: "https://example.com/image7.jpg",
    star: 2,
    content:
      "Thực sự thất vọng với voucher này. Quá trình mua hàng gặp nhiều lỗi kỹ thuật và tôi không thể áp dụng mã giảm giá.",
    time: "2024-12-19T09:30:10.000Z",
    status: 1,
  },
  {
    id: "abeadf79-6e2b-4d0f-8f30-7b071fe9f9c7",
    id_user: "bc69a8fd-7077-4120-b568-bf572c8e2e7f",
    email: "user8@gmail.com",
    name: "Pham Thi Mai",
    image: "https://example.com/image8.jpg",
    star: 4,
    content:
      "Mã giảm giá rất tốt, nhưng tôi nghĩ sẽ tuyệt hơn nếu sản phẩm có nhiều lựa chọn hơn.",
    time: "2024-12-20T07:40:55.000Z",
    status: 2,
  },
  {
    id: "4e68b61a-e93c-4207-bbd0-7b4e6a28e1fa",
    id_user: "b1e4a9de-5c32-4a6d-b11f-3e5b774813c9",
    email: "user9@gmail.com",
    name: "Doan Thanh Son",
    image: "https://example.com/image9.jpg",
    star: 5,
    content:
      "Quá trình mua sắm diễn ra rất suôn sẻ, tôi hài lòng với chất lượng sản phẩm và mã giảm giá có tác dụng hiệu quả.",
    time: "2024-12-21T16:10:00.000Z",
    status: 0,
  },
  {
    id: "b7f58e2b-9078-42e3-bc7e-bfbaee579c58",
    id_user: "b9a01c9e-4e5b-4b1d-a9bb-43057360796a",
    email: "user10@gmail.com",
    name: "Le Thi Bao",
    image: "https://example.com/image10.jpg",
    star: 3,
    content:
      "Voucher giảm giá hoạt động tốt, nhưng tôi không thấy sự khác biệt lớn trong giá sau khi áp dụng mã giảm.",
    time: "2024-12-22T13:05:45.000Z",
    status: 1,
  },
];

const ReviewsTable = () => {
  const [voucher, setVoucher] = useState(false);
  const [isAddVoucher, setIdAddVoucher] = useState(false);
  const [status, setStatus] = useState(0);

  const starLabels: { [key: number]: string } = {
    0: "Tất cả", // Lựa chọn "All"
    1: "1 sao",
    2: "2 sao",
    3: "3 sao",
    4: "4 sao",
    5: "5 sao",
  };

  const StatusLabels: { [key: number]: string } = {
    0: "Hoạt động", // Lựa chọn "All"
    1: "Đã bị xóa",
    2: "2 sao",
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRating = parseInt(e.target.value, 10);
    // Xử lý cập nhật rating tại đây
  };

  const handleStatusCommentChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newRating = parseInt(e.target.value, 10);
    setStatus(newRating);
  };

  useBlockScroll(voucher);

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
                placeholder="Tìm theo mã người dùng . . . "
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div>
        <div>
          <select
            className="block w-full rounded-sm bg-gray-200 p-2.5 text-black dark:bg-gray-700 dark:text-white"
            defaultValue={0}
            onChange={handleStatusChange}
          >
            {Object.entries(starLabels).map(([ratingValue, ratingLabel]) => (
              <option key={ratingValue} value={ratingValue}>
                {ratingLabel}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-7 rounded-sm bg-gray-2 sm:grid-cols-7 dark:bg-meta-4">
          <div className="col-span-1 p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Mã người dùng
            </h5>
          </div>
          <div className="col-span- p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Tên người dùng
            </h5>
          </div>
          <div className="col-span-1 p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Sao</h5>
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
          <div
            className={`grid grid-cols-7 ${
              key === reviews.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <Link href="#" className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black sm:block dark:text-white">
                {review.id_user}
              </p>
            </Link>

            <Link href="#" className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="h-[48px] w-[48px] flex-shrink-0 overflow-hidden rounded-[50%]">
                <Image
                  src="/images/user/client.png"
                  alt="user"
                  width={48}
                  height={48}
                />
              </div>
              <p className="hidden text-black sm:block dark:text-white">
                {review.name}
              </p>
            </Link>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-6">{review.star}</p>
            </div>

            <div className="col-span-2 hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{review.content}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {convertDate(review.time)}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <select
                className={cn("block w-full rounded-sm p-2.5 text-white", {
                  "bg-green-700": review.status === 0,
                  "bg-red-700": review.status === 1,
                })}
                defaultValue={review.status}
                onChange={handleStatusCommentChange}
              >
                {Object.entries(StatusLabels).map(
                  ([statusValue, statusLabel]) => (
                    <option key={statusValue} value={statusValue}>
                      {statusLabel}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="my-[10px] flex items-center justify-center space-x-2 text-[18px]">
        <button
          className="rounded bg-boxdark px-4 py-2 text-white hover:bg-gray-700 focus:outline-none disabled:opacity-50"
          disabled
        >
          Trước
        </button>

        <button className="rounded bg-gray-500 px-3 py-2 text-white hover:bg-gray-700 focus:outline-none">
          1
        </button>

        <button
          className="rounded bg-boxdark px-4 py-2 text-white hover:bg-gray-700 focus:outline-none disabled:opacity-50"
          disabled
        >
          Sau
        </button>
      </div>
      {voucher && (
        <>
          <VoucherDetail />
          <div
            className={cn(
              "fixed inset-0 z-[105] h-[100vh] w-[100vw] bg-overlay_color transition-opacity",
              {
                "block opacity-100": voucher,
                "hidden opacity-0": !voucher,
              },
            )}
          />
        </>
      )}
      {isAddVoucher && (
        <>
          <AddVoucher />
          <div
            className={cn(
              "fixed inset-0 z-[105] h-[100vh] w-[100vw] bg-overlay_color transition-opacity",
              {
                "block opacity-100": isAddVoucher,
                "hidden opacity-0": !isAddVoucher,
              },
            )}
          />
        </>
      )}
    </div>
  );
};

export default ReviewsTable;
