import { BRAND } from "@/types/brand";
import Image from "next/image";
import Link from "next/link";

const brandData: BRAND[] = [
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
    name: "Golden Retriever",
    visitors: "#F6G7H8I9J0",
    revenues: "7,324",
    sales: 675,
    conversion: 5.3,
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
    name: "Bulldog",
    visitors: "#P6Q7R8S9T0",
    revenues: "6,123",
    sales: 510,
    conversion: 4.9,
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
    name: "German Shepherd",
    visitors: "#Z6A7B8C9D0",
    revenues: "10,234",
    sales: 890,
    conversion: 7.8,
  },
  {
    logo: "/images/product/border-colie.png",
    name: "Chihuahua",
    visitors: "#E1F2G3H4I5",
    revenues: "3,245",
    sales: 350,
    conversion: 3.5,
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
    name: "Siberian Husky",
    visitors: "#O1P2Q3R4S5",
    revenues: "9,013",
    sales: 810,
    conversion: 7.2,
  },
  {
    logo: "/images/product/border-colie.png",
    name: "Shih Tzu",
    visitors: "#T6U7V8W9X0",
    revenues: "6,780",
    sales: 600,
    conversion: 5.5,
  },
];

const TopProducts = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
           Sản phẩm ưa chuộng nhất
        </h4>

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
              <p className="text-meta-5">{brand.conversion}%</p>
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

export default TopProducts;
