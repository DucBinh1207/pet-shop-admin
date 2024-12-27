import FormInput from "@/components/form-input";
import { OrderResponseType, OrderType } from "@/types/order";
import convertDate from "@/utils/convert-date";
import OrderItem from "./order-item";
import useRole from "@/store/useRole";
import { useShallow } from "zustand/shallow";
import { updateOrderStatus } from "@/services/api/order-api";
import useMutation from "@/hooks/use-mutation";
import { toastError, toastSuccess } from "@/utils/toast";
import {
  OrderStatus,
  OrderStatusLabel,
  OrderStatusType,
} from "@/constants/order-status";
import CheckRole from "@/utils/checkRole";
import { useState } from "react";

type props = {
  order: OrderType;
  orderData: OrderResponseType;
  handleCloseOrderDetail: () => void;
  refresh: () => void;
  refreshDetail: () => void;
};
export default function OrderForm({
  order,
  orderData,
  handleCloseOrderDetail,
  refresh,
  refreshDetail,
}: props) {
  const address = order.street
    ? order.street +
      "," +
      order.ward +
      "," +
      order.district +
      "," +
      order.province
    : order.ward + "," + order.district + "," + order.province;

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
        refreshDetail();
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
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Thông tin chi tiết
        </h3>
        <div className="flex justify-end gap-4.5">
          <div className="flex items-center justify-center">
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
                      return (
                        <option key={statusValue} value={statusValue}>
                          {OrderStatusLabel[statusValue]}
                        </option>
                      );
                    }
                  }
              })}
            </select>
          </div>
          <button
            className="flex justify-center rounded border border-stroke bg-blue-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              refresh();
              handleCloseOrderDetail();
            }}
          >
            Thoát
          </button>
        </div>
      </div>
      <div className="p-7">
        <form action="#">
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <FormInput
                disabled
                label="Mã đơn hàng"
                id="name"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập tên sản phẩm"
                value={order.id}
              />
            </div>

            <div className="w-full sm:w-1/2">
              <FormInput
                disabled
                label="Mã người dùng ( người sở hữu tài khoản đã đặt hàng )"
                id="name"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập tên sản phẩm"
                value={orderData.userId}
              />
            </div>
          </div>

          <div className="mb-5.5">
            <FormInput
              disabled
              label="Tên người dùng"
              id="name"
              type="text"
              variant="secondary"
              className="w-full"
              placeholder="Nhập tên sản phẩm"
              value={orderData.name}
            />
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <FormInput
                disabled
                label="Tổng phụ"
                id="name"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập tên sản phẩm"
                value={order.subtotalPrice}
              />
            </div>

            <div className="w-full sm:w-1/2">
              <FormInput
                disabled
                label="Phí ship"
                id="name"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập tên sản phẩm"
                value={order.shippingPrice}
              />
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <FormInput
                disabled
                label="Giảm giá"
                id="name"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập tên sản phẩm"
                value={
                  Number(order.totalPrice) -
                  Number(order.shippingPrice) -
                  Number(order.subtotalPrice)
                }
              />
            </div>

            <div className="w-full sm:w-1/2">
              <FormInput
                disabled
                label="Tổng tiền"
                id="name"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập tên sản phẩm"
                value={order.totalPrice}
              />
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <FormInput
                disabled
                label="Ngày tạo đơn"
                id="name"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập tên sản phẩm"
                value={convertDate(order.dateCreated)}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <FormInput
                disabled
                label="Phương thức thanh toán"
                id="name"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập tên sản phẩm"
                value={order.paymentMethod}
              />
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/3">
              <FormInput
                disabled
                label="Họ và tên người nhận hàng"
                id="name"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập tên sản phẩm"
                value={order.name}
              />
            </div>

            <div className="w-full sm:w-1/3">
              <FormInput
                disabled
                label="Số điện thoại"
                id="name"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập tên sản phẩm"
                value={order.telephoneNumber}
              />
            </div>
            <div className="w-full sm:w-1/3">
              <FormInput
                disabled
                label="Email"
                id="name"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập tên sản phẩm"
                value={order.email}
              />
            </div>
          </div>

          <div className="mb-5.5">
            <FormInput
              disabled
              label="Địa chỉ"
              id="name"
              type="text"
              variant="secondary"
              className="w-full"
              placeholder="Nhập tên sản phẩm"
              value={address}
            />
          </div>

          <div className="mb-5.5">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="Username"
            >
              Ghi chú
            </label>
            <div className="relative">
              <textarea
                disabled
                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                name="bio"
                id="bio"
                rows={6}
                placeholder="Nhập mô tả"
                value={order.note}
              ></textarea>
            </div>
          </div>

          {order.orderItems.map((orderItem, index) => (
            <OrderItem orderItem={orderItem} index={index} key={index} />
          ))}
        </form>
      </div>
    </div>
  );
}
