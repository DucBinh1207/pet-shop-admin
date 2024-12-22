import { LoginFormType } from "@/app/login/page";
import { post } from "../axios";
import { post as postPublic } from "../axios-public";
import { ResponseAuthType } from "@/types/response-auth";
import { toCamelCase } from "@/utils/to-camel-case";

export async function LoginApi({ data: dataToSend }: { data: LoginFormType }) {
  const rawData = await postPublic<ResponseAuthType>({
    url: "/auth/login",
    data: dataToSend,
  });
  const data = toCamelCase<ResponseAuthType>(rawData);
  return data;
}

export async function LogOut() {
  return await post({
    url: "/auth/logout",
    data: {},
  });
}
