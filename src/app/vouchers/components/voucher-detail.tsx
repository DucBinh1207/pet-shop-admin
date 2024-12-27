import CheckRole from "@/utils/checkRole";
import useMutation from "@/hooks/use-mutation";
import { toastError, toastSuccess } from "@/utils/toast";
import useRole from "@/store/useRole";
import { useShallow } from "zustand/shallow";
import FormInput from "@/components/form-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteVoucher, updateVoucher } from "@/services/api/voucher-api";
import { VoucherType } from "@/types/voucher";
import { VoucherStatus } from "@/constants/voucher-status";

type props = {
  voucher: VoucherType;
  handleCloseVoucherDetail: () => void;
  refresh: () => void;
};

const schema = z.object({
  id: z.string().min(1, "id is required"),
  code: z.string().min(1, "Code is required"),
  percent: z
    .string()
    .refine((val) => Number.isInteger(Number(val)) && Number(val) > 0, {
      message: "Percent must be a positive integer",
    }),
  quantity: z
    .string()
    .refine((val) => Number.isInteger(Number(val)) && Number(val) > 0, {
      message: "Quantity must be a positive integer",
    }),
});

export type UpdateVoucherFormType = z.infer<typeof schema>;

const VoucherDetail = ({
  voucher,
  handleCloseVoucherDetail,
  refresh,
}: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateVoucherFormType>({
    defaultValues: {
      id: voucher.id,
      code: voucher.code,
      percent: voucher.percent,
      quantity: voucher.quantity.toString(),
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    fetcher: updateVoucher,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã cập nhật mã giảm giá");
        handleCloseVoucherDetail();
        refresh();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const { mutate: mutateDeleteVoucher } = useMutation({
    fetcher: deleteVoucher,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã xóa mã giảm giá");
        handleCloseVoucherDetail();
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

  const isDisabled =
    !CheckRole(idRole) && voucher.status !== VoucherStatus.DELETED;

  function handleDeleteVoucher(id: string) {
    const data = {
      id: id,
    };
    if (CheckRole(idRole)) mutateDeleteVoucher({ data });
    else toastError("Bạn không được phép thực hiện chức năng này");
  }

  const onSubmit = handleSubmit((data: UpdateVoucherFormType) => {
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
                {isDisabled && (
                  <>
                    <button
                      className="flex justify-center rounded bg-red-500 px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteVoucher(voucher.id);
                      }}
                    >
                      Xóa sản phẩm
                    </button>
                    <button className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
                      Cập nhật mã giảm giá
                    </button>
                  </>
                )}

                <button
                  className="flex justify-center rounded border border-stroke bg-blue-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCloseVoucherDetail();
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

export default VoucherDetail;
