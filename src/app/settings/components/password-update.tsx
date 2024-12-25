import FormInput from "@/components/form-input";
import useMutation from "@/hooks/use-mutation";
import { updatePassword } from "@/services/api/user-api";
import { toastError, toastSuccess } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const schema = z
  .object({
    oldPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export type ChangePasswordFormType = z.infer<typeof schema>;

export default function PasswordUpdate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormType>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    fetcher: updatePassword,
    options: {
      onSuccess: () => {
        toastSuccess("Cập nhật mật khẩu thành công");
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const onSubmit = handleSubmit((data: ChangePasswordFormType) => {
    mutate({ data });
    reset();
  });

  return (
    <div className="col-span-12">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Cập nhật mật khẩu
          </h3>
        </div>
        <div className="p-7">
          <form onSubmit={onSubmit}>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/3">
                <FormInput
                  label="Mật khẩu cũ"
                  id="oldPassword"
                  type="password"
                  variant="secondary"
                  placeholder="Nhập mật khẩu cũ"
                  className="w-full"
                  {...register("oldPassword")}
                  error={errors.oldPassword?.message}
                />
              </div>

              <div className="w-full sm:w-1/3">
                <FormInput
                  label="Mật khẩu mới"
                  id="newPassword"
                  type="password"
                  variant="secondary"
                  placeholder="Nhập mật khẩu mới"
                  className="w-full"
                  {...register("newPassword")}
                  error={errors.newPassword?.message}
                />
              </div>

              <div className="w-full sm:w-1/3">
                <FormInput
                  label="Xác nhận mật khẩu mới"
                  id="confirmPassword"
                  type="password"
                  variant="secondary"
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4.5">
              <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
