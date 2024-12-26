import AddOrder from "@/app/orders/components/add-order";
import OrderDetail from "@/app/orders/components/order-detail";
import cn from "@/utils/style/cn";
import { ChangeEvent, useMemo, useState } from "react";
import AngleDown from "../angle-down";
import useOrder from "@/hooks/order/useOrder";
import useBlockScroll from "@/hooks/use-block-scroll";
import { useDebounce } from "@/hooks/use-debounce";
import TableSkeleton from "./table-skeleton";
import Pagination from "../pagination";
import {
  OrderStatus,
  OrderStatusLabel,
  OrderStatusType,
} from "@/constants/order-status";
import { OrderResponseType } from "@/types/order";
import Order from "@/app/orders/components/order";

const OrderTable = () => {
  const [orderDetailData, setOrderDetailData] =
    useState<OrderResponseType | null>(null);
  const [isAddOrder, setIsAddOrder] = useState(false);

  function handleCloseOrderDetail() {
    setOrderDetailData(null);
  }

  function handleCloseAddOrder() {
    setIsAddOrder(false);
  }

  useBlockScroll(orderDetailData !== null);

  const [sortBy, setSortBy] = useState<"furthest" | "latest" | "">("");
  const [search, setSearch] = useState("");
  const [paging, setPaging] = useState(1);
  const [status, setStatus] = useState<OrderStatusType>(OrderStatus.ALL);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearch = useDebounce(search);

  const {
    orders,
    totalPages: total,
    isLoading,
    isError,
    refresh,
  } = useOrder({
    search: debouncedSearch,
    paging: paging,
    limit: 10,
    sortBy: sortBy,
    status: status,
  });

  function handlePagingFilter(pagingCurrent: number) {
    setPaging(pagingCurrent);
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = parseInt(e.target.value, 10);
    setStatus(newStatus as OrderStatusType);
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

  if (orders)
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
                  placeholder="Nhập mã người dùng để tìm đơn hàng . . ."
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
                {Object.entries(OrderStatus).map(([, statusValue]) => (
                  <option key={statusValue} value={statusValue}>
                    {OrderStatusLabel[statusValue]}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              type="submit"
              onClick={() => {
                setIsAddOrder(true);
              }}
            >
              Thêm đơn hàng
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-7 rounded-sm bg-gray-2 sm:grid-cols-7 dark:bg-meta-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Mã đơn hàng
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Mã người dùng
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tên người dùng
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5
                className="flex cursor-pointer items-center justify-center gap-[10px] text-sm font-medium uppercase xsm:text-base"
                onClick={handleSort}
              >
                Thời gian
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
                Số tiền
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

          {orders.map((order, key) => (
            <div key={key}>
              <Order order={order} setOrderDetailData={setOrderDetailData} />
            </div>
          ))}
        </div>
        <Pagination
          paging={paging}
          totalPages={totalPages}
          handlePagingFilter={handlePagingFilter}
        />

        {orderDetailData && (
          <>
            <OrderDetail
              order={orderDetailData}
              handleCloseOrderDetail={handleCloseOrderDetail}
              refresh={refresh}
            />
            <div
              className={cn(
                "fixed inset-0 z-[105] h-[100vh] w-[100vw] bg-overlay_color transition-opacity",
                {
                  "block opacity-100": orderDetailData,
                  "hidden opacity-0": !orderDetailData,
                },
              )}
            />
          </>
        )}

        {isAddOrder && (
          <>
            <AddOrder handleCloseAddOrder={handleCloseAddOrder} />
            <div
              className={cn(
                "fixed inset-0 z-[105] h-[100vh] w-[100vw] bg-overlay_color transition-opacity",
                {
                  "block opacity-100": isAddOrder,
                  "hidden opacity-0": !isAddOrder,
                },
              )}
            />
          </>
        )}
      </div>
    );
};

export default OrderTable;
