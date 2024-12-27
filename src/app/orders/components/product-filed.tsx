import FormInput from "@/components/form-input";
import useProducts from "@/hooks/products/useProducts";
import { useDebounce } from "@/hooks/use-debounce";
import { ProductVariant } from "@/types/product";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Controller, UseFieldArrayRemove, useWatch } from "react-hook-form";

type ProductFieldProps = {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValues: any;
  remove: UseFieldArrayRemove;
};

const ProductField: React.FC<ProductFieldProps> = ({
  index,
  control,
  errors,
  setValue,
  getValues,
  remove,
}) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [maxQuantity, setMaxQuantity] = useState(0);

  function handleSearch({
    e,
    index,
  }: {
    e: ChangeEvent<HTMLInputElement>;
    index: number;
  }) {
    setSearch(e.target.value);
    if (
      getValues(`variationsProduct.${index}.productVariantId`) !== "" ||
      getValues(`variationsProduct.${index}.category`) !== ""
    ) {
      setValue(`variationsProduct.${index}.productVariantId`, "");
      setValue(`variationsProduct.${index}.category`, "");
    }
  }

  function handleClickItem({
    index,
    item,
  }: {
    index: number;
    item: ProductVariant;
  }) {
    setMaxQuantity(Number(item.stock));

    const selectedItem = [
      `[${item.productVariantId}]`,
      item.name,
      item.category,
      item.ingredient !== "" ? item.ingredient : null,
      item.weight !== "" ? item.weight : null,
      item.size !== "" ? item.size : null,
      item.color !== "" ? item.color : null,
      `Giá: ${item.price}đ`,
      `Số lượng: ${item.stock}`,
    ]
      .filter(Boolean)
      .join(", ");
    setSearch(selectedItem);
    setValue(
      `variationsProduct.${index}.productVariantId`,
      item.productVariantId,
    );
    setValue(`variationsProduct.${index}.category`, item.category);
  }
  const { product } = useProducts({
    name: debouncedSearch,
  });

  const quantity = useWatch({
    control,
    name: `variationsProduct.${index}.quantity`,
  });

  useEffect(() => {
    if (quantity && Number(quantity) > maxQuantity) {
      setValue(`variationsProduct.${index}.quantity`, maxQuantity);
    }
  }, [quantity, maxQuantity, index, setValue]);

  return (
    <>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-5/6">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="productName"
          >
            Sản phẩm
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="productName"
              id="productName"
              placeholder="Nhập tên sản phẩm"
              onChange={(e) => handleSearch({ e, index })}
              value={search}
            />
            {product && product.length > 0 && (
              <div className="absolute bottom-[120%] w-full">
                <ul className="h-[400px] w-full overflow-y-scroll rounded border px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-gray-50 dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                  {product.map((item) => (
                    <li
                      key={item.productVariantId}
                      className="flex cursor-pointer gap-[15px] hover:bg-primary hover:text-white"
                      onClick={() => handleClickItem({ index, item })}
                    >
                      <span className="text-meta-5">
                        [{item.productVariantId}]
                      </span>
                      <span className="text-meta-3">{item.name}</span>
                      <span className="text-meta-7">{item.category}</span>
                      {item.ingredient && (
                        <span className="text-meta-10">{item.ingredient}</span>
                      )}
                      {item.weight && (
                        <span className="text-meta-10">{item.weight}</span>
                      )}
                      {item.size && (
                        <span className="text-meta-10">{item.size}</span>
                      )}
                      {item.color && (
                        <span className="text-meta-10">{item.color}</span>
                      )}
                      <span className="text-meta-6">
                        ( Giá : {item.price}đ)
                      </span>
                      <span className="text-meta-2">
                        (Số lượng: {item.stock})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="w-full sm:w-1/6">
          <Controller
            name={`variationsProduct.${index}.quantity` as const}
            control={control}
            render={({ field }) => (
              <FormInput
                label="Số lượng"
                id="quantity"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder="Nhập số lượng"
                {...field}
                error={errors.variationsProduct?.[index]?.quantity?.message}
              />
            )}
          />
        </div>
      </div>
      <div className="mb-5.5 hidden flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <Controller
            name={`variationsProduct.${index}.productVariantId` as const}
            control={control}
            render={({ field }) => (
              <FormInput
                readOnly
                label="Sản phẩm"
                id="productVariantsId"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder=""
                {...field}
                error={
                  errors.variationsProduct?.[index]?.productVariantId?.message
                }
              />
            )}
          />
        </div>

        <div className="w-full sm:w-1/2">
          <Controller
            name={`variationsProduct.${index}.category` as const}
            control={control}
            render={({ field }) => (
              <FormInput
                readOnly
                label="Loại sản phẩm"
                id="ingredient"
                type="text"
                variant="secondary"
                className="w-full"
                placeholder=""
                {...field}
                error={errors.variationsProduct?.[index]?.category?.message}
              />
            )}
          />
        </div>
      </div>

      <button
        type="button"
        className="text-meta-1"
        onClick={() => remove(index)}
      >
        Xóa lựa chọn
      </button>
    </>
  );
};

export default ProductField;
