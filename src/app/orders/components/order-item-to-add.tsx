export default function OrderItemToAdd() {
  return (
    <>
      <h5 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Sản phẩm thứ 1
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
              className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="fullName"
              id="fullName"
              placeholder=""
              defaultValue="collie"
            />

            <div className="absolute bottom-[120%] w-full">
              <ul className="w-full rounded border  px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-gray-50 dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                <li className="flex cursor-pointer hover:bg-primary hover:text-white">
                  Mã 6714cbd3f3bf1db1af243741, Áo len cho Collie, vật dụng khác,
                  màu sáng, kích cỡ vừa, giá 300.000đ (SL:5)
                </li>
                <li className="flex cursor-pointer hover:bg-primary hover:text-white">
                  Mã 6714cbd3f3bf1db1af243741, Áo len cho Collie, vật dụng khác,
                  màu tối, kích cỡ vừa, giá 300.000đ (SL:5)
                </li>
                <li className="cursor-pointer hover:bg-primary hover:text-white">
                  Mã 6714cbd3f3bf1db1af243742, Dây xích cho Collie, vật dụng
                  khác, kích cỡ vừa, giá 200.000đ (SL:8)
                </li>
                <li className="cursor-pointer hover:bg-primary hover:text-white">
                  Mã 6714cbd3f3bf1db1af243744, Thức ăn dinh dưỡng cho Collie,
                  thức ăn, nguyên liệu gà, cân nặng 5kg, giá 700.000đ (SL:10)
                </li>
                <li className="cursor-pointer hover:bg-primary hover:text-white">
                  Mã 6714cbd3f3bf1db1af243744, Thức ăn dinh dưỡng cho Collie,
                  thức ăn, nguyên liệu bò, cân nặng 10kg, giá 1.500.000đ (SL:10)
                </li>
              </ul>
            </div>
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
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Nhập số lượng"
            defaultValue=""
          />
        </div>

        <div className="flex w-full items-end sm:w-1/6">
          <button className="w-full rounded border border-stroke px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-green-700 dark:text-white dark:focus:border-green-700">
            Thêm
          </button>
        </div>
      </div>
    </>
  );
}
