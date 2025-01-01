import useWards from "@/hooks/address/useWards";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";

type props = {
  districtCode: string;
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

export default function Wards({
  districtCode,
  setValue,
  errors,
  trigger,
}: props) {
  const [wardData, setWardData] = useState("");

  const { district: districtSelected } = useWards(districtCode + "?depth=2");

  function handleChangeWard(event: ChangeEvent<HTMLSelectElement>) {
    const wardSelected = event.target.value;
    setWardData(wardSelected);
    setValue(`ward`, event.target.options[event.target.selectedIndex].text);
    trigger("ward");
  }

  useEffect(() => {
    setWardData("");
  }, [districtCode]);

  return (
    <>
      <div className="mb-5.5">
        <>
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="note"
          >
            Xã/ Phường
          </label>

          <select
            className="w-full rounded border border-strokedark bg-meta-4 px-4.5 py-3 text-white focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500"
            value={wardData}
            onChange={handleChangeWard}
          >
            <option value="" hidden disabled>
              Chọn xã/ phường
            </option>
            {districtSelected &&
              districtSelected.wards &&
              districtSelected.wards.map((ward) => {
                return <option key={ward.name}>{ward.name}</option>;
              })}
          </select>
          {errors && errors.ward?.message && (
            <span className="ml-[5px] mt-[5px] text-[13px] leading-[18px] text-red-500">
              {errors.ward?.message}
            </span>
          )}
        </>
      </div>
    </>
  );
}
