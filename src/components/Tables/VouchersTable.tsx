import cn from "@/utils/style/cn";
import { ChangeEvent, useMemo, useState } from "react";
import AngleDown from "../angle-down";
import useBlockScroll from "@/hooks/use-block-scroll";
import { useDebounce } from "@/hooks/use-debounce";
import TableSkeleton from "./table-skeleton";
import Pagination from "../pagination";
import useVouchers from "@/hooks/voucher/use-vouchers";
import { VoucherType } from "@/types/voucher";
import Link from "next/link";
import { convertDateFull } from "@/utils/convert-date";
import {
  VoucherStatus,
  VoucherStatusLabel,
  VoucherStatusType,
} from "@/constants/voucher-status";
import AddVoucher from "@/app/vouchers/components/add-voucher";
import VoucherDetail from "@/app/vouchers/components/voucher-detail";
import CheckRole from "@/utils/checkRole";
import useRole from "@/store/useRole";
import { useShallow } from "zustand/shallow";
import { toastError, toastSuccess } from "@/utils/toast";
import { deleteVoucher } from "@/services/api/voucher-api";
import useMutation from "@/hooks/use-mutation";

const OrderTable = () => {
  const [voucherDetailData, setVoucherDetailData] =
    useState<VoucherType | null>(null);
  const [isAddVoucher, setIsAddVoucher] = useState(false);
  const [sortBy, setSortBy] = useState<"furthest" | "latest" | "">("");
  const [search, setSearch] = useState("");
  const [paging, setPaging] = useState(1);
  const [status, setStatus] = useState<VoucherStatusType>(VoucherStatus.ALL);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearch = useDebounce(search);

  useBlockScroll(voucherDetailData !== null);

  function handleCloseVoucherDetail() {
    setVoucherDetailData(null);
  }

  function handleCloseAddVoucher() {
    setIsAddVoucher(false);
  }

  const {
    vouchers,
    totalPages: total,
    isLoading,
    isError,
    refresh,
  } = useVouchers({
    search: debouncedSearch,
    paging: paging,
    limit: 10,
    sortBy: sortBy,
    status: status,
  });

  const { idRole } = useRole(
    useShallow((state) => ({
      idRole: state.idRole,
    })),
  );

  const { mutate } = useMutation({
    fetcher: deleteVoucher,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã xóa mã giảm giá");
        handleCloseVoucherDetail();
        refresh();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  function handleDeleteVoucher(id: string) {
    const data = {
      id: id,
    };
    if (CheckRole(idRole)) mutate({ data });
    else toastError("Bạn không được phép thực hiện chức năng này");
  }

  function handlePagingFilter(pagingCurrent: number) {
    setPaging(pagingCurrent);
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = parseInt(e.target.value, 10);
    setStatus(newStatus as VoucherStatusType);
    setPaging(1);
    refresh();
  };

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPaging(1);
  }

  function handleSort() {
    if (sortBy === "" || sortBy === "latest") setSortBy("furthest");
    else setSortBy("latest");
  }

  useMemo(() => {
    if (total) {
      setTotalPages(total);
    }
  }, [total]);

  if (isError) window.location.href = "/error";

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (vouchers)
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
                  value={search}
                  placeholder="Nhập tên mã để tìm mã giảm giá. . ."
                  className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                  onChange={handleSearch}
                />
              </div>
            </form>
          </div>

          <div className="flex gap-[10px]">
            <div>
              <select
                className="block w-full rounded-sm bg-gray-200 p-2.5 text-black dark:bg-gray-700 dark:text-white"
                defaultValue={status}
                onChange={handleStatusChange}
              >
                {Object.entries(VoucherStatus).map(([, statusValue]) => {
                  if (statusValue !== VoucherStatus.AVAILABLE) {
                    return (
                      <option key={statusValue} value={statusValue}>
                        {VoucherStatusLabel[statusValue]}
                      </option>
                    );
                  }
                })}
              </select>
            </div>

            {CheckRole(idRole) && (
              <button
                className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type="submit"
                onClick={() => {
                  setIsAddVoucher(true);
                }}
              >
                Thêm mã giảm giá
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-7 rounded-sm bg-gray-2 sm:grid-cols-7 dark:bg-meta-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Mã phiếu giảm giá
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tên
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Phần trăm
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5
                className="flex cursor-pointer items-center justify-center gap-[10px] text-sm font-medium uppercase xsm:text-base"
                onClick={handleSort}
              >
                Ngày tạo
                {sortBy === "" || sortBy === "furthest" ? (
                  <AngleDown />
                ) : (
                  <span className="rotate-180">
                    <AngleDown />
                  </span>
                )}
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
                <p className="hidden text-black sm:block dark:text-white">
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
                  {convertDateFull(voucher.dateCreated)}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{voucher.quantity}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-5">
                  {voucher.status === VoucherStatus.AVAILABLE ? (
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
                      setVoucherDetailData(voucher);
                    }}
                  >
                    Xem
                  </button>
                  {CheckRole(idRole) && (
                    <>
                      {voucher.status === 1 && (
                        <button
                          className="rounded bg-boxdark px-4 py-2 text-red-700 hover:bg-gray-700 focus:outline-none"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteVoucher(voucher.id);
                          }}
                        >
                          Xóa
                        </button>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          paging={paging}
          totalPages={totalPages}
          handlePagingFilter={handlePagingFilter}
        />

        {voucherDetailData && (
          <>
            <VoucherDetail
              voucher={voucherDetailData}
              handleCloseVoucherDetail={handleCloseVoucherDetail}
              refresh={refresh}
            />
            <div
              className={cn(
                "fixed inset-0 z-[105] h-[100vh] w-[100vw] bg-overlay_color transition-opacity",
                {
                  "block opacity-100": voucherDetailData,
                  "hidden opacity-0": !voucherDetailData,
                },
              )}
            />
          </>
        )}

        {isAddVoucher && (
          <>
            <AddVoucher
              handleCloseAddVoucher={handleCloseAddVoucher}
              refresh={refresh}
            />
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

export default OrderTable;
