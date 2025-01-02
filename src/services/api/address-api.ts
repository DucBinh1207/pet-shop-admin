import { DistrictType, ProvinceType } from "@/types/address";
import { get } from "../axios-public";

import { toCamelCase } from "@/utils/to-camel-case";

export async function GetProvince(url: string) {
  const rawData = await get<ProvinceType[]>({
    url: url,
  });
  const data = toCamelCase<ProvinceType[]>(rawData);
  return data;
}

export async function GetDistricts(url: string) {
  const rawData = await get<ProvinceType>({
    url: url,
  });

  const data = toCamelCase<ProvinceType>(rawData);
  return data;
}

export async function getWards(url: string) {
  const rawData = await get<DistrictType>({
    url: url,
  });

  const data = toCamelCase<DistrictType>(rawData);
  return data;
}
