import { get } from "../axios";
import { ResponseGetUsersApi } from "@/types/user";
import { toCamelCase } from "@/utils/to-camel-case";

export async function getUser(url: string) {
  const rawData = await get<ResponseGetUsersApi>({
    url: url,
  });
  const data = toCamelCase<ResponseGetUsersApi>(rawData);
  return data;
}
