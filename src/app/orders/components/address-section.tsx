import { ChangeEvent, useState } from "react";
import District from "./districts";
import { FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import useProvinces from "@/hooks/address/useProvince";

type props = {
  setValue: UseFormSetValue<{
    name: string;
    telephoneNumber: string;
    email: string;
    province: string;
    district: string;
    ward: string;
    street: string;
    variationsProduct: {
      productVariantId: string;
      category: string;
      price: string;
      product: string;
      quantity: string;
    }[];
    note?: string | undefined;
  }>;
  errors: FieldErrors<{
    name: string;
    telephoneNumber: string;
    email: string;
    province: string;
    district: string;
    ward: string;
    street: string;
    variationsProduct: {
      productVariantId: string;
      category: string;
      price: string;
      product: string;
      quantity: string;
    }[];
    note?: string | undefined;
  }>;
  trigger: UseFormTrigger<{
    name: string;
    telephoneNumber: string;
    email: string;
    province: string;
    district: string;
    ward: string;
    street: string;
    variationsProduct: {
      productVariantId: string;
      category: string;
      price: string;
      product: string;
      quantity: string;
    }[];
    note?: string | undefined;
  }>;
};

export default function AddressSection({ setValue, errors, trigger }: props) {
  const [provinceData, setProvinceData] = useState("");

  const { provinces } = useProvinces();

  function handleChangeProvince(event: ChangeEvent<HTMLSelectElement>) {
    const provinceSelected = event.target.value;
    setProvinceData(provinceSelected);
    setValue(`province`, event.target.options[event.target.selectedIndex].text);
    trigger("province");
  }

  return (
    <>
      <div className="mb-5.5">
        <>
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="note"
          >
            Tỉnh/ Thành phố
          </label>
          <select
            className="w-full rounded border border-strokedark bg-meta-4 px-4.5 py-3 text-white focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500"
            value={provinceData}
            onChange={handleChangeProvince}
          >
            <option value="" hidden disabled>
              Chọn tỉnh/ thành phố
            </option>
            {provinces &&
              provinces.map((province) => {
                return (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                );
              })}
          </select>
          {errors && errors.province?.message && (
            <span className="ml-[5px] mt-[5px] text-[13px] leading-[18px] text-red-500">
              {errors.province?.message}
            </span>
          )}
        </>
      </div>

      <District
        provinceCode={provinceData}
        setValue={setValue}
        errors={errors}
        trigger={trigger}
      />
    </>
  );
}
