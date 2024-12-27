import Image from "next/image";
import CheckRole from "@/utils/checkRole";
import { createUser } from "@/services/api/user-api";
import useMutation from "@/hooks/use-mutation";
import { toastError, toastSuccess } from "@/utils/toast";
import useRole from "@/store/useRole";
import { useShallow } from "zustand/shallow";
import { UserRole, UserRoleLabel } from "@/constants/user-role";
import { ChangeEvent, useRef, useState } from "react";
import FormInput from "@/components/form-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import cn from "@/utils/style/cn";

type props = {
  handleCloseAddUser: () => void;
  refresh: () => void;
};

const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(20, "Password can have a maximum of 20 characters"),
  name: z.string().min(1, "Name is required"),
  telephoneNumber: z.string().min(1, "TelephoneNumber is required"),
  nationality: z.string().min(1, "Nationality is required"),
  province: z.string().min(1, "Province is required"),
  district: z.string().min(1, "District is required"),
  ward: z.string().min(1, "Ward is required"),
  street: z.string().optional(),
});

type UpdateUserFormType = z.infer<typeof schema>;

const AddUser = ({ handleCloseAddUser, refresh }: props) => {
  const [role, setRole] = useState(UserRole.CUSTOMER);
  const [file, setFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState("");

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormType>({
    defaultValues: {
      name: "",
      telephoneNumber: "",
      nationality: "",
      district: "",
      province: "",
      ward: "",
      street: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    fetcher: createUser,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã thêm người dùng");
        refresh();
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

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = parseInt(e.target.value, 10);
    setRole(newRole);
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
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatar(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = handleSubmit((data: UpdateUserFormType) => {
    const userData = new FormData();
    userData.append("email", data.email);
    userData.append("password", data.password);
    userData.append("id_role", role.toString());
    userData.append("name", data.name);
    userData.append("nationality", data.nationality);
    userData.append("gender", "true");
    userData.append("telephone_number", data.telephoneNumber);
    userData.append("province", data.province);
    userData.append("district", data.district);
    userData.append("ward", data.ward);
    userData.append("street", data.street ?? "");
    userData.append("image", file ?? "");

    mutate({ data: userData });
  });

  return (
    <div className="small-screen:h-0 small-screen:pb-[56.25%] fixed left-[50%] top-[50%] z-[110] h-[90vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] p-[50px]">
      <form onSubmit={onSubmit} className="grid grid-cols-5 gap-8">
        <div className="xl:col-span-13 col-span-4">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Thông tin chi tiết
              </h3>
              <div className="flex justify-end gap-4.5">
                {CheckRole(idRole) && (
                  <button
                    className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Thêm người dùng
                  </button>
                )}

                <button
                  className="flex justify-center rounded border border-stroke bg-blue-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCloseAddUser();
                  }}
                >
                  Thoát
                </button>
              </div>
            </div>
            <div className="p-7">
              <div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Email"
                      id="email"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập email"
                      {...register("email")}
                      error={errors.email?.message}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Mật khẩu"
                      id="password"
                      type="password"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập mật khẩu"
                      {...register("password")}
                      error={errors.password?.message}
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Tên"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập tên"
                      {...register("name")}
                      error={errors.name?.message}
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
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      value={role}
                      onChange={handleRoleChange}
                    >
                      {Object.entries(UserRole).map(([, roleValue]) => (
                        <option key={roleValue} value={roleValue}>
                          {UserRoleLabel[roleValue]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Số điện thoại"
                      id="telephoneNumber"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập số điện thoại"
                      {...register("telephoneNumber")}
                      error={errors.telephoneNumber?.message}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Quốc gia"
                      id="nationality"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập quốc gia"
                      {...register("nationality")}
                      error={errors.nationality?.message}
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Tỉnh/ Thành phố"
                      id="district"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập tỉnh/ thành phố"
                      {...register("district")}
                      error={errors.district?.message}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Quận/ Huyện"
                      id="province"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập quận/ huyện"
                      {...register("province")}
                      error={errors.province?.message}
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Xã/ Phường"
                      id="ward"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập xã/ phường"
                      {...register("ward")}
                      error={errors.ward?.message}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Đường"
                      id="street"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập đường"
                      {...register("street")}
                      error={errors.street?.message}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5 xl:col-span-1">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Avatar</h3>
              <span className="mt-[10px]">Nhấn để thêm avatar</span>
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
                      src={avatar === "" ? "/images/user/avatar.svg" : avatar}
                      width={0}
                      height={0}
                      sizes="100%"
                      alt="User"
                      className="h-full w-full object-cover"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      ref={avatarInputRef}
                      style={{ display: "none" }}
                      multiple={false}
                      onChange={handleChangeAvatar}
                    />
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

export default AddUser;
