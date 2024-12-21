import { get } from "../axios-public";
import { toCamelCase } from "@/utils/to-camel-case";
import { PetResponse, PetType } from "@/types/pet";
import { FoodResponse, FoodType } from "@/types/food";
import { SupplyResponse, SupplyType } from "@/types/supply";
import { SearchItemType } from "@/types/search-item";

export async function getPets(url: string) {
  const rawData = await get<PetResponse>({
    url: url,
  });
  const data = toCamelCase<PetResponse>(rawData);
  return data;
}

export async function getPetDetail(url: string) {
  const rawData = await get<PetType>({
    url: url,
  });
  const data = toCamelCase<PetType>(rawData);
  return data;
}

export async function getFoods(url: string) {
  const rawData = await get<FoodResponse>({
    url: url,
  });
  const data = toCamelCase<FoodResponse>(rawData);
  return data;
}

export async function getFoodDetail(url: string) {
  const rawData = await get<FoodType>({
    url: url,
  });
  const data = toCamelCase<FoodType>(rawData);
  return data;
}

export async function getSupplies(url: string) {
  const rawData = await get<SupplyResponse>({
    url: url,
  });
  const data = toCamelCase<SupplyResponse>(rawData);
  return data;
}

export async function getSupplyDetail(url: string) {
  const rawData = await get<SupplyType>({
    url: url,
  });
  const data = toCamelCase<SupplyType>(rawData);
  return data;
}

export async function searchProducts(url: string) {
  const rawData = await get<SearchItemType[]>({
    url: url,
  });
  const data = toCamelCase<SearchItemType[]>(rawData);
  return data;
}
