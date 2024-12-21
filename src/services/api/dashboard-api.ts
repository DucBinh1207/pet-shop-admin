import { get, post } from "../axios";
import { toCamelCase } from "@/utils/to-camel-case";
import { SummaryType } from "@/types/summary";

export async function getSummary(url: string) {
  const rawData = await get<SummaryType>({
    url: url,
  });
  const data = toCamelCase<SummaryType>(rawData);
  return data;
}

export async function LogOut() {
  return await post({
    url: "/auth/logout",
    data: {},
  });
}
