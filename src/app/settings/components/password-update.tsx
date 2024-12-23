import FormInput from "@/components/form-input";

export default function PasswordUpdate() {
  return (
    <div className="col-span-12">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Cập nhật mật khẩu
          </h3>
        </div>
        <div className="p-7">
          <form action="#">
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/3">
                <FormInput
                  label="Mật khẩu cũ"
                  id="oldPassword"
                  type="password"
                  variant="secondary"
                  placeholder="Nhập mật khẩu cũ"
                  className="w-full"
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
