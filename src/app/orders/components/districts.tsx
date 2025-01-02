import useDistricts from "@/hooks/address/useDistricts";
import { ChangeEvent, useEffect, useState } from "react";
import Wards from "./ward";
import { FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";

type props = {
  provinceCode: string;
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

export default function District({
  provinceCode,
  setValue,
  errors,
  trigger,
}: props) {
  const [districtData, setDistrictData] = useState("");

  const { province: provinceSelected } = useDistricts(
    provinceCode + "?depth=2",
  );

  function handleChangeProvince(event: ChangeEvent<HTMLSelectElement>) {
    const provinceSelected = event.target.value;
    setDistrictData(provinceSelected);
    setValue(`district`, event.target.options[event.target.selectedIndex].text);
    trigger("district");
  }

  useEffect(() => {
    setDistrictData("");
  }, [provinceCode]);

  return (
    <>
      <div className="mb-5.5">
        <>
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="note"
          >
            Quận/ Huyện
          </label>

          <select
            className="w-full rounded border border-strokedark bg-meta-4 px-4.5 py-3 text-white focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500"
            value={districtData}
            onChange={handleChangeProvince}
          >
            <option value="" hidden disabled>
              Chọn quận/ huyện
            </option>
            {provinceSelected &&
              provinceSelected.districts &&
              provinceSelected.districts.map((district) => {
                return (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                );
              })}
          </select>

          {errors && errors.district?.message && (
            <span className="ml-[5px] mt-[5px] text-[13px] leading-[18px] text-red-500">
              {errors.district?.message}
            </span>
          )}
        </>
      </div>

      <Wards
        districtCode={districtData}
        setValue={setValue}
        errors={errors}
        trigger={trigger}
      />
    </>
  );
}
