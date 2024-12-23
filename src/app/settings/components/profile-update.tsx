import FormInput from "@/components/form-input";

export default function ProfileUpdate() {
  return (
    <div className="col-span-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Thông tin cá nhân
          </h3>
        </div>
        <div className="p-7">
          <form action="#">
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <FormInput
                  label="Tên"
                  id="email"
                  type="text"
                  variant="secondary"
                  placeholder="Nhập tên"
                  className="w-full"
                />
              </div>

              <div className="w-full sm:w-1/2">
                <FormInput
                  label="Số điện thoại"
                  id="phoneNumber"
                  type="text"
                  variant="secondary"
                  placeholder="Nhập số điện thoại"
                  className="w-full"
                />
              </div>
            </div>

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <FormInput
                  label="Email"
                  id="email"
                  type="email"
                  variant="secondary"
                  placeholder="example@gmail.com"
                  className="w-full"
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
