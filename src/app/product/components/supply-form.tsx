import { z } from "zod";
import { useState } from "react";
import FormInput from "@/components/form-input";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  deleteProduct,
  unDeleteProduct,
  updateSupply,
} from "@/services/api/products-api";
import useMutation from "@/hooks/use-mutation";
import { toastError, toastSuccess } from "@/utils/toast";

import { useShallow } from "zustand/shallow";
import useRole from "@/store/useRole";
import CheckRole from "@/utils/checkRole";
import { ProductToDeleteType } from "../shared/type/productToDelete";
import { SupplyType } from "@/types/supply";
import {
  SuppliesCategoryType,
  SuppliesCategoryTypes,
} from "@/constants/supplies-category-type";

const schema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  description: z.string().min(1, "Vui lòng nhập mô tả"),
  material: z.string().min(1, "Vui lòng nhập nguyên liệu"),
  brand: z.string().min(1, "Vui lòng nhập thương hiệu"),
  variationsSupply: z
    .array(
      z.object({
        productVariantId: z.string().min(1, "Yêu cầu"),
        color: z.string().min(1, "Vui lòng nhập màu"),
        size: z.string().min(1, "Vui lòng nhập kích thước"),
        quantity: z
          .string()
          .regex(/^\d+$/, {
            message: "Vui lòng nhập số lượng hợp lệ",
          })
          .refine((val) => parseInt(val, 10) >= 1, {
            message: "Số lượng phải hơn 1",
          }),

        price: z
          .string()
          .regex(/^\d+(\.\d{1,2})?$/, {
            message: "Vui lòng nhập giá hợp lệ",
          })
          .refine((val) => parseFloat(val) >= 0, {
            message: "Giá phải lớn hơn hoặc bằng 0",
          }),
      }),
    )
    .min(1, "Cần ít nhất 1 lựa chọn"),
});
type UpdateSupplyFormType = z.infer<typeof schema>;

type props = {
  supply: SupplyType;
  handleCloseSupplyDetail: () => void;
  refresh: () => void;
  refreshDetail: () => void;
};

