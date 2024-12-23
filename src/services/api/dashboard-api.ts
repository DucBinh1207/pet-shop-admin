import { get} from "../axios";
import { toCamelCase } from "@/utils/to-camel-case";
import { SummaryType } from "@/types/summary";
import { ResponseRevenueApi } from "@/types/response-revenue";
import { ResponseSoldProductsApi } from "@/types/response-sold-products";
import { ResponseTopProductsApi } from "@/types/response-top-products";

export async function getSummary(url: string) {
  const rawData = await get<SummaryType>({
    url: url,
  });
  const data = toCamelCase<SummaryType>(rawData);
  return data;
}

export async function getRevenue(url: string) {
  const rawData = await get<ResponseRevenueApi>({
    url: url,
  });
  const data = toCamelCase<ResponseRevenueApi>(rawData);
  return data;
}

export async function getSoldProducts(url: string) {
  const rawData = await get<ResponseSoldProductsApi>({
    url: url,
  });
  const data = toCamelCase<ResponseSoldProductsApi>(rawData);
  return data;
}


export async function getTopSoldProducts(url: string) {
  const rawData = await get<ResponseTopProductsApi>({
    url: url,
  });
  const data = toCamelCase<ResponseTopProductsApi>(rawData);
  return data;
}

