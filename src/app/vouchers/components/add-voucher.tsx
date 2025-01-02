import CheckRole from "@/utils/checkRole";
import useMutation from "@/hooks/use-mutation";
import { toastError, toastSuccess } from "@/utils/toast";
import useRole from "@/store/useRole";
import { useShallow } from "zustand/shallow";
import FormInput from "@/components/form-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVoucher } from "@/services/api/voucher-api";
import useBlockScroll from "@/hooks/use-block-scroll";

type props = {
  handleCloseAddVoucher: () => void;
  refresh: () => void;
};

const schema = z.object({
  code: z.string().min(1, "Yêu cầu nhập mã"),
  percent: z
    .string()
    .refine((val) => Number.isInteger(Number(val)) && Number(val) > 0, {
      message: "Phần trăm giảm giá phải lớn hơn 0",
    }),
  quantity: z
    .string()
    .refine((val) => Number.isInteger(Number(val)) && Number(val) > 0, {
      message: "Số lượng phải lớn hơn 0",
    }),
});

export type CreateVoucherType = z.infer<typeof schema>;

const AddVoucher = ({ handleCloseAddVoucher, refresh }: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVoucherType>({
    defaultValues: {
      code: "",
      percent: "",
      quantity: "1",
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    fetcher: createVoucher,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã thêm mã giảm giá");
        refresh();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

    useBlockScroll(true);

  const { idRole } = useRole(
    useShallow((state) => ({
      idRole: state.idRole,
    })),
  );

  const onSubmit = handleSubmit((data: CreateVoucherType) => {
    mutate({ data });
  });

  return (
    <div className="small-screen:h-0 small-screen:pb-[56.25%] fixed left-[50%] top-[50%] z-[110] h-[90vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] p-[50px]">
      <form onSubmit={onSubmit}>
        <div className="xl:col-span-13 col-span-4">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Thông tin chi tiết
              </h3>
              <div className="flex justify-end gap-4.5">
                {CheckRole(idRole) && (
                  <button className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
                    Thêm mã giảm giá
                  </button>
                )}

                <button
                  className="flex justify-center rounded border border-stroke bg-blue-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCloseAddVoucher();
                  }}
                >
                  Thoát
                </button>
              </div>
            </div>
            <div className="p-7">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/3">
                  <FormInput
                    label="Tên mã"
                    id="code"
                    type="text"
                    variant="secondary"
                    className="w-full"
                    placeholder="Nhập tên mã"
                    {...register("code")}
                    error={errors.code?.message}
                  />
                </div>

                <div className="w-full sm:w-1/3">
                  <FormInput
                    label="Phần trăm giảm giá"
                    id="percent"
                    type="percent"
                    variant="secondary"
                    className="w-full"
                    placeholder="Nhập phần trăm giảm giá"
                    {...register("percent")}
                    error={errors.percent?.message}
                  />
                </div>

                <div className="w-full sm:w-1/3">
                  <FormInput
                    label="Số lượng"
                    id="quantity"
                    type="quantity"
                    variant="secondary"
                    className="w-full"
                    placeholder="Nhập số lượng"
                    {...register("quantity")}
                    error={errors.quantity?.message}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddVoucher;
