import AddVoucher from "@/app/vouchers/components/add-voucher";
import VoucherDetail from "@/app/vouchers/components/voucher-detail";
import useBlockScroll from "@/hooks/use-block-scroll";
import { VOUCHER } from "@/types/voucher";
import convertDate from "@/utils/convert-date";
import cn from "@/utils/style/cn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AngleDown from "../angle-down";

const vouchers: VOUCHER[] = [
  {
    id: "b9f7e6d2-45a6-41e3-ae29-8e6544f290cd",
    code: "BANMOI",
    percent: "10",
    date_created: "2024-12-10T12:30:45.000Z",
    status: 1,
    quantity: 6,
  },
  {
    id: "c7d8fbc9-87a3-4e9d-b123-fb4d5643ad67",
    code: "DONDAU",
    percent: "10",
    date_created: "2024-12-12T08:15:30.000Z",
    status: 0,
    quantity: 6,
  },
  {
    id: "f4e3d6a7-12b8-4e3f-b123-67890a4c5e3f",
    code: "TETAMLICH",
    percent: "20",
    date_created: "2024-12-15T18:45:20.000Z",
    status: 1,
    quantity: 6,
  },
];

const VoucherTable = () => {
  const [voucher, setVoucher] = useState(false);
  const [isAddVoucher, setIdAddVoucher] = useState(false);

  useBlockScroll(voucher);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
                placeholder="Tìm mã giảm giá theo tên . . . "
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div>
        <button
          className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
          type="submit"
          onClick={() => {
            setIdAddVoucher(true);
          }}
        >
          Thêm phiếu giảm giá
        </button>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Mã phiếu giảm giá
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Tên</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phần trăm
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="flex items-center justify-center gap-[10px] text-sm font-medium uppercase xsm:text-base">
              Ngày tạo
              <span className="rotate-180">
                <AngleDown />
              </span>
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Số lượng
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Trạng thái
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Hành động
            </h5>
          </div>
        </div>

        {vouchers.map((voucher, key) => (
          <div
            className={`grid grid-cols-7 ${
              key === vouchers.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <Link href="#" className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {voucher.id}
              </p>
            </Link>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{voucher.code}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{voucher.percent}%</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {convertDate(voucher.date_created)}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{voucher.quantity}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-5">
                {voucher.status === 1 ? (
                  <span className="text-green-500">Còn hiệu lực </span>
                ) : (
                  <span className="text-red-500">Đã xóa</span>
                )}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">
                <button
                  className="rounded bg-boxdark px-4 py-2 text-blue-700 hover:bg-gray-700 focus:outline-none"
                  onClick={() => {
                    setVoucher(true);
                  }}
                >
                  Xem
                </button>

                {voucher.status === 1 && (
                  <button className="rounded bg-boxdark px-4 py-2 text-red-700 hover:bg-gray-700 focus:outline-none">
                    Xóa
                  </button>
                )}
              </p>
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

export default VoucherTable;
