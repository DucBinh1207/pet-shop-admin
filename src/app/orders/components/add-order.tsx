import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/form-input";
import { toastError, toastSuccess } from "@/utils/toast";
import ProductField from "./product-filed";
import { createOrder } from "@/services/api/order-api";
import useMutation from "@/hooks/use-mutation";
import { useState } from "react";
import OrderBill from "./order-bill";
import cn from "@/utils/style/cn";
import AddressSection from "./address-section";
import useBlockScroll from "@/hooks/use-block-scroll";
const schema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  telephoneNumber: z
    .string()
    .min(3, "Vui lòng nhập số điện thoại với ít nhất 3 ký tự")
    .max(20, "Vui lòng nhập số điện thoại với tối đa 20 ký tự"),
  email: z.string().email("Vui lòng nhập email hợp lệ"),
  province: z.string().min(1, "Vui lòng nhập tỉnh"),
  district: z.string().min(1, "Vui lòng nhập quận/huyện"),
  ward: z.string().min(1, "Vui lòng nhập phường/xã"),
  street: z.string().min(1, "Vui lòng nhập đường"),
  note: z.string().optional(),
  variationsProduct: z
    .array(
      z.object({
        productVariantId: z.string().min(1, "Required"),
        category: z.string().min(1, "Vui lòng nhập loại sản phẩm"),
        price: z.string().min(1, "Vui lòng nhập giá"),
        product: z.string().min(1, "Vui lòng nhập sản phẩm"),
        quantity: z
          .string()
          .regex(/^\d+$/, {
            message: "Vui lòng nhập số lượng hợp lệ",
          })
          .refine((val) => parseInt(val, 10) >= 1, {
            message: "Số lượng phải hơn 1",
          }),
      }),
    )
    .min(1, "Cần ít nhất 1 sản phẩm"),
});

export type AddOrderFormType = z.infer<typeof schema>;

type props = {
  handleCloseAddOrder: () => void;
};

export default function AddOrder({ handleCloseAddOrder }: props) {
  const [orderData, SetOrderData] = useState<AddOrderFormType | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    control,
    formState: { errors },
  } = useForm<AddOrderFormType>({
    defaultValues: {
      name: "",
      telephoneNumber: "",
      email: "",
      district: "",
      province: "",
      ward: "",
      street: "",
      note: "",
      variationsProduct: [
        {
          productVariantId: "",
          price: "",
          product: "",
          category: "",
          quantity: "0",
        },
      ],
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  useBlockScroll(true);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variationsProduct",
  });

  const checkEmpty = () => {
    const allFields = getValues("variationsProduct");
    return allFields.every(
      (field) => field.category !== "" && field.productVariantId !== "",
    );
  };

  function handleAppendProduct() {
    if (checkEmpty()) {
      append({
        productVariantId: "",
        price: "",
        product: "",
        category: "",
        quantity: "0",
      });
    } else {
      toastError("Vui lòng điền đủ thông tin");
    }
  }

  const { mutate } = useMutation({
    fetcher: createOrder,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã thêm đơn hàng ");
        handleCloseAddOrder();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const onSubmit = handleSubmit(async (data: AddOrderFormType) => {
    SetOrderData(data);

    const productList = JSON.stringify(
      data.variationsProduct.map((productOption) => ({
        product_variant_id: productOption.productVariantId,
        category: productOption.category,
        quantity: Number(productOption.quantity),
      })),
    );

    const newOrder = new FormData();
    newOrder.append("name", data.name);
    newOrder.append("telephone_number", data.telephoneNumber);
    newOrder.append("email", data.email);
    newOrder.append("province", data.province);
    newOrder.append("district", data.district);
    newOrder.append("ward", data.ward);
    newOrder.append("street", data.street);
    newOrder.append("note", data.note ?? "");
    newOrder.append("product", productList);
  });

  return (
    <>
      <div className="small-screen:h-0 small-screen:pb-[56.25%] fixed left-[50%] top-[50%] z-[160] h-[90vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] p-[50px]">
        <form
          onSubmit={onSubmit}
          className="z-[150] grid h-full grid-cols-5 gap-8 overflow-hidden"
        >
          <div
            className={cn("xl:col-span-13 h-ful z-[140] col-span-5", {
              "overflow-y-scroll": !orderData,
            })}
          >
            {!orderData && (
              <div className="z-[130] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Thêm đơn hàng
                  </h3>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Xác nhận
                    </button>
                    <button
                      className="flex justify-center rounded border border-stroke bg-blue-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCloseAddOrder();
                      }}
                    >
                      Thoát
                    </button>
                  </div>
                </div>
                <div className="p-7">
                  <div>
                    <div className="mb-5.5">
                      <FormInput
                        label="Tên"
                        id="name"
                        type="text"
                        variant="secondary"
                        className="w-full"
                        placeholder="Nhập tên"
                        {...register("name")}
                        error={errors.name?.message}
                      />
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <FormInput
                          label="Số điện thoại"
                          id="telephoneNumber"
                          type="text"
                          variant="secondary"
                          className="w-full"
                          placeholder="Nhập tên"
                          {...register("telephoneNumber")}
                          error={errors.telephoneNumber?.message}
                        />
                      </div>

                      <div className="w-full sm:w-1/2">
                        <FormInput
                          label="Email"
                          id="email"
                          type="text"
                          variant="secondary"
                          className="w-full"
                          placeholder="Nhập tên"
                          {...register("email")}
                          error={errors.email?.message}
                        />
                      </div>
                    </div>

                    <AddressSection
                      setValue={setValue}
                      errors={errors}
                      trigger={trigger}
                    />

                    <div className="mb-5.5">
                      <FormInput
                        label="Đường"
                        id="ward"
                        type="text"
                        variant="secondary"
                        className="w-full"
                        placeholder="Nhập đường"
                        {...register("street")}
                        error={errors.street?.message}
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
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          rows={6}
                          placeholder="Nhập mô tả"
                          defaultValue=""
                          {...register("note")}
                        ></textarea>
                      </div>
                    </div>

                    {fields.length <= 0 && (
                      <div className="mt-4 rounded-md border border-red-300 bg-gray-800 p-4 font-semibold text-meta-1">
                        Đơn hàng cần ít nhất 1 sản phẩm
                      </div>
                    )}

                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        style={{ marginBottom: "20px" }}
                        className="border border-solid border-meta-9 p-[10px]"
                      >
                        <ProductField
                          key={field.id}
                          index={index}
                          control={control}
                          errors={errors}
                          setValue={setValue}
                          getValues={getValues}
                          remove={remove}
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      className="text-meta-3"
                      onClick={handleAppendProduct}
                      style={{ marginTop: "10px", marginRight: "10px" }}
                    >
                      Thêm sản phẩm
                    </button>
                  </div>
                </div>
              </div>
            )}

            {orderData && (
              <>
                <OrderBill
                  orderData={orderData}
                  handleCloseAddOrder={handleCloseAddOrder}
                  mutate={mutate}
                />
              </>
            )}
          </div>
        </form>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[105] block h-[100vh] w-[100vw] bg-overlay_color opacity-100 transition-opacity",
        )}
      />
    </>
  );
}
