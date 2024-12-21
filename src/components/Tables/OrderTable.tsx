import AddOrder from "@/app/orders/components/add-order";
import OrderDetail from "@/app/orders/components/order-detail";
import convertDate from "@/utils/convert-date";
import cn from "@/utils/style/cn";
import Link from "next/link";
import { useState } from "react";
import AngleDown from "../angle-down";

const orderData = [
  {
    id: "1732118423575",
    userId: "6714c82cf3bf1db1af243732",
    name: "Nguyễn Văn B",
    total_price: "250000",
    date_created: "2024-11-20T16:00:23.575Z",
    status: 5,
  },
  {
    id: "1732118423576",
    userId: "7812c93df4bf2ea1bf354843",
    name: "Trần Thị A",
    total_price: "120000",
    date_created: "2024-11-21T08:30:15.123Z",
    status: 3,
  },
  {
    id: "1732118423577",
    userId: "8913d04eg5cf3fb2cg465954",
    name: "Lê Văn C",
    total_price: "780000",
    date_created: "2024-11-22T12:45:09.789Z",
    status: 4,
  },
  {
    id: "1732118423578",
    userId: "9014e15fh6df4gc3dh576065",
    name: "Phạm Văn D",
    total_price: "320000",
    date_created: "2024-11-23T14:20:45.456Z",
    status: 2,
  },
  {
    id: "1732118423579",
    userId: "0115f26gi7ef5hd4ei687176",
    name: "Hoàng Thị E",
    total_price: "450000",
    date_created: "2024-11-24T10:15:30.678Z",
    status: 1,
  },
  {
    id: "1732118423580",
    userId: "1216g37hj8gf6ie5fj798287",
    name: "Nguyễn Văn F",
    total_price: "630000",
    date_created: "2024-11-25T09:00:00.000Z",
    status: 4,
  },
  {
    id: "1732118423581",
    userId: "2317h48ik9hf7jf6gk809398",
    name: "Đặng Thị G",
    total_price: "910000",
    date_created: "2024-11-26T13:50:15.456Z",
    status: 5,
  },
  {
    id: "1732118423582",
    userId: "3418i59jl0if8kg7hl910409",
    name: "Lý Văn H",
    total_price: "720000",
    date_created: "2024-11-27T11:30:25.678Z",
    status: 3,
  },
  {
    id: "1732118423583",
    userId: "4519j60km1jg9lh8im021510",
    name: "Phan Thị I",
    total_price: "850000",
    date_created: "2024-11-28T15:45:40.789Z",
    status: 2,
  },
  {
    id: "1732118423584",
    userId: "5620k71ln2kh0mi9jn132621",
    name: "Trương Văn J",
    total_price: "670000",
    date_created: "2024-11-29T16:10:50.123Z",
    status: 1,
  },
];

const OrderTable = () => {
  const [orderDetailData, setOrderDetailData] = useState("");
  const [isAddOrder, setIsAddOrder] = useState(false);

  const statusLabels: { [key: number]: string } = {
    0: "Đã bị hủy",
    1: "Đã giao thành công",
    2: "Đang được giao tới bạn",
    3: "Đang được vận chuyển",
    4: "Đang được chuẩn bị",
    5: "Đã được đặt",
    6: "Tất cả",
  };

  const status = 6;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = parseInt(e.target.value, 10);
  };

  return (
    <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 rounded-sm border bg-white px-5 pb-2.5 pt-6 xl:pb-1">
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
                placeholder="Nhập mã người dùng để tìm đơn hàng . . . "
                className="xl:w-125 w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none"
              />
            </div>
          </form>
        </div>

        <div className="flex gap-[10px]">
          <div>
            <select
              className="block w-full rounded-sm bg-gray-200 p-2.5 text-black dark:bg-gray-700 dark:text-white"
              defaultValue={0}
              onChange={handleStatusChange}
            >
              {Object.entries(statusLabels).map(
                ([statusValue, statusLabel]) => (
                  <option key={statusValue} value={statusValue}>
                    {statusLabel}
                  </option>
                ),
              )}
            </select>
          </div>
          <button
            className="border-stroke hover:shadow-1 dark:border-strokedark flex justify-center rounded border bg-green-700 px-6 py-2 font-medium text-black dark:text-white"
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
        <div className="bg-gray-2 dark:bg-meta-4 grid grid-cols-7 rounded-sm sm:grid-cols-7">
          <div className="p-2.5 xl:p-5">
            <h5 className="xsm:text-base text-sm font-medium uppercase">
              Mã đơn hàng
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="xsm:text-base text-sm font-medium uppercase">
              Mã người dùng
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="xsm:text-base text-sm font-medium uppercase">
              Tên người dùng
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="xsm:text-base flex items-center justify-center gap-[10px] text-sm font-medium uppercase">
              Thời gian
              <span className="rotate-180">
                <AngleDown />
              </span>
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="xsm:text-base text-sm font-medium uppercase">
              Số tiền
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="xsm:text-base text-sm font-medium uppercase">
              Trạng thái
            </h5>
          </div>
          {/* Cột Hành động */}
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="xsm:text-base text-sm font-medium uppercase">
              Hành động
            </h5>
          </div>
        </div>

        {orderData.map((order, key) => (
          <div key={key}>
            {orderDetailData && orderDetailData === order.id && (
              <>
                <OrderDetail status={order.status} />
                <div
                  className={cn(
                    "bg-overlay_color fixed inset-0 z-[105] h-[100vh] w-[100vw] transition-opacity",
                    {
                      "block opacity-100": orderDetailData,
                      "hidden opacity-0": !orderDetailData,
                    },
                  )}
                />
              </>
            )}

            <div
              className={`grid grid-cols-7 sm:grid-cols-7 ${key === orderData.length - 1 ? "" : "border-stroke dark:border-strokedark border-b"}`}
              key={key}
            >
              <Link href="#" className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black sm:block dark:text-white">
                  {order.id}
                </p>
              </Link>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{order.userId}K</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{order.name}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                  {convertDate(order.date_created)}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{order.total_price}đ</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <select
                  className="block w-full rounded-sm bg-gray-200 p-2.5 text-black dark:bg-gray-700 dark:text-white"
                  defaultValue={order.status}
                  onChange={handleStatusChange}
                >
                  {Object.entries(statusLabels).map(
                    ([statusValue, statusLabel]) => (
                      <option key={statusValue} value={statusValue}>
                        {statusLabel}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <button
                  className="bg-boxdark rounded px-4 py-2 text-blue-700 hover:bg-gray-700 focus:outline-none"
                  onClick={() => {
                    setOrderDetailData(order.id);
                  }}
                >
                  Xem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-2 text-[18px]">
        <button className="bg-boxdark rounded px-4 py-2 text-white hover:bg-gray-700 focus:outline-none">
          Trước
        </button>
        <button className="bg-boxdark rounded px-4 py-2 text-white hover:bg-gray-700 focus:outline-none">
          Sau
        </button>
      </div>

      {isAddOrder && (
        <>
          <AddOrder />
          <div
            className={cn(
              "bg-overlay_color fixed inset-0 z-[105] h-[100vh] w-[100vw] transition-opacity",
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
