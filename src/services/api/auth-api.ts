import { LoginFormType } from "@/types/login-form";
import { post } from "../axios";
import { post as postPublic } from "../axios-public";
import { ResponseAuthType } from "@/types/response-auth";

export async function LoginApi({ data }: { data: LoginFormType }) {
  return await postPublic<ResponseAuthType>({
    url: "/auth/login",
    data,
  });
}

export async function LogOut() {
  return await post({
    url: "/auth/logout",
    data: {},
  });
}
