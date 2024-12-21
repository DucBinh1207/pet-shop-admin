import { toCamelCase } from "@/utils/to-camel-case";
import { get, update, updateFormData } from "../axios";
import { UserType } from "@/types/user";
import { AddressFormType } from "@/app/profile/_components/address";
import { ChangeAccountInfoFormType } from "@/app/profile/_components/account-info";
import { toSnakeCase } from "@/utils/to-snake-case";
import { ChangePasswordFormType } from "@/app/profile/_components/account-password";
import { updateAvatarResponse } from "@/app/profile/_components/avatar";

export async function getUserDetail(url: string) {
  const rawData = await get<UserType>({
    url: url,
  });
  const data = toCamelCase<UserType>(rawData);
  return data;
}

export async function updateAvatar({ data }: { data: FormData }) {
  return await updateFormData<updateAvatarResponse>({
    url: "/user/avatar",
    data,
  });
}

export async function updateAddress({ data }: { data: AddressFormType }) {
  return await update({
    url: "/user/updateAddress",
    data,
  });
}

export async function updateAccountInfo({
  data: accountInfoData,
}: {
  data: ChangeAccountInfoFormType;
}) {
  const data = toSnakeCase(accountInfoData);

  return await update({
    url: "/user/update",
    data,
  });
}

export async function updatePassword({
  data,
}: {
  data: ChangePasswordFormType;
}) {
  return await update({
    url: "/user/change-password",
    data,
  });
}