export default function SupplyForm({
  supply,
  handleCloseSupplyDetail,
  refresh,
  refreshDetail,
}: props) {
  const { idRole } = useRole(
    useShallow((state) => ({
      idRole: state.idRole,
    })),
  );

  const [category, setCategory] = useState<SuppliesCategoryTypes>(
    supply.type as SuppliesCategoryTypes,
  );
  const isDisabled = !CheckRole(idRole) || supply.status === 0;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateSupplyFormType>({
    defaultValues: {
      name: supply?.name,
      description: supply?.description,
      material: supply.material,
      brand: supply.brand,
      variationsSupply: supply.variationsSupplies.map((item) => ({
        productVariantId: item.productVariantId,
        color: item.color,
        size: item.size,
        price: item.price.toString(),
        quantity: item.quantity.toString(),
      })),
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variationsSupply",
  });

  const { mutate } = useMutation({
    fetcher: updateSupply,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã cập nhật đồ dùng");
        refresh();
        refreshDetail();
        handleCloseSupplyDetail();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as SuppliesCategoryTypes);
  };

  const onSubmit = handleSubmit(async (data: UpdateSupplyFormType) => {
    const supplies = JSON.stringify(
      data.variationsSupply.map((supplyOption) => ({
        product_variant_id: supplyOption.productVariantId,
        color: supplyOption.color,
        size: supplyOption.size,
        price: supplyOption.price.toString(),
        quantity: supplyOption.quantity.toString(),
      })),
    );

    const updateData = new FormData();
    updateData.append("nameTag", "supplies");
    updateData.append("_id", supply.id);
    updateData.append("name", data.name);
    updateData.append("description", data.description);
    updateData.append("material", data.material);
    updateData.append("brand", data.brand);
    updateData.append("type", category);
    updateData.append("variations_supplies", supplies);

    await mutate({ data: updateData });
  });

  const { mutate: mutateDelete } = useMutation({
    fetcher: deleteProduct,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã xóa sản phẩm");
        refresh();
        refreshDetail();
        handleCloseSupplyDetail();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  function handleDeleteProduct(id: string) {
    const data: ProductToDeleteType = {
      idProduct: id,
      category: "supplies",
    };
    if (CheckRole(idRole)) mutateDelete({ data });
    else toastError("Bạn không được phép thực hiện chức năng này");
  }

  const { mutate: mutateUnDelete } = useMutation({
    fetcher: unDeleteProduct,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã gỡ xóa sản phẩm");
        refresh();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  function handleUnDeleteProduct(id: string) {
    const data: ProductToDeleteType = {
      idProduct: id,
      category: "supplies",
    };
    if (CheckRole(idRole)) mutateUnDelete({ data });
    else toastError("Bạn không được phép thực hiện chức năng này");
  }

  return (
    <form
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      onSubmit={onSubmit}
    >
      <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Thông tin chi tiết
        </h3>
        <div className="flex justify-end gap-4.5">
          {!isDisabled && (
            <>
              <button
                className="flex justify-center rounded bg-red-500 px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteProduct(supply.id);
                }}
              >
                Xóa sản phẩm
              </button>

              <button className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
                Cập nhật
              </button>
            </>
          )}

          {CheckRole(idRole) && supply.status === 0 && (
            <button
              className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              onClick={(e) => {
                e.preventDefault();
                handleUnDeleteProduct(supply.id);
              }}
            >
              Gỡ xóa
            </button>
          )}

          <button
            className="flex justify-center rounded border border-stroke bg-blue-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            onClick={(e) => {
              e.preventDefault();
              handleCloseSupplyDetail();
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
              disabled
              label="Id"
              id="id"
              type="text"
              variant="secondary"
              className="w-full"
              value={supply.id}
            />
          </div>

          <div className="mb-5.5">
            <FormInput
              disabled={isDisabled}
              label="Tên sản phẩm"
              id="name"
              type="text"
              variant="secondary"
              className="w-full"
              placeholder="Nhập tên sản phẩm"
              {...register("name")}
              error={errors.name?.message}
            />
          </div>

          <div className="mb-5.5">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="Username"
            >
              Mô tả
            </label>
            <div className="relative">
              <textarea
                disabled={isDisabled}
                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                id="bio"
                rows={6}
                placeholder="Nhập mô tả"
                {...register("description")}
              ></textarea>
              {errors.name?.message && (
                <span className="ml-[5px] mt-[5px] text-[13px] leading-[18px] text-red-500">
                  {errors.name?.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <FormInput
                disabled={isDisabled}
                label="Nguyên liệu"
                id="name"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập nguyên liệu"
                {...register("material")}
                error={errors.material?.message}
              />
            </div>

            <div className="w-full sm:w-1/2">
              <FormInput
                disabled={isDisabled}
                label="Thương hiệu"
                id="name"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập thương hiệu"
                {...register("brand")}
                error={errors.brand?.message}
              />
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="phoneNumber"
              >
                Loại đồ dùng
              </label>
              <select
                disabled={isDisabled}
                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                value={category}
                onChange={handleCategoryChange}
              >
                {Object.entries(SuppliesCategoryType).map(
                  ([, categoryType]) => (
                    <option key={categoryType} value={categoryType}>
                      {categoryType}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              style={{ marginBottom: "20px" }}
              className="border border-solid border-meta-9 p-[10px]"
            >
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <Controller
                    name={`variationsSupply.${index}.size` as const}
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        disabled={isDisabled}
                        label="Kích cỡ"
                        id="size"
                        type="text"
                        variant="secondary"
                        className="w-full"
                        placeholder="Nhập kích cỡ"
                        {...field}
                        error={errors.variationsSupply?.[index]?.size?.message}
                      />
                    )}
                  />
                </div>

                <div className="w-full sm:w-1/2">
                  <Controller
                    name={`variationsSupply.${index}.color` as const}
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        disabled={isDisabled}
                        label="Màu sắc"
                        id="color"
                        type="text"
                        variant="secondary"
                        className="w-full"
                        placeholder="Nhập màu sắc"
                        {...field}
                        error={errors.variationsSupply?.[index]?.color?.message}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <Controller
                    name={`variationsSupply.${index}.quantity` as const}
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        disabled={isDisabled}
                        label="Số lượng"
                        id="quantity"
                        type="text"
                        variant="secondary"
                        className="w-full"
                        placeholder="Nhập số lượng"
                        {...field}
                        error={
                          errors.variationsSupply?.[index]?.quantity?.message
                        }
                      />
                    )}
                  />
                </div>

                <div className="w-full sm:w-1/2">
                  <Controller
                    name={`variationsSupply.${index}.price` as const}
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        disabled={isDisabled}
                        label="Giá"
                        id="price"
                        type="text"
                        variant="secondary"
                        className="w-full"
                        placeholder="Nhập giá"
                        {...field}
                        error={errors.variationsSupply?.[index]?.price?.message}
                      />
                    )}
                  />
                </div>
              </div>
              {!isDisabled && (
                <button
                  type="button"
                  className="text-meta-1"
                  onClick={() => remove(index)}
                >
                  Xóa lựa chọn
                </button>
              )}
            </div>
          ))}

          {!isDisabled && (
            <button
              type="button"
              className="text-meta-3"
              onClick={() =>
                append({
                  productVariantId: "0",
                  color: "",
                  size: "",
                  quantity: "1",
                  price: "0",
                })
              }
              style={{ marginTop: "10px", marginRight: "10px" }}
            >
              Thêm lựa chọn
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
