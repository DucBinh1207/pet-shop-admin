import { z } from "zod";
import { ChangeEvent, useRef, useState } from "react";
import FormInput from "@/components/form-input";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "@/services/api/products-api";
import useMutation from "@/hooks/use-mutation";
import { toastError, toastSuccess } from "@/utils/toast";
import { useShallow } from "zustand/shallow";
import useRole from "@/store/useRole";
import CheckRole from "@/utils/checkRole";
import useBlockScroll from "@/hooks/use-block-scroll";
import cn from "@/utils/style/cn";
import Image from "next/image";
import {
  SuppliesCategoryType,
  SuppliesCategoryTypes,
} from "@/constants/supplies-category-type";
import { SizeType } from "@/constants/size-type";
import { ColorType } from "@/constants/color-type";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  material: z.string().min(1, "District is required"),
  brand: z.string().min(1, "District is required"),
  variationsSupply: z
    .array(
      z.object({
        productVariantId: z.string().min(1, "color is required"),
        color: z.string().min(1, "color is required"),
        size: z.string().min(1, "size is required"),
        quantity: z
          .string()
          .regex(/^\d+$/, {
            message: "Quantity must be a valid number",
          })
          .refine((val) => parseInt(val, 10) >= 1, {
            message: "Quantity must be greater than 0",
          }),

        price: z
          .string()
          .regex(/^\d+(\.\d{1,2})?$/, {
            message: "Price must be a valid number",
          })
          .refine((val) => parseFloat(val) >= 0, {
            message: "Price must be a positive number",
          }),
      }),
    )
    .min(1, "At least one group is required"),
});

type UpdateSupplyFormType = z.infer<typeof schema>;

type props = {
  handleCloseAddSupply: () => void;
  refresh: () => void;
};

const AddSupply = ({ handleCloseAddSupply, refresh }: props) => {
  useBlockScroll(true);

  const { idRole } = useRole(
    useShallow((state) => ({
      idRole: state.idRole,
    })),
  );
  const productImageInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [productImage, setProductImage] = useState("/images/empty.png");

  const [category, setCategory] = useState<SuppliesCategoryTypes>(
    SuppliesCategoryType.BEDDING,
  );

  const isDisabled = !CheckRole(idRole);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateSupplyFormType>({
    defaultValues: {
      name: "",
      description: "",
      material: "",
      brand: "",
      variationsSupply: [
        {
          productVariantId: "0",
          size: "",
          color: "",
          price: "1",
          quantity: "0",
        },
      ],
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variationsSupply",
  });

  const { mutate } = useMutation({
    fetcher: createProduct,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã thêm sản phẩm ");
        refresh();
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
    console.log({ data });
    const supplies = JSON.stringify(
      data.variationsSupply.map((supplyOption) => ({
        product_variant_id: supplyOption.productVariantId,
        size: supplyOption.size,
        color: supplyOption.color,
        price: supplyOption.price.toString(),
        quantity: supplyOption.quantity.toString(),
      })),
    );

    const product = new FormData();
    product.append("nameTag", "supplies");
    product.append("name", data.name);
    product.append("description", data.description);
    product.append("material", data.material);
    product.append("brand", data.brand);
    product.append("pet_type", category);
    product.append("variations_supplies", supplies);
    product.append("image", file ?? "");

    await mutate({ data: product });
  });

  function onChangeImage() {
    if (productImageInputRef && productImageInputRef.current) {
      productImageInputRef.current.click();
    }
  }

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          toastError("Vui lòng chọn một tệp hình ảnh.");
          return;
        }
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="small-screen:h-0 small-screen:pb-[56.25%] fixed left-[50%] top-[50%] z-[110] h-[90vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] p-[50px]">
      <form
        onSubmit={onSubmit}
        className="grid h-full grid-cols-5 gap-8 overflow-hidden"
      >
        <div className="xl:col-span-13 h-ful col-span-4 overflow-y-scroll">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Thông tin chi tiết
              </h3>
              <div className="flex justify-end gap-4.5">
                {!isDisabled && (
                  <>
                    <button className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
                      Thêm sản phẩm
                    </button>
                  </>
                )}

                <button
                  className="flex justify-center rounded border border-stroke bg-blue-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCloseAddSupply();
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
                      placeholder="Nhập tiêm phòng"
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
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Loại nguyên liệu
                        </label>
                        <Controller
                          name={`variationsSupply.${index}.size` as const}
                          control={control}
                          render={({ field }) => (
                            <select
                              disabled={isDisabled}
                              {...field}
                              className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            >
                              <option value="" disabled>
                                Lựa chọn kích cỡ
                              </option>
                              {Object.entries(SizeType).map(([, size]) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          )}
                        />
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Màu sắc
                        </label>
                        <Controller
                          name={`variationsSupply.${index}.color` as const}
                          control={control}
                          render={({ field }) => (
                            <select
                              disabled={isDisabled}
                              {...field}
                              className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            >
                              <option value="" disabled>
                                Lựa chọn kích cỡ
                              </option>
                              {Object.entries(ColorType).map(([, color]) => (
                                <option key={color} value={color}>
                                  {color}
                                </option>
                              ))}
                            </select>
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
                                errors.variationsSupply?.[index]?.quantity
                                  ?.message
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
                              error={
                                errors.variationsSupply?.[index]?.price?.message
                              }
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

                <button
                  type="button"
                  className="text-meta-3"
                  onClick={() =>
                    append({
                      productVariantId: "0",
                      size: "",
                      color: "",
                      quantity: "1",
                      price: "0",
                    })
                  }
                  style={{ marginTop: "10px", marginRight: "10px" }}
                >
                  Thêm lựa chọn
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5 xl:col-span-1">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Ảnh đồ dùng
              </h3>
            </div>
            <div className="p-7">
              <div>
                <div
                  id="FileUpload"
                  className={cn(
                    "relative mb-5.5 block h-full w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray dark:bg-meta-4",
                  )}
                >
                  <div
                    className="relative flex h-full w-full flex-col items-center justify-center"
                    onClick={onChangeImage}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Image
                      src={productImage}
                      width={0}
                      height={0}
                      sizes="100%"
                      alt="Supply"
                      className="h-full w-full object-cover"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      ref={productImageInputRef}
                      style={{ display: "none" }}
                      multiple={false}
                      onChange={handleChangeImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSupply;
