import FormInput from "@/components/form-input";
import useMutation from "@/hooks/use-mutation";
import { updateProfile } from "@/services/api/user-api";
import { UserType } from "@/types/user";
import { toastError, toastSuccess } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  telephoneNumber: z.string().min(1, "TelephoneNumber is required"),
  nationality: z.string().min(1, "Nationality is required"),
  province: z.string().min(1, "Province is required"),
  district: z.string().min(1, "District is required"),
  ward: z.string().min(1, "Ward is required"),
  street: z.string().optional(),
});

export type UpdateProfileFormType = z.infer<typeof schema>;

type props = {
  userInfo: UserType;
};

export default function ProfileUpdate({ userInfo }: props) {
  // const { userInfo, isLoading, isError } = useUserDetail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormType>({
    defaultValues: {
      name: userInfo?.name,
      telephoneNumber: userInfo?.telephoneNumber,
      nationality: userInfo?.nationality,
      district: userInfo?.district,
      province: userInfo?.province,
      ward: userInfo?.ward,
      street: userInfo?.street,
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    fetcher: updateProfile,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã cập nhật người dùng");
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const onSubmit = handleSubmit((data: UpdateProfileFormType) => {
    mutate({ data });
  });

  return (
    <div className="col-span-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Thông tin cá nhân
          </h3>
        </div>
        <div className="p-7">
          <form onSubmit={onSubmit}>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <FormInput
                  label="Tên"
                  id="name"
                  type="text"
                  variant="secondary"
                  placeholder="Nhập tên"
                  className="w-full"
                  {...register("name")}
                  error={errors.name?.message}
                />
              </div>

              <div className="w-full sm:w-1/2">
                <FormInput
                  label="Số điện thoại"
                  id="telephoneNumber"
                  type="text"
                  variant="secondary"
                  placeholder="Nhập số điện thoại"
                  className="w-full"
                  {...register("telephoneNumber")}
                  error={errors.telephoneNumber?.message}
                />
              </div>
            </div>

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <FormInput
                  disabled
                  label="Email"
                  id="email"
                  type="email"
                  variant="secondary"
                  placeholder="example@gmail.com"
                  className="w-full"
                  value={userInfo?.email}
                />
              </div>

              <div className="w-full sm:w-1/2">
                <FormInput
                  label="Quốc tịch"
                  id="nationality"
                  type="text"
                  variant="secondary"
                  placeholder="Nhập quốc tịch"
                  className="w-full"
                  {...register("nationality")}
                  error={errors.nationality?.message}
                />
              </div>
            </div>

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <FormInput
                  label="Tỉnh/ Thành phố"
                  id="province"
                  type="text"
                  variant="secondary"
                  placeholder="Nhập tỉnh/ thành phố"
                  className="w-full"
                  {...register("province")}
                  error={errors.province?.message}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <FormInput
                  label="Quận/ Huyện"
                  id="district"
                  type="text"
                  variant="secondary"
                  placeholder="Nhập quận/ huyện"
                  className="w-full"
                  {...register("district")}
                  error={errors.district?.message}
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
                  placeholder="Nhập xã/ phường"
                  className="w-full"
                  {...register("district")}
                  error={errors.district?.message}
                />
              </div>

              <div className="w-full sm:w-1/2">
                <FormInput
                  label="Đường"
                  id="street"
                  type="text"
                  variant="secondary"
                  placeholder="Nhập tên đường"
                  className="w-full"
                  {...register("street")}
                  error={errors.street?.message}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4.5">
              <button
                className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
