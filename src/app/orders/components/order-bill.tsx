import React from "react";
import { AddOrderFormType } from "./add-order";

type props = {
  orderData: AddOrderFormType;
  handleCloseAddOrder: () => void;
  mutate: (param?: { data: FormData } | undefined) => Promise<void>;
};

export default function OrderBill({
  orderData,
  handleCloseAddOrder,
  mutate,
}: props) {
  const {
    name,
    email,
    province,
    district,
    ward,
    street,
    telephoneNumber,
    variationsProduct,
    note,
  } = orderData;

  // Tính tổng tiền (không có tổng phụ nữa)
  const total = variationsProduct.reduce(
    (total, product) =>
      total + parseFloat(product.price) * parseInt(product.quantity),
    0,
  );

  async function handleConfirm() {
    const productList = JSON.stringify(
      orderData.variationsProduct.map((productOption) => ({
        product_variant_id: productOption.productVariantId,
        category: productOption.category,
        quantity: Number(productOption.quantity),
      })),
    );

    const newOrder = new FormData();
    newOrder.append("name", orderData.name);
    newOrder.append("telephone_number", orderData.telephoneNumber);
    newOrder.append("email", orderData.email);
    newOrder.append("province", orderData.province);
    newOrder.append("district", orderData.district);
    newOrder.append("ward", orderData.ward);
    newOrder.append("street", orderData.street);
    newOrder.append("note", orderData.note ?? "");
    newOrder.append("product", productList);

    await mutate({ data: newOrder });
  }

  return (
    <div className="z-[130] mx-auto rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h1 className="mb-4 text-xl font-bold">Hóa đơn mua hàng</h1>

      {/* Thông tin khách hàng */}
      <div className="mb-4">
        <h2 className="font-semibold">Thông tin khách hàng:</h2>
        <p>
          <strong>Tên:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {telephoneNumber}
        </p>
      </div>

      {/* Thông tin địa chỉ */}
      <div className="mb-4">
        <h2 className="font-semibold">Thông tin địa chỉ:</h2>
        <p>
          <strong>Địa chỉ:</strong>{" "}
          {`${street}, ${ward}, ${district}, ${province}`}
        </p>
        <p>
          <strong>Ghi chú:</strong> {note || "Không có ghi chú"}
        </p>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="mb-4">
        <h2 className="font-semibold">Danh sách sản phẩm:</h2>
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-boxdark">
              <th className="border border-gray-300 px-2 py-1">Tên sản phẩm</th>
              <th className="border border-gray-300 px-2 py-1">Loại</th>
              <th className="border border-gray-300 px-2 py-1">Số lượng</th>
              <th className="border border-gray-300 px-2 py-1">Đơn giá</th>
              <th className="border border-gray-300 px-2 py-1">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {variationsProduct.map((product, index) => {
              const productDetails = product.product.split(", "); // Tách chuỗi `product`
              const productName = productDetails[1]; // Lấy tên sản phẩm từ chuỗi
              const productPrice = parseFloat(product.price); // Chuyển giá sang kiểu số

              return (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1">
                    {productName}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {product.category}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {product.quantity}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {productPrice.toLocaleString()} VND
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {(
                      productPrice * parseInt(product.quantity)
                    ).toLocaleString()}{" "}
                    VND
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mb-4 text-right">
        <p>
          <strong>Tổng tiền:</strong> {total.toLocaleString()} VND
        </p>
      </div>

      {/* Nhắc nhở nhận tiền */}
      <div className="mb-4 text-right text-sm text-red-500">
        <p>
          <strong>Lưu ý:</strong> Vui lòng nhận tiền trước khi xác nhận đơn
          hàng.
        </p>
      </div>

      {/* Các nút xác nhận */}
      <div className="flex justify-between">
        <button
          className="rounded border border-stroke bg-red-500 px-6 py-2 font-medium text-white hover:shadow-1 dark:border-strokedark"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleCloseAddOrder();
          }}
        >
          Hủy đơn hàng
        </button>
        <button
          className="rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
        >
          Xác nhận tạo đơn hàng
        </button>
      </div>
    </div>
  );
}
