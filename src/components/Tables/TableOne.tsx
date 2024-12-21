import AddPet from "@/app/product/components/add-pet";
import PetDetail from "@/app/product/components/pet-detail";
import { BRAND } from "@/types/brand";
import cn from "@/utils/style/cn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AngleDown from "../angle-down";

const brandData: BRAND[] = [
  {
    logo: "/images/product/border-colie.png",
    name: "German Shepherd",
    visitors: "#Z6A7B8C9D0",
    revenues: "10,234",
    sales: 890,
    conversion: 7.8,
  },
  {
    logo: "/images/product/border-colie.png",
    name: "Siberian Husky",
    visitors: "#O1P2Q3R4S5",
    revenues: "9,013",
    sales: 810,
    conversion: 7.2,
  },
  {
    logo: "/images/product/border-colie.png",
    name: "Poodle",
    visitors: "#U1V2W3X4Y5",
    revenues: "8,965",
    sales: 745,
    conversion: 6.2,
  },
  {
    logo: "/images/product/border-colie.png",
    name: "Golden Retriever",
    visitors: "#F6G7H8I9J0",
    revenues: "7,324",
    sales: 675,
    conversion: 5.3,
  },
  {
    logo: "/images/product/border-colie.png",
    name: "Shih Tzu",
    visitors: "#T6U7V8W9X0",
    revenues: "6,780",
    sales: 600,
    conversion: 5.5,
  },
  {
    logo: "/images/product/border-colie.png",
    name: "Bulldog",
    visitors: "#P6Q7R8S9T0",
    revenues: "6,123",
    sales: 510,
    conversion: 4.9,
  },
  {
    logo: "/images/product/border-colie.png",
    name: "Dachshund",
    visitors: "#J6K7L8M9N0",
    revenues: "5,467",
    sales: 525,
    conversion: 4.7,
  },
  {
    logo: "/images/product/border-colie.png",
    name: "Border Collie",
    visitors: "#A1B2C3D4E5",
    revenues: "5,768",
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: "/images/product/border-colie.png",
    name: "Beagle",
    visitors: "#K1L2M3N4O5",
    revenues: "4,589",
    sales: 480,
    conversion: 4.1,
  },
  {
    logo: "/images/product/border-colie.png",
    name: "Chihuahua",
    visitors: "#E1F2G3H4I5",
    revenues: "3,245",
    sales: 350,
    conversion: 3.5,
  },
];


const TableOne = () => {
  const [product, setProduct] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(false);

  const statusLabel: { [key: number]: string } = {
    1: "Toàn bộ",
    2: "Còn hàng",
    3: "Hết hàng",
    4: "Bị xóa",
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRating = parseInt(e.target.value, 10);
    // Xử lý cập nhật rating tại đây
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-[20px] flex items-center justify-between">
        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Tìm thú cưng . . . "
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div>
        <div className="flex gap-[10px]">
          <div>
            <select
              className="block w-full rounded-sm bg-gray-200 p-2.5 text-black dark:bg-gray-700 dark:text-white"
              defaultValue={0}
              onChange={handleStatusChange}
            >
              {Object.entries(statusLabel).map(([statusValue, statusLabel]) => (
                <option key={statusValue} value={statusValue}>
                  {statusLabel}
                </option>
              ))}
            </select>
          </div>
          <button
            className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
            onClick={() => {
              setIsAddProduct(true);
            }}
          >
            Thêm thú cưng
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Sản phẩm
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Mã</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="flex items-center justify-center gap-[10px] text-sm font-medium uppercase xsm:text-base">
              Giá <AngleDown />
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Số lượng
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              hành động
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <Link href="#" className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="h-[48px] w-[48px] flex-shrink-0 overflow-hidden rounded-[50%]">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </Link>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.visitors}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">${brand.revenues}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">
                <button
                  className="rounded bg-boxdark px-4 py-2 text-blue-700 hover:bg-gray-700 focus:outline-none"
                  onClick={() => {
                    setProduct(true);
                  }}
                >
                  Xem
                </button>

                <button className="rounded bg-boxdark px-4 py-2 text-red-700 hover:bg-gray-700 focus:outline-none">
                  Xóa
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-2 text-[18px]">
        <button className="rounded bg-boxdark px-4 py-2 text-white hover:bg-gray-700 focus:outline-none">
          Trước
        </button>
        <button className="rounded bg-boxdark px-4 py-2 text-white hover:bg-gray-700 focus:outline-none">
          Sau
        </button>
      </div>
      {product && (
        <>
          <PetDetail />
          <div
            className={cn(
              "fixed inset-0 z-[105] h-[100vh] w-[100vw] bg-overlay_color transition-opacity",
              {
                "block opacity-100": product,
                "hidden opacity-0": !product,
              },
            )}
          />
        </>
      )}

      {isAddProduct && (
        <>
          <AddPet />
          <div
            className={cn(
              "fixed inset-0 z-[105] h-[100vh] w-[100vw] bg-overlay_color transition-opacity",
              {
                "block opacity-100": isAddProduct,
                "hidden opacity-0": !isAddProduct,
              },
            )}
          />
        </>
      )}
    </div>
  );
};

export default TableOne;
