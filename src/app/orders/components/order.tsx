import {
  OrderStatus,
  OrderStatusLabel,
  OrderStatusType,
} from "@/constants/order-status";
import useMutation from "@/hooks/use-mutation";
import { updateOrderStatus } from "@/services/api/order-api";
import useRole from "@/store/useRole";
import { OrderResponseType } from "@/types/order";
import CheckRole from "@/utils/checkRole";
import convertDate from "@/utils/convert-date";
import { toastError, toastSuccess } from "@/utils/toast";
import Link from "next/link";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

type props = {
  order: OrderResponseType;
  setOrderDetailData: (order: OrderResponseType) => void;
};

export default function Order({ order, setOrderDetailData }: props) {
  const [status, setStatus] = useState<OrderStatusType>(
    order.status as OrderStatusType,
  );

  const { idRole } = useRole(
    useShallow((state) => ({
      idRole: state.idRole,
    })),
  );

  const { mutate } = useMutation({
    fetcher: updateOrderStatus,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã cập nhật tình đơn hàng ");
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const handleOrderStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (order.status !== OrderStatus.CANCELLED) {
      const newStatus = parseInt(e.target.value, 10);
      setStatus(newStatus as OrderStatusType);
      if (order.status !== newStatus) {
        const data = {
          id: order.id,
          status: newStatus,
        };
        mutate({ data });
      }
    }
  };

  return (
    <div
      className={`grid grid-cols-7 border-b border-stroke sm:grid-cols-7 dark:border-strokedark`}
    >
      <Link href="#" className="flex items-center gap-3 p-2.5 xl:p-5">
        <p className="hidden text-black sm:block dark:text-white">{order.id}</p>
      </Link>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{order.userId}</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3">{order.name}</p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white">
          {convertDate(order.dateCreated)}
        </p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-meta-5">{order.totalPrice}đ</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <select
          className="block w-full rounded-sm bg-gray-200 p-2.5 text-black dark:bg-gray-700 dark:text-white"
          defaultValue={status}
          onChange={handleOrderStatusChange}
          disabled={status === OrderStatus.CANCELLED && !CheckRole(idRole)}
        >
          {Object.entries(OrderStatus).map(([, statusValue]) => {
            if (statusValue !== 7)
              if (CheckRole(idRole)) {
                return (
                  <option key={statusValue} value={statusValue}>
                    {OrderStatusLabel[statusValue]}
                  </option>
                );
              } else {
                if (statusValue <= order.status) {
                  if (order.status === OrderStatus.CANCELLED) {
                    return (
                      <option key={statusValue} value={statusValue}>
                        {OrderStatusLabel[statusValue]}
                      </option>
                    );
                  } else {
                    if (statusValue !== OrderStatus.CANCELLED) {
                      return (
                        <option key={statusValue} value={statusValue}>
                          {OrderStatusLabel[statusValue]}
                        </option>
                      );
                    }
                  }
                }
              }
          })}
        </select>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <button
          className="rounded bg-boxdark px-4 py-2 text-blue-700 hover:bg-gray-700 focus:outline-none"
          onClick={() => {
            setOrderDetailData(order);
          }}
        >
          Xem
        </button>
      </div>
    </div>
  );
}
