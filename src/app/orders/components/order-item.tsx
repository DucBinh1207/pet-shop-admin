export default function OrderItem() {
  return (
    <>
      <h5 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Sản phẩm thứ 1
      </h5>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="phoneNumber"
          >
            Tổng phụ
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Có"
            defaultValue="Chó"
          />
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="phoneNumber"
          >
            Phí ship
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Hoạt động"
            defaultValue="Husky"
          />
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="fullName"
          >
            Giảm giá
          </label>
          <div className="relative">
            <span className="absolute left-4.5 top-4"></span>
            <input
              className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="fullName"
              id="fullName"
              placeholder="example@gmail.com"
              defaultValue="example@gmail.com"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="phoneNumber"
          >
            Tổng tiền
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="+990 3343 7865"
            defaultValue="+990 3343 7865"
          />
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="fullName"
          >
            Ngày tạo đơn
          </label>
          <div className="relative">
            <span className="absolute left-4.5 top-4"></span>
            <input
              className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Devid Jhon"
              defaultValue="Devid Jhon"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="phoneNumber"
          >
            Phương thức thanh toán
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Việt Nam"
            defaultValue="Việt Nam"
          />
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/3">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="phoneNumber"
          >
            Họ tên người nhận hàng
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Có"
            defaultValue="Nhập bố thú cưng"
          />
        </div>

        <div className="w-full sm:w-1/3">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="phoneNumber"
          >
            Số điện thoại
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Hoạt động"
            defaultValue="Nhập mẹ thú cưng"
          />
        </div>
        <div className="w-full sm:w-1/3">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="phoneNumber"
          >
            Email
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Hoạt động"
            defaultValue="Nhập mẹ thú cưng"
          />
        </div>
      </div>
    </>
  );
}
