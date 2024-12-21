import { BRAND } from "@/types/brand";
import Image from "next/image";
import Link from "next/link";

const brandData: BRAND[] = [
  {
    logo: "/images/product/dog-food.png",
    name: "Royal Canin",
    visitors: "#R1C2A3N4",
    revenues: "8,234",
    sales: 670,
    conversion: 5.6,
  },
  {
    logo: "/images/product/dog-food.png",
    name: "Pedigree",
    visitors: "#P3E4D5G6",
    revenues: "7,892",
    sales: 640,
    conversion: 5.4,
  },
  {
    logo: "/images/product/dog-food.png",
    name: "Hill's Science Diet",
    visitors: "#H2S3D4T5",
    revenues: "9,324",
    sales: 710,
    conversion: 6.2,
  },
  {
    logo: "/images/product/dog-food.png",
    name: "Purina Pro Plan",
    visitors: "#P1P2P3P4",
    revenues: "10,456",
    sales: 820,
    conversion: 7.0,
  },
  {
    logo: "/images/product/dog-food.png",
    name: "Blue Buffalo",
    visitors: "#B4B5B6B7",
    revenues: "6,893",
    sales: 580,
    conversion: 4.9,
  },
  {
    logo: "/images/product/dog-food.png",
    name: "Wellness CORE",
    visitors: "#W3C4O5R6",
    revenues: "5,678",
    sales: 540,
    conversion: 4.5,
  },
  {
    logo: "/images/product/dog-food.png",
    name: "Taste of the Wild",
    visitors: "#T6O7T8W9",
    revenues: "11,234",
    sales: 890,
    conversion: 7.8,
  },
  {
    logo: "/images/product/dog-food.png",
    name: "Nutro Ultra",
    visitors: "#N4U5U6L7",
    revenues: "4,567",
    sales: 450,
    conversion: 3.8,
  },
  {
    logo: "/images/product/dog-food.png",
    name: "Acana",
    visitors: "#A1C2A3N4",
    revenues: "8,912",
    sales: 720,
    conversion: 6.0,
  },
  {
    logo: "/images/product/dog-food.png",
    name: "Orijen",
    visitors: "#O1R2I3J4",
    revenues: "9,876",
    sales: 780,
    conversion: 6.8,
  },
];

const TableTwo = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
            <h5 className="text-sm font-medium uppercase xsm:text-base">Giá</h5>
          </div>

          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Số lượng
            </h5>
          </div>

          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Bán ra
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
                >
                  Xem
                </button>

                <button className="rounded bg-boxdark px-4 py-2 text-red-700 hover:bg-gray-700 focus:outline-none">
                  Khóa
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
    </div>
  );
};

export default TableTwo;
