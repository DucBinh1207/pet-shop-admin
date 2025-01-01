import { UpdateUserType } from "@/app/user/components/user-detail";
import { get, postFormData, update, updateFormData } from "../axios";
import { ResponseGetUsersApi, UserType} from "@/types/user";
import { toCamelCase } from "@/utils/to-camel-case";
import { toSnakeCase } from "@/utils/to-snake-case";
import { ResponseUpdateAvatar } from "@/types/response-update-avatar";
import { UpdateProfileFormType } from "@/app/settings/components/profile-update";
import { updateAvatarResponse } from "@/app/settings/components/avatar-update";
import { ChangePasswordFormType } from "@/app/settings/components/password-update";

export async function getUser(url: string) {
  const rawData = await get<ResponseGetUsersApi>({
    url: url,
  });
  const data = toCamelCase<ResponseGetUsersApi>(rawData);
  return data;
}

export async function banUser({ data }: { data: { userId: string } }) {
  return await update({
    url: "/admin/users/ban",
    data: data,
  });
}

export async function UnBanUser({ data }: { data: { userId: string } }) {
  return await update({
    url: "/admin/users/unban",
    data: data,
  });
}

export async function createUser({ data }: { data: FormData }) {
  return await postFormData({
    url: "/admin/users/create",
    data,
  });
}

export async function updateUser({ data: userData }: { data: UpdateUserType }) {
  const data = toSnakeCase(userData);

  return await update({
    url: "/admin/users/update",
    data,
  });
}

export async function updateAvatarByAdmin({ data }: { data: FormData }) {
  return await updateFormData<ResponseUpdateAvatar>({
    url: "/admin/users/avatar",
    data,
  });
}

export async function getUserDetail(url: string) {
  const rawData = await get<UserType>({
    url: url,
  });
  const data = toCamelCase<UserType>(rawData);
  return data;
}

export async function updateProfile({
  data: userData,
}: {
  data: UpdateProfileFormType;
}) {
  const data = toSnakeCase(userData);

  return await update({
    url: "/user/updateWeb",
    data,
  });
}

export async function updateAvatar({ data }: { data: FormData }) {
  return await updateFormData<updateAvatarResponse>({
    url: "/user/avatar",
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
