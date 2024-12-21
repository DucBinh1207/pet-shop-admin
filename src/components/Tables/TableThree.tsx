import { BRAND } from "@/types/brand";
import Image from "next/image";
import Link from "next/link";

const dataProduct: BRAND[] = [
  {
    logo: "/images/product/litter-box.png",
    name: "Khay Vệ Sinh Cao Cấp",
    visitors: "#K1V2S3C4",
    revenues: "5,123",
    sales: 210,
    conversion: 4.2,
  },
  {
    logo: "/images/product/cat-house.png",
    name: "Nhà Cho Mèo Ấm Áp",
    visitors: "#N2C3A4P5",
    revenues: "7,654",
    sales: 300,
    conversion: 5.5,
  },
  {
    logo: "/images/product/dog-toy.png",
    name: "Đồ Chơi Cho Chó Vui Nhộn",
    visitors: "#D3T4Y5V6",
    revenues: "4,987",
    sales: 150,
    conversion: 3.8,
  },
  {
    logo: "/images/product/dog-bed.png",
    name: "Giường Cho Chó Êm Ái",
    visitors: "#G1C2S3E4",
    revenues: "8,234",
    sales: 400,
    conversion: 6.0,
  },
  {
    logo: "/images/product/cat-tree.png",
    name: "Cây Cho Mèo Vui Chơi",
    visitors: "#C4T5T6V7",
    revenues: "9,876",
    sales: 500,
    conversion: 7.0,
  },
  {
    logo: "/images/product/dog-collar.png",
    name: "Vòng Cổ Chó Cao Cấp",
    visitors: "#V3C4P5M6",
    revenues: "3,210",
    sales: 120,
    conversion: 2.5,
  },
  {
    logo: "/images/product/cat-scratcher.png",
    name: "Bàn Cào Cho Mèo",
    visitors: "#B1C2S3C4",
    revenues: "6,541",
    sales: 250,
    conversion: 4.5,
  },
  {
    logo: "/images/product/dog-shampoo.png",
    name: "Shampoo Cho Chó",
    visitors: "#S4D5S6M7",
    revenues: "7,123",
    sales: 180,
    conversion: 3.2,
  },
  {
    logo: "/images/product/bird-cage.png",
    name: "Lồng Cho Chim Xinh Xắn",
    visitors: "#L3C4C5X6",
    revenues: "6,789",
    sales: 220,
    conversion: 4.0,
  },
];

const BangSanPham = () => {
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

        {dataProduct.map((sanpham, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === dataProduct.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <Link href="#" className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="h-[48px] w-[48px] flex-shrink-0 overflow-hidden rounded-[50%]">
                <Image
                  src={sanpham.logo}
                  alt="Product"
                  width={48}
                  height={48}
                />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {sanpham.name}
              </p>
            </Link>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{sanpham.visitors}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">${sanpham.revenues}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{sanpham.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{sanpham.conversion}%</p>
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

export default BangSanPham;
