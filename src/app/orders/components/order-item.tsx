import FormInput from "@/components/form-input";
import { OrderItemType } from "@/types/order";
import { ConvertProductCategory } from "@/utils/convert-product-category";

type props = {
  orderItem: OrderItemType;
  index: number;
};

export default function OrderItem({ orderItem, index }: props) {
  return (
    <>
      <h5 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Sản phẩm thứ {index + 1}
      </h5>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <FormInput
            disabled
            label="Mã sản phẩm"
            id="name"
            type="text"
            variant="secondary"
            className="w-full"
            placeholder="Nhập tên sản phẩm"
            value={orderItem.idProduct}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <FormInput
            disabled
            label="Mã biến thể sản phẩm"
            id="name"
            type="text"
            variant="secondary"
            className="w-full"
            placeholder="Nhập tên sản phẩm"
            value={orderItem.id}
          />
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <FormInput
            disabled
            label="Tên sản phẩm"
            id="name"
            type="text"
            variant="secondary"
            className="w-full"
            placeholder="Nhập tên sản phẩm"
            value={orderItem.name}
          />
        </div>

        <div className="w-full sm:w-1/2">
          <FormInput
            disabled
            label="Loại sản phẩm"
            id="name"
            type="text"
            variant="secondary"
            className="w-full"
            placeholder="Nhập tên sản phẩm"
            value={ConvertProductCategory(orderItem.category)}
          />
        </div>
      </div>

      <div className="mb-5.5">
        <FormInput
          disabled
          label="Ảnh"
          id="name"
          type="text"
          variant="secondary"
          className="w-full"
          placeholder="Nhập tên sản phẩm"
          value={orderItem.image}
        />
      </div>

      {orderItem.ingredient && orderItem.weight && (
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <FormInput
              disabled
              label="Nguyên liệu"
              id="name"
              type="text"
              variant="secondary"
              className="w-full"
              value={orderItem.ingredient}
            />
          </div>

          <div className="w-full sm:w-1/2">
            <FormInput
              disabled
              label="Cân nặng"
              id="name"
              type="text"
              variant="secondary"
              className="w-full"
              value={orderItem.weight}
            />
          </div>
        </div>
      )}

      {orderItem.size && orderItem.color && (
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <FormInput
              disabled
              label="Kích cỡ"
              id="name"
              type="text"
              variant="secondary"
              className="w-full"
              value={orderItem.size}
            />
          </div>

          <div className="w-full sm:w-1/2">
            <FormInput
              disabled
              label="Màu sắc"
              id="name"
              type="text"
              variant="secondary"
              className="w-full"
              value={orderItem.color}
            />
          </div>
        </div>
      )}

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <FormInput
            disabled
            label="Số lượng đã mua"
            id="name"
            type="text"
            variant="secondary"
            className="w-full"
            placeholder="Nhập tên sản phẩm"
            value={orderItem.quantity}
          />
        </div>

        <div className="w-full sm:w-1/2">
          <FormInput
            disabled
            label="Giá"
            id="name"
            type="text"
            variant="secondary"
            className="w-full"
            placeholder="Nhập tên sản phẩm"
            value={orderItem.price}
          />
        </div>
      </div>
    </>
  );
}
