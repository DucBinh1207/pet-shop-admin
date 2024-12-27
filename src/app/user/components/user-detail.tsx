import Image from "next/image";
import { UserType } from "@/types/user";
import { RenderUserStatus } from "@/utils/renderUserStatus";
import CheckRole from "@/utils/checkRole";
import {
  banUser,
  updateAvatarByAdmin,
  updateUser,
} from "@/services/api/user-api";
import useMutation from "@/hooks/use-mutation";
import { toastError, toastSuccess } from "@/utils/toast";
import useRole from "@/store/useRole";
import { useShallow } from "zustand/shallow";
import { UserStatus } from "@/constants/user-status";
import { UserRole, UserRoleLabel } from "@/constants/user-role";
import { ChangeEvent, useRef, useState } from "react";
import FormInput from "@/components/form-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import cn from "@/utils/style/cn";

type props = {
  user: UserType;
  handleCloseUserDetail: () => void;
  refresh: () => void;
};

const schema = z.object({
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(20, "Password can have a maximum of 20 characters")
    .optional(),
  name: z.string().min(1, "Name is required"),
  telephoneNumber: z.string().min(1, "TelephoneNumber is required"),
  nationality: z.string().min(1, "Nationality is required"),
  province: z.string().min(1, "Province is required"),
  district: z.string().min(1, "District is required"),
  ward: z.string().min(1, "Ward is required"),
  street: z.string().optional(),
});

type UpdateUserFormType = z.infer<typeof schema>;

export type UpdateUserType = UpdateUserFormType & {
  id: string;
  idRole: string;
  email: string;
  gender: boolean;
};

