export default function OrderItemAdded() {
  return (
    <>
      <h5 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Sản phẩm thứ 2
      </h5>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-4/6">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="fullName"
          >
            Sản phẩm
          </label>
          <div className="relative">
            <span className="absolute left-4.5 top-4"></span>
            <input
              disabled
              className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="fullName"
              id="fullName"
              placeholder=""
              defaultValue="Mã 6714cbd3f3bf1db1af243740, Border-Collie, thú cưng, giá 5.000.000đ (SL:12)"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/6">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="phoneNumber"
          >
            Số lượng
          </label>
          <input
            disabled
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder=""
            defaultValue="2"
          />
        </div>

        <div className="flex w-full items-end sm:w-1/6">
          <button className="w-full rounded border border-stroke px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-red-700 dark:text-white dark:focus:border-red-700">
            Hủy
          </button>
        </div>
      </div>
    </>
  );
}