const UserDetail = ({ user, handleCloseUserDetail, refresh }: props) => {
  const [role, setRole] = useState(user.idRole);
  const [avatar, setAvatar] = useState(user.image);

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormType>({
    defaultValues: {
      name: user.name,
      telephoneNumber: user.telephoneNumber,
      nationality: user.nationality,
      district: user.district,
      province: user.province,
      ward: user.ward,
      street: user.street,
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    fetcher: banUser,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã khóa người dùng");
        refresh();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const { mutate: mutateUpdateUser } = useMutation({
    fetcher: updateUser,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã cập nhật người dùng");
        refresh();
        handleCloseUserDetail();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const { mutate: mutateUpdateAvatar } = useMutation({
    fetcher: updateAvatarByAdmin,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã cập nhật ảnh người dùng");
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const { idRole } = useRole(
    useShallow((state) => ({
      idRole: state.idRole,
    })),
  );

  const isDisabled =
    !CheckRole(idRole) ||
    user.idRole === 2 ||
    user.status === UserStatus.BANNED;

  function handleBanUser() {
    const data = {
      userId: user.id,
    };
    if (CheckRole(idRole)) mutate({ data });
    else toastError("Bạn không được phép thực hiện chức năng này");
  }

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = parseInt(e.target.value, 10);
    if (newRole === 1 || newRole === 3) {
      setRole(newRole);
    }
  };

  function onChangeAvatar() {
    if (avatarInputRef && avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  }

  function handleChangeAvatar(e: ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          toastError("Vui lòng chọn một tệp hình ảnh.");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatar(reader.result as string);
        };
        reader.readAsDataURL(file);

        const data = new FormData();
        data.append("image", file);
        data.append("id_user", user.id);

        mutateUpdateAvatar({ data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = handleSubmit((data: UpdateUserFormType) => {
    const submitData: UpdateUserType = {
      id: user.id,
      email: user.email,
      password: "123",
      idRole: role.toString(),
      name: data.name,
      gender: true,
      telephoneNumber: data.telephoneNumber,
      province: data.province,
      district: data.district,
      ward: data.ward,
      street: data.street,
      nationality: data.nationality,
    };
    mutateUpdateUser({ data: submitData });
  });

  return (
    <div className="small-screen:h-0 small-screen:pb-[56.25%] fixed left-[50%] top-[50%] z-[110] h-[90vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] p-[50px]">
      <form onSubmit={onSubmit} className="grid h-full grid-cols-5 gap-8">
        <div className="xl:col-span-13 col-span-4 h-full overflow-hidden">
          <div className="h-full overflow-y-scroll rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Thông tin chi tiết
              </h3>
              <div className="flex justify-end gap-4.5">
                {!isDisabled && (
                  <button
                    className="flex justify-center rounded bg-red-500 px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBanUser();
                    }}
                  >
                    Khóa tài khoản
                  </button>
                )}

                {!isDisabled && (
                  <button
                    className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Cập nhật
                  </button>
                )}

                <button
                  className="flex justify-center rounded border border-stroke bg-blue-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCloseUserDetail();
                  }}
                >
                  Thoát
                </button>
              </div>
            </div>
            <div className="h-full p-7">
              <div className="h-full w-full">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Id
                    </label>
                    <input
                      disabled
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="Username"
                      id="Username"
                      value={user.id}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Vai trò
                    </label>
                    <select
                      disabled={isDisabled}
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      value={role}
                      onChange={handleRoleChange}
                    >
                      {user.idRole === 2 ? (
                        <option key={UserRole.ADMIN} value={UserRole.ADMIN}>
                          {UserRoleLabel[UserRole.ADMIN]}
                        </option>
                      ) : (
                        <>
                          {Object.entries(UserRole).map(([, roleValue]) => (
                            <>
                              {roleValue !== UserRole.ADMIN && (
                                <option key={roleValue} value={roleValue}>
                                  {UserRoleLabel[roleValue]}
                                </option>
                              )}
                            </>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Xác minh
                    </label>
                    <input
                      disabled
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={user.isVerified ? "Đã xác minh" : "Chưa xác minh"}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Trạng thái
                    </label>
                    <input
                      disabled
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={RenderUserStatus(user.status)}
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      disabled={isDisabled}
                      label="Tên"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="-"
                      {...register("name")}
                      error={errors.name?.message}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4"></span>
                      <input
                        disabled
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={user.email}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      disabled={isDisabled}
                      label="Số điện thoại"
                      id="telephoneNumber"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="-"
                      {...register("telephoneNumber")}
                      error={errors.telephoneNumber?.message}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      disabled={isDisabled}
                      label="Quốc gia"
                      id="nationality"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="-"
                      {...register("nationality")}
                      error={errors.nationality?.message}
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      disabled={isDisabled}
                      label="Tỉnh/ Thành phố"
                      id="district"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="-"
                      {...register("district")}
                      error={errors.district?.message}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      disabled={isDisabled}
                      label="Quận/ Huyện"
                      id="province"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="-"
                      {...register("province")}
                      error={errors.province?.message}
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      disabled={isDisabled}
                      label="Xã/ Phường"
                      id="ward"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="-"
                      {...register("ward")}
                      error={errors.ward?.message}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      disabled={isDisabled}
                      label="Đường"
                      id="street"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="-"
                      {...register("street")}
                      error={errors.street?.message}
                    />
                  </div>
                </div>

                {user.idRole !== 2 && (
                  <div className="mb-5.5">
                    <FormInput
                      disabled={isDisabled}
                      label="Mật khẩu"
                      id="province"
                      type="password"
                      variant="secondary"
                      className="w-full"
                      placeholder="***************"
                      {...register("password")}
                      error={errors.password?.message}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5 xl:col-span-1">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Avatar</h3>
              {!isDisabled && (
                <span className="mt-[10px]">Nhấn để thay đổi avatar</span>
              )}
            </div>
            <div className="p-7">
              <form action="#">
                <div
                  id="FileUpload"
                  className={cn(
                    "relative mb-5.5 block h-full w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray dark:bg-meta-4",
                  )}
                >
                  <div
                    className="relative flex h-full w-full flex-col items-center justify-center"
                    onClick={onChangeAvatar}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Image
                      src={
                        avatar === undefined || avatar === null
                          ? "/images/user/avatar.svg"
                          : avatar
                      }
                      width={0}
                      height={0}
                      sizes="100%"
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                    {!isDisabled && (
                      <input
                        type="file"
                        accept="image/*"
                        ref={avatarInputRef}
                        style={{ display: "none" }}
                        multiple={false}
                        onChange={handleChangeAvatar}
                      />
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
